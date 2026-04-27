import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import DiscountOffer from '@/models/DiscountOffer';
import Category from '@/models/Category';

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

    const categories = await Category.find({
      discountOfferId: discountOffer._id,
      isActive: true,
    }).lean();

    return NextResponse.json({
      success: true,
      data: {
        ...discountOffer,
        _id: discountOffer._id.toString(),
        isActive,
        categories: categories.map((c) => ({
          ...c,
          _id: c._id.toString(),
        })),
      },
    });
  } catch (error) {
    console.error('Discount offer by slug GET error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

