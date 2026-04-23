'use client';

import { useEffect, useState } from 'react';
import WebsiteLayout from '../components/layout/WebsiteLayout';
import HeroSection from '../components/sections/HeroSection';
import CategoriesPreviewSection from '../components/sections/CategoriesPreviewSection';
import ProductsSection from '../components/sections/ProductsSection';
import Loader from '@/components/common/Loader';
import Button from '../components/ui/Button';
import Container from '../components/layout/Container';
import { ArrowRight } from 'lucide-react';

export default function AboutUsPage() {
  const [homeData, setHomeData] = useState({ categories: [], products: [], brands: [] });
  const [loading, setLoading] = useState(true);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/website/home', { cache: 'no-store' });
        const result = await response.json();

        if (response.ok && result.success) {
          setHomeData(result.data || { categories: [], products: [], brands: [] });
        }
      } catch (error) {
        console.error('Home data fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <WebsiteLayout>
        <section className="min-h-screen flex items-center justify-center">
          <Loader />
        </section>
      </WebsiteLayout>
    );
  }

  const limitedCategories = showAllCategories ? homeData.categories : homeData.categories.slice(0, 6);
  const limitedProducts = showAllProducts ? homeData.products : homeData.products.slice(0, 6);

  return (
    <WebsiteLayout>
      <HeroSection />
      
      {/* Categories Section */}
      <div className="relative">
        <CategoriesPreviewSection categories={limitedCategories} />
        {!showAllCategories && homeData.categories.length > 6 && (
          <Container className="pb-16 -mt-12 text-center relative z-10">
            <Button 
              onClick={() => setShowAllCategories(true)}
              variant="outline" 
              size="lg" 
              className="group border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              See More
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Container>
        )}
      </div>

      {/* Products Section */}
      <div className="relative">
        <ProductsSection products={limitedProducts} categories={homeData.categories} />
        {!showAllProducts && homeData.products.length > 6 && (
          <Container className="pb-24 -mt-10 text-center relative z-10">
            <Button 
              onClick={() => setShowAllProducts(true)}
              variant="outline" 
              size="lg" 
              className="group border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              See More
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Container>
        )}
      </div>

      {/* About Us Content Section (Optional, added for context) */}
      <section id="about-content" className="py-24 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">About MUXI Trading</h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              MUXI Trading is a premier wholesale supplier dedicated to providing high-quality products across multiple categories. 
              Our mission is to bridge the gap between manufacturers and businesses by offering competitive pricing and reliable delivery.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              With a focus on customer satisfaction and quality assurance, we have established ourselves as a trusted partner for retailers, 
              distributors, and institutional buyers globally.
            </p>
          </div>
        </Container>
      </section>
    </WebsiteLayout>
  );
}
