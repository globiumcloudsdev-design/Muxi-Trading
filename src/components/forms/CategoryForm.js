'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ImagePlus, X } from 'lucide-react';

export default function CategoryForm({ category, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    slug: category?.slug || '',
    description: category?.description || '',
    isActive: category?.isActive !== false, // default true
    removeImage: false,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(category?.image || '/Muxi Trading Logo.png');

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setFormData((prev) => ({ ...prev, removeImage: false }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      image: imageFile,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Category Name *</Label>
        <Input
          id="name"
          placeholder="Enter category name"
          value={formData.name}
          onChange={(e) => {
            const newName = e.target.value;
            const newSlug = newName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            setFormData({ ...formData, name: newName, slug: newSlug });
          }}
          required
        />

      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter category description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Category Image</Label>
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
            <img
              src={imagePreview}
              alt="Category preview"
              className="h-full w-full object-contain p-1"
            />
            {(imageFile || category?.image) && (
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setImagePreview('/Muxi Trading Logo.png');
                  setFormData((prev) => ({ ...prev, removeImage: true }));
                }}
                className="absolute right-0 top-0 rounded-full bg-red-500 p-0.5 text-white hover:bg-red-600"
                aria-label="Remove image"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-gray-300 px-3 py-2 text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600">
            <ImagePlus className="h-4 w-4" />
            Upload image
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
        <p className="text-xs text-gray-500">If no image is uploaded, the MUXI logo will appear as fallback on website cards.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug *</Label>
        <Input
          id="slug"
          placeholder="Auto-generated from name"
          value={formData.slug}
          readOnly
          className="bg-muted/50"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            id="isActive"
            checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            className="rounded border-gray-300"
          />
          <span>Active Category</span>
        </Label>
      </div>
      
      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          {category ? 'Update Category' : 'Create Category'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
}