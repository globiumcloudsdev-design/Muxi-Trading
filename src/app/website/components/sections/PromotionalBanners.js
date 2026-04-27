'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

const banners = [
  {
    id: 1,
    title: 'Global Wholesale Distribution',
    subtitle: 'Connecting manufacturers with buyers worldwide.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c663c0?q=80&w=2070&auto=format&fit=crop',
    color: 'from-blue-900/90 to-slate-900/90',
  },
  {
    id: 2,
    title: 'Automotive Parts Bulk Supply',
    subtitle: 'Premium quality parts at unbeatable wholesale prices.',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2072&auto=format&fit=crop',
    color: 'from-orange-900/90 to-slate-900/90',
  },
  {
    id: 3,
    title: 'Pharmaceuticals & Health',
    subtitle: 'Trusted supplier of medical and healthcare products.',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=2070&auto=format&fit=crop',
    color: 'from-emerald-900/90 to-slate-900/90',
  }
];

export default function PromotionalBanners() {
  return (
    <section className="relative w-full py-10 bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            effect="fade"
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation
            className="w-full h-[300px] md:h-[400px] lg:h-[500px]"
          >
            {banners.map((banner) => (
              <SwiperSlide key={banner.id}>
                <div className="relative w-full h-full flex items-center">
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${banner.color}`} />
                  
                  <div className="relative z-10 p-8 md:p-16 max-w-3xl">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs md:text-sm font-semibold tracking-wider uppercase mb-4">
                      Featured Offer
                    </span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                      {banner.title}
                    </h2>
                    <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-xl">
                      {banner.subtitle}
                    </p>
                    <Button size="lg" className="bg-white text-slate-900 hover:bg-blue-50 border-0 group">
                      Explore Deals
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
