import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

// Cloudinary folder for storing items images
export const ITEMS_FOLDER = 'muxi-trading/items';

export const uploadImage = async (file, folder = ITEMS_FOLDER) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: folder,
      resource_type: 'auto',
      transformation: [
        { quality: 'auto:good' },
        { fetch_format: 'auto' },
      ],
    });

    console.log(`Cloudinary upload success: ${result.public_id}`);
    return {
      public_id: result.public_id,
      url: result.secure_url,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error.message);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
};

export const deleteImage = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id, { invalidate: true });

    if (result.result === 'ok') {
      console.log(`Cloudinary delete success for public_id: ${public_id}`);
      return { success: true, message: 'Image deleted successfully', public_id };
    } else {
      console.warn(`Cloudinary delete failed for public_id: ${public_id}, result: ${result.result}`);
      return { success: false, message: `Delete failed: ${result.result}`, public_id };
    }

  } catch (error) {
    console.error('Cloudinary delete error:', error.message);
    throw new Error(`Failed to delete image: ${error.message}`);
  }
};