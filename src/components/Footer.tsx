'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage, Language } from '@/context/LanguageContext';
import { Globe, AtSign, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <footer className="bg-brand-navy text-white pt-16 pb-12 border-t border-brand-navy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Wordmark & Bio */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex flex-col">
              <span className="font-heading text-2xl font-bold text-white tracking-tight">
                Shameem Ahmad
              </span>
              <span className="text-xs font-semibold text-brand-teal tracking-wide mt-0.5">
                Medical Interpreter & International Patient Coordinator
              </span>
            </div>

            <p className="text-sm text-gray-300 font-normal leading-relaxed max-w-md">
              {t('footer.bio')}
            </p>

            {/* Official Social Brand Icons */}
            <div className="flex items-center space-x-3 pt-2">
              {/* WhatsApp */}
              <a
                href="https://wa.me/918178300511"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Contact"
                className="w-10 h-10 relative flex items-center justify-center rounded-xl bg-white/10 p-1.5 hover:bg-white/20 transition-all hover:scale-105"
              >
                <Image
                  src="/images/whatsapp-icon.svg"
                  alt="WhatsApp"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/innocent_pathan_000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="w-10 h-10 relative flex items-center justify-center rounded-xl bg-white/10 p-1.5 hover:bg-white/20 transition-all hover:scale-105"
              >
                <Image
                  src="/images/instagram-icon.svg"
                  alt="Instagram"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/shameemahmad"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram Channel"
                className="w-10 h-10 relative flex items-center justify-center rounded-xl bg-white/10 p-1.5 hover:bg-white/20 transition-all hover:scale-105"
              >
                <Image
                  src="/images/telegram-icon.svg"
                  alt="Telegram"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </a>

              {/* Threads */}
              <a
                href="https://www.threads.net/@innocent_pathan_000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Threads Profile"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all hover:scale-105"
              >
                <AtSign className="w-5 h-5 text-gray-200" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-base text-white">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#what-we-do" className="hover:text-brand-teal transition-colors">
                  {t('nav.whatWeDo')}
                </a>
              </li>
              <li>
                <a href="#specialties" className="hover:text-brand-teal transition-colors">
                  {t('nav.specialties')}
                </a>
              </li>
              <li>
                <a href="#hospitals" className="hover:text-brand-teal transition-colors">
                  {t('nav.hospitals')}
                </a>
              </li>
              <li>
                <a href="#doctors" className="hover:text-brand-teal transition-colors">
                  {t('nav.doctors')}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-brand-teal transition-colors">
                  {t('nav.reviews')}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-brand-teal transition-colors">
                  {t('nav.contact')}
                </a>
              </li>
              <li className="pt-2 border-t border-white/10">
                <a
                  href="/admin"
                  className="inline-flex items-center text-xs font-semibold text-brand-teal hover:text-white transition-colors"
                >
                  ⚙️ Admin Panel
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Language Toggle & Direct Info */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-heading font-bold text-base text-white">
              Language Preference
            </h4>
            <div className="flex items-center space-x-2 bg-white/10 rounded-xl p-1.5 border border-white/10 w-fit">
              <Globe className="w-4 h-4 text-brand-teal ml-2 mr-1" />
              {(['en', 'ru', 'ne'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    language === lang
                      ? 'bg-brand-teal text-white shadow-sm'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {lang === 'en' ? 'English' : lang === 'ru' ? 'Русский' : 'नेपाली'}
                </button>
              ))}
            </div>

            <div className="pt-2 text-xs text-gray-400 space-y-1">
              <p>📍 Delhi NCR, India</p>
              <p>📞 +91 81783 00511 (WhatsApp / Phone / Viber / IMO)</p>
              <p>✉️ info@shameemcare.com</p>
            </div>
          </div>

        </div>

        {/* Disclaimer Row */}
        <div className="pt-8 space-y-4 text-xs text-gray-400">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start space-x-3">
            <ShieldAlert className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {t('footer.disclaimer')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-[11px] text-gray-400">
            <p>
              © {new Date().getFullYear()} Shameem Ahmad · Medical Interpreter. {t('footer.copyright')}
            </p>
            <p className="flex items-center space-x-1 text-gray-300">
              <span>Designed by <strong className="text-white">Belal Iqbal</strong></span>
              <span>·</span>
              <a
                href="https://wa.me/919540299347"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-teal hover:underline font-semibold"
              >
                WP: +91 95402 99347
              </a>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
