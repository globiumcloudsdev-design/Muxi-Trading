'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X, Package, Info } from 'lucide-react';

export default function ProductDetailModal({ product, onClose }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!product) return null;

  const imageSrc = product.image || '/Muxi Trading Logo.png';
  const categoryName = product.categoryName || product.category || 'Product';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 z-10">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-600 shadow-lg shadow-slate-200/60 transition hover:bg-slate-100"
          aria-label="Close product details"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="relative h-80 sm:h-105 bg-slate-100 overflow-hidden">
            <img
              src={imageSrc}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-slate-950/70 to-transparent p-6 text-white">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-200">{categoryName}</p>
              <h2 className="mt-2 text-3xl font-bold">{product.name}</h2>
              <p className="mt-3 text-sm text-slate-100 leading-relaxed line-clamp-2">{product.description || 'High-quality wholesale product available at competitive pricing.'}</p>
            </div>
          </div>

          <div className="p-8 md:p-10">
            <div className="mb-6 flex items-center gap-3 text-slate-600">
              <Package className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-semibold">Product Code</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{product.code}</span>
            </div>

            <div className="grid gap-4 text-slate-700">
              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">Pack Size</h3>
                <p>{product.packSize || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">Description</h3>
                <p className="leading-relaxed text-slate-600">
                  {product.description || 'No detailed description available for this product.'}
                </p>
              </div>
              {product.categorySlug && (
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">Category</h3>
                  <p className="text-slate-600 capitalize">{product.categorySlug.replace(/-/g, ' ')}</p>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Close
              </button>
              <Link
                href={`/products/${product.code.toLowerCase()}`}
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                View full page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
