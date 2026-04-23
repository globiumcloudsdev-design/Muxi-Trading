import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Category from '@/models/Category';
import Item from '@/models/Item';
import { verifyAuth } from '@/lib/auth';
import mongoose from 'mongoose';
import cloudinary from '@/lib/cloudinary';

const CATEGORIES_FOLDER = 'muxi-trading/categories';

async function uploadCategoryImage(file) {
  const buffer = Buffer.from(await file.arrayBuffer());

  const upload = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: CATEGORIES_FOLDER },
      (err, result) => (err ? reject(err) : resolve(result))
    ).end(buffer);
  });

  return upload.secure_url;
}


// ==================== DELETE CATEGORY ====================
export async function DELETE(request, { params }) {
  try {
    const auth = await verifyAuth(request);
    if (!auth.authenticated || auth.user?.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid category ID' },
        { status: 400 }
      );
    }

  

    await connectDB();

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    // Check if category has associated items
    const itemCount = await Item.countDocuments({ category: id });
    if (itemCount > 0) {
      return NextResponse.json(
        { success: false, error: `Cannot delete category with ${itemCount} associated items` },
        { status: 400 }
      );
    }

    // Delete category
    await Category.findByIdAndDelete(id);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Category deleted successfully' 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Delete category ERROR:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

// ==================== UPDATE CATEGORY ====================
export async function PUT(request, { params }) {
  try {
    console.log('PUT API called');
    
    const auth = await verifyAuth(request);
    if (!auth.authenticated || auth.user?.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const contentType = request.headers.get('content-type') || '';

    let name;
    let description;
    let isActive;
    let imageFile;
    let removeImage = false;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      name = formData.get('name');
      description = formData.get('description');
      isActive = formData.get('isActive') !== 'false';
      imageFile = formData.get('image');
      removeImage = formData.get('removeImage') === 'true';
    } else {
      const body = await request.json();
      name = body?.name;
      description = body?.description;
      isActive = body?.isActive;
      imageFile = null;
      removeImage = body?.removeImage === true;
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    await connectDB();

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    const updateData = {};
    
    if (name && name.trim() !== category.name) {
      if (!name.trim()) {
        return NextResponse.json(
          { success: false, error: 'Name cannot be empty' },
          { status: 400 }
        );
      }
      
      const duplicateCategory = await Category.findOne({ 
        name: name.trim(), 
        _id: { $ne: id } 
      });
      
      if (duplicateCategory) {
        return NextResponse.json(
          { success: false, error: 'Category name already exists' },
          { status: 400 }
        );
      }
      
      updateData.name = name.trim();
      updateData.slug = name.trim().toLowerCase().replace(/ /g, '-');
    }
    
    if (description !== undefined) updateData.description = description;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (removeImage) updateData.image = null;

    if (imageFile && typeof imageFile.arrayBuffer === 'function' && imageFile.size > 0) {
      updateData.image = await uploadCategoryImage(imageFile);
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return NextResponse.json(
      { 
        success: true, 
        data: updatedCategory,
        message: 'Category updated successfully'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update category error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// ==================== GET SINGLE CATEGORY ====================
export async function GET(request, { params }) {
  try {
    const auth = await verifyAuth(request);
    if (!auth.authenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    await connectDB();

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: category },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get category error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}