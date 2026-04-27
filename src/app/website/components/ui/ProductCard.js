import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  const router = useRouter();
  const isFallbackLogo = !product?.image;
  const imageSrc = product?.image || '/Muxi Trading Logo.png';

  // Discount info (passed from parent or from product itself)
  const discount = product?.discountApplied;
  const hasDiscount = !!discount;
  const originalPrice = product?.originalPrice ?? product?.price ?? 0;
  const currentPrice = product?.price ?? 0;

  const handleCardClick = () => {
    router.push(`/products/${product.code.toLowerCase()}`);
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
    <motion.div
      whileHover={{ y: -10, rotateX: 2, rotateY: 2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="perspective-1000 h-full w-full"
    >
      <Card
        onClick={handleCardClick}
        className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white transition-all duration-500 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200/70"
      >
        <CardHeader className="p-0">
          <div className="relative h-64 bg-slate-100 overflow-hidden rounded-t-[2rem]">
            <img
              src={imageSrc}
              alt={product.name}
              className={`w-full h-full transition-transform duration-700 ${isFallbackLogo
                  ? 'object-contain p-12 group-hover:scale-105'
                  : 'object-cover group-hover:scale-110'
                }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/10 to-transparent opacity-70" />
            
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Discount Badge */}
            {hasDiscount && (
              <div className="absolute top-4 right-4 z-20">
                <div className="bg-gradient-to-br from-red-500 to-orange-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg tracking-widest uppercase border border-white/20">
                  {discount.type === 'percentage'
                    ? `${discount.value}% OFF`
                    : `-Rs. ${discount.value}`}
                </div>
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 pt-6 px-6 pb-2">
          <div className="flex justify-between items-start mb-4">
            <div className="text-[10px] text-slate-700 font-black uppercase tracking-[0.2em] px-3 py-1 bg-slate-100 rounded-lg border border-slate-200">
              {product.code}
            </div>
          </div>
          
          <h3 className="font-black text-xl mb-2 text-slate-900 group-hover:text-slate-950 transition-colors line-clamp-1 tracking-tight">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-6 bg-slate-300" />
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">{product.packSize}</p>
          </div>

          {product.showPrice && (
            <div className="mb-4">
              {hasDiscount ? (
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-slate-400 line-through">
                    PKR {originalPrice.toLocaleString()}
                  </span>
                  <span className="text-2xl font-black text-red-600">
                    PKR {currentPrice.toLocaleString()}
                  </span>
                </div>
              ) : (
                <p className="text-2xl font-black text-slate-900">
                  PKR {currentPrice.toLocaleString()}
                </p>
              )}
            </div>
          )}
          
          <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </CardContent>
        
        <CardFooter className="flex justify-between items-center px-6 py-5 border-t border-slate-200 bg-slate-50/80">
          <button
            type="button"
            onClick={handleInquiryClick}
            className="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em] hover:text-slate-950 transition-colors flex items-center gap-2"
          >
            Direct Inquiry
          </button>
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
            Spec details 
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

