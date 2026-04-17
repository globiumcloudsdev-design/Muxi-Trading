'use client';

import { Wallet, Boxes, Layers3, Truck, TrendingUp, Award } from 'lucide-react';
import Container from '../layout/Container';
import { FadeIn, ScaleIn, StaggerContainer } from '../ui/animations';

const features = [
  {
    icon: Wallet,
    title: 'Wholesale Pricing',
    description: 'Competitive category-wise rates optimized for margin-focused bulk buyers.',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    direction: 'left'
  },
  {
    icon: Boxes,
    title: 'Bulk Availability',
    description: 'Reliable stock movement planning for recurring distributor and retailer demand.',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
    direction: 'right'
  },
  {
    icon: Layers3,
    title: 'Multi-category Supplier',
    description: 'One partner for grocery, auto, pharma, household, electrical, and utility products.',
    color: 'from-cyan-500 to-cyan-700',
    bgColor: 'bg-cyan-50',
    iconColor: 'text-cyan-700',
    direction: 'left'
  },
  {
    icon: Truck,
    title: 'Fast Delivery Support',
    description: 'Agile dispatch and order follow-up designed for time-sensitive wholesale needs.',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
    direction: 'right'
  },
  {
    icon: TrendingUp,
    title: 'Volume Discounts',
    description: 'Tiered pricing structure for large quantity orders and long-term partnerships.',
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    direction: 'left'
  },
  {
    icon: Award,
    title: 'Quality Assured',
    description: 'Verified sourcing from trusted manufacturers with quality certifications.',
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-50',
    iconColor: 'text-rose-600',
    direction: 'right'
  },
];

export default function FeaturesSection() {
  return (
    <section id="about-us" className="py-24 bg-white relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <Container>
        <div className="text-center mb-16">
          <FadeIn direction="up" delay={100} duration={0.8}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Us
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={300} duration={0.8}>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Built for high-volume wholesale workflows with dependable service quality
            </p>
          </FadeIn>
        </div>
        
        <StaggerContainer staggerDelay={150} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <ScaleIn key={index} delay={index * 50} duration={0.6}>
                <div 
                  className={`group relative bg-white rounded-2xl p-8 border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-500 hover:-translate-y-2`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                  
                  <div className="relative">
                    <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <Icon className={`h-8 w-8 ${feature.iconColor} transition-transform duration-300 group-hover:rotate-12`} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </ScaleIn>
            );
          })}
        </StaggerContainer>
      </Container>
    </section>
  );
}

