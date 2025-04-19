
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className,
  delay = 0 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={sectionRef}
      className={cn(
        'opacity-0',
        isVisible ? 'animate-fade-in-up' : '',
        className
      )}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
