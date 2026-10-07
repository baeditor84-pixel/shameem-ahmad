'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { specialtiesData } from '@/data/specialties';
import { motion } from 'framer-motion';
import {
  Activity,
  HeartPulse,
  ShieldPlus,
  Dna,
  Heart,
  Bone,
  Microscope,
  Brain,
  Eye,
  Stethoscope,
  CheckCircle2,
  Ear,
  UserCheck,
  ShieldAlert,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const iconComponents: Record<string, React.ElementType> = {
  Activity,
  HeartPulse,
  ShieldPlus,
  Dna,
  Heart,
  Bone,
  Microscope,
  Brain,
  Eye,
  Stethoscope,
  CheckCircle2,
  Ear,
  UserCheck,
  ShieldAlert,
  Sparkles,
};

export const SpecialtiesGrid: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section id="specialties" className="py-16 md:py-24 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-navy">
            {t('specialties.title')}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed">
            {t('specialties.subtitle')}
          </p>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {specialtiesData.map((spec, idx) => {
            const Icon = iconComponents[spec.iconName] || Activity;
            const localized = spec[language] || spec.en;

            return (
              <motion.div
                key={spec.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="flex flex-col justify-between p-6 rounded-2xl bg-white border border-gray-200/90 shadow-subtle hover:shadow-card hover:-translate-y-1 hover:border-brand-teal transition-all duration-300 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-stone-100 border border-gray-200/60 flex items-center justify-center text-brand-navy group-hover:bg-brand-navy group-hover:text-white transition-colors duration-300 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-brand-navy mb-2 group-hover:text-brand-teal transition-colors">
                    {localized.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-muted line-clamp-3 leading-relaxed mb-6">
                    {localized.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={`/specialties/${spec.slug}`}
                    className="inline-flex items-center text-xs sm:text-sm font-semibold text-brand-teal group-hover:text-brand-teal-dark transition-colors"
                  >
                    <span>{t('specialties.getEstimate')}</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
