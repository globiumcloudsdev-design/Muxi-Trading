'use client';

import Container from '../layout/Container';

export default function BrandSlider({ brands = [] }) {
  const duplicatedBrands = brands.length > 0 ? [...brands, ...brands] : [];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 animate-fade-in-up">
            Trusted Brand Partners
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto animate-fade-in-up stagger-1">
            We source and supply high-demand products from globally recognized brands
          </p>
        </div>

        <div className="relative overflow-hidden animate-fade-in-up stagger-2">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
          
          <div className="flex gap-8 w-max animate-brand-scroll">
            {duplicatedBrands.length > 0 ? duplicatedBrands.map((brand, index) => (
              <div
                key={`${brand}-${index}`}
                className="min-w-[180px] rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 px-6 py-5 text-center shadow-sm hover:shadow-md hover:border-blue-300 hover:-translate-y-1 transition-all duration-300"
              >
                <span className="font-semibold text-slate-700">{brand}</span>
              </div>
            )) : (
              <div className="text-slate-500">No brand data available.</div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}