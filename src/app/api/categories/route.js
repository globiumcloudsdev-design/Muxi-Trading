import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Category from '@/models/Category';
import { verifyAuth } from '@/lib/auth';

export async function GET(request) {
  try {
    const auth = await verifyAuth(request);
    const isAuthenticated = auth?.authenticated;

    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const includeInactive = searchParams.get('includeInactive') === 'true';
    const page = parseInt(searchParams.get('page'), 10) || 1;
    const limitParam = searchParams.get('limit') || '12';
    const isAll = limitParam === 'all';
    const limit = isAll ? null : (parseInt(limitParam, 10) || 12);
    const skip = isAll ? 0 : (page - 1) * limit;

    let query = includeInactive && isAuthenticated ? {} : { isActive: true };
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const [categories, totalCount] = await Promise.all([
      (async () => {
        const finder = Category.find(query).sort({ createdAt: -1 });
        if (!isAll) {
          finder.skip(skip).limit(limit);
        }
        return finder.lean();
      })(),
      Category.countDocuments(query)
    ]);

    const pageSize = isAll ? totalCount : limit;
    const totalPages = isAll ? 1 : Math.ceil(totalCount / limit);

    return NextResponse.json({ 
      success: true, 
      data: categories,
      pagination: {
        currentPage: isAll ? 1 : page,
        pageSize,
        totalCount,
        totalPages,
        hasNext: !isAll && page < totalPages,
        hasPrev: !isAll && page > 1
      }
    });
  } catch (error) {
    console.error('Categories GET error:', error);
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
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, description, isActive } = body;

    if (!name || name.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Category name is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const existingCategory = await Category.findOne({ name: name.trim() });
    if (existingCategory) {
      return NextResponse.json(
        { success: false, error: 'Category already exists' },
        { status: 400 }
      );
    }

    const slug = name.toLowerCase().trim().replace(/ /g, '-');

    const category = await Category.create({
      name: name.trim(),
      slug,
      description: description || null,
      isActive: isActive !== undefined ? isActive : true,
    });

    return NextResponse.json(
      { success: true, data: category },
      { status: 201 }
    );
  } catch (error) {
    console.error('Categories POST error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}