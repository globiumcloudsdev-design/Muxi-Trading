'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import Container from '../layout/Container';

const testimonials = [
  {
    id: 1,
    name: 'Rahul Sharma',
    position: 'Business Owner',
    company: 'Sharma Enterprises',
    text: 'MUXI Trading has been an exceptional partner for our wholesale needs. Their product quality and timely delivery have helped us grow our business significantly.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Priya Patel',
    position: 'Retail Chain Manager',
    company: 'Patel Retail',
    text: 'Great quality products at competitive prices. The team is highly responsive and always ensures we have consistent stock supply for our stores.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Amit Kumar',
    position: 'Wholesale Buyer',
    company: 'Kumar Trading Co.',
    text: 'Professional team and timely delivery. They understand the needs of B2B clients and provide excellent support throughout the ordering process.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Sanjay Gupta',
    position: 'Procurement Head',
    company: 'Gupta & Sons',
    text: 'We have been working with MUXI for over 2 years now. Their multi-category inventory has made our sourcing much more efficient.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const testimonial = testimonials[currentIndex];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">
            What Our Clients Say
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto animate-fade-in-up stagger-1">
            Trusted by businesses across India for reliable wholesale supply
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className={`relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50 transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <Quote className="absolute top-6 left-6 h-10 w-10 text-blue-500/30 animate-float" />
            
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'} animate-scale-in`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            
            <p className="text-lg md:text-xl text-slate-200 text-center mb-8 leading-relaxed italic">
              &ldquo;{testimonial.text}&rdquo;
            </p>
            
            <div className="text-center">
              <h4 className="font-semibold text-white text-lg animate-fade-in-up stagger-2">{testimonial.name}</h4>
              <p className="text-slate-400 text-sm animate-fade-in-up stagger-3">{testimonial.position}, {testimonial.company}</p>
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={prev} 
              className="p-3 bg-slate-800/80 border border-slate-700 rounded-full hover:bg-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-110 hover-lift"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'w-8 bg-blue-500' : 'w-2 bg-slate-600 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>
            <button 
              onClick={next} 
              className="p-3 bg-slate-800/80 border border-slate-700 rounded-full hover:bg-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-110 hover-lift"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}