'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { FileUp, Stethoscope, MailCheck, HeartPulse } from 'lucide-react';

const stepIcons = [FileUp, Stethoscope, MailCheck, HeartPulse];

export const HowItWorks: React.FC = () => {
  const { t } = useLanguage();
  const steps = t('howItWorks.steps') as Array<{
    number: string;
    title: string;
    desc: string;
  }>;

  return (
    <section className="py-16 md:py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-navy">
            {t('howItWorks.title')}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {Array.isArray(steps) &&
            steps.map((step, idx) => {
              const Icon = stepIcons[idx] || FileUp;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="relative p-8 rounded-2xl bg-[#FAFAF8] border border-gray-200/90 shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Step Number Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-heading text-3xl font-extrabold text-brand-teal/40 group-hover:text-brand-teal transition-colors">
                        {step.number}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-brand-navy shadow-sm">
                        <Icon className="w-5 h-5 text-brand-teal" />
                      </div>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-brand-navy mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-brand-muted leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200/60 flex items-center text-xs font-semibold text-brand-teal">
                    <span>Step {idx + 1} of 4</span>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
};
