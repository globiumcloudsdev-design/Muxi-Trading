import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

export default function ProductCard({ product }) {
  const router = useRouter();
  const isFallbackLogo = !product?.image;
  const imageSrc = product?.image || '/Muxi Trading Logo.png';

  const handleCardClick = () => {
    router.push(`/website/products/${product.code.toLowerCase()}`);
  };

  const handleInquiryClick = (event) => {
    event.stopPropagation();
    window.open(
      `https://wa.me/923352778488?text=I%20want%20details%20for%20${encodeURIComponent(
        product.name
      )}%20(${product.code}).`,
      '_blank',
      'noreferrer'
    );
  };

  return (
    <Card
      onClick={handleCardClick}
      className="group cursor-pointer border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2"
    >
      <CardHeader className="p-0">
        <div className="relative h-48 bg-slate-100 overflow-hidden rounded-t-xl">
          <img
            src={imageSrc}
            alt={product.name}
            className={`w-full h-full transition-transform duration-500 ${
              isFallbackLogo
                ? 'object-contain p-6 bg-white group-hover:scale-105'
                : 'object-cover group-hover:scale-110'
            }`}
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-0">
        <div className="text-xs text-blue-600 font-semibold mb-2 inline-block px-2 py-1 bg-blue-50 rounded-md">
          Code: {product.code}
        </div>
        <h3 className="font-semibold text-lg mb-2 text-slate-900 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-slate-600 mb-2">Pack Size: {product.packSize}</p>
        <p className="text-sm text-slate-500 mb-4 line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={handleInquiryClick}
          className="text-sm font-semibold text-green-600 hover:text-green-700 flex items-center gap-1"
        >
          Inquiry
        </button>
        <span className="text-sm text-blue-600 font-medium">Details</span>
      </CardFooter>
    </Card>
  );
}