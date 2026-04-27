'use client';

import { useEffect, useState } from 'react';
import WebsiteLayout from './components/layout/WebsiteLayout';
import HeroSection from './components/sections/HeroSection';
import PromotionalBanners from './components/sections/PromotionalBanners';
import CompanyInfoSection from './components/sections/CompanyInfoSection';
import CategoryShowcase from './components/sections/CategoryShowcase';
import ContactSection from './components/sections/ContactSection';


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
        </section>
      </WebsiteLayout>
    );
  }

  return (
    <WebsiteLayout>
      <HeroSection />

      {/* <PromotionalBanners /> */}

      <CategoryShowcase products={homeData.products} categories={homeData.categories} />

      <CompanyInfoSection />

    </WebsiteLayout>
  );
}
