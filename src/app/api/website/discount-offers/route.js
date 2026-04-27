import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Category from '@/models/Category';
import Item from '@/models/Item';
import DiscountOffer from '@/models/DiscountOffer';

export async function GET(request) {
  try {
    await connectDB();

    const currentDate = new Date();
    
    // Find all active categories with an active discount offer attached
    const categories = await Category.find({
      isActive: true,
      discountOfferId: { $ne: null }
    }).populate('discountOfferId').lean();

    // Filter by active discount offers (status + date range)
    const validDiscountedCategories = [];
    const categoryDiscountMap = {};
    
    for (const cat of categories) {
      const offer = cat.discountOfferId;
      if (!offer || offer.status !== 'active') continue;
      
      const isWithinDateRange = 
        (!offer.startDate || new Date(offer.startDate) <= currentDate) &&
        (!offer.endDate || new Date(offer.endDate) >= currentDate);
      
      if (isWithinDateRange) {
        const catCopy = { ...cat };
        catCopy.discountOffer = offer;
        validDiscountedCategories.push(catCopy);
        categoryDiscountMap[cat._id.toString()] = offer;
      }
    }

    if (!validDiscountedCategories.length) {
      return NextResponse.json({ success: true, data: { categories: [], products: [] } });
    }

    const categoryIds = validDiscountedCategories.map(c => c._id);

    const products = await Item.find({
      isActive: true,
      category: { $in: categoryIds }
    }).lean();

    // Apply discount logic to products
    const discountedProducts = products.map(product => {
      const offer = categoryDiscountMap[product.category.toString()];
      if (!offer) return null;
      
      let discountedPrice = product.price;
      let discountAmount = 0;
      
      if (offer.discountType === 'percentage') {
        discountAmount = (product.price * offer.discountValue) / 100;
        discountedPrice = product.price - discountAmount;
      } else if (offer.discountType === 'fixed') {
        discountAmount = offer.discountValue;
        discountedPrice = Math.max(0, product.price - discountAmount);
      }

      return {
        ...product,
        _id: product._id.toString(),
        category: product.category.toString(),
        originalPrice: product.price,
        price: discountedPrice,
        discountApplied: {
          type: offer.discountType,
          value: offer.discountValue,
          offerName: offer.offerTitle,
          endDate: offer.endDate,
          couponCode: offer.couponCode
        }
      };
    }).filter(Boolean);

    return NextResponse.json({ 
      success: true, 
      data: {
        categories: validDiscountedCategories.map(c => ({
          ...c,
          _id: c._id.toString(),
          discountOffer: undefined
        })),
        products: discountedProducts
      } 
    });
  } catch (error) {
    console.error('Discount Offers API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch discount offers' },
      { status: 500 }
    );
  }
}
