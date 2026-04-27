import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import DiscountOffer from '@/models/DiscountOffer';
import { verifyAuth } from '@/lib/auth';
import cloudinary from '@/lib/cloudinary';
import Category from '@/models/Category';

const DISCOUNT_FOLDER = 'muxi-trading/discount-offers';

async function uploadImage(file, folder) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const upload = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder },
      (err, result) => (err ? reject(err) : resolve(result))
    ).end(buffer);
  });
  return upload.secure_url;
}

// GET single discount offer
export async function GET(request, { params }) {
  try {
    const auth = await verifyAuth(request);
    if (!auth.authenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;

    const discountOffer = await DiscountOffer.findById(id).lean();
    if (!discountOffer) {
      return NextResponse.json(
        { success: false, error: 'Discount offer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: { ...discountOffer, _id: discountOffer._id.toString() } },
      { status: 200 }
    );
  } catch (error) {
    console.error('Discount offer GET error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// UPDATE discount offer
export async function PUT(request, { params }) {
  try {
    const auth = await verifyAuth(request);
    if (!auth.authenticated || auth.user?.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;
    const contentType = request.headers.get('content-type') || '';

    let offerName = null;
    let offerTitle = null;
    let shortDescription = null;
    let longDescription = null;
    let discountType = null;
    let discountValue = null;
    let couponCode = null;
    let bannerImage = null;
    let heroModalImage = null;
    let removeBannerImage = false;
    let removeHeroModalImage = false;
    let ctaButtonText = null;
    let ctaRedirectUrl = null;
    let priority = null;
    let countdownEnabled = null;
    let popupModalEnabled = null;
    let featuredOffer = null;
    let forceRepeatSession = null;
    let status = null;
    let startDate = null;
    let endDate = null;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      offerName = formData.get('offerName');
      offerTitle = formData.get('offerTitle');
      shortDescription = formData.get('shortDescription');
      longDescription = formData.get('longDescription');
      discountType = formData.get('discountType');
      discountValue = formData.get('discountValue');
      couponCode = formData.get('couponCode');
      bannerImage = formData.get('bannerImage');
      heroModalImage = formData.get('heroModalImage');
      removeBannerImage = formData.get('removeBannerImage') === 'true';
      removeHeroModalImage = formData.get('removeHeroModalImage') === 'true';
      ctaButtonText = formData.get('ctaButtonText');
      ctaRedirectUrl = formData.get('ctaRedirectUrl');
      priority = formData.get('priority');
      countdownEnabled = formData.get('countdownEnabled');
      popupModalEnabled = formData.get('popupModalEnabled');
      featuredOffer = formData.get('featuredOffer');
      forceRepeatSession = formData.get('forceRepeatSession');
      status = formData.get('status');
      startDate = formData.get('startDate');
      endDate = formData.get('endDate');
    } else {
      const body = await request.json();
      offerName = body.offerName;
      offerTitle = body.offerTitle;
      shortDescription = body.shortDescription;
      longDescription = body.longDescription;
      discountType = body.discountType;
      discountValue = body.discountValue;
      couponCode = body.couponCode;
      bannerImage = body.bannerImage;
      heroModalImage = body.heroModalImage;
      removeBannerImage = body.removeBannerImage === true;
      removeHeroModalImage = body.removeHeroModalImage === true;
      ctaButtonText = body.ctaButtonText;
      ctaRedirectUrl = body.ctaRedirectUrl;
      priority = body.priority;
      countdownEnabled = body.countdownEnabled;
      popupModalEnabled = body.popupModalEnabled;
      featuredOffer = body.featuredOffer;
      forceRepeatSession = body.forceRepeatSession;
      status = body.status;
      startDate = body.startDate;
      endDate = body.endDate;
    }

    const updateData = {};

    if (offerName !== null && offerName.trim()) {
      updateData.offerName = offerName.trim();
      updateData.offerSlug = offerName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
    if (offerTitle !== null) updateData.offerTitle = offerTitle.trim();
    if (shortDescription !== null) updateData.shortDescription = shortDescription.trim() || null;
    if (longDescription !== null) updateData.longDescription = longDescription.trim() || null;
    if (discountType !== null) updateData.discountType = discountType;
    if (discountValue !== null) updateData.discountValue = Number(discountValue) || 0;
    if (couponCode !== null) updateData.couponCode = couponCode || null;
    if (ctaButtonText !== null) updateData.ctaButtonText = ctaButtonText.trim() || 'Claim Discount';
    if (ctaRedirectUrl !== null) updateData.ctaRedirectUrl = ctaRedirectUrl.trim() || '/discount-offers';
    if (priority !== null) updateData.priority = Number(priority) || 0;
    if (countdownEnabled !== null) updateData.countdownEnabled = countdownEnabled === 'true' || countdownEnabled === true;
    if (popupModalEnabled !== null) updateData.popupModalEnabled = popupModalEnabled === 'true' || popupModalEnabled === true;
    if (featuredOffer !== null) updateData.featuredOffer = featuredOffer === 'true' || featuredOffer === true;
    if (forceRepeatSession !== null) updateData.forceRepeatSession = forceRepeatSession === 'true' || forceRepeatSession === true;
    if (status !== null) updateData.status = status;
    if (startDate !== null) updateData.startDate = startDate ? new Date(startDate) : null;
    if (endDate !== null) updateData.endDate = endDate ? new Date(endDate) : null;

    // Handle image removal
    if (removeBannerImage) {
      updateData.bannerImage = null;
    }
    if (removeHeroModalImage) {
      updateData.heroModalImage = null;
    }

    // Handle image upload
    if (bannerImage && typeof bannerImage.arrayBuffer === 'function' && bannerImage.size > 0) {
      updateData.bannerImage = await uploadImage(bannerImage, DISCOUNT_FOLDER);
    }
    if (heroModalImage && typeof heroModalImage.arrayBuffer === 'function' && heroModalImage.size > 0) {
      updateData.heroModalImage = await uploadImage(heroModalImage, DISCOUNT_FOLDER);
    }

    const discountOffer = await DiscountOffer.findByIdAndUpdate(id, updateData, { new: true }).lean();

    if (!discountOffer) {
      return NextResponse.json(
        { success: false, error: 'Discount offer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: { ...discountOffer, _id: discountOffer._id.toString() } },
      { status: 200 }
    );
  } catch (error) {
    console.error('Discount offer PUT error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE discount offer
export async function DELETE(request, { params }) {
  try {
    const auth = await verifyAuth(request);
    if (!auth.authenticated || auth.user?.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;

    const discountOffer = await DiscountOffer.findById(id);
    if (!discountOffer) {
      return NextResponse.json(
        { success: false, error: 'Discount offer not found' },
        { status: 404 }
      );
    }

    // Check if any categories are still using this discount
    const categoryCount = await Category.countDocuments({ discountOfferId: id });
    if (categoryCount > 0) {
      return NextResponse.json(
        { success: false, error: `Cannot delete: ${categoryCount} category(ies) still using this discount offer` },
        { status: 400 }
      );
    }

    await DiscountOffer.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, message: 'Discount offer deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Discount offer DELETE error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
