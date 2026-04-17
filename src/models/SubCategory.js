import mongoose from 'mongoose';

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

subCategorySchema.index({ name: 1, categoryId: 1 }, { unique: true });

export default mongoose.models.SubCategory || mongoose.model('SubCategory', subCategorySchema);
