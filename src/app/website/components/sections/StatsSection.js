'use client';

import Container from '../layout/Container';

const stats = [
  { value: '500+', label: 'Happy Clients', prefix: '', suffix: '+' },
  { value: '1000+', label: 'Products Delivered', prefix: '', suffix: '+' },
  { value: '4.8', label: 'Customer Rating', prefix: '', suffix: '' },
  { value: '24/7', label: 'Support Available', prefix: '', suffix: '' },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 animate-shimmer" />
      
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`text-center animate-fade-in-up stagger-${index + 1}`}
            >
              <div className="relative inline-block group">
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent group-hover:animate-pulse-glow">
                  {stat.prefix}{stat.value}{stat.suffix}
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full group-hover:animate-pulse-glow" />
              </div>
              <p className="text-slate-400 mt-3 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}