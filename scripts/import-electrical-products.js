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

const electricalProducts = [
  {
    code: 'EL-701',
    name: 'Philips LED Bulb 9W',
    brand: 'Philips',
    packSize: 'Box of 20',
    price: 95,
    stock: 300,
    description: 'Energy-saving LED bulb for residential and commercial usage.',
  },
  {
    code: 'EL-702',
    name: 'Pakistan Cable 1.5mm Wire Roll',
    brand: 'Pakistan Cables',
    packSize: '90m Roll',
    price: 6250,
    stock: 48,
    description: 'Single-core copper wire for wiring and electrical installations.',
  },
  {
    code: 'EL-703',
    name: 'GM 3-Pin Universal Socket',
    brand: 'GM',
    packSize: 'Pack of 10',
    price: 380,
    stock: 210,
    description: 'Durable universal socket for home and office use.',
  },
  {
    code: 'EL-704',
    name: 'Schneider MCB 20A SP',
    brand: 'Schneider',
    packSize: 'Unit',
    price: 710,
    stock: 130,
    description: 'Single-pole MCB for overload and short-circuit protection.',
  },
  {
    code: 'EL-705',
    name: 'National Ceiling Fan Capacitor',
    brand: 'National',
    packSize: 'Pack of 5',
    price: 260,
    stock: 160,
    description: 'Ceiling fan capacitor replacement for reliable motor starting.',
  },
  {
    code: 'EL-706',
    name: 'Sogo Extension Board 4-Socket',
    brand: 'Sogo',
    packSize: 'Unit',
    price: 980,
    stock: 75,
    description: 'Heavy-duty extension board with surge protection.',
  },
  {
    code: 'EL-707',
    name: 'Master Electric Tape',
    brand: 'Master',
    packSize: 'Pack of 10',
    price: 55,
    stock: 420,
    description: 'Insulation tape for safe electrical joint wrapping.',
  },
  {
    code: 'EL-708',
    name: 'Panasonic Door Bell Switch',
    brand: 'Panasonic',
    packSize: 'Unit',
    price: 340,
    stock: 120,
    description: 'Wall-mounted bell switch with smooth click mechanism.',
  },
  {
    code: 'EL-709',
    name: 'LED Tube Light 18W',
    brand: 'Osaka',
    packSize: 'Unit',
    price: 520,
    stock: 190,
    description: 'Bright and efficient tube light suitable for shops and offices.',
  },
  {
    code: 'EL-710',
    name: '2-Pin Plug Top Heavy Duty',
    brand: 'BOSS',
    packSize: 'Pack of 12',
    price: 115,
    stock: 280,
    description: 'Reliable two-pin plug top for appliances and extension cords.',
  },
];

async function run() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    });

    const category = await Category.findOneAndUpdate(
      { slug: 'electrical-hardware' },
      {
        $set: {
          name: 'Electrical & Hardware',
          slug: 'electrical-hardware',
          description: 'Electrical accessories and hardware supplies',
          isActive: true,
        },
      },
      { upsert: true, returnDocument: 'after' }
    );

    let upserted = 0;

    for (const product of electricalProducts) {
      await Item.findOneAndUpdate(
        { productCode: product.code },
        {
          $set: {
            productCode: product.code,
            name: product.name,
            category: category._id,
            price: Number(product.price || 0),
            stock: Number(product.stock || 0),
            description: product.description || null,
            packSize: product.packSize || null,
            brand: product.brand || null,
            isActive: true,
          },
        },
        { upsert: true, returnDocument: 'after' }
      );
      upserted += 1;
    }

    console.log(`Done. Electrical category ensured and ${upserted} products upserted.`);
  } catch (error) {
    console.error('Import failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

run();
