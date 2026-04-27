import mongoose from 'mongoose';

const discountOfferSchema = new mongoose.Schema(
  {
    offerName: {
      type: String,
      required: true,
      trim: true,
    },
    offerSlug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    offerTitle: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: null,
    },

    discountType: {
      type: String,
      enum: ['percentage', 'fixed'],
      default: 'percentage',
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    forceRepeatSession: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

discountOfferSchema.index({ offerSlug: 1 }, { unique: true });
discountOfferSchema.index({ status: 1, startDate: 1, endDate: 1 });

export default mongoose.models.DiscountOffer || mongoose.model('DiscountOffer', discountOfferSchema);
