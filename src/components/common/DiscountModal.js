'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight, Truck, Headphones, ShieldCheck, Tag } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const REMIND_KEY = 'muxiDiscountRemindAt';
const TEN_MINUTES = 10 * 60 * 1000;

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

  if (!endDate) return null;

  return (
    <div className="my-6 grid grid-cols-4 gap-2 text-center">
      <div className="rounded-xl border border-[#f6d271]/30 bg-[#0f1116] px-2 py-3 shadow-inner shadow-black/20">
        <div className="text-2xl font-black text-[#f6d271]">{timeLeft.days}</div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">Days</div>
      </div>
      <div className="rounded-xl border border-[#f6d271]/30 bg-[#0f1116] px-2 py-3 shadow-inner shadow-black/20">
        <div className="text-2xl font-black text-[#f6d271]">{timeLeft.hours}</div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">Hrs</div>
      </div>
      <div className="rounded-xl border border-[#f6d271]/30 bg-[#0f1116] px-2 py-3 shadow-inner shadow-black/20">
        <div className="text-2xl font-black text-[#f6d271]">{timeLeft.minutes}</div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">Min</div>
      </div>
      <div className="rounded-xl border border-[#f6d271]/30 bg-[#0f1116] px-2 py-3 shadow-inner shadow-black/20">
        <div className="text-2xl font-black text-[#f6d271]">{timeLeft.seconds}</div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">Sec</div>
      </div>
    </div>
  );
}

function formatDateDisplay(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function DiscountModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [offer, setOffer] = useState(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsHeroVisible(window.scrollY < window.innerHeight * 0.7);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== '/' || !isHeroVisible) {
      return;
    }

    const remindAt = Number(sessionStorage.getItem(REMIND_KEY) || 0);
    if (remindAt && Date.now() < remindAt) {
      return;
    }

    const fetchOffers = async () => {
      try {
        const response = await fetch('/api/website/discount-offers');
        const result = await response.json();
        
        if (result.success && result.data.categories.length > 0) {
          const popupCategory = result.data.categories.find(c => 
            c.discountOffer && c.discountOffer.popupModalEnabled
          );
          if (popupCategory) {
            setOffer({
              ...popupCategory,
              ...popupCategory.discountOffer,
              offerName: popupCategory.discountOffer.offerName,
              offerTitle: popupCategory.discountOffer.offerTitle,
              shortDescription: popupCategory.discountOffer.shortDescription,
              longDescription: popupCategory.discountOffer.longDescription,
              discountType: popupCategory.discountOffer.discountType,
              discountValue: popupCategory.discountOffer.discountValue,
              startDate: popupCategory.discountOffer.startDate,
              endDate: popupCategory.discountOffer.endDate,
              name: popupCategory.name,
              slug: popupCategory.slug
            });
            setTimeout(() => {
              setIsOpen(true);
            }, 1200);
          }
        }
      } catch (error) {
        console.error('Fetch discount modal error:', error);
      }
    };
    
    fetchOffers();
  }, [pathname, isHeroVisible]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClaimNow = () => {
    setIsOpen(false);
    const slug = offer?.offerSlug || 'discount-offers';
    router.push(`/discount-offers/${slug}`);
  };

  const handleRemindLater = () => {
    sessionStorage.setItem(REMIND_KEY, String(Date.now() + TEN_MINUTES));
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && offer && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-[#050608]/75 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="pointer-events-auto relative w-full max-w-[640px] overflow-hidden rounded-[2rem] border border-[#f6d271]/50 bg-[#0b0c10] shadow-[0_0_60px_rgba(246,210,113,0.22)]"
            >
              <button 
                onClick={closeModal}
                className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 transition-colors hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative overflow-hidden border-b border-[#f6d271]/20 bg-[radial-gradient(ellipse_at_top,#2a2112_0%,#111318_55%,#0b0c10_100%)] px-8 pb-8 pt-10 text-center">
                <motion.div
                  animate={{ rotate: [0, 6, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-6 top-8 h-2 w-2 rounded-full bg-[#f6d271]"
                />
                <motion.div
                  animate={{ rotate: [0, -6, 0], scale: [1, 1.08, 1] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute right-8 top-14 h-2 w-2 rounded-full bg-[#f6d271]"
                />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center rounded-full border border-[#f6d271]/35 bg-[#f6d271]/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.24em] text-[#f6d271]">
                    Limited Time Offer
                  </div>
                  <h2 className="mt-5 text-4xl font-black uppercase tracking-wide text-white sm:text-5xl">
                    {offer.offerTitle || 'Special Discount'}
                  </h2>
                  <p className="mt-2 text-sm font-bold text-white/80 tracking-wide">
                    {offer.offerName}
                  </p>
                  <p className="mt-4 text-base font-semibold text-[#f6d271] sm:text-lg">
                    {offer.discountType === 'percentage' ? `Get ${offer.discountValue}% OFF` : `Save ${offer.discountValue} PKR`}
                  </p>
                  <p className="mx-auto mt-2 max-w-xl text-sm text-white/70 sm:text-base">
                    {offer.shortDescription || offer.longDescription || `Exclusive wholesaler discount on ${offer.name || 'selected'} category products.`}
                  </p>
                  {(offer.startDate || offer.endDate) && (
                    <p className="mt-3 text-xs text-white/50 font-medium">
                      Valid: {formatDateDisplay(offer.startDate) || 'Now'} — {formatDateDisplay(offer.endDate) || 'Ongoing'}
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-[#0b0c10] p-7 text-center">
                <div className="rounded-2xl border border-[#f6d271]/25 bg-[#111318] px-4 py-3">
                  {offer.discountEndDate && (
                    <CountdownTimer endDate={offer.discountEndDate} />
                  )}
                  {!offer.discountEndDate && (
                    <p className="text-sm font-semibold text-white/70">Offer valid for a limited time only.</p>
                  )}
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-[#f6d271]/15 bg-[#111318] p-3 text-left">
                  {[
                    { icon: Truck, label: 'Worldwide Delivery' },
                    { icon: Headphones, label: '24/7 Support' },
                    { icon: ShieldCheck, label: 'Premium Quality' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center gap-2 rounded-xl border border-white/5 bg-[#0f1116] px-2 py-2">
                        <Icon className="h-4 w-4 text-[#f6d271]" />
                        <span className="text-[10px] font-semibold text-white/70">{item.label}</span>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={handleClaimNow}
                  className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#f6d271] via-[#efb63f] to-[#f6d271] py-4 text-lg font-black uppercase tracking-[0.08em] text-[#141519] shadow-lg transition-transform hover:scale-[1.01]"
                >
                  Claim Now
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                
                <button
                  type="button"
                  onClick={handleRemindLater}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white"
                >
                  <Tag className="h-4 w-4 text-[#f6d271]" />
                  Remind Me Later
                </button>

                <p className="mt-3 text-[11px] text-white/45">Discount reminder will appear again after 10 minutes when you return to home hero section.</p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
