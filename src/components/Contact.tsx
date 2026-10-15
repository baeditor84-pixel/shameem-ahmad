'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteContent } from '@/context/SiteContentContext';
import { specialtiesData } from '@/data/specialties';
import { Phone, Mail, MapPin, Send, Upload, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
  const { language, t } = useLanguage();
  const { siteData } = useSiteContent();
  const contact = siteData.contact;

  const [formData, setFormData] = useState({
    name: '',
    country: '',
    language: 'English',
    specialty: specialtiesData[0]?.en?.title || 'Oncology (Cancer Care)',
    message: '',
  });

  const [customSpecialty, setCustomSpecialty] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const getEffectiveSpecialty = () => {
    if (formData.specialty === 'Other') {
      return customSpecialty.trim() ? `Other (${customSpecialty.trim()})` : 'Other';
    }
    return formData.specialty;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const effectiveSpecialty = getEffectiveSpecialty();

    try {
      // Send data to Next.js API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          specialty: effectiveSpecialty,
          fileName: file ? file.name : undefined,
        }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleWhatsappFallback = () => {
    const effectiveSpecialty = getEffectiveSpecialty();
    const whatsappNum = contact.whatsapp || '918178300511';
    const text = encodeURIComponent(
      `Hello Shameem! My name is ${formData.name || 'Patient'} from ${formData.country || 'International'}.\n` +
      `Preferred Language: ${formData.language}\n` +
      `Specialty Needed: ${effectiveSpecialty}\n` +
      `Message: ${formData.message}`
    );
    window.open(`https://wa.me/${whatsappNum}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-navy">
            {t('contact.title')}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#FAFAF8] border border-gray-200/90 shadow-subtle space-y-6">
              
              <h3 className="font-heading text-xl font-bold text-brand-navy">
                Direct Contact Channels
              </h3>

              {/* Phone / WhatsApp / Viber / IMO */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-brand-teal-light text-brand-teal flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-brand-muted">
                    {t('contact.phone')}
                  </p>
                  <a
                    href={`tel:${contact.phone || '+918178300511'}`}
                    className="font-heading text-lg font-bold text-brand-navy hover:text-brand-teal transition-colors block mt-0.5"
                  >
                    {contact.phone || '+91 81783 00511'}
                  </a>
                  <div className="flex items-center space-x-3 mt-2 text-xs font-medium text-brand-teal">
                    <a
                      href={`https://wa.me/${contact.whatsapp || '918178300511'}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center"
                    >
                      <MessageSquare className="w-3.5 h-3.5 mr-1" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-brand-navy text-white flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-brand-muted">
                    {t('contact.email')}
                  </p>
                  <a
                    href={`mailto:${contact.email || 'shameemahmadaams@gmail.com'}`}
                    className="font-heading text-sm sm:text-base font-bold text-brand-navy hover:text-brand-teal transition-colors block mt-0.5 break-all"
                  >
                    {contact.email || 'shameemahmadaams@gmail.com'}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-stone-100 text-brand-navy flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-brand-muted">
                    {t('contact.location')}
                  </p>
                  <p className="text-sm font-semibold text-brand-navy mt-0.5">
                    {contact.location || t('contact.locationValue')}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Consultation Form */}
          <div className="lg:col-span-7">
            <motion.form
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200/90 shadow-card space-y-6"
            >
              <h3 className="font-heading text-xl font-bold text-brand-navy">
                Send Patient Information & Medical Reports
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1.5">
                    {t('contact.form.name')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAFAF8] border border-gray-200 text-sm focus:border-brand-teal focus:bg-white transition-colors outline-none"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1.5">
                    {t('contact.form.country')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. Russia / Nepal / Uzbekistan"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAFAF8] border border-gray-200 text-sm focus:border-brand-teal focus:bg-white transition-colors outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Language */}
                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1.5">
                    {t('contact.form.language')}
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAFAF8] border border-gray-200 text-sm focus:border-brand-teal focus:bg-white transition-colors outline-none"
                  >
                    <option value="Russian">Russian (Русский)</option>
                    <option value="Nepali">Nepali (नेपाली)</option>
                    <option value="English">English</option>
                  </select>
                </div>

                {/* Specialty */}
                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1.5">
                    {t('contact.form.specialty')}
                  </label>
                  <select
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAFAF8] border border-gray-200 text-sm focus:border-brand-teal focus:bg-white transition-colors outline-none"
                  >
                    {specialtiesData.map((s) => (
                      <option key={s.slug} value={s[language]?.title || s.en.title}>
                        {s[language]?.title || s.en.title}
                      </option>
                    ))}
                    <option value="Other">
                      {t('contact.form.otherOption')}
                    </option>
                  </select>
                </div>
              </div>

              {/* Custom Specialty input if "Other" is selected */}
              {formData.specialty === 'Other' && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-1.5"
                >
                  <label className="block text-xs font-semibold text-brand-navy">
                    {t('contact.form.specifySpecialty')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={customSpecialty}
                    onChange={(e) => setCustomSpecialty(e.target.value)}
                    placeholder={
                      language === 'ru'
                        ? 'например: Стоматология, Педиатрия, ЭКО и др.'
                        : language === 'ne'
                        ? 'जस्तै: दन्त सेवा, बालरोग, आईभीएफ, इत्यादि'
                        : 'e.g. Dental Surgery, IVF Fertility, Pediatrics, etc.'
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#FAFAF8] border border-brand-teal text-sm focus:bg-white focus:ring-2 focus:ring-brand-teal/20 transition-all outline-none"
                  />
                </motion.div>
              )}

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-brand-navy mb-1.5">
                  {t('contact.form.message')} *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your current diagnosis, symptoms, or requested treatment in India..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAFAF8] border border-gray-200 text-sm focus:border-brand-teal focus:bg-white transition-colors outline-none resize-none"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-xs font-semibold text-brand-navy mb-1.5">
                  {t('contact.form.file')}
                </label>
                <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-brand-teal transition-colors bg-[#FAFAF8]">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center space-y-1">
                    <Upload className="w-6 h-6 text-brand-teal" />
                    <span className="text-xs font-medium text-brand-navy">
                      {file ? file.name : 'Click or drag medical files to attach'}
                    </span>
                    <span className="text-[10px] text-brand-muted">
                      PDF, JPG, PNG up to 10MB
                    </span>
                  </div>
                </div>
              </div>

              {/* Status feedback */}
              {status === 'success' && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>{t('contact.form.success')}</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <span>{t('contact.form.error')}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleWhatsappFallback}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors"
                  >
                    WhatsApp Directly
                  </button>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full sm:flex-1 inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold bg-brand-navy text-white hover:bg-brand-navy-light shadow transition-all duration-200 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 mr-2 text-brand-teal" />
                  <span>
                    {status === 'sending'
                      ? t('contact.form.sending')
                      : t('contact.form.submit')}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsappFallback}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3.5 rounded-xl text-sm font-semibold bg-[#25D366] text-white hover:bg-[#20ba5a] shadow transition-all duration-200"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  <span>Send via WhatsApp</span>
                </button>
              </div>
            </motion.form>
          </div>

        </div>
      </div>
    </section>
  );
};
