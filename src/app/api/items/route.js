import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Item from '@/models/Item';
import cloudinary from '@/lib/cloudinary';
import { verifyAuth } from '@/lib/auth';

async function uploadFiles(files, folder) {
  const uploads = [];

  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());

    const upload = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder },
        (err, result) => (err ? reject(err) : resolve(result))
      ).end(buffer);
    });

    uploads.push({
      public_id: upload.public_id,
      url: upload.secure_url,
    });
  }

  return uploads;
}

// GET ALL ITEMS
export async function GET(request) {
  try {
    const auth = await verifyAuth(request);
    if (!auth.authenticated) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page'), 10) || 1;
    const limitParam = searchParams.get('limit') || '12';
    const isAll = limitParam === 'all';
    const limit = isAll ? null : (parseInt(limitParam, 10) || 12);
    const skip = isAll ? 0 : (page - 1) * limit;

    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { productCode: { $regex: search, $options: 'i' } },
      ];
    }
    if (category) {
      query.category = category;
    }

    const [items, totalCount] = await Promise.all([
      (async () => {
        const finder = Item.find(query).populate('category').sort({ createdAt: -1 });
        if (!isAll) {
          finder.skip(skip).limit(limit);
        }
        return finder.lean();
      })(),
      Item.countDocuments(query)
    ]);

    const pageSize = isAll ? totalCount : limit;
    const totalPages = isAll ? 1 : Math.ceil(totalCount / limit);

    return NextResponse.json({ 
      success: true, 
      data: items,
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
    return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 });
  }
}

// CREATE ITEM
export async function POST(req) {
  try {
    const auth = await verifyAuth(req);
    if (!auth.authenticated || auth.user?.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const formData = await req.formData();

    const name = formData.get('name');
    const productCode = formData.get('productCode');
    const category = formData.get('category');
    const price = formData.get('price');
    const stock = formData.get('stock');
    const packSize = formData.get('packSize');
    const brand = formData.get('brand');
    const description = formData.get('description');

    const thumbnailFile = formData.get('thumbnail');
    const imagesFiles = formData.getAll('images');

    // Upload thumbnail
    let thumbnail = {};
    if (thumbnailFile) {
      const [uploadedThumbnail] = await uploadFiles([thumbnailFile], 'items/thumbnail');
      thumbnail = uploadedThumbnail;
    }

    // Upload images
    const images = await uploadFiles(imagesFiles.filter(Boolean), 'items/gallery');

    const item = await Item.create({
      name,
      productCode,
      category,
      price,
      stock,
      packSize,
      brand,
      description,
      thumbnail,
      images,
    });

    return NextResponse.json({ success: true, data: item });

  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}