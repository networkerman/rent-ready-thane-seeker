
import React from 'react';
import AnimatedSection from './AnimatedSection';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare } from 'lucide-react';

const ContactCTA: React.FC = () => {
  const whatsappLink = "https://wa.me/919823329163?text=Hi%20Udayan,%20I%20have%20a%20property%20matching%20your%20criteria!";
  const phoneNumber = "+91 98233 29163";

  return (
    <section className="section bg-rental-blue text-white" id="contact">
      <div className="container-custom">
        <AnimatedSection delay={400}>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h2>
            <p className="text-lg md:text-xl mb-10 opacity-90">
              Have a property that matches my requirements? Reach out directly:
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#25D366] hover:bg-[#20BB5A] px-8 py-4 rounded-lg font-medium text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto"
              >
                <MessageSquare size={24} />
                <span className="text-lg">Chat on WhatsApp</span>
              </a>
              
              <a 
                href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                className="bg-white text-rental-blue hover:bg-gray-100 px-8 py-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto"
              >
                <Phone size={24} />
                <span className="text-lg">{phoneNumber}</span>
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ContactCTA;
