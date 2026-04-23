import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Category from '@/models/Category';
import Item from '@/models/Item';

export async function GET() {
  try {
    await connectDB();

    const [categories, items, brands] = await Promise.all([
      Category.find({ isActive: true }).sort({ createdAt: -1 }),
      Item.find({ isActive: true }).populate('category').sort({ createdAt: -1 }),
      Item.distinct('brand', { isActive: true, brand: { $exists: true, $ne: '' } }),
    ]);

    const products = items.map((item) => ({
      _id: item._id,
      code: item.productCode,
      name: item.name,
      categorySlug: item.category?.slug || '',
      categoryName: item.category?.name || '',
      packSize: item.packSize || `${item.stock || 0} units`,
      image: item.thumbnail?.url || item.images?.[0]?.url || null,
      description: item.description || '',
    }));

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
