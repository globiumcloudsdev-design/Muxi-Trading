'use client';

import { useState } from 'react';
import WebsiteLayout from '../components/layout/WebsiteLayout';
import Container from '../components/layout/Container';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ShieldCheck, Truck, Tag } from 'lucide-react';
import Button from '../components/ui/Button';

// Mock data for UI demonstration
const initialCart = [
  {
    id: '1',
    name: 'Premium Synthetic Motor Oil 5W-30',
    price: 3500,
    originalPrice: 4000,
    quantity: 50,
    image: 'https://images.unsplash.com/photo-1612082877074-b582ab38f4d5?w=500&auto=format&fit=crop',
    category: 'Automotive',
    packSize: '5L x 4 Cartons',
  },
  {
    id: '2',
    name: 'Wholesale Paracetamol Tablets 500mg',
    price: 120,
    originalPrice: 120,
    quantity: 1000,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop',
    category: 'Pharmaceutical',
    packSize: '100 Strips Box',
  }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCart);
  const [coupon, setCoupon] = useState('');
  const [discountApplied, setDiscountApplied] = useState(0);

  const updateQuantity = (id, change) => {
    setCartItems(items => items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    if (coupon.toLowerCase() === 'wholesale10') {
      setDiscountApplied(0.1); // 10% off
    } else {
      alert('Invalid coupon code');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = cartItems.length > 0 ? 5000 : 0; // Flat wholesale shipping
  const discount = subtotal * discountApplied;
  const grandTotal = subtotal + shipping - discount;

  if (cartItems.length === 0) {
    return (
      <WebsiteLayout>
        <div className="min-h-[70vh] bg-[#0d0e10] flex flex-col items-center justify-center py-32 px-4 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#896336]/10 blur-[150px] rounded-full" />
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-56 h-56 bg-[#1a1b1e] rounded-[3rem] flex items-center justify-center shadow-2xl border border-[#896336]/20 mb-12 relative z-10"
          >
            <ShoppingBag className="w-24 h-24 text-[#896336]/40" />
          </motion.div>
          <h2 className="text-4xl font-extrabold text-white mb-6 relative z-10">Your Registry is Empty</h2>
          <p className="text-[#faf2b4]/50 mb-10 max-w-md text-center text-lg relative z-10">
            It appears you haven&apos;t initiated any procurement orders yet. Our premium catalog awaits your selection.
          </p>
          <Link href="/categories">
            <Button size="lg" className="bg-gradient-to-r from-[#896336] to-[#a88148] text-[#0d0e10] font-bold rounded-full px-12 py-7 text-lg shadow-[0_0_30px_rgba(137,99,54,0.3)] hover:opacity-90 transition-all relative z-10">
              Begin Procurement
            </Button>
          </Link>
        </div>
      </WebsiteLayout>
    );
  }

  return (
    <WebsiteLayout>
      <section className="pt-36 pb-24 bg-[#0d0e10] min-h-screen relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#896336]/5 blur-[180px] rounded-full" />
        <Container className="relative z-10">
          <h1 className="text-5xl font-black text-white mb-16 flex items-center gap-5 tracking-tight">
            <div className="p-3 bg-[#896336]/10 rounded-2xl border border-[#896336]/30">
              <ShoppingBag className="text-[#a88148] w-8 h-8" />
            </div>
            Institutional <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#896336] via-[#faf2b4] to-[#a88148]">Cart</span>
          </h1>

          <div className="grid lg:grid-cols-3 gap-16">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-[#1a1b1e]/60 rounded-[2.5rem] shadow-2xl border border-[#896336]/20 backdrop-blur-xl overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-8 bg-[#896336]/5 border-b border-[#896336]/10 text-[10px] font-black text-[#a88148] uppercase tracking-[0.2em]">
                  <div className="col-span-6">Asset Details</div>
                  <div className="col-span-3 text-center">Volume</div>
                  <div className="col-span-2 text-right">Valuation</div>
                  <div className="col-span-1"></div>
                </div>

                <div className="divide-y divide-[#896336]/10">
                  {cartItems.map(item => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 p-8 items-center group transition-colors hover:bg-white/[0.02]"
                    >
                      <div className="col-span-1 md:col-span-6 flex gap-6">
                        <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-[#0d0e10] flex-shrink-0 border border-[#896336]/30">
                          <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="text-[10px] font-black text-[#896336] mb-2 tracking-widest uppercase">{item.category}</span>
                          <h3 className="text-xl font-bold text-white leading-tight mb-2">{item.name}</h3>
                          <p className="text-sm text-[#faf2b4]/40 mb-3 font-medium">SKU Spec: {item.packSize}</p>
                          <div className="font-bold text-[#faf2b4] text-lg">
                            PKR {item.price.toLocaleString()} 
                            {item.originalPrice > item.price && (
                              <span className="text-[#896336]/60 line-through text-xs ml-3">PKR {item.originalPrice.toLocaleString()}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-span-1 md:col-span-3 flex items-center md:justify-center mt-6 md:mt-0">
                        <div className="flex items-center bg-[#0d0e10] rounded-2xl p-1.5 border border-[#896336]/30">
                          <button 
                            onClick={() => updateQuantity(item.id, -10)}
                            className="w-10 h-10 rounded-xl bg-[#1a1b1e] flex items-center justify-center text-[#a88148] hover:bg-[#896336]/20 transition-all border border-[#896336]/20"
                          >
                            <Minus className="w-5 h-5" />
                          </button>
                          <input 
                            type="number" 
                            value={item.quantity}
                            readOnly
                            className="w-16 text-center bg-transparent font-bold text-white border-none focus:ring-0 text-lg"
                          />
                          <button 
                            onClick={() => updateQuantity(item.id, 10)}
                            className="w-10 h-10 rounded-xl bg-[#1a1b1e] flex items-center justify-center text-[#a88148] hover:bg-[#896336]/20 transition-all border border-[#896336]/20"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <div className="col-span-1 md:col-span-2 text-right font-black text-xl text-white hidden md:block">
                        PKR {(item.price * item.quantity).toLocaleString()}
                      </div>

                      <div className="col-span-1 text-right md:text-center mt-6 md:mt-0">
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="p-3 rounded-xl text-[#896336] hover:bg-[#896336]/10 hover:text-red-400 transition-all border border-[#896336]/10 hover:border-red-400/20"
                        >
                          <Trash2 className="w-6 h-6" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-[#1a1b1e]/40 p-6 rounded-[2rem] flex flex-col items-center justify-center text-center border border-[#896336]/10 backdrop-blur-md">
                  <ShieldCheck className="w-8 h-8 text-[#a88148] mb-3" />
                  <span className="text-[10px] font-black text-[#faf2b4]/60 uppercase tracking-widest">Encrypted Auth</span>
                </div>
                <div className="bg-[#1a1b1e]/40 p-6 rounded-[2rem] flex flex-col items-center justify-center text-center border border-[#896336]/10 backdrop-blur-md">
                  <Truck className="w-8 h-8 text-[#a88148] mb-3" />
                  <span className="text-[10px] font-black text-[#faf2b4]/60 uppercase tracking-widest">Logistics Tier-1</span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#1a1b1e] rounded-[2.5rem] shadow-2xl border border-[#896336]/30 p-10 sticky top-36 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#896336]/10 blur-[60px] rounded-full" />
                <h3 className="text-2xl font-black text-white mb-8 tracking-tight">Executive Summary</h3>
                
                <div className="space-y-5 mb-8 font-medium">
                  <div className="flex justify-between text-[#faf2b4]/60">
                    <span>Baseline Subtotal</span>
                    <span className="text-white">PKR {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#faf2b4]/60">
                    <span>Logistics Allocation</span>
                    <span className="text-white">PKR {shipping.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#a88148] font-bold italic">
                      <span>Incentive Discount (10%)</span>
                      <span>- PKR {discount.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-[#896336]/20 mb-10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold text-[#faf2b4]/40 uppercase tracking-widest">Aggregate Total</span>
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#896336] to-[#faf2b4]">PKR {grandTotal.toLocaleString()}</span>
                  </div>
                  <p className="text-[10px] text-[#faf2b4]/30 text-right uppercase tracking-widest">Taxation Inclusive</p>
                </div>

                <div className="mb-10 relative group">
                  <Tag className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#896336]" />
                  <input 
                    type="text" 
                    placeholder="Auth Coupon Code" 
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="w-full pl-14 pr-24 py-4 rounded-2xl bg-[#0d0e10] border border-[#896336]/30 focus:border-[#a88148] text-white text-sm focus:outline-none transition-all"
                  />
                  <button 
                    onClick={applyCoupon}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-[#896336] text-[#0d0e10] px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#a88148] transition-colors"
                  >
                    Apply
                  </button>
                </div>

                <Link href="/checkout" className="block w-full">
                  <Button size="lg" className="w-full bg-gradient-to-r from-[#896336] to-[#a88148] text-[#0d0e10] font-black rounded-2xl shadow-xl shadow-[#896336]/20 flex justify-center items-center h-16 text-lg uppercase tracking-widest hover:opacity-90 transition-all">
                    Finalize Order
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </Button>
                </Link>
                
                <p className="text-center text-[10px] text-[#faf2b4]/30 mt-6 font-medium leading-relaxed uppercase tracking-widest">
                  Authentication validates wholesale terms of engagement.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </WebsiteLayout>
  );
}
