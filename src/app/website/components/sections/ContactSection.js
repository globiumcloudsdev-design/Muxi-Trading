'use client';

import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight } from 'lucide-react';
import Container from '../layout/Container';
import ContactForm from '../common/ContactForm';
import { FadeIn, ScaleIn } from '../ui/animations';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    details: ['+92 335 2778488'],
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['info@muxitrading.com', 'sales@muxitrading.com'],
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: MapPin,
    title: 'Address',
    details: ['MUXI Trading Co.', '123 Business Park, Mumbai, Maharashtra'],
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: ['Mon - Sat: 9:00 AM - 7:00 PM', 'Sunday: Closed'],
    color: 'from-purple-500 to-violet-600',
  },
];

export default function ContactSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 relative" id="contact-us">
      <Container>
        <FadeIn direction="up" duration={0.8}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Contact MUXI Trading
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Connect with our wholesale desk for category-wise rates and bulk quantity support
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info Cards */}
          <div className="space-y-4">
            <FadeIn direction="left" delay={120} duration={0.7}>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Business Assistance</h3>
                <ul className="space-y-3 text-slate-600 text-sm leading-relaxed mb-6">
                  <li className="flex items-start gap-3">
                    <ArrowRight className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                    <span>Dedicated account support for distributors and retail chains</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                    <span>Fast quotation process for mixed-category bulk orders</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                    <span>Pan-India dispatch coordination for recurring wholesale supply</span>
                  </li>
                </ul>

                <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-4 hover-lift transition-transform">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center animate-pulse-glow">
                      <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-green-700 font-medium">WhatsApp Helpline</p>
                      <a
href="https://wa.me/923352778488?text=Hello%20MUXI%20Trading%2C%20I%20want%20category-wise%20pricing."
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-800 font-semibold hover:underline"
                      >
                        +92 335 2778488
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Contact Methods */}
            <div className="grid grid-cols-2 gap-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <ScaleIn key={index} delay={220 + index * 90} duration={0.55}>
                    <div className="rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-300 hover:shadow-md hover-lift transition-all">
                      <div className={`w-10 h-10 bg-gradient-to-br ${info.color} rounded-lg flex items-center justify-center mb-3`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-sm font-semibold text-slate-900 mb-1">{info.title}</p>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-xs text-slate-500">{detail}</p>
                      ))}
                    </div>
                  </ScaleIn>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <FadeIn direction="right" delay={220} duration={0.75}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Send Us a Message</h3>
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}