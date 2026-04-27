
"use client";

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Sparkles, Layers3 } from 'lucide-react';
import WebsiteLayout from '../components/layout/WebsiteLayout';
import Container from '../components/layout/Container';
import { FadeIn, ScaleIn } from '../components/ui/animations.js';
import CategoryCard from '../components/ui/CategoryCard';
import Loader from '@/components/common/Loader';

// Ye component woh hai jo actual useSearchParams() use karta hai
function CategoriesContent() {
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = searchParams.get('search') || '';
    setSearch(q);
  }, [searchParams]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/categories', { cache: 'no-store' });
        const result = await response.json();
        if (response.ok && result.success) {
          setCategories(result.data);
        }
      } catch (error) {
        console.error('Website categories fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  return (
    <WebsiteLayout>
      <section className="relative min-h-screen overflow-hidden bg-[#0d0e10] pt-32 pb-24">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#896336]/10 blur-[150px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#a88148]/10 blur-[150px] rounded-full" />
        </div>

        <Container className="relative z-10">
          <FadeIn direction="up" duration={0.75}>
            <div className="mx-auto mb-16 max-w-5xl rounded-[2.5rem] border border-[#896336]/20 bg-[#1a1b1e]/80 px-6 py-16 text-center shadow-[0_25px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl md:px-12">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#896336]/30 bg-[#896336]/10 px-6 py-2.5 text-sm font-bold text-[#faf2b4] shadow-sm tracking-[0.1em] uppercase">
                <Sparkles className="h-4 w-4 text-[#a88148]" />
                Elite Category Curation
              </div>
              <h1 className="text-5xl font-extrabold leading-[1.1] text-white md:text-6xl lg:text-7xl">
                Browse Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#896336] via-[#faf2b4] to-[#a88148]">Premium Portfolios</span>
              </h1>
              <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-[#faf2b4]/70">
                Strategic wholesale distribution across diverse industrial sectors. Navigate through our high-performance categories.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm">
                <div className="inline-flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-6 py-3 text-[#faf2b4] shadow-sm backdrop-blur-md">
                  <Layers3 className="h-5 w-5 text-[#896336]" />
                  <span className="font-semibold">{filteredCategories.length}</span> Active Segments
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={120} duration={0.65}>
            <div className="mx-auto mb-20 max-w-2xl">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#896336] to-[#a88148] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative rounded-2xl border border-[#896336]/20 bg-[#1a1b1e] p-2 shadow-2xl overflow-hidden">
                  <Search className="pointer-events-none absolute left-6 top-1/2 h-6 w-6 -translate-y-1/2 text-[#896336]" />
                  <input
                    type="text"
                    placeholder="Search premium categories..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-16 w-full rounded-xl border-none bg-transparent pl-14 pr-6 text-lg font-medium text-[#faf2b4] placeholder-[#896336]/50 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </FadeIn>

          {loading ? (
            <div className="flex justify-center py-20">
               <Loader />
            </div>
          ) : (
            <>
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCategories.map((category, index) => (
                  <ScaleIn key={category.slug} delay={index * 70} duration={0.55}>
                    <div className="group relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#896336] to-[#a88148] rounded-[2rem] blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                      <CategoryCard
                        category={category}
                        href={`/categories/${category.slug}`}
                        className="bg-[#1a1b1e] border-[#896336]/20 text-[#faf2b4]"
                      />
                    </div>
                  </ScaleIn>
                ))}
              </div>

              {filteredCategories.length === 0 && (
                <FadeIn direction="up" delay={180}>
                  <div className="mx-auto mt-12 max-w-2xl rounded-[2.5rem] border border-[#896336]/20 bg-[#1a1b1e]/50 p-16 text-center shadow-2xl backdrop-blur-xl">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#896336]/10 animate-bounce-gentle border border-[#896336]/20">
                      <Search className="h-10 w-10 text-[#a88148]" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">No matching categories</h3>
                    <p className="text-xl text-[#faf2b4]/60 max-w-md mx-auto">Our inventory is vast, but it seems we missed that keyword. Try another refined search.</p>
                  </div>
                </FadeIn>
              )}
            </>
          )}
        </Container>
      </section>
    </WebsiteLayout>
  );
}

// Main page component jo Suspense provide karega
export default function CategoriesPage() {
  return (
    <Suspense fallback={<Loader />}>
      <CategoriesContent />
    </Suspense>
  );
}