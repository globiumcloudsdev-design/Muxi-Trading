import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Category from '@/models/Category';
import Item from '@/models/Item';
import { verifyAuth } from '@/lib/auth';

function slugify(value = '') {
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function POST(request) {
  try {
    const auth = await verifyAuth(request);
    if (!auth.authenticated || auth.user?.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const categoriesInput = Array.isArray(body?.categories) ? body.categories : [];
    const productsInput = Array.isArray(body?.products) ? body.products : [];

    if (categoriesInput.length === 0 && productsInput.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Send categories[] or products[] in request body' },
        { status: 400 }
      );
    }

    await connectDB();

    const categoryIdBySlug = new Map();
    let categoriesCreatedOrUpdated = 0;

    for (const category of categoriesInput) {
      const name = category?.name?.trim();
      if (!name) continue;

      const slug = slugify(category.slug || name);

      const updated = await Category.findOneAndUpdate(
        { slug },
        {
          $set: {
            name,
            slug,
            description: category.description || null,
            image: category.image || null,
            isActive: category.isActive !== false,
          },
        },
        { upsert: true, new: true }
      );

      categoryIdBySlug.set(slug, updated._id);
      categoriesCreatedOrUpdated += 1;
    }

    if (productsInput.length > 0) {
      const allCategories = await Category.find({}, '_id slug');
      for (const category of allCategories) {
        categoryIdBySlug.set(category.slug, category._id);
      }
    }

    let productsCreatedOrUpdated = 0;

    for (const product of productsInput) {
      const code = product?.code?.trim();
      const name = product?.name?.trim();
      const categorySlug = slugify(product?.categorySlug || '');

      if (!code || !name || !categorySlug) continue;

      const categoryId = categoryIdBySlug.get(categorySlug);
      if (!categoryId) continue;

      await Item.findOneAndUpdate(
        { productCode: code },
        {
          $set: {
            productCode: code,
            name,
            category: categoryId,
            packSize: product.packSize || null,
            brand: product.brand || null,
            description: product.description || null,
            price: Number(product.price || 0),
            stock: Number(product.stock || 0),
            isActive: product.isActive !== false,
            thumbnail: product.image
              ? {
                  public_id: null,
                  url: product.image,
                }
              : undefined,
          },
        },
        { upsert: true, new: true }
      );

      productsCreatedOrUpdated += 1;
    }

    return NextResponse.json({
      success: true,
      message: 'Catalog import completed',
      data: {
        categoriesCreatedOrUpdated,
        productsCreatedOrUpdated,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
