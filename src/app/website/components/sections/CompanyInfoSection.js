'use client';

import Container from '../layout/Container';
import { motion } from 'framer-motion';
import { Globe, Headphones, ShieldCheck, PackageOpen, Truck, Tag, CreditCard, Network, Building2 } from 'lucide-react';
import Image from 'next/image';

const features = [
  { icon: Globe, title: 'Wholesale Reach', desc: 'Cross-border sourcing and delivery support for scaling buyers.' },
  { icon: Headphones, title: 'B2B Support', desc: 'Dedicated account assistance for repeat procurement.' },
  { icon: ShieldCheck, title: 'Verified Quality', desc: 'Screened inventory with consistent specification control.' },
  { icon: PackageOpen, title: 'Flexible Order Sizes', desc: 'Support for mixed pallets, cartons, and full-container orders.' },
  { icon: Truck, title: 'Dispatch Priority', desc: 'Fast handling for urgent replenishment cycles.' },
  { icon: Tag, title: 'Volume Pricing', desc: 'Competitive wholesale margins for distributors and retailers.' },
  { icon: CreditCard, title: 'Secure Settlement', desc: 'Protected payment flows for trade transactions.' },
];

export default function CompanyInfoSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 mb-6">
              <Building2 className="h-4 w-4 text-slate-700" />
              <span className="text-sm font-semibold text-slate-700 tracking-wide uppercase">About MUXI Trading</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Built for wholesalers who need speed, consistency, and scale.
            </h2>
            <p className="text-lg text-slate-600 mb-6">
              MUXI Trading is a B2B wholesale supplier focused on repeat procurement for retailers, distributors, and institutional buyers. We keep sourcing, packaging, and delivery simple so your team can move inventory faster.
            </p>
            <p className="text-lg text-slate-600">
              From category selection to dispatch, we help businesses place bulk orders with clarity, dependable fulfillment, and pricing that makes resale margins easier to protect.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { value: '24/7', label: 'Support' },
                { value: 'Bulk', label: 'Orders' },
                { value: 'Fast', label: 'Dispatch' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center"
                >
                  <div className="text-xl font-black text-slate-900">{stat.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image 
              src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2070&auto=format&fit=crop" 
              alt="Global Supply Chain" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex items-center gap-4 text-white">
                <Network className="w-10 h-10 text-blue-400" />
                <div>
                  <p className="font-bold text-xl">Our Trading Network</p>
                  <p className="text-slate-300">Connecting 5,000+ partners globally.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 mb-6">
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700 tracking-wide uppercase">Why Choose Us</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 max-w-3xl leading-tight">
            Wholesale operations need reliability. We keep the buying path short and the supply path visible.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-slate-50 border border-slate-100 p-6 rounded-2xl hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
