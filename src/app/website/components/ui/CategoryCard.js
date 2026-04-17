import Link from 'next/link';
import { ArrowRight, Boxes } from 'lucide-react';
import Card from './Card';

export default function CategoryCard({ category, href, compact = false }) {
  const isFallbackLogo = !category?.image;
  const imageSrc = category?.image || '/Muxi Trading Logo.png';

  return (
    <Link href={href} className="group block h-full [perspective:1200px]">
      <Card className="relative h-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-[0_16px_45px_rgba(15,23,42,0.08)] transition-all duration-700 hover:shadow-[0_26px_70px_rgba(37,99,235,0.18)] [transform-style:preserve-3d] group-hover:[transform:rotateX(5deg)_rotateY(-6deg)_translateY(-10px)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_42%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className={`relative ${compact ? 'h-52' : 'h-64'} overflow-hidden border-b border-slate-100 bg-gradient-to-br from-slate-50 via-white to-blue-50/50`}>
          <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-1 rounded-full border border-white/80 bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 shadow-sm">
            <Boxes className="h-3.5 w-3.5" />
            Category
          </div>

          <img
            src={imageSrc}
            alt={category.name}
            className={`h-full w-full transition-all duration-700 ${isFallbackLogo ? 'object-contain p-8' : 'object-contain p-5'} group-hover:scale-110`}
          />

          <div className="absolute inset-x-10 bottom-3 h-8 rounded-full bg-blue-400/20 blur-xl" aria-hidden="true" />
        </div>

        <div className="relative p-6">
          <h3 className="text-xl font-black leading-snug text-slate-900 transition-colors duration-300 group-hover:text-blue-700">
            {category.name}
          </h3>

          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">
            {category.description || 'Discover top wholesale products in this category with verified sourcing and fast dispatch support.'}
          </p>

          <div className="mt-5 flex items-center justify-between">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
              {category?.slug || 'catalog'}
            </span>

            <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-all duration-300 group-hover:text-indigo-600 group-hover:translate-x-1">
              View Details
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
