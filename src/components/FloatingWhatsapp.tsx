'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export const FloatingWhatsapp: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip on hover */}
      <span className="mr-3 px-3 py-1.5 bg-brand-navy text-white text-xs font-semibold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:inline-block">
        {t('hero.ctaWhatsapp')}
      </span>

      <a
        href="https://wa.me/918178300511"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Shameem Ahmad"
        className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-float hover:scale-110 active:scale-95 transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-[#00E510]/40"
      >
        {/* Pulse ring animation */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#00E510] opacity-30 animate-ping" />
        
        {/* Official WhatsApp Brand Icon */}
        <div className="relative w-14 h-14 drop-shadow-md">
          <Image
            src="/images/whatsapp-icon.svg"
            alt="WhatsApp Icon"
            fill
            sizes="56px"
            className="object-contain"
          />
        </div>
      </a>
    </div>
  );
};
