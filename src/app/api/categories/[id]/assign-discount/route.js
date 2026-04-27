import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Category from '@/models/Category';
import DiscountOffer from '@/models/DiscountOffer';
import { verifyAuth } from '@/lib/auth';
import mongoose from 'mongoose';

// PATCH /api/categories/[id]/assign-discount
// Assign or unassign a discount offer to a category
export async function PATCH(request, { params }) {
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
    const body = await request.json();
    const { discountOfferId } = body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    // If discountOfferId is null/falsy, remove discount assignment
    if (!discountOfferId) {
      category.discountOfferId = null;
      await category.save();
      return NextResponse.json(
        { success: true, data: category, message: 'Discount removed from category' },
        { status: 200 }
      );
    }

    // Verify the discount offer exists and is active
    if (!mongoose.Types.ObjectId.isValid(discountOfferId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid discount offer ID' },
        { status: 400 }
      );
    }

    const discountOffer = await DiscountOffer.findById(discountOfferId);
    if (!discountOffer) {
      return NextResponse.json(
        { success: false, error: 'Discount offer not found' },
        { status: 404 }
      );
    }

    if (discountOffer.status !== 'active') {
      return NextResponse.json(
        { success: false, error: 'Cannot assign: Discount offer is not active' },
        { status: 400 }
      );
    }

    category.discountOfferId = discountOfferId;
    await category.save();

    return NextResponse.json(
      { success: true, data: category, message: 'Discount offer assigned to category' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Assign discount error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
