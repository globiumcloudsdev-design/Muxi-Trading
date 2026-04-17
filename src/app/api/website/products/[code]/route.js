import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Item from '@/models/Item';

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { code } = await params;

    const item = await Item.findOne({
      productCode: { $regex: `^${code}$`, $options: 'i' },
      isActive: true,
    }).populate('category', 'name slug');

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    const data = {
      _id: item._id,
      code: item.productCode,
      name: item.name,
      brand: item.brand || null,
      categorySlug: item.category?.slug,
      categoryName: item.category?.name,
      packSize: item.packSize || `${item.stock || 0} units`,
      image: item.thumbnail?.url || item.images?.[0]?.url || null,
      gallery: [item.thumbnail?.url, ...(item.images || []).map((img) => img.url)].filter(Boolean),
      description: item.description || '',
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
