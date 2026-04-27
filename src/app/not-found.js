'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, ShoppingCart } from 'lucide-react';
import WebsiteLayout from './website/components/layout/WebsiteLayout';

export default function NotFound() {
  return (
    <WebsiteLayout>
      <div className="min-h-screen bg-[#0d0e10] flex items-center justify-center py-20 px-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#896336]/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#a88148]/10 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-2xl w-full text-center relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="mb-12"
          >
            <h1 className="text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-[#896336] via-[#faf2b4] to-[#a88148] leading-none drop-shadow-2xl">
              404
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-widest">
              Asset Not Located
            </h2>
            <p className="text-[#faf2b4]/50 text-xl mb-12 max-w-lg mx-auto leading-relaxed">
              The requested resource has been moved or is currently unavailable in our global repository.
            </p>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid sm:grid-cols-2 gap-6 max-w-lg mx-auto"
          >
            <Link 
              href="/"
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#896336] to-[#a88148] text-[#0d0e10] px-8 py-5 rounded-2xl font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-[0_0_20px_rgba(137,99,54,0.3)]"
            >
              <Home className="w-5 h-5" />
              HQ Home
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-3 bg-[#1a1b1e] text-[#faf2b4] border border-[#896336]/20 px-8 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#896336]/10 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Retreat
            </button>

            <Link 
              href="/categories"
              className="flex items-center justify-center gap-3 bg-transparent text-[#a88148] border border-[#896336]/40 px-8 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#896336]/5 transition-all sm:col-span-2"
            >
              <Search className="w-6 h-6" />
              Analyze Catalog
            </Link>
          </motion.div>
        </div>
      </div>
    </WebsiteLayout>
  );
}
