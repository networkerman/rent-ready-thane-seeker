import React from 'react';
import { cn } from '@/lib/utils';
import AnimatedSection from './AnimatedSection';

const AboutMe: React.FC = () => {
  return (
    <section className="section bg-white" id="about">
      <div className="container-custom">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <div className="aspect-square rounded-full overflow-hidden bg-gray-200 border-4 border-rental-lightBlue/20">
                <img 
                  src="/placeholder.svg" 
                  alt="Udayan Das Chaudhury"
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="section-heading">About Me</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Hi, I'm <span className="highlighted-text font-bold">Udayan Das Chowdhury</span>, Product Lead at Netcore Cloud. 
                I build and scale a comprehensive B2B SaaS platform for marketers—full stack of services to empower businesses.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AboutMe;
