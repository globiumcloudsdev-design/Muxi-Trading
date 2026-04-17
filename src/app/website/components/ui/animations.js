'use client';

import { useEffect, useState, useRef } from 'react';

export function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
        ...options,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated, options.threshold, options.rootMargin]);

  return [ref, isInView];
}

export function FadeIn({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.6,
  className = '',
  once = true 
}) {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  
  const directions = {
    up: 'translate-y-10',
    down: 'translate-y-[-10px]',
    left: 'translate-x-[-10px]',
    right: 'translate-x-10',
    none: '',
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-[${duration}s] ease-out ${directions[direction]} ${className} ${
        isInView ? 'opacity-100 translate-y-0 translate-x-0' : 'opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms`, transitionDuration: `${duration}s` }}
    >
      {children}
    </div>
  );
}

export function ScaleIn({ children, delay = 0, duration = 0.5, className = '' }) {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-[${duration}s] ease-out scale-95 ${className} ${
        isInView ? 'opacity-100 scale-100' : 'opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms`, transitionDuration: `${duration}s` }}
    >
      {children}
    </div>
  );
}

export function StaggerContainer({ children, className = '', staggerDelay = 100 }) {
  return (
    <div className={className}>
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <div 
              key={index} 
              style={{ animationDelay: `${index * staggerDelay}ms` }}
              className="animate-fade-in-up"
            >
              {child}
            </div>
          ))
        : children
      }
    </div>
  );
}

export default { useInView, FadeIn, ScaleIn, StaggerContainer };