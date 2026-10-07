'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import {
  Stethoscope,
  FileText,
  Building2,
  HeartHandshake,
  Clock,
  ShieldCheck,
} from 'lucide-react';

const iconsMap: Record<string, React.ElementType> = {
  communication: Stethoscope,
  translation: FileText,
  assistance: Building2,
  cultural: HeartHandshake,
  availability: Clock,
  confidentiality: ShieldCheck,
};

export const WhatWeDo: React.FC = () => {
  const { t } = useLanguage();
  const items = t('whatWeDo.items') as Array<{ id: string; title: string; desc: string }>;

  return (
    <section id="what-we-do" className="py-16 md:py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-navy">
            {t('whatWeDo.title')}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed">
            {t('whatWeDo.subtitle')}
          </p>
        </div>

        {/* 6 Minimal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(items) &&
            items.map((item, idx) => {
              const Icon = iconsMap[item.id] || Stethoscope;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="p-8 rounded-2xl bg-[#FAFAF8] border border-gray-200/90 shadow-subtle hover:shadow-card hover:-translate-y-1 hover:border-brand-teal/40 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-colors duration-300 mb-6 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-brand-navy mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-brand-muted leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
};
