'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteContent } from '@/context/SiteContentContext';
import { Stethoscope, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export const DoctorsSection: React.FC = () => {
  const { t } = useLanguage();
  const { siteData } = useSiteContent();
  const doctorsList = siteData.doctors || [];

  return (
    <section id="doctors" className="py-16 md:py-24 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-teal-light/60 border border-brand-teal/20 text-brand-teal-dark text-xs font-semibold mb-3">
            <Stethoscope className="w-4 h-4 text-brand-teal" />
            <span>Premier Clinical Leaders</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-navy">
            {t('doctors.title')}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed">
            {t('doctors.subtitle')}
          </p>
        </div>

        {/* Doctor Cards Grid / Mobile Scroll */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto hide-scrollbar snap-x pb-4 md:pb-0">
          {doctorsList.map((doc, idx) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="min-w-[280px] sm:min-w-[320px] md:min-w-0 flex-1 snap-center flex flex-col justify-between rounded-2xl bg-white border border-gray-200/90 shadow-subtle hover:shadow-card hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
            >
              {/* Photo 4:5 aspect ratio */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100">
                <Image
                  src={doc.image}
                  alt={`${doc.name} - ${doc.title}`}
                  fill
                  sizes="(max-width: 768px) 320px, 300px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Text Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-brand-navy group-hover:text-brand-teal transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-xs font-semibold text-brand-teal mt-0.5 leading-snug">
                    {doc.title}
                  </p>
                  <p className="text-xs text-brand-muted font-medium mt-1 mb-4">
                    {doc.hospital}
                  </p>

                  {/* Specialty Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {doc.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="text-[10px] font-medium bg-stone-100 text-gray-700 px-2 py-0.5 rounded-md border border-gray-200/60"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href="#contact"
                  className="w-full inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-semibold bg-stone-100 text-brand-navy border border-gray-200 hover:bg-brand-navy hover:text-white transition-colors duration-200"
                >
                  <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-brand-teal" />
                  <span>Request Consultation</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
