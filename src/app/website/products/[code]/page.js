"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import WebsiteLayout from '../../components/layout/WebsiteLayout';
import Container from '../../components/layout/Container';
import Loader from '@/components/common/Loader';

export default function ProductDetailsPage() {
  const params = useParams();
  const code = params?.code;
  const [apiProduct, setApiProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!code) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setNotFound(false);

        const response = await fetch(`/api/website/products/${code}`, { cache: 'no-store' });
        const result = await response.json();

        if (response.ok && result.success) {
          setApiProduct(result.data);
        } else {
          setApiProduct(null);
          setNotFound(true);
        }
      } catch (error) {
        console.error('Product details fetch error:', error);
        setApiProduct(null);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [code]);

  const product = apiProduct;
  const isFallbackLogo = !product?.image;
  const heroImage = product?.image || '/Muxi Trading Logo.png';

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

  if (notFound || !product) {
    return (
      <WebsiteLayout>
        <section className="pt-32 pb-20">
          <Container>
            <h1 className="text-3xl font-bold text-slate-900">Product not found</h1>
            <Link href="/categories" className="text-blue-600 mt-4 inline-block">
              Back to categories
            </Link>
          </Container>
        </section>
      </WebsiteLayout>
    );
  }

  return (
    <WebsiteLayout>
      <section className="pt-24 pb-16 bg-slate-50 min-h-screen">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <img
                  src={heroImage}
                  alt={product.name}
                  className={`w-full h-[420px] rounded-xl ${
                    isFallbackLogo ? 'object-contain p-8 bg-slate-50' : 'object-cover'
                  }`}
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {(product.gallery || [heroImage]).slice(0, 3).map((image, index) => (
                  <div key={`${image}-${index}`} className="rounded-lg border border-slate-200 bg-white p-1">
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className={`w-full h-24 rounded-md ${
                        isFallbackLogo ? 'object-contain p-2 bg-slate-50' : 'object-cover'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
              <p className="text-sm font-semibold text-blue-700 mb-2">Product Code: {product.code}</p>
              <h1 className="text-3xl font-bold text-slate-900 mb-3">{product.name}</h1>
              <p className="text-slate-600 mb-2">Pack Size: {product.packSize}</p>
              {product.showPrice && (
                <div className="mb-4">
                  {product.discountApplied ? (
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-lg font-semibold text-slate-400 line-through">
                        PKR {(product.originalPrice || product.price)?.toLocaleString()}
                      </span>
                      <span className="text-3xl font-black text-red-600">
                        PKR {product.price?.toLocaleString()}
                      </span>
                      <span className="text-sm font-bold text-white bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1 rounded-full">
                        {product.discountApplied.type === 'percentage'
                          ? `${product.discountApplied.value}% OFF`
                          : `-Rs. ${product.discountApplied.value}`}
                      </span>
                    </div>
                  ) : (
                    <p className="text-2xl font-bold text-blue-700">
                      PKR {product.price?.toLocaleString() || 0}
                    </p>
                  )}
                </div>
              )}
              <p className="text-slate-600 leading-relaxed mb-6">{product.description}</p>

              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/923352778488?text=Hello%20MUXI%20Trading%2C%20I%20need%20quote%20for%20${encodeURIComponent(product.name)}%20(${product.code})`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-green-500 px-5 py-3 text-white font-medium hover:bg-green-600 transition-colors shadow-sm"
                >
                  WhatsApp Inquiry
                </a>
                <button
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/30"
                  onClick={() => alert('Added to cart successfully!')}
                >
                  Add to Cart
                </button>
                <Link
                  href="/cart"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-white font-medium hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Buy Now / Checkout
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </WebsiteLayout>
  );
}
