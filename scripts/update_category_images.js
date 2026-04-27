require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable inside .env');
  process.exit(1);
}

const categorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  image: String,
});

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

async function updateCategories() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const categories = await Category.find({});
    console.log(`Found ${categories.length} categories.`);

    const images = [
      '/images/categories/category_automotive_1777120180343.png',
      '/images/categories/category_pharma_1777120319340.png',
      '/images/categories/category_grocery_1777120334321.png'
    ];

    for (let cat of categories) {
      let imgToUse = null;
      const lowerName = cat.name.toLowerCase();

      if (lowerName.includes('auto') || lowerName.includes('car') || lowerName.includes('vehicle')) {
        imgToUse = images[0];
      } else if (lowerName.includes('pharma') || lowerName.includes('health') || lowerName.includes('medic')) {
        imgToUse = images[1];
      } else if (lowerName.includes('groc') || lowerName.includes('food') || lowerName.includes('electric')) {
        imgToUse = images[2];
      } else if (!cat.image) {
        // Just pick one randomly if they have no image
        imgToUse = images[Math.floor(Math.random() * images.length)];
      }

      if (imgToUse) {
        cat.image = imgToUse;
        await cat.save();
        console.log(`Updated category ${cat.name} with image ${imgToUse}`);
      } else {
        // If image not found and they don't have one, explicitly clear it to test our new logic
        // But the user said "if image not found then dont show image banner", so clearing it is good.
        if (!cat.image) {
          console.log(`No matching image for ${cat.name}, left blank.`);
        }
      }
    }

    console.log('Finished updating categories.');
    process.exit(0);
  } catch (error) {
    console.error('Error updating categories:', error);
    process.exit(1);
  }
}

updateCategories();
