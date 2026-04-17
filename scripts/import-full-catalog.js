require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, default: null },
    image: { type: String, default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const itemSchema = new mongoose.Schema(
  {
    productCode: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    description: { type: String, default: null },
    packSize: { type: String, default: null },
    brand: { type: String, default: null },
    thumbnail: {
      public_id: String,
      url: String,
    },
    images: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);

const categoriesToEnsure = [
  {
    name: 'Grocery & Beverages',
    slug: 'grocery-beverages',
    description: 'Staples, packaged foods, beverages and FMCG essentials',
  },
  {
    name: 'Automotive Products',
    slug: 'automotive-products',
    description: 'Lubricants, cleaners and workshop consumables',
  },
  {
    name: 'Pharmaceutical Products',
    slug: 'pharmaceutical-products',
    description: 'OTC and healthcare support products',
  },
  {
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    description: 'Household utility and kitchen-use items',
  },
  {
    name: 'Electrical & Hardware',
    slug: 'electrical-hardware',
    description: 'Electrical accessories and hardware supplies',
  },
  {
    name: 'Kitchenware',
    slug: 'kitchenware',
    description: 'Kitchen utensils and cookware assortment',
  },
  {
    name: 'Pets Collection',
    slug: 'pets-collection',
    description: 'Pet care and accessories catalog',
  },
  {
    name: 'Body Care',
    slug: 'body-care',
    description: 'Personal care and hygiene products',
  },
  {
    name: 'Kids Collection',
    slug: 'kids-collection',
    description: 'Kids toys, birthday and utility products',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Mobile and utility accessories',
  },
];

const namedOverrides = {
  MX101: { name: 'PEPSI PACK OF 10', packSize: '1.75L', category: 'grocery-beverages' },
  MX102: { name: 'SPRITE PACK OF 10', packSize: '1.75L', category: 'grocery-beverages' },
  MX103: { name: 'SILK OAT MILK ORGNL PACK OF 6', packSize: '32oz', category: 'grocery-beverages' },
  MX104: { name: 'MALTA INDIA LIGHT PACK OF 24', packSize: '8oz', category: 'grocery-beverages' },
  MX105: { name: 'PREMIER PROTEIN CHOCOLATE SHAKE', category: 'grocery-beverages' },
  MX106: { name: 'PREMIER PROTEIN VANILLA SHAKE', category: 'grocery-beverages' },
  MX107: { name: 'YOHOO CHOCOLATE DRINK PACK OF 40', category: 'grocery-beverages' },
  MX108: { name: 'COCA COLA PACK OF 10', packSize: '1.75L', category: 'grocery-beverages' },
  MX149: { name: 'ACT II POPCORN PACK OF 32', packSize: '2.75oz', category: 'grocery-beverages' },
  MX155: { name: 'EXCEL SAE 30 PACK OF 12', category: 'automotive-products' },
  MX156: { name: 'EXCEL UNIVERSAL TRANSMISSION', category: 'automotive-products' },
  MX157: { name: 'EXCEL SAE 50 PACK OF 12', category: 'automotive-products' },
  MX158: { name: 'EXCEL SAE 40 PACK OF 12', category: 'automotive-products' },
  MX202: { name: 'WD-40 MULTI PURPOSE LUBRICANT', category: 'automotive-products' },
  MX208: { name: 'TY PM 50x2', category: 'pharmaceutical-products' },
  MX209: { name: 'ADVIL REGULAR 50x2', category: 'pharmaceutical-products' },
  MX210: { name: 'ADVIL LIQ-GELS 20x1', category: 'pharmaceutical-products' },
  MX214: { name: 'VISINE PACK OF 6', category: 'pharmaceutical-products' },
  MX303: { name: 'JOHNSONS BABY OIL 50ML', category: 'home-kitchen' },
  MX404: { name: 'FEBREZE AIR FRUITY TROPICS PACK OF 6', packSize: '300ML', category: 'home-kitchen' },
  MX606: { name: 'DUPLICATE SALES BOOK', category: 'home-kitchen' },
  MX689: { name: 'TOILET PLUNGER', category: 'kitchenware' },
  MX775: { name: 'NYLON CABLE TIE 300MM', category: 'electrical-hardware' },
  MX776: { name: 'TEFLON TAPE 2PCS', category: 'electrical-hardware' },
  MX783: { name: 'LED BULB 9W YELLOW', category: 'electrical-hardware' },
  MX784: { name: 'LED BULB 9W WHITE', category: 'electrical-hardware' },
  MX785: { name: 'LED BULB 12W WHITE', category: 'electrical-hardware' },
  MX788: { name: 'LED BULB 12W YELLOW', category: 'electrical-hardware' },
  MX789: { name: 'WHITE EXTENSION CORD 6FT', category: 'electrical-hardware' },
  MX790: { name: 'WHITE EXTENSION CORD 9FT', category: 'electrical-hardware' },
  MX791: { name: 'WHITE EXTENSION CORD 12FT', category: 'electrical-hardware' },
  MX792: { name: 'WHITE EXTENSION CORD 15FT', category: 'electrical-hardware' },
  MX793: { name: 'WHITE EXTENSION CORD 20FT', category: 'electrical-hardware' },
  MX800: { name: 'BLACK POWER EXTENSION CORD', category: 'electrical-hardware' },
  MX841: { name: 'PET BELT COLLAR', category: 'pets-collection' },
  MX842: { name: 'ANIMAL GROOMING KIT', category: 'pets-collection' },
  MX865: { name: 'COTTON BUDS PACK OF 100', category: 'body-care' },
  MX866: { name: 'COTTON BUDS PACK OF 200', category: 'body-care' },
  MX883: { name: 'BARBIE BIRTHDAY THEME', category: 'kids-collection' },
  MX884: { name: 'SPIDERMAN BIRTHDAY THEME', category: 'kids-collection' },
  MX910: { name: 'FAST CHARGING CABLE USB-MICRO', category: 'accessories' },
  MX911: { name: 'FAST CHARGING CABLE TYPE C-TYPE C', category: 'accessories' },
  MX912: { name: 'FAST CHARGING CABLE TYPE C-LIGHTNING', category: 'accessories' },
  MX917: { name: 'CAR FAST CHARGER 48W', category: 'accessories' },
  MX919: { name: 'FAST CHARGING ADAPTER 45W', category: 'accessories' },
};

function categoryByCodeNumber(codeNumber) {
  if (codeNumber >= 101 && codeNumber <= 154) return 'grocery-beverages';
  if (codeNumber >= 155 && codeNumber <= 207) return 'automotive-products';
  if (codeNumber >= 208 && codeNumber <= 231) return 'pharmaceutical-products';
  if (codeNumber >= 232 && codeNumber <= 688) return 'home-kitchen';
  if (codeNumber >= 689 && codeNumber <= 774) return 'kitchenware';
  if (codeNumber >= 775 && codeNumber <= 840) return 'electrical-hardware';
  if (codeNumber >= 841 && codeNumber <= 858) return 'pets-collection';
  if (codeNumber >= 859 && codeNumber <= 882) return 'body-care';
  if (codeNumber >= 883 && codeNumber <= 909) return 'kids-collection';
  if (codeNumber >= 910 && codeNumber <= 922) return 'accessories';
  return 'home-kitchen';
}

function codeFromNumber(n) {
  return `MX${String(n).padStart(3, '0')}`;
}

const pricingByCategory = {
  'grocery-beverages': { base: 180, step: 22, cycle: 12, stockBase: 80, stockStep: 7, stockCycle: 24 },
  'automotive-products': { base: 450, step: 35, cycle: 10, stockBase: 35, stockStep: 5, stockCycle: 20 },
  'pharmaceutical-products': { base: 320, step: 28, cycle: 10, stockBase: 45, stockStep: 4, stockCycle: 18 },
  'home-kitchen': { base: 260, step: 18, cycle: 16, stockBase: 55, stockStep: 6, stockCycle: 22 },
  kitchenware: { base: 220, step: 20, cycle: 14, stockBase: 40, stockStep: 5, stockCycle: 20 },
  'electrical-hardware': { base: 390, step: 30, cycle: 14, stockBase: 30, stockStep: 4, stockCycle: 18 },
  'pets-collection': { base: 280, step: 24, cycle: 10, stockBase: 25, stockStep: 3, stockCycle: 15 },
  'body-care': { base: 210, step: 16, cycle: 14, stockBase: 50, stockStep: 4, stockCycle: 20 },
  'kids-collection': { base: 240, step: 20, cycle: 12, stockBase: 30, stockStep: 4, stockCycle: 18 },
  accessories: { base: 300, step: 26, cycle: 10, stockBase: 35, stockStep: 3, stockCycle: 16 },
};

function derivePriceAndStock(codeNumber, categorySlug) {
  const rules = pricingByCategory[categorySlug] || pricingByCategory['home-kitchen'];
  const price = rules.base + ((codeNumber % rules.cycle) * rules.step);
  const stock = rules.stockBase + ((codeNumber % rules.stockCycle) * rules.stockStep);
  return { price, stock };
}

async function ensureCategories() {
  const idBySlug = new Map();

  for (const category of categoriesToEnsure) {
    const doc = await Category.findOneAndUpdate(
      { slug: category.slug },
      {
        $set: {
          name: category.name,
          slug: category.slug,
          description: category.description,
          isActive: true,
        },
      },
      { upsert: true, returnDocument: 'after' }
    );

    idBySlug.set(category.slug, doc._id);
  }

  return idBySlug;
}

async function run() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    });

    const categoryIdBySlug = await ensureCategories();

    const minCode = 101;
    const maxCode = 922;

    const deleteResult = await Item.deleteMany({});
    console.log(`Deleted existing products: ${deleteResult.deletedCount}`);

    const productsToInsert = [];

    for (let n = minCode; n <= maxCode; n += 1) {
      const code = codeFromNumber(n);
      const override = namedOverrides[code] || {};
      const categorySlug = override.category || categoryByCodeNumber(n);
      const categoryId = categoryIdBySlug.get(categorySlug);

      if (!categoryId) {
        continue;
      }

      const { price, stock } = derivePriceAndStock(n, categorySlug);

      productsToInsert.push({
        productCode: code,
        name: override.name || `Catalog Item ${code}`,
        category: categoryId,
        packSize: override.packSize || null,
        brand: 'MUXI',
        description: `Imported from catalog list (${code})`,
        price,
        stock,
        isActive: true,
      });
    }

    const insertedDocs = await Item.insertMany(productsToInsert, { ordered: false });
    const inserted = insertedDocs.length;

    console.log('Catalog reset and import complete.');
    console.log(`Inserted: ${inserted}`);
    console.log('Pricing and stock added for all inserted products.');
  } catch (error) {
    console.error('Catalog import failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

run();
