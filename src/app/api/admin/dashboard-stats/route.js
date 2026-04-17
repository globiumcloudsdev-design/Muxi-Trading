import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import Category from '@/models/Category';
import Item from '@/models/Item';

export async function GET(request) {
  try {
    const auth = await verifyAuth(request);
    if (!auth.authenticated || auth.user?.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const [totalCategories, totalItems, totalStock, valueResult] = await Promise.all([
      Category.countDocuments(),
      Item.countDocuments(),
      Item.aggregate([
        { $group: { _id: null, total: { $sum: '$stock' } } },
      ]),
      Item.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: { $multiply: ['$stock', '$price'] } },
          },
        },
      ]),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalCategories,
        totalItems,
        totalStock: totalStock[0]?.total || 0,
        totalValue: valueResult[0]?.total || 0,
      },
    });
  } catch (error) {
    console.error('Dashboard stats GET error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
