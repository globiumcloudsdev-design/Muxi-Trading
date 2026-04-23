'use client';

import WebsiteLayout from '../components/layout/WebsiteLayout';
import Container from '../components/layout/Container';
import ContactSection from '../components/sections/ContactSection';
import HeroSection from '../components/sections/HeroSection';
import { FadeIn } from '../components/ui/animations';

export default function ContactPage() {
  return (
    <WebsiteLayout>
      

      {/* Full Contact Section */}
      <ContactSection />

      {/* Spacer */}
      <div className="h-24" />
    </WebsiteLayout>
  );
}

