'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage, Language } from '@/context/LanguageContext';
import { Globe, Menu, X, MessageSquareHeart } from 'lucide-react';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#what-we-do', label: t('nav.whatWeDo') },
    { href: '#specialties', label: t('nav.specialties') },
    { href: '#hospitals', label: t('nav.hospitals') },
    { href: '#doctors', label: t('nav.doctors') },
    { href: '#reviews', label: t('nav.reviews') },
    { href: '#about', label: t('nav.about') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Wordmark */}
          <Link href="/" className="flex flex-col group">
            <span className="font-heading text-lg sm:text-xl font-bold text-brand-navy group-hover:text-brand-teal transition-colors">
              {t('nav.brand')}
            </span>
            <span className="text-xs font-medium text-brand-muted tracking-wide">
              {t('nav.role')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-text hover:text-brand-teal transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Controls: Language Switcher & WhatsApp CTA */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative flex items-center bg-gray-100 rounded-lg p-1 border border-gray-200">
              <Globe className="w-4 h-4 text-brand-muted ml-2 mr-1" aria-hidden="true" />
              {(['en', 'ru', 'ne'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                    language === lang
                      ? 'bg-brand-navy text-white shadow-sm'
                      : 'text-gray-600 hover:text-brand-navy'
                  }`}
                  aria-label={`Switch language to ${lang}`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* WhatsApp CTA button */}
            <a
              href="https://wa.me/918178300511"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold bg-brand-teal text-white shadow-sm hover:bg-brand-teal-dark hover:shadow transition-all group"
            >
              <MessageSquareHeart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              <span>{t('nav.whatsapp')}</span>
            </a>
          </div>

          {/* Mobile menu toggle button */}
          <div className="flex sm:hidden items-center space-x-2">
            {/* Language Selector for Mobile */}
            <div className="flex items-center bg-gray-100 rounded-md p-0.5 border border-gray-200">
              {(['en', 'ru', 'ne'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 text-[10px] font-bold rounded ${
                    language === lang ? 'bg-brand-navy text-white' : 'text-gray-600'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-brand-navy hover:text-brand-teal rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-medium text-brand-text hover:bg-gray-50 hover:text-brand-teal transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 border-t border-gray-100">
            <a
              href="https://wa.me/918178300511"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center px-4 py-3 rounded-xl text-base font-semibold bg-brand-teal text-white shadow hover:bg-brand-teal-dark transition-all"
            >
              <MessageSquareHeart className="w-5 h-5 mr-2" />
              <span>{t('nav.whatsapp')}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
