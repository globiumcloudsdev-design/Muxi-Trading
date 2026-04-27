# Discount Offer Fixes - TODO

## Plan
- [ ] Step 1: Fix `src/models/DiscountOffer.js` - Add offerSlug, lowercase description, clean indexes
- [ ] Step 2: Fix `src/components/modals/DiscountOfferModal.js` - Match model fields, add discountType & forceRepeatSession
- [ ] Step 3: Fix `src/app/admin/discount-offers/page.js` - JSON payload, remove non-existent field references
- [ ] Step 4: Fix `src/app/api/admin/discount-offers/route.js` (POST) - Match model fields, generate offerSlug
- [ ] Step 5: Fix `src/app/api/admin/discount-offers/[id]/route.js` (PUT) - Match model fields, regenerate offerSlug
- [ ] Step 6: Fix `src/components/common/DiscountModal.js` - Graceful fallbacks for removed fields
- [ ] Step 7: Fix `src/app/api/website/discount-offers/route.js` - Remove undefined couponCode reference

## Completed

