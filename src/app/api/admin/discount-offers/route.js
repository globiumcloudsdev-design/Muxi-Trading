import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import DiscountOffer from '@/models/DiscountOffer';
import Category from '@/models/Category';
import Item from '@/models/Item';
import { verifyAuth } from '@/lib/auth';
import cloudinary from '@/lib/cloudinary';

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

// GET all discount offers
export async function GET(request) {
  try {
    const auth = await verifyAuth(request);
    const isAuthenticated = auth?.authenticated;

    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search') || '';
    const includeInactive = searchParams.get('includeInactive') === 'true';
    const page = parseInt(searchParams.get('page'), 10) || 1;
    const limitParam = searchParams.get('limit') || '12';
    const isAll = limitParam === 'all';
    const limit = isAll ? null : (parseInt(limitParam, 10) || 12);
    const skip = isAll ? 0 : (page - 1) * limit;

    let query = {};
    
    if (!includeInactive && isAuthenticated) {
      // Authenticated admin: show all
    } else {
      query.status = 'active';
    }

    if (status) {
      query.status = status;
    }

    if (featured === 'true') {
      query.featuredOffer = true;
    }

    if (search) {
      query.$or = [
        { offerName: { $regex: search, $options: 'i' } },
        { offerTitle: { $regex: search, $options: 'i' } },
      ];
    }

    const currentDate = new Date();

    const [offers, totalCount] = await Promise.all([
      (async () => {
        const finder = DiscountOffer.find(query).sort({ priority: -1, createdAt: -1 });
        if (!isAll) {
          finder.skip(skip).limit(limit);
        }
        return finder.lean();
      })(),
      DiscountOffer.countDocuments(query)
    ]);

    // Enrich with category counts
    const enrichedOffers = await Promise.all(offers.map(async (offer) => {
      const currentDate = new Date();
      const isActive = offer.status === 'active' && 
        (!offer.startDate || new Date(offer.startDate) <= currentDate) &&
        (!offer.endDate || new Date(offer.endDate) >= currentDate);

      const categoryCount = await Category.countDocuments({ 
        discountOfferId: offer._id 
      });

      const productCount = await Item.countDocuments({
        category: { $in: (await Category.find({ discountOfferId: offer._id }).select('_id')).map(c => c._id) }
      });

      return {
        ...offer,
        _id: offer._id.toString(),
        isActive,
        totalCategoriesAttached: categoryCount,
        totalProducts: productCount
      };
    }));

    const pageSize = isAll ? totalCount : limit;
    const totalPages = isAll ? 1 : Math.ceil(totalCount / limit);

    return NextResponse.json({ 
      success: true, 
      data: enrichedOffers,
      pagination: {
        currentPage: isAll ? 1 : page,
        pageSize,
        totalCount,
        totalPages,
        hasNext: !isAll && page < totalPages,
        hasPrev: !isAll && page > 1
      }
    });
  } catch (error) {
    console.error('Discount Offers GET error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// CREATE discount offer
export async function POST(request) {
  try {
    const auth = await verifyAuth(request);
    if (!auth.authenticated || auth.user?.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const contentType = request.headers.get('content-type') || '';
    
    let offerName = '';
    let offerTitle = '';
    let shortDescription = '';
    let longDescription = '';
    let discountType = 'percentage';
    let discountValue = 0;
    let couponCode = null;
    let bannerImage = null;
    let heroModalImage = null;
    let ctaButtonText = 'Claim Discount';
    let ctaRedirectUrl = '/discount-offers';
    let priority = 0;
    let countdownEnabled = true;
    let popupModalEnabled = false;
    let featuredOffer = false;
    let forceRepeatSession = false;
    let status = 'active';
    let startDate = null;
    let endDate = null;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      offerName = formData.get('offerName') || '';
      offerTitle = formData.get('offerTitle') || '';
      shortDescription = formData.get('shortDescription') || '';
      longDescription = formData.get('longDescription') || '';
      discountType = formData.get('discountType') || 'percentage';
      discountValue = Number(formData.get('discountValue')) || 0;
      couponCode = formData.get('couponCode') || null;
      ctaButtonText = formData.get('ctaButtonText') || 'Claim Discount';
      ctaRedirectUrl = formData.get('ctaRedirectUrl') || '/discount-offers';
      priority = Number(formData.get('priority')) || 0;
      countdownEnabled = formData.get('countdownEnabled') === 'true';
      popupModalEnabled = formData.get('popupModalEnabled') === 'true';
      featuredOffer = formData.get('featuredOffer') === 'true';
      forceRepeatSession = formData.get('forceRepeatSession') === 'true';
      status = formData.get('status') || 'active';
      startDate = formData.get('startDate') || null;
      endDate = formData.get('endDate') || null;
      bannerImage = formData.get('bannerImage');
      heroModalImage = formData.get('heroModalImage');
    } else {
      const body = await request.json();
      offerName = body.offerName || '';
      offerTitle = body.offerTitle || '';
      shortDescription = body.shortDescription || '';
      longDescription = body.longDescription || '';
      discountType = body.discountType || 'percentage';
      discountValue = Number(body.discountValue) || 0;
      couponCode = body.couponCode || null;
      ctaButtonText = body.ctaButtonText || 'Claim Discount';
      ctaRedirectUrl = body.ctaRedirectUrl || '/discount-offers';
      priority = Number(body.priority) || 0;
      countdownEnabled = body.countdownEnabled !== false;
      popupModalEnabled = body.popupModalEnabled || false;
      featuredOffer = body.featuredOffer || false;
      forceRepeatSession = body.forceRepeatSession || false;
      status = body.status || 'active';
      startDate = body.startDate || null;
      endDate = body.endDate || null;
    }

    if (!offerName.trim()) {
      return NextResponse.json(
        { success: false, error: 'Offer name is required' },
        { status: 400 }
      );
    }

    if (!offerTitle.trim()) {
      return NextResponse.json(
        { success: false, error: 'Offer title is required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check for duplicate offer name
    const existingOffer = await DiscountOffer.findOne({ offerName: offerName.trim() });
    if (existingOffer) {
      return NextResponse.json(
        { success: false, error: 'Discount offer with this name already exists' },
        { status: 400 }
      );
    }

    const offerSlug = offerName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    // Upload images if provided
    if (bannerImage && typeof bannerImage.arrayBuffer === 'function' && bannerImage.size > 0) {
      bannerImage = await uploadImage(bannerImage, DISCOUNT_FOLDER);
    } else {
      bannerImage = null;
    }

    if (heroModalImage && typeof heroModalImage.arrayBuffer === 'function' && heroModalImage.size > 0) {
      heroModalImage = await uploadImage(heroModalImage, DISCOUNT_FOLDER);
    } else {
      heroModalImage = null;
    }

    const discountOffer = await DiscountOffer.create({
      offerName: offerName.trim(),
      offerSlug,
      offerTitle: offerTitle.trim(),
      shortDescription: shortDescription.trim() || null,
      longDescription: longDescription.trim() || null,
      discountType,
      discountValue,
      couponCode,
      bannerImage,
      heroModalImage,
      ctaButtonText,
      ctaRedirectUrl,
      priority,
      countdownEnabled,
      popupModalEnabled,
      featuredOffer,
      forceRepeatSession,
      status,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      totalRedemptions: 0,
    });

    return NextResponse.json(
      { success: true, data: discountOffer },
      { status: 201 }
    );
  } catch (error) {
    console.error('Discount Offer POST error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}