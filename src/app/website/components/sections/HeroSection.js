'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Boxes, Clock, Shield, Sparkles, Truck } from 'lucide-react';
import Button from '../ui/Button';
import Container from '../layout/Container';

const floatingItems = [
  { emoji: '📦', className: 'top-[15%] right-[10%] animate-float-1' },
  { emoji: '🧴', className: 'top-[30%] right-[25%] animate-float-2' },
  { emoji: '🥤', className: 'top-[55%] right-[8%] animate-float-3' },
  { emoji: '🧹', className: 'top-[20%] right-[40%] animate-float-2' },
  { emoji: '🔧', className: 'top-[25%] right-[39%] animate-float-1' },
  { emoji: '💊', className: 'top-[10%] right-[18%] animate-float-3' },
];

const heroStats = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Pan-India dispatch support',
    accent: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Shield,
    title: 'Bulk Availability',
    description: 'Stable wholesale stock',
    accent: 'from-emerald-500 to-green-600',
  },
  {
    icon: Clock,
    title: 'Quick Support',
    description: 'Prompt B2B assistance',
    accent: 'from-orange-500 to-rose-500',
  },
  {
    icon: Boxes,
    title: 'Trusted Quality',
    description: 'Verified product sourcing',
    accent: 'from-violet-500 to-indigo-600',
  },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-10">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/herosection.png"
          alt="Warehouse background for MUXI Trading hero"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.22),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(34,211,238,0.16),_transparent_28%),linear-gradient(135deg,rgba(2,6,23,0.25)_0%,rgba(15,23,42,0.55)_50%,rgba(2,6,23,0.8)_100%)]" />
      </div>

      <div
        className="absolute inset-0 opacity-20"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '54px 54px',
        }}
      />

      <div className="absolute left-8 h-72 w-72 rounded-full bg-blue-500/20 blur-2xl animate-float" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl animate-float" aria-hidden="true" style={{ animationDelay: '1.5s' }} />

      <Container className="relative z-5">
        <div className="grid items-center gap-2 lg:grid-cols-[2.05fr_1.95fr]">
          <div className="animate-fade-in-up top-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 mb-6 hover-scale">
              <Sparkles className="h-4 w-4 text-cyan-200 animate-pulse-glow" />
              <span className="text-sm font-medium text-cyan-100">Trusted Wholesale Supplier</span>
            </div>

            <h1 className="max-w-5xl text-xl font-bold leading-tight text-white md:text-2xl lg:text-4xl">
              Wholesale Grocery, Automotive, Pharmaceutical & Household Products Supplier
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-200 animate-fade-in-up stagger-1">
              MUXI Trading offers competitive bulk pricing across 6+ product categories with fast delivery support for businesses worldwide.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 animate-fade-in-up stagger-2">
              <Link href="/categories">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 border-0 text-white hover-lift">
                  View Categories
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative min-h-[460px] animate-fade-in-up stagger-2">
            <div className="absolute inset-0 rounded-[2rem]  shadow-[0_30px_80px_rgba(2,6,23,0.4)]" />
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.14),_transparent_55%)] opacity-70" />

            <div className="absolute left-1/2 top-1/2 w-[85%] -translate-x-1/2 -translate-y-[45%]">
              <div className="relative mx-auto h-[330px] w-full max-w-[520px]">
                <div className="absolute inset-x-8 bottom-4 h-10 rounded-full bg-cyan-400/20 blur-2xl animate-pulse-glow" aria-hidden="true" />

                <div className="absolute left-1/2 top-[10%] h-24 w-24 -translate-x-1/2 rounded-full border border-cyan-300/30 bg-cyan-300/10 shadow-[0_0_50px_rgba(34,211,238,0.25)] animate-fade-in-up">
                  <div className="absolute inset-4 rounded-full border border-white/20" />
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.35),_transparent_65%)] animate-pulse-glow" />
                </div>

                <div className="absolute left-1/2 top-[40%] flex -translate-x-1/2 items-end gap-4">
                  <div className="h-20 w-20 rounded-2xl border border-white/15 bg-gradient-to-br from-amber-200 via-amber-400 to-orange-600 shadow-2xl shadow-orange-950/40 animate-scale-in stagger-1" />
                  <div className="h-28 w-28 rounded-3xl border border-white/15 bg-gradient-to-br from-amber-200 via-amber-400 to-orange-600 shadow-2xl shadow-orange-950/40 -translate-y-4 animate-scale-in stagger-2" />
                  <div className="h-24 w-24 rounded-2xl border border-white/15 bg-gradient-to-br from-amber-200 via-amber-400 to-orange-600 shadow-2xl shadow-orange-950/40 translate-y-2 animate-scale-in stagger-3" />
                </div>

                <div className="absolute left-1/2 top-[40%] flex -translate-x-1/2 items-end gap-5 animate-fade-in-up stagger-3">
                  <div className="h-28 w-10 rounded-[1.5rem] border border-white/15 bg-gradient-to-b from-cyan-300 via-sky-500 to-blue-900 shadow-2xl shadow-cyan-950/40" />
                  <div className="h-36 w-10 rounded-[1.5rem] border border-white/15 bg-gradient-to-b from-cyan-300 via-sky-500 to-blue-900 shadow-2xl shadow-cyan-950/40 -translate-y-5" />
                  <div className="h-24 w-10 rounded-[1.5rem] border border-white/15 bg-gradient-to-b from-cyan-300 via-sky-500 to-blue-900 shadow-2xl shadow-cyan-950/40 translate-y-1" />
                </div>

             
              </div>

              {floatingItems.map((item, index) => (
                <div
                  key={item.emoji}
                  className={`absolute ${item.className} flex h-15 w-15 items-center justify-center rounded-full text-xl shadow-lg shadow-cyan-500/30 bg-transparent  animate-float-glow`}
                  style={{ animationDelay: `${index * 1}s` }}
                >
                  {item.emoji}
                </div>
              ))}

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-cyan-300/20 bg-slate-950/70 px-5 py-3 text-center shadow-2xl shadow-cyan-500/10 backdrop-blur-md animate-fade-in-up stagger-3">
                <p className="text-[10px] uppercase tracking-[0.4em] text-cyan-200/80">Assembly complete</p>
                <p className="mt-1 text-lg font-semibold text-white">Wholesale Trading Platform</p>
              </div>
            </div>
          </div>
        </div>

        <div className=" grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {heroStats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm animate-fade-in-up hover-lift"
                style={{ animationDelay: `${index * 1.12 + 0.2}s` }}
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.accent} shadow-lg shadow-black/20`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-1 font-semibold text-white">{stat.title}</h3>
                <p className="text-sm text-slate-300">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}