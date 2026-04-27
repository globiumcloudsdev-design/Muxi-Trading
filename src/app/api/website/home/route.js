import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Category from '@/models/Category';
import Item from '@/models/Item';
import DiscountOffer from '@/models/DiscountOffer';

export async function GET() {
  try {
    await connectDB();

    const [categories, items, brands] = await Promise.all([
      Category.find({ isActive: true }).sort({ updatedAt: -1 }),
      Item.find({ isActive: true }).populate('category').sort({ createdAt: -1 }),
      Item.distinct('brand', { isActive: true, brand: { $exists: true, $ne: '' } }),
    ]);

    // Build category discount map
    const currentDate = new Date();
    const categoryDiscountMap = {};
    const discountOfferIds = categories.map((c) => c.discountOfferId).filter(Boolean);
    const uniqueOfferIds = [...new Set(discountOfferIds.map((id) => id.toString()))];

    if (uniqueOfferIds.length > 0) {
      const offers = await DiscountOffer.find({
        _id: { $in: uniqueOfferIds },
        status: 'active',
      }).lean();

      for (const offer of offers) {
        const isWithinDateRange =
          (!offer.startDate || new Date(offer.startDate) <= currentDate) &&
          (!offer.endDate || new Date(offer.endDate) >= currentDate);
        if (isWithinDateRange) {
          for (const cat of categories) {
            if (cat.discountOfferId?.toString() === offer._id.toString()) {
              categoryDiscountMap[cat._id.toString()] = offer;
            }
          }
        }
      }
    }

    const products = items.map((item) => {
      const offer = categoryDiscountMap[item.category?._id?.toString()];
      let discountedPrice = item.price;
      let originalPrice = item.price;
      let discountApplied = null;

      if (offer) {
        originalPrice = item.price;
        if (offer.discountType === 'percentage') {
          discountedPrice = item.price - (item.price * offer.discountValue) / 100;
        } else if (offer.discountType === 'fixed') {
          discountedPrice = Math.max(0, item.price - offer.discountValue);
        }
        discountApplied = {
          type: offer.discountType,
          value: offer.discountValue,
          offerName: offer.offerTitle,
          endDate: offer.endDate,
          couponCode: offer.couponCode,
        };
      }

      return {
        _id: item._id,
        code: item.productCode,
        name: item.name,
        categorySlug: item.category?.slug || '',
        categoryName: item.category?.name || '',
        packSize: item.packSize || `${item.stock || 0} units`,
        price: discountedPrice,
        originalPrice,
        showPrice: item.showPrice === false ? false : true,
        image: item.thumbnail?.url || item.images?.[0]?.url || null,
        description: item.description || '',
        discountApplied,
      };
    });

    return NextResponse.json({
      success: true,
      data: { categories, products, brands },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
