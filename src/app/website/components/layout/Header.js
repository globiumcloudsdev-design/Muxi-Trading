'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, User, Search, ShoppingCart, Heart, Globe, ChevronDown } from 'lucide-react';
import Image from 'next/image';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Categories', href: '/categories', hasDropdown: true },
  { name: 'About Us', href: '/about' },
  { name: 'Discount Offers', href: '/discount-offers' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const controller = new AbortController();

    const loadCategories = async () => {
      try {
        const response = await fetch('/api/categories?limit=all', {
          cache: 'no-store',
          signal: controller.signal,
        });
        const result = await response.json();

        if (response.ok && result.success) {
          const sortedCategories = [...(result.data || [])].sort((left, right) => {
            const leftDate = new Date(left.updatedAt || left.createdAt || 0).getTime();
            const rightDate = new Date(right.updatedAt || right.createdAt || 0).getTime();
            return rightDate - leftDate;
          });

          setCategories(sortedCategories.slice(0, 3));
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Header categories fetch error:', error);
        }
      }
    };

    loadCategories();

    return () => controller.abort();
  }, []);

  const navbarBg = isScrolled 
    ? 'bg-[#0d0e10]/90 backdrop-blur-xl border-[#896336]/30 shadow-[0_8px_30px_rgb(0,0,0,0.8)] shadow-[#896336]/10' 
    : 'bg-transparent border-transparent';

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[100] px-4 py-4 md:px-8 transition-all duration-500 flex justify-center">
        <motion.div 
          className={`flex items-center justify-between w-full max-w-[1400px] border transition-all duration-500 rounded-full px-6 py-3 md:py-4 ${navbarBg}`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            width: isScrolled ? '95%' : '100%',
          }}
        >
          {/* Left: Logo Section */}
          <Link href="/" className="group flex items-center gap-3 relative z-10">
            <div className="relative w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 border border-blue-100/20">
              <Image 
                src="/images/logo.png" 
                alt="MUXI Trading" 
                width={32} 
                height={32} 
                className="object-contain"
              />
              <div className="absolute inset-0 bg-white/20 group-hover:opacity-100 opacity-0 mix-blend-overlay transition-opacity duration-300" />
            </div>
            <div className="hidden sm:block">
              <span className={`font-bold text-xl md:text-2xl tracking-tight transition-colors duration-300 ${isScrolled ? 'text-[#faf2b4]' : 'text-slate-950 drop-shadow-sm'}`}>
                MUXI
              </span>
              <p className={`text-[9px] md:text-[10px] tracking-[0.2em] uppercase mt-[-2px] transition-colors duration-300 ${isScrolled ? 'text-[#a88148]' : 'text-slate-700'}`}>
                Wholesale
              </p>
            </div>
          </Link>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 relative z-10">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              
              return (
                <div 
                  key={item.name}
                  className="relative group py-2"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
                >
                  <Link 
                    href={item.href}
                    className={`flex items-center gap-1 font-semibold text-sm transition-colors duration-300 ${
                      isActive 
                        ? (isScrolled ? 'text-[#a88148]' : 'text-[#faf2b4]') 
                        : (isScrolled ? 'text-slate-200 hover:text-[#faf2b4]' : 'text-slate-950 hover:text-[#a88148]')
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />}
                  </Link>

                  {/* Active Indicator & Hover Glow */}
                  <div className="absolute -bottom-1 left-0 w-full h-[2px] overflow-hidden rounded-full">
                    <div className={`w-full h-full bg-gradient-to-r from-[#896336] to-[#a88148] transform transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                  </div>

                  {/* Mega Dropdown for Categories */}
                  {item.hasDropdown && (
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 15 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full -left-1/2 pt-6 w-[600px] cursor-default"
                        >
                          <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl flex gap-6">
                            <div className="flex-1 space-y-4">
                              <h3 className="text-[#a88148] text-xs font-bold uppercase tracking-wider">Latest Categories</h3>
                              <div className="grid grid-cols-1 gap-3">
                                {categories.length > 0 ? (
                                  categories.map((category) => (
                                    <Link
                                      key={category.slug}
                                      href={`/categories/${category.slug}`}
                                      className="text-white hover:text-[#faf2b4] text-sm flex items-center gap-2 group/cat"
                                    >
                                      <div className="w-1.5 h-1.5 rounded-full bg-[#896336] group-hover/cat:bg-[#faf2b4] transition-colors" />
                                      {category.name}
                                    </Link>
                                  ))
                                ) : (
                                  <p className="text-sm text-slate-400">Loading categories...</p>
                                )}
                              </div>
                              <Link href="/categories" className="inline-block mt-4 text-[#a88148] text-sm font-semibold hover:underline underline-offset-4">
                                See more categories →
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 md:gap-5 relative z-10">
            {/* Search */}
            <div className={`flex items-center transition-all duration-300 rounded-full ${isSearchOpen ? 'bg-white/10 px-3 py-1.5 border border-white/20' : ''}`}>
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className={`p-2 rounded-full transition-colors ${isScrolled ? 'text-[#faf2b4] hover:text-white hover:bg-white/10' : 'text-slate-950 hover:text-[#a88148] hover:bg-slate-100'}`}>
                <Search className="w-5 h-5" />
              </button>
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 150, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    placeholder="Search..."
                    className="bg-transparent border-none outline-none text-sm px-2 text-[#faf2b4] placeholder:text-[#a88148]/50 w-[150px]"
                    autoFocus
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Icons */}
            <div className="hidden md:flex items-center gap-2">
              <button className={`p-2 rounded-full transition-colors ${isScrolled ? 'text-[#faf2b4] hover:text-white hover:bg-white/10' : 'text-slate-950 hover:text-[#a88148] hover:bg-slate-100'}`}>
                <Globe className="w-5 h-5" />
              </button>
              <button className={`p-2 rounded-full transition-colors ${isScrolled ? 'text-[#faf2b4] hover:text-white hover:bg-white/10' : 'text-slate-950 hover:text-[#a88148] hover:bg-slate-100'}`}>
                <Heart className="w-5 h-5" />
              </button>
              <Link href="/auth/login" className={`p-2 rounded-full transition-colors ${isScrolled ? 'text-[#faf2b4] hover:text-white hover:bg-white/10' : 'text-slate-950 hover:text-[#a88148] hover:bg-slate-100'}`}>
                <User className="w-5 h-5" />
              </Link>
            </div>

            {/* Cart */}
            <Link href="/cart" className={`relative p-2 rounded-full transition-colors ${isScrolled ? 'text-[#faf2b4] hover:text-white hover:bg-white/10' : 'text-slate-950 hover:text-[#a88148] hover:bg-slate-100'}`}>
              <ShoppingCart className="w-5 h-5" />
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute 0 top-0 right-0 w-4 h-4 bg-[#896336] text-[#faf2b4] text-[9px] font-bold flex items-center justify-center rounded-full shadow-lg shadow-[#896336]/50"
              >
                0
              </motion.span>
            </Link>


            {/* Mobile Menu Toggle */}
            <button 
              className={`lg:hidden p-2 rounded-full transition-colors ${isScrolled ? 'text-white bg-white/10' : 'text-slate-950 bg-slate-100'}`}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[101]"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-screen w-[85%] max-w-[320px] bg-slate-900 z-[102] border-r border-slate-800 flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <Image src="/images/logo.png" alt="MUXI" width={24} height={24} />
                  </div>
                  <span className="font-bold text-white text-lg tracking-wide">MUXI Trading</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                {navItems.map(item => (
                  <div key={item.name}>
                    <Link 
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block w-full px-4 py-3 text-lg font-medium rounded-xl transition-colors ${pathname === item.href ? 'bg-blue-600/20 text-blue-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-slate-800 space-y-4">
                <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-800 text-white font-semibold">
                  <User className="w-5 h-5" /> Login / Register
                </Link>
                <a href="https://wa.me/923352778488" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg shadow-blue-900/50">
                  Contact Sales
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
