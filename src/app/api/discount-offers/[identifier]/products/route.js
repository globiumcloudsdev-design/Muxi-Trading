import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import DiscountOffer from '@/models/DiscountOffer';
import Category from '@/models/Category';
import Item from '@/models/Item';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { identifier } = await params;

    const discountOffer = await DiscountOffer.findOne({
      $or: [
        { offerSlug: identifier },
        { _id: identifier },
      ],
    }).lean();

    if (!discountOffer) {
      return NextResponse.json(
        { success: false, error: 'Discount offer not found' },
        { status: 404 }
      );
    }

    const currentDate = new Date();
    const isActive =
      discountOffer.status === 'active' &&
      (!discountOffer.startDate || new Date(discountOffer.startDate) <= currentDate) &&
      (!discountOffer.endDate || new Date(discountOffer.endDate) >= currentDate);

    if (!isActive) {
      return NextResponse.json(
        { success: false, error: 'Discount offer is not active or has expired' },
        { status: 400 }
      );
    }

    const categories = await Category.find({
      discountOfferId: discountOffer._id,
      isActive: true,
    }).lean();

    const categoryIds = categories.map((c) => c._id);

    const products = await Item.find({
      isActive: true,
      category: { $in: categoryIds },
    }).lean();

    // Apply discount logic
    const discountedProducts = products.map((product) => {
      let discountedPrice = product.price;
      let discountAmount = 0;

      if (discountOffer.discountType === 'percentage') {
        discountAmount = (product.price * discountOffer.discountValue) / 100;
        discountedPrice = product.price - discountAmount;
      } else if (discountOffer.discountType === 'fixed') {
        discountAmount = discountOffer.discountValue;
        discountedPrice = Math.max(0, product.price - discountAmount);
      }

      return {
        ...product,
        _id: product._id.toString(),
        category: product.category.toString(),
        originalPrice: product.price,
        price: discountedPrice,
        discountApplied: {
          type: discountOffer.discountType,
          value: discountOffer.discountValue,
          offerName: discountOffer.offerTitle,
          endDate: discountOffer.endDate,
          couponCode: discountOffer.couponCode,
        },
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        offer: {
          ...discountOffer,
          _id: discountOffer._id.toString(),
        },
        categories: categories.map((c) => ({
          ...c,
          _id: c._id.toString(),
        })),
        products: discountedProducts,
      },
    });
  } catch (error) {
    console.error('Discount offer products GET error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

