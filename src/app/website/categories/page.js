
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
      <section className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_15%_15%,rgba(59,130,246,0.14),transparent_28%),radial-gradient(circle_at_86%_10%,rgba(14,165,233,0.12),transparent_24%),linear-gradient(180deg,#eaf2ff_0%,#f8fbff_34%,#ffffff_100%)] pt-32 pb-24">
        <Container>
          <FadeIn direction="up" duration={0.75}>
            <div className="mx-auto mb-12 max-w-5xl rounded-3xl border border-white/20 bg-slate-900/90 px-6 py-12 text-center shadow-[0_25px_70px_rgba(15,23,42,0.28)] backdrop-blur md:px-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200/40 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 shadow-sm">
                <Sparkles className="h-4 w-4" />
                Category Discovery Hub
              </div>
              <h1 className="text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
                Explore Product Categories with Faster B2B Navigation
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-200">
                Browse category-wise products, compare your options quickly, and move to detailed listings with a cleaner catalog flow.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-slate-100 shadow-sm">
                  <Layers3 className="h-4 w-4 text-blue-500" />
                  {filteredCategories.length} matched
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-slate-100 shadow-sm">
                  <Sparkles className="h-4 w-4 text-cyan-500" />
                  {categories.length} total categories
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={120} duration={0.65}>
            <div className="mx-auto mb-20 max-w-2xl [perspective:1000px]">
              <div className="rounded-3xl border border-slate-200/70 bg-white/85 p-2 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-transform duration-500">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search categories by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-14 w-full rounded-2xl border border-slate-200/70 bg-white pl-12 pr-4 text-base font-medium text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-500/15"
                  />
                </div>
              </div>
            </div>
          </FadeIn>

          {loading ? (
            <FadeIn direction="up">
              <Loader />
            </FadeIn>
          ) : (
            <>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCategories.map((category, index) => (
                  <ScaleIn key={category.slug} delay={index * 70} duration={0.55}>
                    <CategoryCard
                      category={category}
                      href={`/categories/${category.slug}`}
                    />
                  </ScaleIn>
                ))}
              </div>

              {filteredCategories.length === 0 && (
                <FadeIn direction="up" delay={180}>
                  <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-slate-200/80 bg-white p-12 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 animate-bounce-gentle">
                      <Search className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">No categories found</h3>
                    <p className="text-lg text-slate-600 max-w-md mx-auto">Try adjusting your search terms or browse all categories.</p>
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