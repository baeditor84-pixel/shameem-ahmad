'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { User, Languages, Sparkles, HeartPulse, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  const { t } = useLanguage();
  const languages = t('about.languages') as string[];

  const countries = [
    { name: 'Russia', flag: '🇷🇺' },
    { name: 'Nepal', flag: '🇳🇵' },
    { name: 'Turkmenistan', flag: '🇹🇲' },
    { name: 'Kazakhstan', flag: '🇰🇿' },
    { name: 'Uzbekistan', flag: '🇺🇿' },
    { name: 'India', flag: '🇮🇳' },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-[#FAFAF8] border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bio & Core Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-teal-light/60 border border-brand-teal/20 text-brand-teal-dark text-xs font-semibold">
              <User className="w-4 h-4 text-brand-teal" />
              <span>Dedicated Patient Advocate</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-navy">
              {t('about.title')}
            </h2>

            <p className="text-base sm:text-lg text-brand-muted leading-relaxed font-normal">
              {t('about.subtitle')}
            </p>

            <div className="space-y-4 text-sm sm:text-base text-brand-text leading-relaxed font-normal">
              <p>{t('about.bio1')}</p>
              <p>{t('about.bio2')}</p>
            </div>

            {/* Highlight Quote */}
            <div className="p-5 rounded-2xl bg-white border border-brand-teal/30 shadow-subtle flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-brand-teal-light text-brand-teal flex-shrink-0">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <p className="font-heading font-extrabold text-lg text-brand-navy">
                  &ldquo;{t('about.quote')}&rdquo;
                </p>
                <p className="text-xs text-brand-muted mt-0.5">
                  Personal belief & guiding philosophy
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Spoken Languages & Served Countries */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Languages Card */}
            <div className="p-8 rounded-3xl bg-white border border-gray-200/90 shadow-card">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 rounded-xl bg-brand-navy text-white">
                  <Languages className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-brand-navy">
                    {t('about.languagesTitle')}
                  </h3>
                  <p className="text-xs text-brand-muted">
                    Native & professional fluency
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {Array.isArray(languages) &&
                  languages.map((lang) => (
                    <div
                      key={lang}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#FAFAF8] border border-gray-200/60 text-sm font-semibold text-brand-navy"
                    >
                      <span>{lang}</span>
                      <CheckCircle2 className="w-4 h-4 text-brand-teal" />
                    </div>
                  ))}
              </div>
            </div>

            {/* Countries Served Card */}
            <div className="p-6 rounded-3xl bg-brand-navy text-white shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-heading font-bold text-sm text-gray-200">
                  International Patient Coverage
                </h4>
                <Sparkles className="w-4 h-4 text-brand-teal" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {countries.map((c) => (
                  <div
                    key={c.name}
                    className="flex items-center space-x-2 p-2.5 rounded-xl bg-white/10 border border-white/10 text-xs font-semibold text-white"
                  >
                    <span>{c.flag}</span>
                    <span>{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
