import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { WhatWeDo } from '@/components/WhatWeDo';
import { SpecialtiesGrid } from '@/components/SpecialtiesGrid';
import { PartnerHospitals } from '@/components/PartnerHospitals';
import { DoctorsSection } from '@/components/DoctorsSection';
import { HowItWorks } from '@/components/HowItWorks';
import { WhyChoose } from '@/components/WhyChoose';
import { Reviews } from '@/components/Reviews';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { FloatingWhatsapp } from '@/components/FloatingWhatsapp';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <WhatWeDo />
        <SpecialtiesGrid />
        <PartnerHospitals />
        <DoctorsSection />
        <HowItWorks />
        <WhyChoose />
        <Reviews />
        <About />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}
