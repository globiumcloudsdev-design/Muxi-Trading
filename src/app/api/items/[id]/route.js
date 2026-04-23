import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/db';
import Item from '@/models/Item';
import cloudinary, { ITEMS_FOLDER, deleteImage } from '@/lib/cloudinary';
import { verifyAuth } from '@/lib/auth';

async function uploadFile(file, folder) {
  const buffer = Buffer.from(await file.arrayBuffer());

  const upload = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder },
      (err, result) => (err ? reject(err) : resolve(result))
    ).end(buffer);
  });

  console.log(`Cloudinary upload success: ${upload.public_id}`);

  return {
    public_id: upload.public_id,
    url: upload.secure_url,
  };
}

async function uploadFiles(files, folder) {
  // Upload all files in parallel for better performance
  const uploadPromises = files.map(file => uploadFile(file, folder));
  return Promise.all(uploadPromises);
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
    const removedImagesStr = formData.get('removedImages');
    const removedImages = removedImagesStr ? JSON.parse(removedImagesStr) : [];

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
      // Delete old thumbnail from Cloudinary
      if (existingItem.thumbnail?.public_id) {
        await deleteImage(existingItem.thumbnail.public_id);
      }
      const [uploadedThumbnail] = await uploadFiles([thumbnailFile], ITEMS_FOLDER);
      updateData.thumbnail = uploadedThumbnail;
    }

    // Handle image deletion - delete all specified images in parallel
    if (removedImages.length > 0) {
      await Promise.all(removedImages.map(publicId => deleteImage(publicId)));
    }

    // Handle image uploads
    if (imagesFiles.length > 0) {
      const newImages = await uploadFiles(imagesFiles, ITEMS_FOLDER);
      
      // Keep existing images that weren't removed, and add new images
      const remainingExistingImages = existingItem.images.filter(
        img => !removedImages.includes(img.public_id)
      );
      updateData.images = [...remainingExistingImages, ...newImages];
    } else if (removedImages.length > 0) {
      // If only removing images without adding new ones, update the images array
      updateData.images = existingItem.images.filter(
        img => !removedImages.includes(img.public_id)
      );
    }

    const updatedItem = await Item.findByIdAndUpdate(id, updateData, { returnDocument: 'after' }).populate('category');

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

    const itemToDelete = await Item.findById(id);
    if (!itemToDelete) {
      return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 });
    }

    // Delete thumbnail from Cloudinary
    if (itemToDelete.thumbnail?.public_id) {
      await deleteImage(itemToDelete.thumbnail.public_id);
    }

    // Delete gallery images from Cloudinary
    if (itemToDelete.images && itemToDelete.images.length > 0) {
      for (const image of itemToDelete.images) {
        if (image.public_id) {
          await deleteImage(image.public_id);
        }
      }
    }

    const deletedItem = await Item.findByIdAndDelete(id);

    return NextResponse.json({ success: true, data: deletedItem });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 });
  }
}
