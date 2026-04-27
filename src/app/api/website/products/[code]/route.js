import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Item from '@/models/Item';
import DiscountOffer from '@/models/DiscountOffer';

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { code } = await params;

    const item = await Item.findOne({
      productCode: { $regex: `^${code}$`, $options: 'i' },
      isActive: true,
    }).populate('category', 'name slug discountOfferId');

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    let discountedPrice = item.price;
    let originalPrice = item.price;
    let discountApplied = null;

    // Check if category has an active discount offer
    if (item.category?.discountOfferId) {
      const discountOffer = await DiscountOffer.findById(item.category.discountOfferId).lean();
      if (discountOffer && discountOffer.status === 'active') {
        const currentDate = new Date();
        const isWithinDateRange =
          (!discountOffer.startDate || new Date(discountOffer.startDate) <= currentDate) &&
          (!discountOffer.endDate || new Date(discountOffer.endDate) >= currentDate);

        if (isWithinDateRange) {
          originalPrice = item.price;
          if (discountOffer.discountType === 'percentage') {
            discountedPrice = item.price - (item.price * discountOffer.discountValue) / 100;
          } else if (discountOffer.discountType === 'fixed') {
            discountedPrice = Math.max(0, item.price - discountOffer.discountValue);
          }
          discountApplied = {
            type: discountOffer.discountType,
            value: discountOffer.discountValue,
            offerName: discountOffer.offerTitle,
            endDate: discountOffer.endDate,
            couponCode: discountOffer.couponCode,
          };
        }
      }
    }

    const data = {
      _id: item._id,
      code: item.productCode,
      name: item.name,
      brand: item.brand || null,
      categorySlug: item.category?.slug,
      categoryName: item.category?.name,
      packSize: item.packSize || `${item.stock || 0} units`,
      price: discountedPrice,
      originalPrice,
      showPrice: item.showPrice === false ? false : true,
      image: item.thumbnail?.url || item.images?.[0]?.url || null,
      gallery: [item.thumbnail?.url, ...(item.images || []).map((img) => img.url)].filter(Boolean),
      description: item.description || '',
      discountApplied,
    };

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Website product detail GET error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
