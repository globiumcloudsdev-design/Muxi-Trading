"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import WebsiteLayout from '../../components/layout/WebsiteLayout';
import Container from '../../components/layout/Container';
import ProductCard from '../../components/ui/ProductCard';
import Loader from '@/components/common/Loader';

export default function CategoryDetailsPage() {
  const params = useParams();
  const slug = params?.slug;
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setNotFound(false);

        const [productsResponse, categoriesResponse, subcategoriesResponse] = await Promise.all([
          fetch(`/api/website/products?category=${slug}`, { cache: 'no-store' }),
          fetch('/api/categories', { cache: 'no-store' }),
          fetch(`/api/subcategories?slug=${slug}`, { cache: 'no-store' }),
        ]);

        const productsResult = await productsResponse.json();
        const categoriesResult = await categoriesResponse.json();
        const subcategoriesResult = await subcategoriesResponse.json();

        if (productsResponse.ok && productsResult.success) {
          setProducts(productsResult.data || []);
        }

        if (categoriesResponse.ok && categoriesResult.success) {
          const matched = (categoriesResult.data || []).find((item) => item.slug === slug);
          setCategory(matched || null);
          setNotFound(!matched);
        }

        if (subcategoriesResult.success) {
          setSubcategories(subcategoriesResult.data || []);
        }
      } catch (error) {
        console.error('Category detail page fetch error:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <WebsiteLayout>
        <section className="pt-32 pb-20 min-h-screen">
          <Container>
            <Loader />
          </Container>
        </section>
      </WebsiteLayout>
    );
  }

  if (notFound || !category) {
    return (
      <WebsiteLayout>
        <section className="pt-32 pb-20">
          <Container>
            <h1 className="text-3xl font-bold text-slate-900">Category not found</h1>
            <Link href="/categories" className="text-blue-600 mt-4 inline-block">
              Back to categories
            </Link>
          </Container>
        </section>
      </WebsiteLayout>
    );
  }

  const categoryProducts = products;

  return (
    <WebsiteLayout>
      <section className="pt-24 pb-16 bg-slate-50 min-h-screen">
        <div className="h-64 w-full relative overflow-hidden bg-gradient-to-r from-slate-900 to-slate-700">
          {category.image && (
            <img src={category.image} alt={category.name} className="w-full h-full object-cover opacity-60" />
          )}
          {!category.image && (
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <img src="/Muxi Trading Logo.png" alt="MUXI Trading" className="h-40 w-40 object-contain" />
            </div>
          )}
          <div className="absolute inset-0 bg-slate-900/55" />
          <div className="absolute inset-0 flex items-center">
            <Container>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">{category.name}</h1>
              <p className="text-slate-200 max-w-2xl">{category.description}</p>
            </Container>
          </div>
        </div>

        <Container className="mt-10 space-y-10">
          

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-5">Products</h2>
            {categoryProducts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProducts.map((product) => (
                  <ProductCard key={product.code} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600">
                Products will be added soon for this category.
              </div>
            )}
          </div>
        </Container>
      </section>
    </WebsiteLayout>
  );
}
