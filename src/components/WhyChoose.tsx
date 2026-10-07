'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, Heart, Lock, Globe2, Award, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const pointIcons = [ShieldCheck, Heart, Lock, Globe2, Award];

export const WhyChoose: React.FC = () => {
  const { t } = useLanguage();
  const points = t('whyChoose.points') as Array<{
    title: string;
    desc: string;
  }>;

  return (
    <section className="py-16 md:py-24 bg-[#FAFAF8] border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Points */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-teal-light/60 border border-brand-teal/20 text-brand-teal-dark text-xs font-semibold mb-3">
                <Award className="w-4 h-4 text-brand-teal" />
                <span>Uncompromised Service Standards</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-navy">
                {t('whyChoose.title')}
              </h2>
              <p className="mt-3 text-base text-brand-muted leading-relaxed">
                {t('whyChoose.subtitle')}
              </p>
            </div>

            <div className="space-y-4">
              {Array.isArray(points) &&
                points.map((pt, idx) => {
                  const Icon = pointIcons[idx] || ShieldCheck;

                  return (
                    <motion.div
                      key={pt.title}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.08 }}
                      className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-subtle hover:border-brand-teal flex items-start space-x-4 transition-all"
                    >
                      <div className="p-3 rounded-xl bg-stone-100 text-brand-teal flex-shrink-0 mt-0.5">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-base text-brand-navy">
                          {pt.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-brand-muted mt-1 leading-relaxed">
                          {pt.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </div>

          {/* Right Column: Quote Banner Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="p-8 sm:p-10 rounded-3xl bg-brand-navy text-white relative shadow-card overflow-hidden">
              {/* Background gradient blur circle */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-teal/20 rounded-full blur-3xl" />

              <Quote className="w-12 h-12 text-brand-teal/40 mb-6" />

              <blockquote className="font-heading text-2xl sm:text-3xl font-extrabold leading-snug tracking-tight text-white mb-6">
                {t('whyChoose.quote')}
              </blockquote>

              <p className="text-sm text-gray-300 leading-relaxed font-light mb-8">
                Clear language interpretation ensures zero medical errors, precise dosages, and absolute peace of mind during your hospital stay in India.
              </p>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                <span>Shameem Ahmad</span>
                <span className="text-brand-teal font-semibold">Medical Interpreter</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
