'use client';

import { useState } from 'react';
import WebsiteLayout from '../components/layout/WebsiteLayout';
import Container from '../components/layout/Container';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, MapPin, Truck, CreditCard, ShieldCheck } from 'lucide-react';
import Button from '../components/ui/Button';

// Mock data
const cartSummary = {
  subtotal: 175000,
  shipping: 5000,
  discount: 17500,
  tax: 0,
};
const total = cartSummary.subtotal + cartSummary.shipping + cartSummary.tax - cartSummary.discount;

const steps = ['Cart', 'Checkout', 'Payment', 'Success'];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1); // 1 = Checkout (Shipping/Billing), 2 = Payment, 3 = Success
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    country: 'Pakistan',
    province: '',
    city: '',
    postalCode: '',
    address: '',
    notes: '',
    paymentMethod: 'bank_transfer',
  });

  const [errors, setErrors] = useState({});

  const validateCheckout = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = true;
    if (!formData.lastName) newErrors.lastName = true;
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = true;
    if (!formData.phone) newErrors.phone = true;
    if (!formData.province) newErrors.province = true;
    if (!formData.city) newErrors.city = true;
    if (!formData.address) newErrors.address = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateCheckout()) {
        setCurrentStep(2);
        window.scrollTo(0, 0);
      }
    } else if (currentStep === 2) {
      setCurrentStep(3); // Success
      window.scrollTo(0, 0);
    }
  };

  return (
    <WebsiteLayout>
      <section className="pt-32 pb-20 bg-[#0d0e10] min-h-screen relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#896336]/5 blur-[200px] rounded-full" />
        <Container>
          {/* Progress Bar */}
          <div className="max-w-3xl mx-auto mb-20 relative z-10">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-[#896336]/20 -z-10" />
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#896336] -z-10 transition-all duration-700 ease-in-out"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />
              
              {steps.map((step, idx) => {
                const isActive = idx === currentStep || (idx === 0 && currentStep > 0);
                const isPassed = idx < currentStep;
                
                return (
                  <div key={step} className="flex flex-col items-center bg-[#0d0e10] px-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs transition-all duration-500 border ${
                      isActive ? 'bg-[#896336] text-[#0d0e10] border-[#faf2b4] shadow-[0_0_20px_rgba(137,99,54,0.4)]' : 
                      isPassed ? 'bg-[#896336]/20 text-[#a88148] border-[#896336]/30' : 'bg-[#1a1b1e] text-[#faf2b4]/30 border-[#896336]/10'
                    }`}>
                      {isPassed ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                    </div>
                    <span className={`text-[10px] mt-3 font-black uppercase tracking-widest ${isActive ? 'text-[#faf2b4]' : 'text-[#faf2b4]/30'}`}>
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div 
                key="checkout"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid lg:grid-cols-3 gap-16 relative z-10"
              >
                {/* Billing & Shipping Form */}
                <div className="lg:col-span-2 space-y-10">
                  <div className="bg-[#1a1b1e]/60 rounded-[2.5rem] p-10 shadow-2xl border border-[#896336]/20 backdrop-blur-xl">
                    <h2 className="text-3xl font-black text-white mb-10 flex items-center gap-4">
                      <div className="p-2.5 bg-[#896336]/10 rounded-xl border border-[#896336]/20">
                        <MapPin className="text-[#a88148] w-7 h-7" />
                      </div>
                      Procurement <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#896336] to-[#faf2b4]">Logistics</span>
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-[#896336] uppercase tracking-widest">Principal First Name *</label>
                        <input 
                          type="text" 
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          className={`w-full p-4 rounded-xl bg-[#0d0e10] border ${errors.firstName ? 'border-red-500' : 'border-[#896336]/30'} text-white focus:border-[#a88148] focus:outline-none transition-all`}
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-[#896336] uppercase tracking-widest">Principal Last Name *</label>
                        <input 
                          type="text" 
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          className={`w-full p-4 rounded-xl bg-[#0d0e10] border ${errors.lastName ? 'border-red-500' : 'border-[#896336]/30'} text-white focus:border-[#a88148] focus:outline-none transition-all`}
                        />
                      </div>
                      <div className="space-y-3 md:col-span-2">
                        <label className="text-[10px] font-black text-[#896336] uppercase tracking-widest">Entity / Company Legal Name</label>
                        <input 
                          type="text" 
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          className="w-full p-4 rounded-xl bg-[#0d0e10] border border-[#896336]/30 text-white focus:border-[#a88148] focus:outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-[#896336] uppercase tracking-widest">Corporate Email *</label>
                        <input 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className={`w-full p-4 rounded-xl bg-[#0d0e10] border ${errors.email ? 'border-red-500' : 'border-[#896336]/30'} text-white focus:border-[#a88148] focus:outline-none transition-all`}
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-[#896336] uppercase tracking-widest">Direct Contact *</label>
                        <input 
                          type="tel" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className={`w-full p-4 rounded-xl bg-[#0d0e10] border ${errors.phone ? 'border-red-500' : 'border-[#896336]/30'} text-white focus:border-[#a88148] focus:outline-none transition-all`}
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-[#896336] uppercase tracking-widest">Jurisdiction *</label>
                        <select 
                          value={formData.country}
                          onChange={(e) => setFormData({...formData, country: e.target.value})}
                          className="w-full p-4 rounded-xl bg-[#0d0e10] border border-[#896336]/30 text-white focus:border-[#a88148] focus:outline-none transition-all"
                        >
                          <option value="Pakistan">Pakistan</option>
                          <option value="UAE">UAE</option>
                          <option value="UK">United Kingdom</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-[#896336] uppercase tracking-widest">Administrative Province *</label>
                        <input 
                          type="text" 
                          value={formData.province}
                          onChange={(e) => setFormData({...formData, province: e.target.value})}
                          className={`w-full p-4 rounded-xl bg-[#0d0e10] border ${errors.province ? 'border-red-500' : 'border-[#896336]/30'} text-white focus:border-[#a88148] focus:outline-none transition-all`}
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-[#896336] uppercase tracking-widest">City *</label>
                        <input 
                          type="text" 
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          className={`w-full p-4 rounded-xl bg-[#0d0e10] border ${errors.city ? 'border-red-500' : 'border-[#896336]/30'} text-white focus:border-[#a88148] focus:outline-none transition-all`}
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-[#896336] uppercase tracking-widest">Postal Identification</label>
                        <input 
                          type="text" 
                          value={formData.postalCode}
                          onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                          className="w-full p-4 rounded-xl bg-[#0d0e10] border border-[#896336]/30 text-white focus:border-[#a88148] focus:outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-3 md:col-span-2">
                        <label className="text-[10px] font-black text-[#896336] uppercase tracking-widest">Operational Address *</label>
                        <input 
                          type="text" 
                          placeholder="Street, Building, Unit Number"
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          className={`w-full p-4 rounded-xl bg-[#0d0e10] border ${errors.address ? 'border-red-500' : 'border-[#896336]/30'} text-white focus:border-[#a88148] focus:outline-none transition-all`}
                        />
                      </div>
                      <div className="space-y-3 md:col-span-2">
                        <label className="text-[10px] font-black text-[#896336] uppercase tracking-widest">Procurement Directives</label>
                        <textarea 
                          rows={3}
                          placeholder="Specific delivery protocols or order notes."
                          value={formData.notes}
                          onChange={(e) => setFormData({...formData, notes: e.target.value})}
                          className="w-full p-4 rounded-xl bg-[#0d0e10] border border-[#896336]/30 text-white focus:border-[#a88148] focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-[#1a1b1e] rounded-[2.5rem] p-10 shadow-2xl border border-[#896336]/30 sticky top-36 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#896336]/10 blur-[60px] rounded-full" />
                    <h3 className="text-2xl font-black text-white mb-8">Asset Summary</h3>
                    
                    <div className="space-y-5 mb-8 text-sm font-medium">
                      <div className="flex justify-between text-[#faf2b4]/60 uppercase tracking-widest text-[10px]">
                        <span>Baseline Subtotal</span>
                        <span className="text-white">PKR {cartSummary.subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-[#faf2b4]/60 uppercase tracking-widest text-[10px]">
                        <span>Logistics Cost</span>
                        <span className="text-white">PKR {cartSummary.shipping.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-[#faf2b4]/60 uppercase tracking-widest text-[10px]">
                        <span>Tax Valuation</span>
                        <span className="text-white">PKR {cartSummary.tax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-[#a88148] uppercase tracking-widest text-[10px] font-black">
                        <span>Rebate Applied</span>
                        <span>- PKR {cartSummary.discount.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-[#896336]/20 mb-10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black text-[#faf2b4]/30 uppercase tracking-[0.2em]">Aggregate Total</span>
                        <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#896336] to-[#faf2b4]">PKR {total.toLocaleString()}</span>
                      </div>
                    </div>

                    <Button onClick={handleNext} size="lg" className="w-full bg-gradient-to-r from-[#896336] to-[#a88148] text-[#0d0e10] font-black rounded-2xl shadow-xl shadow-[#896336]/20 h-16 uppercase tracking-widest hover:opacity-90 transition-all">
                      Review Payment
                      <ChevronRight className="ml-3 w-6 h-6" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div 
                key="payment"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-3xl mx-auto bg-[#1a1b1e]/80 rounded-[3rem] p-12 md:p-16 shadow-2xl border border-[#896336]/20 backdrop-blur-2xl relative z-10"
              >
                <h2 className="text-4xl font-black text-white mb-12 flex items-center gap-5">
                  <div className="p-3 bg-[#896336]/10 rounded-2xl border border-[#896336]/30">
                    <CreditCard className="text-[#a88148] w-8 h-8" />
                  </div>
                  Financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#896336] to-[#faf2b4]">Settlement</span>
                </h2>

                <div className="space-y-6 mb-12">
                  {[
                    { id: 'bank_transfer', title: 'Institutional Wire Transfer', desc: 'Secure B2B settlement via SWIFT/IBAN. Mandatory for orders exceeding 500k PKR.' },
                    { id: 'cod', title: 'Settlement on Delivery (COD)', desc: 'Applicable for certified partners in established logistics zones.' },
                    { id: 'card', title: 'Corporate Credit / Debit Card', desc: 'Accelerated processing via high-limit merchant gateways.' }
                  ].map(method => (
                    <label key={method.id} className={`flex items-start gap-6 p-6 rounded-2xl border transition-all cursor-pointer ${formData.paymentMethod === method.id ? 'border-[#896336] bg-[#896336]/10 shadow-[inset_0_0_20px_rgba(137,99,54,0.1)]' : 'border-[#896336]/10 hover:border-[#896336]/30 bg-[#0d0e10]'}`}>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                        className="mt-1.5 w-6 h-6 text-[#896336] border-[#896336]/30 bg-transparent focus:ring-[#896336]"
                      />
                      <div>
                        <h3 className="font-bold text-white text-lg">{method.title}</h3>
                        <p className="text-sm text-[#faf2b4]/40 mt-2 leading-relaxed">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="flex items-center gap-6 pt-10 border-t border-[#896336]/10">
                  <Button variant="outline" onClick={() => setCurrentStep(1)} className="px-10 h-14 border-[#896336]/30 text-[#faf2b4] hover:bg-[#896336]/10 rounded-xl">
                    Back
                  </Button>
                  <Button onClick={handleNext} size="lg" className="flex-1 bg-gradient-to-r from-[#896336] to-[#a88148] text-[#0d0e10] font-black rounded-xl shadow-2xl shadow-[#896336]/20 h-16 uppercase tracking-[0.2em]">
                    Execute Transaction
                  </Button>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div 
                key="success"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-2xl mx-auto bg-[#1a1b1e] rounded-[3rem] p-16 md:p-24 text-center shadow-2xl border border-[#896336]/20 relative z-10 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#896336]/10 blur-[100px] rounded-full" />
                <div className="relative w-40 h-40 mx-auto mb-12">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="absolute inset-0 bg-[#896336]/20 rounded-full border border-[#896336]/40"
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.4 }}
                    className="absolute inset-4 bg-[#896336] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(137,99,54,0.5)]"
                  >
                    <CheckCircle2 className="w-20 h-20 text-[#0d0e10]" />
                  </motion.div>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Order Validated</h2>
                <p className="text-xl text-[#faf2b4]/50 mb-12 leading-relaxed">
                  Your wholesale procurement has been authorized. <br />
                  Reference ID: <span className="text-[#a88148] font-bold tracking-widest">#MXT-845923</span>
                </p>

                <div className="bg-[#0d0e10] rounded-[2rem] p-10 mb-12 text-left border border-[#896336]/10">
                  <h3 className="font-bold text-[#faf2b4] mb-4 uppercase tracking-[0.2em] text-xs">Fulfillment Timeline</h3>
                  <ul className="space-y-4 text-sm text-[#faf2b4]/40 font-medium">
                    <li className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-[#896336] shadow-[0_0_10px_rgba(137,99,54,0.5)]" /> Audit team will verify compliance within 4 hours.</li>
                    <li className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-[#896336] shadow-[0_0_10px_rgba(137,99,54,0.5)]" /> Proforma issuance via institutional email.</li>
                    <li className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-[#896336] shadow-[0_0_10px_rgba(137,99,54,0.5)]" /> Global logistics dispatch within 24 business hours.</li>
                  </ul>
                </div>

                <Link href="/categories">
                  <Button size="lg" className="bg-[#faf2b4] text-[#0d0e10] font-black rounded-full px-16 py-7 uppercase tracking-widest hover:bg-[#896336] transition-colors">
                    Return to Catalog
                  </Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </section>
    </WebsiteLayout>
  );
}
