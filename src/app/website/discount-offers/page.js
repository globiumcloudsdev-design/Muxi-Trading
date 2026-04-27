'use client';

import { useEffect, useState } from 'react';
import WebsiteLayout from '../components/layout/WebsiteLayout';
import Container from '../components/layout/Container';
import ProductCard from '../components/ui/ProductCard';
import Loader from '@/components/common/Loader';
import { Tag, Clock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

function CountdownTimer({ endDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!endDate) return;
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endDate).getTime();
      const distance = end - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  if (!endDate) return <span className="text-sm font-bold text-[#faf2b4]">EXCLUSIVE OFFER</span>;

  return (
    <div className="flex gap-2 text-center text-xs font-bold text-[#faf2b4]">
      <div className="bg-[#896336]/30 backdrop-blur-md border border-[#896336]/40 rounded-xl px-3 py-2 min-w-[3rem]">
        <div className="text-xl">{timeLeft.days}</div>
        <div className="text-[9px] uppercase tracking-tighter opacity-70">Days</div>
      </div>
      <div className="text-[#a88148] text-2xl font-light self-center">:</div>
      <div className="bg-[#896336]/30 backdrop-blur-md border border-[#896336]/40 rounded-xl px-3 py-2 min-w-[3rem]">
        <div className="text-xl">{timeLeft.hours}</div>
        <div className="text-[9px] uppercase tracking-tighter opacity-70">Hrs</div>
      </div>
      <div className="text-[#a88148] text-2xl font-light self-center">:</div>
      <div className="bg-[#896336]/30 backdrop-blur-md border border-[#896336]/40 rounded-xl px-3 py-2 min-w-[3rem]">
        <div className="text-xl">{timeLeft.minutes}</div>
        <div className="text-[9px] uppercase tracking-tighter opacity-70">Min</div>
      </div>
      <div className="text-[#a88148] text-2xl font-light self-center">:</div>
      <div className="bg-[#896336]/30 backdrop-blur-md border border-[#896336]/40 rounded-xl px-3 py-2 min-w-[3rem]">
        <div className="text-xl">{timeLeft.seconds}</div>
        <div className="text-[9px] uppercase tracking-tighter opacity-70">Sec</div>
      </div>
    </div>
  );
}

export default function DiscountOffersPage() {
  const [data, setData] = useState({ categories: [], products: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('/api/website/discount-offers', { cache: 'no-store' });
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error('Fetch discount offers error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  if (loading) {
    return (
      <WebsiteLayout>
        <div className="min-h-screen flex items-center justify-center bg-[#0d0e10]">
          <Loader />
        </div>
      </WebsiteLayout>
    );
  }

  return (
    <WebsiteLayout>
      <section className="pt-32 pb-20 bg-[#0d0e10] overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#89633622,_transparent_50%)]" />
        <Container className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#896336]/40 bg-[#896336]/10 px-6 py-2 mb-8 shadow-lg shadow-[#896336]/5"
          >
            <Tag className="h-4 w-4 text-[#a88148]" />
            <span className="text-sm font-bold text-[#faf2b4] tracking-[0.2em] uppercase">Limited High-Value Deals</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 tracking-tight"
          >
            Corporate <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#896336] via-[#faf2b4] to-[#a88148]">Yield Offers</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[#faf2b4]/60 max-w-2xl mx-auto leading-relaxed"
          >
            Unlock exceptional wholesale margins across our curated selection of premium commodities. Strategic pricing for high-volume partners.
          </motion.p>
        </Container>
      </section>

      <section className="py-20 bg-[#0d0e10] min-h-screen relative">
        <Container>
          {data.products.length === 0 ? (
            <div className="text-center py-32 bg-[#1a1b1e]/50 rounded-[3rem] border border-[#896336]/10 backdrop-blur-xl">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-[#896336]/10 mb-8 border border-[#896336]/20">
                <Tag className="h-10 w-10 text-[#a88148]" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Awaiting New Cycles</h2>
              <p className="text-[#faf2b4]/50 text-lg">New strategic discount allocations are processed weekly. Please check back shortly.</p>
            </div>
          ) : (
            <div className="space-y-32">
              {data.categories.map(category => {
                const categoryProducts = data.products.filter(p => p.category === category._id);
                if (categoryProducts.length === 0) return null;
                const discountTitle = category.discountTitle || `${category.name} Offer`;
                const discountDescription = category.discountDescription || 'Exclusive wholesale pricing for eligible bulk buyers.';

                return (
                  <div key={category._id} className="space-y-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-[#1a1b1e]/80 p-8 rounded-[2.5rem] shadow-2xl border border-[#896336]/20 backdrop-blur-xl">
                      <div className="text-center md:text-left">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#896336]/20 bg-[#896336]/10 px-4 py-2 mb-4">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#faf2b4]">{discountTitle}</span>
                        </div>
                        <h2 className="text-3xl font-black text-white flex items-center justify-center md:justify-start gap-3">
                          <div className="p-2 rounded-lg bg-[#896336]/20">
                            <Sparkles className="h-7 w-7 text-[#a88148]" />
                          </div>
                          {category.name} Segment
                        </h2>
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#faf2b4]/55 md:text-left">
                          {discountDescription}
                        </p>
                        <div className="mt-4 flex items-center gap-3">
                          <div className="h-px w-8 bg-[#896336]/50" />
                          <p className="text-[#faf2b4] font-semibold text-lg">
                            {category.discountType === 'percentage' 
                              ? `Institutional ${category.discountValue}% Concession` 
                              : `Direct ${category.discountValue} PKR Unit Subsidy`}
                          </p>
                        </div>
                      </div>
                      {category.discountEndDate && (
                        <div className="flex flex-col items-center md:items-end">
                          <span className="text-xs font-bold text-[#896336] mb-3 tracking-[0.1em] uppercase bg-[#896336]/10 px-4 py-1 rounded-full border border-[#896336]/20">
                             Validity Remaining
                          </span>
                          <CountdownTimer endDate={category.discountEndDate} />
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {categoryProducts.map(product => (
                      <motion.div 
                          key={product._id} 
                          className="relative group"
                          whileHover={{ y: -10 }}
                        >
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#896336] to-[#a88148] rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                          <ProductCard product={product} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </section>
    </WebsiteLayout>
  );
}
