import React from 'react';
import { LanNav } from '../components/organisms/LanNav';
import { HeroElite } from '../components/organisms/HeroElite';
import { FeaturesGrid } from '../components/organisms/FeaturesGrid';
import { ExcellenceSection } from '../components/organisms/ExcellenceSection';
import { Testimonial } from '../components/organisms/Testimonial';
import { Footer } from '../components/organisms/Footer';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-800">
      <LanNav />
      <HeroElite />
      <FeaturesGrid />
      <ExcellenceSection />
      <Testimonial />
      <Footer />
    </div>
  );
};