import React from 'react';
import AnimatedSection from './AnimatedSection';
import { MapPin } from 'lucide-react';

const RentalRequirements: React.FC = () => {
  return (
    <section className="section bg-gray-50" id="requirements">
      <div className="container-custom">
        <AnimatedSection delay={100}>
          <h2 className="section-heading mb-8">Requirements for Rental</h2>
          
          <div className="card mb-8">
            <a 
              href="https://goo.gl/maps/MQQ8Ft1k7biSrTQP7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-start gap-2 text-rental-blue hover:text-blue-700 transition-colors mb-6"
            >
              <MapPin className="mt-1 flex-shrink-0" />
              <span className="underline underline-offset-4">
                Netcore Cloud Thane Office, 8th Floor, A Wing, Lodha Supremus II, Road No. 22, Wagle Industrial Estate, Thane West, Maharashtra 400604
              </span>
            </a>
            
            <div className="space-y-4">
              <RequirementItem>
                <strong>Budget:</strong> Up to ₹40,000/month
              </RequirementItem>
              <RequirementItem>
                <strong>Notice Period Ends:</strong> 15 June 2025 (Need to move in Before that)
              </RequirementItem>
              <RequirementItem>
                <strong>Preferred Areas:</strong> Vartak Nagar, Thane West, Mulund, and surrounding neighborhoods near the Netcore office
              </RequirementItem>
              <RequirementItem>
                <strong>Society:</strong> Gated society with covered parking (car & bike)
              </RequirementItem>
              <RequirementItem>
                <strong>Fully Furnished:</strong> Modular kitchen, wardrobes, bed, AC, fridge, washing machine, etc.
              </RequirementItem>
              <RequirementItem>
                <strong>Connectivity:</strong> Good public transport links & safe locality
              </RequirementItem>
              <RequirementItem>
                <strong>Broker Status:</strong> <span className="text-rental-red font-medium">Not open to broker options</span>
              </RequirementItem>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

interface RequirementItemProps {
  children: React.ReactNode;
}

const RequirementItem: React.FC<RequirementItemProps> = ({ children }) => {
  return (
    <div className="flex items-baseline gap-2">
      <div className="w-2 h-2 rounded-full bg-rental-blue flex-shrink-0 mt-2"></div>
      <p className="text-gray-700 leading-relaxed">{children}</p>
    </div>
  );
};

export default RentalRequirements;
