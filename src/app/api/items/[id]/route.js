import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
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

export async function GET(request, { params }) {
  try {
    const auth = await verifyAuth(request);
    if (!auth.authenticated) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid item ID' }, { status: 400 });
    }

    await connectDB();

    const item = await Item.findById(id).populate('category');
    if (!item) {
      return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const auth = await verifyAuth(request);
    if (!auth.authenticated || auth.user?.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid item ID' }, { status: 400 });
    }

    await connectDB();

    const existingItem = await Item.findById(id);
    if (!existingItem) {
      return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 });
    }

    const formData = await request.formData();
    const name = formData.get('name');
    const productCode = formData.get('productCode');
    const category = formData.get('category');
    const price = formData.get('price');
    const stock = formData.get('stock');
    const packSize = formData.get('packSize');
    const brand = formData.get('brand');
    const description = formData.get('description');
    const isActive = formData.get('isActive');
    const thumbnailFile = formData.get('thumbnail');
    const imagesFiles = formData.getAll('images').filter(Boolean);

    const updateData = {
      name: name || existingItem.name,
      productCode: productCode || existingItem.productCode,
      category: category || existingItem.category,
      price: price !== null && price !== '' ? Number(price) : existingItem.price,
      stock: stock !== null && stock !== '' ? Number(stock) : existingItem.stock,
      packSize: packSize !== null ? packSize : existingItem.packSize,
      brand: brand !== null ? brand : existingItem.brand,
      description: description !== null ? description : existingItem.description,
      isActive: isActive !== null ? isActive === 'true' : existingItem.isActive,
    };

    if (thumbnailFile && typeof thumbnailFile.arrayBuffer === 'function') {
      const [uploadedThumbnail] = await uploadFiles([thumbnailFile], 'items/thumbnail');
      updateData.thumbnail = uploadedThumbnail;
    }

    if (imagesFiles.length > 0) {
      updateData.images = await uploadFiles(imagesFiles, 'items/gallery');
    }

    const updatedItem = await Item.findByIdAndUpdate(id, updateData, { new: true }).populate('category');

    return NextResponse.json({ success: true, data: updatedItem });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const auth = await verifyAuth(request);
    if (!auth.authenticated || auth.user?.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid item ID' }, { status: 400 });
    }

    await connectDB();

    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: deletedItem });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 });
  }
}
