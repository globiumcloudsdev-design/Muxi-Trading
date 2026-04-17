import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Category from '@/models/Category';
import SubCategory from '@/models/SubCategory';
import { verifyAuth } from '@/lib/auth';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const categoryId = searchParams.get('categoryId');

    let query = {};
    if (categoryId) {
      query.categoryId = categoryId;
    } else if (slug) {
      const category = await Category.findOne({ slug });
      if (!category) {
        return NextResponse.json({ success: true, data: [] });
      }
      query.categoryId = category._id;
    }

    const subcategories = await SubCategory.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: subcategories.map((item) => item.name) });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const auth = await verifyAuth(request);
    if (!auth.authenticated || auth.user?.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, categoryId } = body;

    if (!name || !categoryId) {
      return NextResponse.json({ success: false, error: 'Name and categoryId are required' }, { status: 400 });
    }

    await connectDB();
    const subcategory = await SubCategory.create({ name: name.trim(), categoryId });
    return NextResponse.json({ success: true, data: subcategory }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
