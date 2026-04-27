// 'use client';

// import Link from 'next/link';
// import { ArrowRight, Sparkles } from 'lucide-react';
// import Button from '../ui/Button';
// import Container from '../layout/Container';
// import HeroCanvas from '@/components/common/HeroCanvas';
// import { motion } from 'framer-motion';
// import DiscountModal from '@/components/common/DiscountModal';


// export default function HeroSection() {
//   const floatingCards = [
//     { name: 'Verified Stock', icon: '✓', color: 'from-[#896336] to-[#a88148]', delay: 0, glow: 'rgba(137,99,54,0.4)' },
//     { name: 'Fast Dispatch', icon: '↗', color: 'from-[#a88148] to-[#c9a25c]', delay: 0.2, glow: 'rgba(168,129,72,0.4)' },
//     { name: 'Bulk Pricing', icon: 'PKR', color: 'from-[#c9a25c] to-[#896336]', delay: 0.4, glow: 'rgba(201,162,92,0.4)' },
//   ];

//   return (
//     <section className="relative min-h-[95vh] lg:min-h-[900px] overflow-hidden flex items-center pt-28 pb-24 bg-[#0a0b0d]">
//       {/* Enhanced Background Elements */}
//       <div className="absolute inset-0 z-0">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(168,129,72,0.12),_transparent_60%),radial-gradient(ellipse_at_bottom_right,_rgba(137,99,54,0.08),_transparent_50%),radial-gradient(ellipse_at_left_center,_rgba(201,162,92,0.06),_transparent_50%)]" />
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#896336]/10 rounded-full blur-[150px] animate-pulse-slow" />
//           <div className="absolute bottom-[-30%] right-[-15%] w-[600px] h-[600px] bg-[#a88148]/8 rounded-full blur-[120px] animate-float" />
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#c9a25c]/5 rounded-full blur-[80px] animate-pulse" />
//         </div>
//         <HeroCanvas />
//         <div className="absolute inset-0 bg-[#0a0b0d]/70" />
//         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZyIgeD0iMCIgeT0iMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0gMCAwaDQwIDR2NDAwaC00MHoiLz48cGF0aCBkPSJNOSAyMHYyMGgydi0yMGgydjIwaDJ2LTIwaDIvdjIwaDJ2LTJtMjAgMGwyMCAyMHYyMGgyMHYtMjBoMjB2MjBoLTIwdjIway0yMCAyMHYtMjBsMjAgMjB2MjBoMjB2LTIwaC0yMHYtMjBoMjB2MjBoLTIwdjIwaiIgLz48L2c+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+')] opacity-10" />
//       </div>
//       <Container className="relative z-10">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           <motion.div 
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.9, ease: "easeOut" }}
//           >
//             <motion.div 
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               className="inline-flex items-center gap-2 rounded-full border border-[#a88148]/40 bg-gradient-to-r from-[#896336]/20 via-[#896336]/10 to-[#a88148]/20 px-5 py-3 mb-10 backdrop-blur-sm group hover:border-[#a88148]/70 hover:scale-105 transition-all duration-500"
//             >
//               <div className="relative">
//                 <div className="absolute inset-0 bg-[#a88148]/30 blur-lg rounded-full animate-pulse-slow" />
//                 <Sparkles className="h-5 w-5 text-[#faf2b4] relative z-10" />
//               </div>
//               <span className="text-sm font-semibold text-[#faf2b4] uppercase tracking-[0.25em] bg-gradient-to-r from-[#faf2b4] to-[#a88148] bg-clip-text">Trusted by Industry Leaders</span>
//             </motion.div>

//             <motion.h1 
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//               className="text-5xl md:text-7xl lg:text-[5.5rem] xl:text-[6rem] font-bold leading-[1.05] text-white mb-6 overflow-hidden"
//             >
//               <span className="inline-block">
//                 Buy bulk. 
//               </span>
//               <span className="inline-block">
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#896336] via-[#faf2b4] via-[80%] to-[#a88148] drop-shadow-[0_0_30px_rgba(168,129,72,0.5)]">Move faster.</span>
//               </span>
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={{ width: '100%' }}
//                 transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
//                 className="h-1 bg-gradient-to-r from-[#896336] via-[#a88148] to-transparent mt-4 rounded"
//               />
//             </motion.h1>

//             <motion.p 
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//               className="text-lg md:text-2xl text-[#faf2b4]/80 mb-12 max-w-2xl leading-relaxed font-light tracking-wide"
//             >
//               Premium wholesale inventory for distributors, retailers, and institutional buyers across <span className="text-[#faf2b4] font-semibold">6 core sectors</span> with verified stock and rapid fulfillment.
//             </motion.p>

//             <motion.div 
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6 }}
//               className="flex flex-wrap gap-6 items-center"
//             >
//               <Link href="/categories">
//                 <Button size="lg" className="group relative bg-gradient-to-r from-[#896336] via-[#a88148] to-[#c9a25c] hover:from-[#a88148] hover:to-[#c9a25c] border-0 text-[#0a0b0d] font-bold px-12 py-8 text-xl transition-all duration-500 shadow-[0_0_30px_rgba(168,129,72,0.4)] hover:shadow-[0_0_50px_rgba(168,129,72,0.6)] hover:scale-105">
//                   <span className="relative z-10 flex items-center justify-center gap-3">
//                     <span>Explore Categories</span>
//                     <ArrowRight className="h-7 w-7 transition-transform duration-500 group-hover:translate-x-2" />
//                   </span>
//                   <div className="absolute inset-0 bg-gradient-to-r from-[#faf2b4]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                 </Button>
//               </Link>
//               <Link href="/about">
//                 <Button size="lg" variant="outline" className="group border-[#896336]/40 text-[#faf2b4] hover:bg-[#896336]/20 hover:border-[#a88148]/70 hover:shadow-[0_0_30px_rgba(168,129,72,0.3)] px-12 py-8 text-xl transition-all duration-500 backdrop-blur-sm">
//                   <span className="relative z-10 flex items-center justify-center gap-3 font-semibold">
//                     <span>Discover MUXI</span>
//                     <span className="text-[#a88148] group-hover:text-[#faf2b4] transition-colors duration-500">→</span>
//                   </span>
//                 </Button>
//               </Link>
//             </motion.div>
            
//             {/* Decorative floating orbs */}
//             <motion.div 
//               className="absolute -top-10 -left-10 w-32 h-32 bg-[#896336]/10 rounded-full blur-[60px] animate-float-slow"
//               animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
//               transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//             />
//             <motion.div 
//               className="absolute -bottom-20 -right-10 w-40 h-40 bg-[#a88148]/10 rounded-full blur-[80px] animate-float"
//               animate={{ y: [0, 10, 0], opacity: [0.4, 0.7, 0.4] }}
//               transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//             />

       

         

//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//               className="flex flex-wrap gap-5"
//             >
//               {/* <Link href="/categories">
//                 <Button size="lg" className="bg-gradient-to-r from-[#896336] to-[#a88148] hover:opacity-90 border-0 text-[#0d0e10] font-bold px-10 py-7 text-lg transition-all shadow-[0_0_20px_rgba(137,99,54,0.3)]">
//                   Browse Categories
//                   <ArrowRight className="ml-2 h-6 w-6" />
//                 </Button>
//               </Link>
//               <Link href="/about">
//                 <Button size="lg" variant="outline" className="border-[#896336]/50 text-[#faf2b4] hover:bg-[#896336]/10 backdrop-blur-md px-10 py-7 text-lg transition-all">
//                   Why MUXI
//                 </Button>
//               </Link> */}
//             </motion.div>
//           </motion.div>

//           <div className="hidden lg:flex relative h-[600px] xl:h-[700px] items-center justify-center">
//             <div className="relative w-full h-full flex items-center justify-center">
//               {/* Enhanced Floating Cards Visualization */}
//               {floatingCards.map((card, idx) => (
//                 <motion.div
//                   key={card.name}
//                   initial={{ opacity: 0, scale: 0.6, y: 50 }}
//                   animate={{ 
//                     opacity: 1, 
//                     scale: 1,
//                     y: [0, -20, 0],
//                     rotate: [0, 0.5, 0]
//                   }}
//                   transition={{ 
//                     delay: card.delay,
//                     duration: 5,
//                     repeat: Infinity,
//                     ease: "easeInOut"
//                   }}
//                   whileHover={{ 
//                     scale: 1.2, 
//                     rotate: 0,
//                     boxShadow: `0_0_40px_${card.glow}` 
//                   }}
//                   className={`absolute p-8 rounded-3xl bg-gradient-to-br ${card.color} shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/20 backdrop-blur-xl backdrop-filter w-56 text-center cursor-pointer z-[${10 - idx}] group transition-all duration-500`}
//                   style={{
//                     top: idx === 0 ? '8%' : idx === 1 ? '35%' : '75%',
//                     left: idx === 0 ? '15%' : idx === 1 ? '48%' : '20%',
//                   }}
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                   <div className="relative z-10">
//                     <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#0a0b0d]/50 to-[#0a0b0d]/30 backdrop-blur-xl flex items-center justify-center border border-white/20 group-hover:border-[#a88148]/50 transition-all duration-500">
//                       <span className="text-4xl font-black text-[#faf2b4] drop-shadow-[0_0_20px_rgba(168,129,72,0.8)] group-hover:drop-shadow-[0_0_30px_rgba(168,129,72,1)] transition-all duration-500">
//                         {card.icon}
//                       </span>
//                     </div>
//                     <h3 className="font-bold text-[#faf2b4] text-xl mb-3 group-hover:text-white transition-colors duration-500">
//                       {card.name}
//                     </h3>
//                     <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#896336] via-[#a88148] to-[#c9a25c] opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
//                   </div>
//                   <motion.div
//                     className="absolute -top-2 -right-2 w-4 h-4 bg-[#a88148]/50 rounded-full blur-sm"
//                     animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
//                     transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//                   />
//                 </motion.div>
//               ))}
              
//               {/* Central Orb with enhanced glow */}
//               <motion.div 
//                 className="absolute inset-0 flex items-center justify-center"
//                 animate={{ scale: [1, 1.1, 1], opacity: [0.7, 0.9, 0.7] }}
//                 transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//               >
//                 <div className="w-[400px] h-[400px] bg-gradient-to-br from-[#896336]/30 via-[#a88148]/20 to-[#c9a25c]/10 rounded-full blur-[80px] pointer-events-none" />
//                 <div className="absolute w-[200px] h-[200px] bg-gradient-to-br from-[#a88148]/40 to-[#896336]/30 rounded-full blur-[40px] animate-pulse" />
//               </motion.div>
              
//               {/* Floating particles */}
//               <div className="absolute inset-0 overflow-hidden pointer-events-none">
//                 {[...Array(15)].map((_, i) => (
//                   <motion.div
//                     key={`particle-${i}`}
//                     className="absolute w-2 h-2 bg-[#a88148]/30 rounded-full blur-[1px]"
//                     initial={{ 
//                       x: Math.random() * 500,
//                       y: Math.random() * 500,
//                       opacity: 0
//                     }}
//                     animate={{
//                       opacity: [0, 1, 0],
//                       y: [Math.random() * 100, -50 - Math.random() * 100],
//                       x: [0, (Math.random() - 0.5) * 100]
//                     }}
//                     transition={{
//                       duration: 3 + Math.random() * 4,
//                       repeat: Infinity,
//                       delay: Math.random() * 5,
//                       ease: "easeInOut"
//                     }}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
        
//       </Container>
//       <DiscountModal />
//     </section>
//   );
// }
'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import Container from '../layout/Container';
import HeroCanvas from '@/components/common/HeroCanvas';
import { motion } from 'framer-motion';



export default function HeroSection() {
  const floatingCards = [
    { name: 'Verified Stock', icon: '✓', color: 'from-[#896336] to-[#a88148]', delay: 0 },
    { name: 'Fast Dispatch', icon: '↗', color: 'from-[#896336] to-[#a88148]', delay: 0.2 },
    { name: 'Bulk Pricing', icon: 'PKR', color: 'from-[#896336] to-[#a88148]', delay: 0.4 },
  ];

  return (
    <section className="relative min-h-[90vh] lg:min-h-[850px] overflow-hidden flex items-center pt-32 pb-20 bg-[#0d0e10]">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(137,99,54,0.15),_transparent_50%),radial-gradient(circle_at_bottom_left,_rgba(168,129,72,0.1),_transparent_50%)]" />
        <HeroCanvas />
        <div className="absolute inset-0 bg-[#0d0e10]/60 backdrop-blur-[1px]" />
      </div>

      <Container className="relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#896336]/30 bg-[#896336]/10 px-4 py-2 mb-8"
            >
              <Sparkles className="h-4 w-4 text-[#a88148]" />
              <span className="text-sm font-semibold text-[#faf2b4] uppercase tracking-[0.2em]">Wholesale, simplified</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-white mb-8"
            >
              Buy bulk. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#896336] via-[#faf2b4] to-[#a88148]">Move faster.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-[#faf2b4]/70 mb-10 max-w-xl leading-relaxed"
            >
              MUXI Trading supplies verified wholesale inventory for distributors, retailers, and institutional buyers across core categories.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-5"
            >
              <Link href="/categories">
                <Button size="lg" className="bg-gradient-to-r from-[#896336] to-[#a88148] hover:opacity-90 border-0 text-[#0d0e10] font-bold px-10 py-7 text-lg transition-all shadow-[0_0_20px_rgba(137,99,54,0.3)]">
                  Browse Categories
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-[#896336]/50 text-[#faf2b4] hover:bg-[#896336]/10 backdrop-blur-md px-10 py-7 text-lg transition-all">
                  Why MUXI
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <div className="hidden lg:flex relative h-[500px] items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Floating Cards Visualization */}
              {floatingCards.map((card, idx) => (
                <motion.div
                  key={card.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -16, 0],
                    rotate: [0, 1.5, 0]
                  }}
                  transition={{ 
                    delay: card.delay,
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`absolute p-6 rounded-3xl bg-gradient-to-br ${card.color} shadow-2xl border border-white/20 backdrop-blur-xl w-48 text-center`}
                  style={{
                    top: idx === 0 ? '10%' : idx === 1 ? '40%' : '70%',
                    left: idx === 0 ? '20%' : idx === 1 ? '50%' : '15%',
                    zIndex: 10 - idx
                  }}
                >
                  <span className="text-2xl font-black mb-3 block text-[#0d0e10]">{card.icon}</span>
                  <h3 className="font-bold text-[#0d0e10] text-lg">{card.name}</h3>
                  <div className="mt-2 h-1 w-12 bg-[#0d0e10]/30 mx-auto rounded-full" />
                </motion.div>
              ))}
              
              {/* Central Glow */}
              <div className="absolute inset-0 bg-[#896336]/20 blur-[120px] rounded-full pointer-events-none" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}