'use client';

import Link from 'next/link';
import { ArrowRight, Package, Car, Pill, Home, Lightbulb, Wrench } from 'lucide-react';
import { FadeIn, StaggerContainer } from '../ui/animations.js';
import Container from '../layout/Container';
import Button from '../ui/Button';

const iconMap = {
  'grocery-beverages': Package,
  'automotive-products': Car,
  'pharmaceutical-products': Pill,
  'home-kitchen': Home,
  'electrical-hardware': Lightbulb,
  'cleaning-utility-items': Wrench,
};

export default function CategoriesPreviewSection({ categories = [] }) {
  const visibleCategories = categories.length > 0 ? categories : [];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))] animate-gradient-drift" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />
      
      <Container>
        <FadeIn direction="up" duration={0.8}>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6 drop-shadow-lg animate-fade-in-up">
              Explore Our Categories
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up stagger-1">
              Category-focused wholesale sourcing for distributors, retailers, and institutional buyers
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={120}>
          {visibleCategories.map((category, index) => {
            const Icon = iconMap[category.slug] || Package;
            
            return (
              <Link 
                key={category.slug} 
                href={`/website/categories/${category.slug}`}
                className="group relative top-10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 via-purple-50/40 to-indigo-50 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-3xl animate-pulse-glow" />
                
                <div className="relative flex items-start gap-16">
                  <div className=" w-15 h-15 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-2xl shadow-blue-500/40 group-hover:shadow-purple-500/50 group-hover:scale-125 group-hover:rotate-6 transition-all duration-700 animate-pulse-glow">
                    <Icon className=" top-10 h-10 w-10 text-white shadow-lg" />
                  </div>
                  
                  <div className="flex-1 min-w-0 space-y-4">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500">
                      {category.name}
                    </h3>
                    <p className="text-base text-slate-600 leading-relaxed line-clamp-2">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center text-blue-600 text-lg font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <span>View Products →</span>
                      <ArrowRight className="h-6 w-6 ml-2 group-hover:translate-x-3 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </StaggerContainer>

        
      </Container>
    </section>
  );
}
