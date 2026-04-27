'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../ui/ProductCard';
import styles from './CategoryShowcase.module.css';

function MarqueeRow({ products, direction = 'left', speed = 30 }) {
  const containerRef = useRef(null);

  return (
    <div className="relative w-full overflow-hidden py-4 flex flex-col group">
      <div
        className={`flex gap-6 w-max ${direction === 'left' ? styles['marquee-left'] : styles['marquee-right']}`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {/* We duplicate the products to create an infinite scroll effect */}
        {[...products, ...products, ...products].map((product, idx) => (
          <div key={`${product.code}-${idx}`} className="w-[280px] sm:w-[320px] flex-shrink-0 transition-transform duration-300 hover:-translate-y-2">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

    </div>
  );
}

export default function CategoryShowcase({ categories = [], products = [] }) {
  if (!categories.length) return null;

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Explore Categories
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover our extensive wholesale catalog sorted by premium categories.
          </p>
        </div>

        <div className="space-y-24">
          {categories.map((category, idx) => {
            const catProducts = products.filter(p => p.categorySlug === category.slug);
            if (catProducts.length === 0) return null;

            // Split products into two rows if there are enough, else use same for both rows
            const mid = Math.ceil(catProducts.length / 2);
            const row1 = catProducts.length > 2 ? catProducts.slice(0, mid) : catProducts;
            const row2 = catProducts.length > 2 ? catProducts.slice(mid) : catProducts;

            const isEven = idx % 2 === 0;

            return (
              <div key={category.slug} className="relative w-full rounded-3xl bg-white shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
                {/* Category Banner or Simple Title if no image */}
                {category.image ? (
                  <div className={`relative h-64 md:h-80 w-full overflow-hidden flex items-center ${isEven ? 'justify-start' : 'justify-end'} p-8 md:p-16`}>
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${isEven ? 'from-slate-900/90 to-transparent' : 'from-transparent to-slate-900/90'}`} />
                    <div className={`relative z-10 max-w-lg ${!isEven && 'text-right'}`}>
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{category.name}</h3>
                      <p className="text-slate-200 mb-6">{category.description || `Premium wholesale ${category.name.toLowerCase()} products for your business.`}</p>
                      <Link href={`/categories/${category.slug}`}>
                        <button className="inline-flex items-center px-6 py-3 rounded-full bg-white text-slate-900 font-semibold hover:bg-blue-50 transition-colors">
                          See More <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 pb-0 flex justify-between items-end border-b border-slate-100 mb-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{category.name}</h3>
                      <p className="text-slate-500">{category.description || `Premium wholesale ${category.name.toLowerCase()} products for your business.`}</p>
                    </div>
                    <Link href={`/categories/${category.slug}`}>
                      <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors inline-flex items-center">
                        See More <ArrowRight className="ml-1 w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                )}

                {/* Products Marquee Rows - ONLY FOR FIRST 2 CATEGORIES */}
                {idx < 2 && (
                  <div className="py-10 bg-slate-50/50">
                    <MarqueeRow products={row1} direction="left" speed={40} />
                    {catProducts.length > 2 && (
                      <MarqueeRow products={row2} direction="right" speed={45} />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
