'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, ShieldCheck, Truck, PackageSearch } from 'lucide-react';
import Container from '../layout/Container';
import Button from '../ui/Button';

const highlights = [
  { icon: ShieldCheck, title: 'Verified sourcing', desc: 'Quality-checked inventory for B2B buyers.' },
  { icon: Truck, title: 'Fast dispatch', desc: 'Built for repeat wholesale replenishment.' },
  { icon: PackageSearch, title: 'Bulk ready', desc: 'Sized for cartons, pallets, and container loads.' },
];

export default function AboutHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0d0e10] via-[#121317] to-[#1a1b1e] pt-32 pb-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 18, 0], y: [0, -12, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-0 top-16 h-72 w-72 rounded-full bg-[#896336]/20 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -12, 0], y: [0, 14, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-0 top-24 h-96 w-96 rounded-full bg-[#a88148]/15 blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03)_0%,transparent_50%,rgba(255,255,255,0.03)_100%)]" />
      </div>

      <Container className="relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md"
            >
              <Building2 className="h-4 w-4 text-[#faf2b4]" />
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#faf2b4]/80">About MUXI Trading</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="mt-6 text-5xl font-black leading-[1.04] text-white md:text-6xl lg:text-7xl"
            >
              Wholesale made <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#896336] via-[#faf2b4] to-[#a88148]">clear, fast, and scalable.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32 }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-[#faf2b4]/70 md:text-xl"
            >
              We help retailers, distributors, and institutional buyers source wholesale products with dependable fulfillment, competitive pricing, and less operational friction.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link href="/categories">
                <Button size="lg" className="bg-gradient-to-r from-[#896336] to-[#a88148] px-8 py-7 text-lg font-bold text-[#0d0e10] shadow-[0_0_24px_rgba(137,99,54,0.35)] transition-all hover:opacity-90">
                  Explore Categories
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/15 bg-white/5 px-8 py-7 text-lg font-bold text-white backdrop-blur-md transition-all hover:bg-white/10">
                  Contact Sales
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52 }}
              className="mt-10 grid gap-4 sm:grid-cols-3"
            >
              {[
                { value: '24/7', label: 'Support' },
                { value: 'Bulk', label: 'Orders' },
                { value: 'Fast', label: 'Dispatch' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-md"
                >
                  <div className="text-2xl font-black text-white">{item.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#faf2b4]/50">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-[#896336]/20 to-[#a88148]/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-xl">
              <div className="relative h-[420px] overflow-hidden rounded-[1.5rem] md:h-[520px]">
                <Image
                  src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2070&auto=format&fit=crop"
                  alt="MUXI Trading wholesale operations"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e10]/90 via-[#0d0e10]/35 to-transparent" />

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-4 top-4 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">Wholesale Network</p>
                  <p className="mt-1 text-lg font-black text-white">5,000+ partners</p>
                </motion.div>

                <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:grid-cols-3">
                  {highlights.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.08 }}
                        whileHover={{ y: -4 }}
                        className="rounded-2xl border border-white/10 bg-[#1a1b1e]/85 p-4 text-white shadow-lg backdrop-blur-md"
                      >
                        <Icon className="h-5 w-5 text-[#faf2b4]" />
                        <h3 className="mt-3 text-sm font-bold uppercase tracking-[0.18em]">{item.title}</h3>
                        <p className="mt-2 text-xs leading-relaxed text-white/60">{item.desc}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}