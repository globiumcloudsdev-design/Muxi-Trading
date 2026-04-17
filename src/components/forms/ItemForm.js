'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImagePlus, X, Upload } from 'lucide-react';

export default function ItemForm({ item, categories, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    productCode: item?.productCode || '',
    category: item?.category?._id || item?.category || '',
    brand: item?.brand || '',
    price: item?.price || '',
    stock: item?.stock || '',
    packSize: item?.packSize || '',
    description: item?.description || '',
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(item?.thumbnail || null);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState(item?.images || []);
  const [loading, setLoading] = useState(false);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
    
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value);
    });
    
    if (thumbnail) formDataToSend.append('thumbnail', thumbnail);
    images.forEach(img => formDataToSend.append('images', img));
    
    await onSubmit(formDataToSend);
    setLoading(false);
  };

  return (
    <div className="max-h-[70vh] overflow-y-auto pr-2">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Information Section */}
        <div className="space-y-3">
          <h3 className="text-md font-semibold text-gray-800 border-b pb-1">Basic Information</h3>
          
          {/* Product Name */}
          <div className="space-y-1">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Product Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full"
            />
          </div>

          {/* Product Code */}
          <div className="space-y-1">
            <Label htmlFor="productCode" className="text-sm font-medium text-gray-700">
              Product Code <span className="text-red-500">*</span>
            </Label>
            <Input
              id="productCode"
              placeholder="Enter unique product code"
              value={formData.productCode}
              onChange={(e) => setFormData({ ...formData, productCode: e.target.value })}
              required
              className="w-full"
            />
            <p className="text-xs text-gray-500">Unique identifier for this product (e.g., MX-001)</p>
          </div>

          {/* Category Selection */}
          <div className="space-y-1">
            <Label htmlFor="category" className="text-sm font-medium text-gray-700">
              Category <span className="text-red-500">*</span>
            </Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="brand" className="text-sm font-medium text-gray-700">
              Brand
            </Label>
            <Input
              id="brand"
              placeholder="Enter brand name"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="w-full"
            />
          </div>
        </div>

        {/* Pricing & Stock Section */}
        <div className="space-y-3">
          <h3 className="text-md font-semibold text-gray-800 border-b pb-1">Pricing & Stock</h3>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Price */}
            <div className="space-y-1">
              <Label htmlFor="price" className="text-sm font-medium text-gray-700">
                Price (₹) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                className="w-full"
              />
            </div>

            {/* Stock */}
            <div className="space-y-1">
              <Label htmlFor="stock" className="text-sm font-medium text-gray-700">
                Stock Quantity <span className="text-red-500">*</span>
              </Label>
              <Input
                id="stock"
                type="number"
                placeholder="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Pack Size */}
        <div className="space-y-1">
          <Label htmlFor="packSize" className="text-sm font-medium text-gray-700">
            Pack Size
          </Label>
          <Input
            id="packSize"
            placeholder="e.g. 750 g x 12 jars"
            value={formData.packSize}
            onChange={(e) => setFormData({ ...formData, packSize: e.target.value })}
            className="w-full"
          />
        </div>

        {/* Description Section */}
        <div className="space-y-3">
          <h3 className="text-md font-semibold text-gray-800 border-b pb-1">Description</h3>
          
          <div className="space-y-1">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Product Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter detailed product description..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full resize-none"
            />
          </div>
        </div>

        {/* Images Section */}
        <div className="space-y-3">
          <h3 className="text-md font-semibold text-gray-800 border-b pb-1">Product Images</h3>
          
          {/* Thumbnail Upload */}
          <div className="space-y-1">
            <Label className="text-sm font-medium text-gray-700">Thumbnail Image</Label>
            <div className="flex items-center gap-3">
              {thumbnailPreview ? (
                <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                  <img src={thumbnailPreview} alt="Thumbnail" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setThumbnail(null);
                      setThumbnailPreview(null);
                    }}
                    className="absolute top-0 right-0 p-0.5 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <ImagePlus className="h-5 w-5 text-gray-400" />
                  <span className="text-xs text-gray-500">Upload</span>
                  <input type="file" accept="image/*" onChange={handleThumbnailChange} className="hidden" />
                </label>
              )}
              <p className="text-xs text-gray-500">Square image, 300x300px recommended</p>
            </div>
          </div>

          {/* Multiple Images Upload */}
          <div className="space-y-1">
            <Label className="text-sm font-medium text-gray-700">Additional Images</Label>
            <div className="flex flex-wrap gap-2">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                  <img src={preview} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 p-0.5 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <label className="flex flex-col items-center justify-center w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                <Upload className="h-5 w-5 text-gray-400" />
                <span className="text-xs text-gray-500">Add</span>
                <input type="file" accept="image/*" multiple onChange={handleImagesChange} className="hidden" />
              </label>
            </div>
            <p className="text-xs text-gray-500">Select multiple images (JPG, PNG, WEBP)</p>
          </div>
        </div>

        {/* Form Actions - Sticky at bottom */}
        <div className="flex gap-3 pt-3 border-t sticky bottom-0 bg-white py-3 mt-2">
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? 'Saving...' : (item ? 'Update Item' : 'Create Item')}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
