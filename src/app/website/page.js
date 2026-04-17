'use client';

import { useEffect, useState } from 'react';
import WebsiteLayout from './components/layout/WebsiteLayout';
import HeroSection from './components/sections/HeroSection';
import FeaturesSection from './components/sections/FeaturesSection';
import ProductsSection from './components/sections/ProductsSection';
import CategoriesPreviewSection from './components/sections/CategoriesPreviewSection';
import BrandSlider from './components/common/BrandSlider';
import CatalogSection from './components/sections/CatalogSection';
import ContactSection from './components/sections/ContactSection';
import Loader from '@/components/common/Loader';
// import ProcessSection from './components/sections/ProcessSection';

export default function WebsiteHome() {
  const [homeData, setHomeData] = useState({ categories: [], products: [], brands: [] });
  const [loading, setLoading] = useState(true);

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

  return (
    <WebsiteLayout>
      <HeroSection />
      <CategoriesPreviewSection categories={homeData.categories} />
      {/* <ProcessSection /> */}
      <FeaturesSection />
      <ProductsSection products={homeData.products} categories={homeData.categories} />
      {/* <BrandSlider brands={homeData.brands} /> */}
      <CatalogSection />
      <ContactSection />
    </WebsiteLayout>
  );
}
