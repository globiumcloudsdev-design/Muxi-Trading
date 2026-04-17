'use client';

import { useMemo, useState } from 'react';
import { Search, Filter, Package } from 'lucide-react';
import Container from '../layout/Container';
import ProductCard from '../ui/ProductCard';
import { FadeIn, ScaleIn, StaggerContainer } from '../ui/animations';

export default function ProductsSection({ products = [], categories = [] }) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const bySearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.code.toLowerCase().includes(search.toLowerCase());

      const byCategory =
        categoryFilter === 'all' || product.categorySlug === categoryFilter;

      return bySearch && byCategory;
    });
  }, [products, search, categoryFilter]);

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative">
      <Container>
        <FadeIn direction="up" duration={0.8}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Top wholesale SKUs with product code and pack size details
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={150} duration={0.7}>
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            <div className="relative md:col-span-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by product name or code..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all hover-lift"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer hover-lift"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option value={category.slug} key={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </FadeIn>

        {filteredProducts.length > 0 ? (
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={120}>
            {filteredProducts.map((product) => (
              <ScaleIn key={product.code} duration={0.55} className="h-full">
                <ProductCard product={product} />
              </ScaleIn>
            ))}
          </StaggerContainer>
        ) : (
          <FadeIn direction="up" delay={180}>
            <div className="col-span-full text-center py-12 animate-fade-in-up">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                <Package className="h-8 w-8 text-slate-400" />
              </div>
              <p className="text-slate-500">No products found matching your criteria.</p>
            </div>
          </FadeIn>
        )}
      </Container>
    </section>
  );
}
