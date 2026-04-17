'use client';

import { FileText, ArrowRight } from 'lucide-react';
import Container from '../layout/Container';
import Button from '../ui/Button';

export default function CatalogSection() {
  return (
    <section className="py-24 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <Container>
        <div className="relative rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm px-6 py-12 md:px-12 md:py-16 text-center overflow-hidden animate-fade-in-up">
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-blue-500/30 rounded-tl-lg animate-fade-in-left" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-lg animate-fade-in-right" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-purple-500/30 rounded-bl-lg animate-fade-in-left" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-blue-500/30 rounded-br-lg animate-fade-in-right" />
          
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6 animate-fade-in-up stagger-1">
              <FileText className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-blue-300 font-medium">Product Catalog</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent animate-fade-in-up stagger-2">
              Need Full Product Line?
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in-up stagger-3">
              Get the latest wholesale catalog details directly from our team with updated 
              product specifications, pack sizes, and category coverage.
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <a 
href="https://wa.me/923352778488?text=Hello%20MUXI%20Trading%2C%20I%20would%20like%20to%20receive%20the%20latest%20product%20catalog."
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="outline" size="lg" className="border-slate-600 text-white hover:bg-slate-700/50 hover:border-slate-500 hover-lift animate-fade-in-up stagger-4">
                  Request Digital Copy
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}