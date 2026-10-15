'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteContent } from '@/context/SiteContentContext';
import { MessageSquareHeart, Calendar, CheckCircle2, Award, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const { siteData } = useSiteContent();
  const hero = siteData.hero;
  const whatsappNumber = siteData.contact.whatsapp || '918178300511';

  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-white via-[#FAFAF8] to-stone-50">
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0B2A4A_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-teal-light/60 border border-brand-teal/20 text-brand-teal-dark text-xs sm:text-sm font-semibold">
              <ShieldCheck className="w-4 h-4 text-brand-teal" />
              <span>{hero.tagline || t('hero.tagline')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-navy leading-tight sm:leading-tight">
              {hero.headline || t('hero.headline')}
            </h1>

            {/* Subline */}
            <p className="text-lg sm:text-xl text-brand-muted font-normal leading-relaxed max-w-2xl">
              {hero.subline || t('hero.subline')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-2xl text-base font-semibold bg-brand-teal text-white shadow-subtle hover:bg-brand-teal-dark hover:shadow-card hover:-translate-y-0.5 transition-all duration-200"
              >
                <MessageSquareHeart className="w-5 h-5 mr-2.5" />
                <span>{t('hero.ctaWhatsapp')}</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-2xl text-base font-semibold bg-white text-brand-navy border border-gray-200 shadow-subtle hover:border-brand-navy hover:bg-stone-50 transition-all duration-200"
              >
                <Calendar className="w-5 h-5 mr-2.5 text-brand-teal" />
                <span>{t('hero.ctaConsultation')}</span>
              </a>
            </div>

            {/* Trust Row */}
            <div className="pt-6 border-t border-gray-200/80">
              <div className="flex flex-wrap items-center gap-3 text-sm text-brand-muted">
                <div className="flex items-center space-x-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold shadow-subtle">
                  <span className="text-base" title="Russia">🇷🇺</span>
                  <span className="text-base" title="Nepal">🇳🇵</span>
                  <span className="text-base" title="Turkmenistan">🇹🇲</span>
                  <span className="text-base" title="Kazakhstan">🇰🇿</span>
                  <span className="text-base" title="Uzbekistan">🇺🇿</span>
                </div>
                <span className="font-medium text-gray-700">
                  {t('hero.trustText')}
                </span>
              </div>
            </div>

            {/* Quick stats / Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-4 text-left">
              <div className="p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60">
                <p className="text-2xl font-bold font-heading text-brand-navy">
                  {hero.statLanguages ? hero.statLanguages.split(' ')[0] : '3+'}
                </p>
                <p className="text-xs text-brand-muted font-medium">
                  {hero.statLanguages ? hero.statLanguages.replace(/^[0-9+%/]+ /, '') || 'Fluent Languages' : 'Fluent Languages'}
                </p>
              </div>
              <div className="p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60">
                <p className="text-2xl font-bold font-heading text-brand-navy">
                  {hero.statHospitals ? hero.statHospitals.split(' ')[0] : '6+'}
                </p>
                <p className="text-xs text-brand-muted font-medium">
                  {hero.statHospitals ? hero.statHospitals.replace(/^[0-9+%/]+ /, '') || 'Top Hospital Networks' : 'Top Hospital Networks'}
                </p>
              </div>
              <div className="p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60">
                <p className="text-2xl font-bold font-heading text-brand-navy">
                  {hero.statConfidential ? hero.statConfidential.split(' ')[0] : '100%'}
                </p>
                <p className="text-xs text-brand-muted font-medium">
                  {hero.statConfidential ? hero.statConfidential.replace(/^[0-9+%/]+ /, '') || 'Confidential & Direct' : 'Confidential & Direct'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-gray-200/90 shadow-card group">
              <Image
                src={hero.portraitImage || '/images/shameem-hero.jpg'}
                alt={t('hero.portraitAlt')}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent opacity-90" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-white/40 text-brand-navy shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-brand-teal/10 text-brand-teal">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-brand-navy">
                      Shameem Ahmad
                    </h3>
                    <p className="text-xs text-brand-muted font-medium">
                      Senior Medical Interpreter · Delhi NCR
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
