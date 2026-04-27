'use client';

import WebsiteLayout from '../components/layout/WebsiteLayout';
import Container from '../components/layout/Container';
import ContactSection from '../components/sections/ContactSection';
import { motion } from 'framer-motion';
import { FadeIn, ScaleIn } from '../components/ui/animations';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Button from '../components/ui/Button';

export default function ContactPage() {
  const contactHighlights = [
    { icon: Phone, label: 'Direct Line', value: '+92 335 2778488', color: 'from-blue-500 to-blue-600' },
    { icon: Mail, label: 'Email Us', value: 'info@muxitrading.com', color: 'from-green-500 to-emerald-600' },
    { icon: MapPin, label: 'Location', value: 'Buffer Zone, Karachi', color: 'from-orange-500 to-red-500' },
    { icon: Clock, label: 'Response Time', value: 'Within 2 hours', color: 'from-purple-500 to-violet-600' },
  ];

  return (
    <WebsiteLayout>
      {/* Enhanced Contact Hero Section */}
      <section className="relative min-h-[85vh] lg:min-h-[750px] overflow-hidden flex items-center pt-28 pb-16 bg-[#0a0b0d]">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_rgba(168,129,72,0.15),_transparent_50%),radial-gradient(ellipse_at_70%_80%,_rgba(137,99,54,0.12),_transparent_50%),radial-gradient(ellipse_at_center,_rgba(201,162,92,0.08),_transparent_60%)]" />
          
          {/* Animated gradient orbs */}
          <motion.div 
            className="absolute top-10 left-10 w-[500px] h-[500px] bg-[#896336]/15 rounded-full blur-[120px] opacity-60"
            animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#a88148]/10 rounded-full blur-[150px] opacity-50"
            animate={{ x: [0, -40, 0], y: [0, 30, 0], scale: [1, 0.9, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#c9a25c]/10 rounded-full blur-[100px] opacity-40"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />

          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZyIgeD0iMCIgeT0iMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0gMCAwaDQwIDR2NDAwaC00MHoiLz48cGF0aCBkPSJNOSAyMHYyMGgydjIwaDJ2LTIwaDJ2MjBoMnYtMjBoMnYyMGgyMnYtMjBoMi4wMHYyMGgtMnptMjAgMGwyMCAyMHYyMGgyMHYtMjBoMjB2MjBoLTIwdjIwaiIgLz48L2c+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+')] opacity-20" />
        </div>

        <Container className="relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start pt-12">
            {/* Left Column - Hero Content */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:pt-8"
            >
              {/* <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-[#a88148]/50 bg-gradient-to-r from-[#896336]/30 via-[#896336]/10 to-[#a88148]/30 px-5 py-3 mb-8 backdrop-blur-sm"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-[#a88148]/40 blur-md rounded-full animate-pulse" />
                  <Mail className="h-5 w-5 text-[#faf2b4] relative z-10" />
                </div>
                <span className="text-sm font-semibold text-[#faf2b4] uppercase tracking-[0.2em] bg-gradient-to-r from-[#faf2b4] to-[#a88148] bg-clip-text">
                  Get in Touch
                </span>
              </motion.div> */}

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#896336] via-[#faf2b4] to-[#a88148]">
                  Let's Build
                </span>
                <br />
                <span className="text-white">
                  Something Great
                </span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="inline-block h-1 w-32 bg-gradient-to-r from-[#896336] via-[#a88148] to-transparent rounded ml-1"
                />
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-lg md:text-xl text-[#faf2b4]/80 mb-10 max-w-xl leading-relaxed font-light tracking-wide"
              >
                Ready to discuss your wholesale needs? Our team is here to provide category-wise rates, bulk quantity support, and fast fulfillment for your business growth.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="flex flex-wrap gap-5"
              >
                <Link href="#contact-us" className="scroll-mt-28">
                  <Button size="lg" className="group relative bg-gradient-to-r from-[#896336] via-[#a88148] to-[#c9a25c] hover:from-[#a88148] hover:to-[#c9a25c] border-0 text-[#0a0b0d] font-bold px-14 py-8 text-xl transition-all duration-500 shadow-[0_0_30px_rgba(168,129,72,0.4)] hover:shadow-[0_0_50px_rgba(168,129,72,0.6)] hover:scale-105">
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <span>Start Conversation</span>
                      <ArrowRight className="h-7 w-7 transition-transform duration-500 group-hover:translate-x-2" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#faf2b4]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                  </Button>
                </Link>

                <Link href="tel:+923352778488">
                  <Button size="lg" variant="outline" className="group border-[#896336]/50 text-[#faf2b4] hover:bg-[#896336]/20 hover:border-[#a88148]/70 hover:shadow-[0_0_30px_rgba(168,129,72,0.3)] px-14 py-8 text-xl transition-all duration-500 backdrop-blur-sm">
                    <span className="relative z-10 flex items-center justify-center gap-3 font-semibold">
                      <span className="group-hover:text-[#a88148] transition-colors duration-500">Call Now</span>
                      <span className="text-[#a88148] group-hover:text-[#faf2b4] transition-colors duration-500">→</span>
                    </span>
                  </Button>
                </Link>
              </motion.div>

              {/* Contact Highlights */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 pt-8 border-t border-[#896336]/20"
              >
                {contactHighlights.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + idx * 0.1, duration: 0.5 }}
                      className="group relative p-4 rounded-xl bg-gradient-to-br from-[#896336]/10 via-[#896336]/5 to-transparent border border-[#896336]/20 hover:border-[#a88148]/50 hover:bg-gradient-to-br hover:from-[#896336]/20 hover:to-[#a88148]/10 transition-all duration-500 cursor-pointer"
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#a88148]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className={`relative w-10 h-10 mb-3 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-xs font-medium text-[#faf2b4]/60 group-hover:text-[#faf2b4]/90 transition-colors duration-500">
                        {item.label}
                      </p>
                      <p className="text-sm font-bold text-[#faf2b4] mt-1 truncate group-hover:text-[#a88148] transition-colors duration-500">
                        {item.value}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Right Column - Visual Element */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="hidden lg:flex relative h-[600px] items-center justify-center"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Central Contact Node */}
                <motion.div 
                  className="absolute w-80 h-80 bg-gradient-to-br from-[#896336]/40 via-[#a88148]/30 to-[#c9a25c]/20 rounded-full blur-[60px]"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 0 10px rgba(168,129,72,0.3))' }}>
                  <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#896336',stopOpacity:0.6}}
                      />
                      <stop offset="50%" style={{stopColor:'#a88148',stopOpacity:0.8}}
                      />
                      <stop offset="100%" style={{stopColor:'#c9a25c',stopOpacity:0.4}}
                      />
                    </linearGradient>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#a88148" />
                    </marker>
                  </defs>
                  {/* Animated lines connecting nodes */}
                  {[45, 135, 225, 315].map((angle, idx) => {
                    const x1 = 200 + Math.cos(angle * Math.PI / 180) * 80;
                    const y1 = 200 + Math.sin(angle * Math.PI / 180) * 80;
                    const x2 = 200 + Math.cos(angle * Math.PI / 180) * 180;
                    const y2 = 200 + Math.sin(angle * Math.PI / 180) * 180;
                    return (
                      <motion.line
                        key={idx}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="url(#lineGrad)"
                        strokeWidth="2"
                        strokeDasharray="8,4"
                        markerEnd="url(#arrowhead)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: [0.4, 0.8, 0.4] }}
                        transition={{ delay: 1 + idx * 0.2, duration: 2 }}
                      />
                    );
                  })}
                </svg>

                {/* Outer connection nodes */}
                {[45, 135, 225, 315].map((angle, idx) => {
                  const x = 200 + Math.cos(angle * Math.PI / 180) * 180;
                  const y = 200 + Math.sin(angle * Math.PI / 180) * 180;
                  const icons = [Phone, Mail, MapPin, Clock];
                  const labels = ['Call', 'Email', 'Visit', 'Hours'];
                  const Icon = icons[idx];
                  
                  return (
                    <motion.div
                      key={idx}
                      className="absolute w-28 h-28 -translate-x-14 -translate-y-14 rounded-2xl bg-gradient-to-br from-[#896336]/30 via-[#896336]/20 to-[#a88148]/10 border border-[#896336]/40 backdrop-blur-xl flex flex-col items-center justify-center gap-2 cursor-pointer group"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1, x, y }}
                      transition={{ delay: 1.5 + idx * 0.2, duration: 0.6, type: "spring" }}
                      whileHover={{ 
                        scale: 1.15, 
                        rotate: 5,
                        boxShadow: '0_0_40px_rgba(168,129,72,0.5)',
                        backgroundColor: 'rgba(168,129,72,0.3)'
                      }}
                    >
                      <Icon className="h-8 w-8 text-[#a88148] group-hover:text-[#faf2b4] transition-colors duration-500" />
                      <span className="text-[#faf2b4]/70 text-xs font-medium group-hover:text-[#faf2b4] transition-colors duration-500">
                        {labels[idx]}
                      </span>
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#896336]/20 to-[#a88148]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        initial={false}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Full Contact Section */}
      <ContactSection />

      {/* Spacer */}
      <div className="h-24" />
    </WebsiteLayout>
  );
}

