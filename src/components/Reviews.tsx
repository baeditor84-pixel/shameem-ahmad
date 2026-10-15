'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteContent } from '@/context/SiteContentContext';
import { Star, MessageSquareQuote, HeartHandshake, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const Reviews: React.FC = () => {
  const { t } = useLanguage();
  const { siteData } = useSiteContent();
  const [showAll, setShowAll] = useState(false);

  const testimonialsList = siteData.testimonials || [];
  const patientPhotosList = siteData.patientPhotos || [];
  const displayedPhotos = showAll ? patientPhotosList : patientPhotosList.slice(0, 12);

  return (
    <section id="reviews" className="py-16 md:py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-teal-light/60 border border-brand-teal/20 text-brand-teal-dark text-xs font-semibold mb-3">
            <MessageSquareQuote className="w-4 h-4 text-brand-teal" />
            <span>Verified Patient Experiences</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-navy">
            {t('reviews.title')}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed">
            {t('reviews.subtitle')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {testimonialsList.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="p-6 sm:p-8 rounded-2xl bg-[#FAFAF8] border border-gray-200/90 shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-brand-text font-normal italic leading-relaxed mb-6">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200/60 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-heading font-bold text-sm text-brand-navy">
                      {item.name}
                    </span>
                    <span className="text-sm">{item.flag}</span>
                  </div>
                  <p className="text-xs text-brand-muted font-medium mt-0.5">
                    {item.country} · <span className="text-brand-teal">{item.treatment}</span>
                  </p>
                </div>

                <div className="px-2.5 py-1 bg-white rounded-lg border border-gray-200 text-[10px] font-semibold text-gray-500">
                  Verified Patient
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Complete Patient Photo Gallery */}
        <div className="pt-10 border-t border-gray-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-navy/5 text-brand-navy text-xs font-semibold mb-2">
              <HeartHandshake className="w-3.5 h-3.5 text-brand-teal" />
              <span>Complete Patient Journey Gallery ({patientPhotosList.length} Photos)</span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-brand-navy">
              {t('reviews.galleryTitle')}
            </h3>
            <p className="text-sm text-brand-muted mt-2">
              {t('reviews.gallerySubtitle')}
            </p>
          </div>

          {/* Grid for Patient Photos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {displayedPhotos.map((photo, idx) => (
              <motion.div
                key={photo.id || idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: (idx % 4) * 0.05 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200/90 shadow-subtle hover:shadow-card hover:-translate-y-1 transition-all duration-300 group"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex items-end">
                  <span className="text-white text-xs font-semibold leading-tight">
                    {photo.alt}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Show More / Show Less Toggle Button */}
          {patientPhotosList.length > 12 && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center px-6 py-3 rounded-xl bg-brand-navy text-white text-xs font-semibold hover:bg-brand-navy-light shadow transition-all duration-200"
              >
                <span>{showAll ? 'Show Fewer Photos' : `View All ${patientPhotosList.length} Patient Photos`}</span>
                {showAll ? (
                  <ChevronUp className="w-4 h-4 ml-2 text-brand-teal" />
                ) : (
                  <ChevronDown className="w-4 h-4 ml-2 text-brand-teal" />
                )}
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
