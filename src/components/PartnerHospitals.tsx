'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteContent } from '@/context/SiteContentContext';
import { Building2, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const PartnerHospitals: React.FC = () => {
  const { t } = useLanguage();
  const { siteData } = useSiteContent();
  const hospitalsList = siteData.hospitals || [];

  return (
    <section id="hospitals" className="py-16 md:py-24 bg-white border-t border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-teal-light/60 border border-brand-teal/20 text-brand-teal-dark text-xs font-semibold mb-3">
            <Building2 className="w-4 h-4 text-brand-teal" />
            <span>Delhi NCR Premier Hospital Network</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-navy">
            {t('hospitals.title')}
          </h2>
          <p className="mt-3 text-base text-brand-muted leading-relaxed">
            {t('hospitals.subtitle')}
          </p>
        </div>

        {/* Large, Clear Hospital Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hospitalsList.map((hosp, idx) => (
            <motion.div
              key={hosp.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="rounded-3xl bg-[#FAFAF8] border border-gray-200/90 shadow-subtle hover:shadow-card hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              {/* Big, High-Clarity Hospital Building Image Frame */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-200">
                <Image
                  src={hosp.image}
                  alt={`${hosp.name} building`}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-[1.02] contrast-[1.02]"
                />
                
                {/* Subtle gradient vignette at bottom of image */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent opacity-60" />

                {/* Accreditation Badge floating top-left */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-brand-navy shadow-md border border-white/60 flex items-center space-x-1.5">
                  <Award className="w-3.5 h-3.5 text-brand-teal" />
                  <span>{hosp.accreditation}</span>
                </div>
              </div>

              {/* Card Details Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-heading font-extrabold text-xl text-brand-navy group-hover:text-brand-teal transition-colors">
                    {hosp.name}
                  </h3>
                  
                  <div className="flex items-center text-xs text-brand-muted font-medium mt-1">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-brand-teal flex-shrink-0" />
                    <span>{hosp.location}</span>
                  </div>

                  {/* Specialty highlights */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {hosp.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-xs font-semibold bg-white text-brand-navy px-2.5 py-1 rounded-lg border border-gray-200/80 shadow-xs flex items-center"
                      >
                        <CheckCircle2 className="w-3 h-3 text-brand-teal mr-1" />
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200/70 flex items-center justify-between text-xs font-semibold text-brand-teal">
                  <span>International Patient Care Dept</span>
                  <span>Direct Access →</span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
