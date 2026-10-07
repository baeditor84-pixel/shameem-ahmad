'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Star, MessageSquareQuote, HeartHandshake, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: string;
  name: string;
  country: string;
  flag: string;
  treatment: string;
  comment: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Elena Rostova',
    country: 'Moscow, Russia',
    flag: '🇷🇺',
    treatment: 'Orthopaedics & Joint Replacement',
    comment: 'Shameem made our knee replacement journey at Max Healthcare so smooth. He translated every doctor consultation into Russian perfectly and helped with hospital discharge.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Bikram Thapa',
    country: 'Kathmandu, Nepal',
    flag: '🇳🇵',
    treatment: 'Cardiology & Heart Bypass',
    comment: 'Having a Nepali-speaking interpreter in Delhi gave our family immense confidence. Shameem took care of everything from hospital admission to medicine instructions.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Meret Durdyev',
    country: 'Ashgabat, Turkmenistan',
    flag: '🇹🇲',
    treatment: 'Liver Transplant Coordination',
    comment: 'Highly professional medical interpreter. Shameem attended all ethical committee meetings with us and explained all procedures in detail. Very trustworthy!',
    rating: 5,
  },
  {
    id: '4',
    name: 'Alisher Karimov',
    country: 'Tashkent, Uzbekistan',
    flag: '🇺🇿',
    treatment: 'Neurosurgery & Spine',
    comment: 'Available 24/7 during our stays in Gurgaon and Faridabad hospitals. Accurate translation and genuine care. Thank you Shameem brother!',
    rating: 5,
  },
];

const allPatientPhotos = [
  { src: '/images/all-patient-1.jpg', alt: 'Patient hospital arrival & welcome' },
  { src: '/images/all-patient-2.jpg', alt: 'Diagnostic consultation & report translation' },
  { src: '/images/all-patient-3.jpg', alt: 'Hospital OPD registration assistance' },
  { src: '/images/all-patient-4.jpg', alt: 'Specialist consultation briefing' },
  { src: '/images/all-patient-5.jpg', alt: 'Surgical unit preparation & coordination' },
  { src: '/images/all-patient-6.jpg', alt: 'Family dining & hospital support' },
  { src: '/images/all-patient-7.jpg', alt: 'ICU recovery room translation' },
  { src: '/images/all-patient-8.jpg', alt: 'Patient lounge & hotel stay support' },
  { src: '/images/all-patient-9.jpg', alt: 'Hospital lobby guidance with family' },
  { src: '/images/all-patient-10.jpg', alt: 'Post-op rehabilitation & walking care' },
  { src: '/images/all-patient-11.jpg', alt: 'Oncology department consultation' },
  { src: '/images/all-patient-12.jpg', alt: 'Gynecological & women care guidance' },
  { src: '/images/all-patient-14.jpg', alt: 'ENT & skull base consultation' },
  { src: '/images/all-patient-15.jpg', alt: 'Gynaecology consultation assistance' },
  { src: '/images/all-patient-16.jpg', alt: 'Neurosurgery patient assistance' },
  { src: '/images/all-patient-17.jpg', alt: 'Discharge summary & prescription review' },
  { src: '/images/all-patient-18.jpg', alt: 'Follow-up consultation before departure' },
  { src: '/images/all-patient-19.jpg', alt: 'Medical report review with specialist' },
  { src: '/images/all-patient-20.jpg', alt: 'Patient coordinator Shameem Ahmad' },
  { src: '/images/all-patient-21.jpg', alt: 'Successful treatment departure & farewell' },
];

export const Reviews: React.FC = () => {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);

  const displayedPhotos = showAll ? allPatientPhotos : allPatientPhotos.slice(0, 12);

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
          {testimonials.map((item, idx) => (
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

        {/* Complete Patient Photo Gallery (All 21 Photos) */}
        <div className="pt-10 border-t border-gray-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-navy/5 text-brand-navy text-xs font-semibold mb-2">
              <HeartHandshake className="w-3.5 h-3.5 text-brand-teal" />
              <span>Complete Patient Journey Gallery ({allPatientPhotos.length} Photos)</span>
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
                key={idx}
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
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center px-6 py-3 rounded-xl bg-brand-navy text-white text-xs font-semibold hover:bg-brand-navy-light shadow transition-all duration-200"
            >
              <span>{showAll ? 'Show Fewer Photos' : `View All ${allPatientPhotos.length} Patient Photos`}</span>
              {showAll ? (
                <ChevronUp className="w-4 h-4 ml-2 text-brand-teal" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-2 text-brand-teal" />
              )}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
