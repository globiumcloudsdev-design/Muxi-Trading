'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Store, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import Container from './Container';
import Newsletter from '../common/Newsletter';

export default function Footer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories', { cache: 'no-store' });
        const result = await response.json();

        if (response.ok && result.success) {
          setCategories(result.data || []);
        }
      } catch (error) {
        console.error('Footer categories fetch error:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white pt-16 pb-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl" />
      
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-3 mb-5 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300">
                <img
                  src="/Muxi Trading Logo.png"
                  alt="MUXI Trading Logo"
                  className="w-8 h-8 object-contain bg-transparent"
                />
              </div>
              <div>
                <span className="text-xl font-bold">MUXI Trading</span>
                <p className="text-xs text-slate-400">Est. 2020</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your trusted partner for quality wholesale products across multiple categories since 2020.
            </p>
          </div>
          
          <div className="animate-fade-in-up stagger-1">
            <h3 className="font-semibold mb-5 text-white">Quick Links</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              {[
                { name: 'Home', href: '/' },
                { name: 'Categories', href: '/categories' },
                { name: 'Contact', href: '/#contact-us' },
                { name: 'Login', href: '/auth/login' },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noreferrer' : undefined}
                    className="hover:text-blue-400 hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-200"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="animate-fade-in-up stagger-2">
            <h3 className="font-semibold mb-5 text-white">Categories</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              {categories.slice(0, 6).map((category) => (
                <li key={category.slug}>
                  <Link 
                    href={`/categories/${category.slug}`} 
                    className="hover:text-blue-400 hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-200"
                  >
                    <ArrowRight className="h-3 w-3" />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="animate-fade-in-up stagger-3">
            <h3 className="font-semibold mb-5 text-white">Contact Info</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                  <Phone className="h-4 w-4 text-blue-400" />
                </div>
                <span className="group-hover:text-white transition-colors">+92 335 2778488</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                  <Mail className="h-4 w-4 text-cyan-400" />
                </div>
                <span className="group-hover:text-white transition-colors">info@muxitrading.com</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                  <MapPin className="h-4 w-4 text-purple-400" />
                </div>
                <span className="group-hover:text-white transition-colors">Karachi, Pakistan</span>
              </li>
            </ul>
          </div>
          
          <div className="animate-fade-in-up stagger-4">
            <h3 className="font-semibold mb-5 text-white">Follow Us</h3>
            <div className="flex gap-3">
{[
                { label: 'Facebook', href: 'https://www.facebook.com/globiumclouds/', icon: FaFacebook, size: 20 },
                { label: 'Instagram', href: 'https://www.instagram.com/explore/locations/202412828462806/globium-clouds/', icon: FaInstagram, size: 20 }
              ].map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-blue-500 hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  <social.icon size={social.size} />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-center">
          <p className="text-slate-500 text-sm">
            © 2026 MUXI Trading Company. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
