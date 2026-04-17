import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Item from '@/models/Item';
import Category from '@/models/Category';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.trim();
    const category = searchParams.get('category')?.trim();

    const query = { isActive: true };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { productCode: { $regex: search, $options: 'i' } },
      ];
    }

    if (category) {
      const categoryDoc = await Category.findOne({
        $or: [{ slug: category }, { name: category }],
      }).select('_id');

      if (categoryDoc?._id) {
        query.category = categoryDoc._id;
      }
    }

    const items = await Item.find(query)
      .populate('category', 'name slug')
      .sort({ createdAt: -1 });

    const filtered = category
      ? items.filter((item) => item.category?.slug === category || item.category?.name === category)
      : items;

    const data = filtered.map((item) => ({
      _id: item._id,
      code: item.productCode,
      name: item.name,
      brand: item.brand || null,
      categorySlug: item.category?.slug,
      categoryName: item.category?.name,
      packSize: item.packSize || `${item.stock || 0} units`,
      image: item.thumbnail?.url || item.images?.[0]?.url || null,
      description: item.description || '',
    }));

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Website products GET error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
