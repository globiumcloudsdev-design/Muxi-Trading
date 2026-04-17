import Link from 'next/link';
import Card from './Card';

export default function ProductCard({ product }) {
  const isFallbackLogo = !product?.image;
  const imageSrc = product?.image || '/Muxi Trading Logo.png';

  return (
    <Card className="group border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2">
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        <img
          src={imageSrc}
          alt={product.name}
          className={`w-full h-full transition-transform duration-500 ${
            isFallbackLogo
              ? 'object-contain p-6 bg-white group-hover:scale-105'
              : 'object-cover group-hover:scale-110'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-5">
        <div className="text-xs text-blue-600 font-semibold mb-2 inline-block px-2 py-1 bg-blue-50 rounded-md">
          Code: {product.code}
        </div>
        <h3 className="font-semibold text-lg mb-2 text-slate-900 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-slate-600 mb-2">Pack Size: {product.packSize}</p>
        <p className="text-sm text-slate-500 mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center pt-3 border-t border-slate-100">
          <a
            href={`https://wa.me/923352778488?text=I%20want%20details%20for%20${encodeURIComponent(product.name)}%20(${product.code}).`}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-green-600 hover:text-green-700 flex items-center gap-1 group/link"
          >
            <span className="group-hover/link:scale-110 transition-transform">Inquiry</span>
          </a>
          <Link 
            href={`/website/products/${product.code.toLowerCase()}`} 
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 group/link"
          >
            <span className="group-hover/link:translate-x-1 transition-transform">Details</span>
            <span className="opacity-0 group-hover/link:opacity-100 transition-opacity">→</span>
          </Link>
        </div>
      </div>
    </Card>
  );
}