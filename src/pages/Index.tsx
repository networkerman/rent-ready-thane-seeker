
import React from 'react';
import Header from '@/components/Header';
import AboutMe from '@/components/AboutMe';
import RentalRequirements from '@/components/RentalRequirements';
import InteractiveMap from '@/components/InteractiveMap';
import PhotoUpload from '@/components/PhotoUpload';
import ContactCTA from '@/components/ContactCTA';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <AboutMe />
        <RentalRequirements />
        <InteractiveMap />
        <PhotoUpload />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
