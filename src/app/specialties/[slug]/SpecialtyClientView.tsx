'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { SpecialtyItem } from '@/data/specialties';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingWhatsapp } from '@/components/FloatingWhatsapp';
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Stethoscope,
  Send,
  HelpCircle,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';

const process7Steps = [
  {
    num: '01',
    en: 'Send Reports',
    ru: 'Отправка отчетов',
    ne: 'रिपोर्ट पठाउनुहोस्',
    descEn: 'Share your medical diagnostic reports, MRI/CT scans, and clinical history.',
    descRu: 'Отправьте снимки МРТ/КТ, выписки и лабораторные анализы.',
    descNe: 'आफ्नो मेडिकल रिपोर्ट र लक्षण विवरण पठाउनुहोस्।',
  },
  {
    num: '02',
    en: 'Doctor Opinion',
    ru: 'Мнение врача',
    ne: 'डाक्टरको सल्लाह',
    descEn: 'We consult senior hospital specialists to evaluate your case.',
    descRu: 'Мы передаем документы ведущим онкологам/хирургам для экспертного мнения.',
    descNe: 'विशेषज्ञ डाक्टरहरूसँग परामर्श गराइन्छ।',
  },
  {
    num: '03',
    en: 'Treatment Plan & Estimate',
    ru: 'План и смета',
    ne: 'उपचार योजना र अनुमान',
    descEn: 'Receive official treatment options and estimated hospital costs.',
    descRu: 'Получите предварительный финансовый план и длительность лечения.',
    descNe: 'अस्पतालको सम्भावित खर्च विवरण प्राप्त गर्नुहोस्।',
  },
  {
    num: '04',
    en: 'Visa & Invite Letter',
    ru: 'Виза и приглашение',
    ne: 'भिसा र निमन्त्रणा',
    descEn: 'Get official hospital medical invitation letter for fast visa approval.',
    descRu: 'Официальное приглашение от клиники для быстрого получения визы.',
    descNe: 'अस्पतालबाट भिसा लेटर प्राप्त गर्नुहोस्।',
  },
  {
    num: '05',
    en: 'Arrival & Interpreter',
    ru: 'Прибытие и переводчик',
    ne: 'आगमन र दोभाषे',
    descEn: 'Airport greeting, SIM card help, and hotel/hospital check-in assistance.',
    descRu: 'Встреча в аэропорту, помощь с заселением и личное сопровождение.',
    descNe: 'एयरपोर्ट स्वागत र अस्पताल भर्ना सहयोग।',
  },
  {
    num: '06',
    en: 'Treatment & Care',
    ru: 'Лечение и операция',
    ne: 'उपचार र शल्यक्रिया',
    descEn: 'Full in-person translation during doctor rounds, tests, and surgery.',
    descRu: 'Сопровождение на всех приёмах, обходах врача и во время операции.',
    descNe: 'उपचारका क्रममा पूर्ण दोभाषे सहयोग।',
  },
  {
    num: '07',
    en: 'Discharge & Follow-up',
    ru: 'Выписка и контрольный уход',
    ne: 'डिस्चार्ज र फलो-अप',
    descEn: 'Translated discharge summary, medicine instructions, and post-return follow-up.',
    descRu: 'Перевод выписного эпикриза, рецептов и связи с врачом после возвращения.',
    descNe: 'डिस्चार्ज रिपोर्ट र घर फर्किए पछिको सहयोग।',
  },
];

export const SpecialtyClientView: React.FC<{ specialty: SpecialtyItem }> = ({ specialty }) => {
  const { language, t } = useLanguage();
  const localized = specialty[language] || specialty.en;

  const [formData, setFormData] = useState({
    name: '',
    country: '',
    language: 'English',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsappSubmit = () => {
    const text = encodeURIComponent(
      `Hello Shameem! I am inquiring about *${localized.title}*.\n` +
      `Name: ${formData.name || 'Patient'}\n` +
      `Country: ${formData.country || 'International'}\n` +
      `Message: ${formData.message}`
    );
    window.open(`https://wa.me/918178300511?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Top Breadcrumb / Back Button */}
          <div>
            <Link
              href="/#specialties"
              className="inline-flex items-center text-sm font-semibold text-brand-navy hover:text-brand-teal transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span>{t('specialtyDetail.backToSpecialties')}</span>
            </Link>
          </div>

          {/* Specialty Header Hero Card */}
          <div className="p-8 sm:p-12 rounded-3xl bg-brand-navy text-white shadow-card relative overflow-hidden">
            <div className="max-w-3xl relative z-10 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-teal-light/20 text-brand-teal text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-brand-teal" />
                <span>Specialized Medical Department</span>
              </div>
              <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white">
                {localized.title}
              </h1>
              <p className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed">
                {localized.description}
              </p>
            </div>
          </div>

          {/* 2-Column Section: Overview & Typical Procedures */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Overview */}
            <div className="lg:col-span-6 p-8 rounded-3xl bg-white border border-gray-200/90 shadow-subtle space-y-4">
              <div className="flex items-center space-x-3 text-brand-navy">
                <FileText className="w-6 h-6 text-brand-teal" />
                <h2 className="font-heading text-2xl font-bold">
                  {t('specialtyDetail.overviewTitle')}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                {localized.overview}
              </p>
            </div>

            {/* Typical Procedures */}
            <div className="lg:col-span-6 p-8 rounded-3xl bg-white border border-gray-200/90 shadow-subtle space-y-4">
              <div className="flex items-center space-x-3 text-brand-navy">
                <Stethoscope className="w-6 h-6 text-brand-teal" />
                <h2 className="font-heading text-2xl font-bold">
                  {t('specialtyDetail.proceduresTitle')}
                </h2>
              </div>
              <div className="space-y-2.5">
                {localized.procedures.map((proc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 p-3 rounded-xl bg-[#FAFAF8] border border-gray-200/60 text-sm font-semibold text-brand-navy"
                  >
                    <CheckCircle2 className="w-5 h-5 text-brand-teal flex-shrink-0" />
                    <span>{proc}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 7-Step Care Process Pathway */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200/90 shadow-subtle space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-navy">
                {t('specialtyDetail.processTitle')}
              </h2>
              <p className="text-sm text-brand-muted">
                Step-by-step coordination from your home country to final recovery in Delhi NCR.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {process7Steps.map((step) => (
                <div
                  key={step.num}
                  className="p-5 rounded-2xl bg-[#FAFAF8] border border-gray-200/80 shadow-subtle flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-2xl font-black text-brand-teal">
                      {step.num}
                    </span>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-brand-navy text-white">
                      Step
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-sm text-brand-navy">
                    {language === 'ru' ? step.ru : language === 'ne' ? step.ne : step.en}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {language === 'ru' ? step.descRu : language === 'ne' ? step.descNe : step.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200/90 shadow-subtle space-y-6">
            <div className="flex items-center space-x-3 text-brand-navy mb-4">
              <HelpCircle className="w-6 h-6 text-brand-teal" />
              <h2 className="font-heading text-2xl font-bold">
                {t('specialtyDetail.faqTitle')}
              </h2>
            </div>

            <div className="space-y-4">
              {localized.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#FAFAF8] border border-gray-200/80 space-y-2"
                >
                  <h3 className="font-heading font-bold text-base text-brand-navy">
                    Q: {faq.question}
                  </h3>
                  <p className="text-sm text-brand-muted leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Enquiry Form: "Request Estimate" */}
          <div className="p-8 sm:p-10 rounded-3xl bg-brand-navy text-white shadow-card space-y-6">
            <div className="max-w-2xl">
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                {t('specialtyDetail.enquiryTitle')} - {localized.title}
              </h2>
              <p className="text-sm text-gray-300 mt-2">
                {t('specialtyDetail.enquirySubtitle')}
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-white/10 border border-white/20 text-white space-y-3">
                <div className="flex items-center space-x-2 text-brand-teal font-bold text-lg">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>Request Submitted Successfully</span>
                </div>
                <p className="text-sm text-gray-200">
                  Thank you! Shameem Ahmad will review your details and contact you on WhatsApp with doctor recommendations and hospital estimate options.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full Name *"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-brand-teal"
                  />
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="Country of Origin *"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-brand-teal"
                  />
                </div>

                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about the diagnosis, symptoms, or current doctor reports..."
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-brand-teal resize-none"
                />

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-xl font-semibold bg-brand-teal text-white hover:bg-brand-teal-dark transition-colors text-sm flex items-center justify-center"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    <span>Submit Enquiry</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsappSubmit}
                    className="px-6 py-3.5 rounded-xl font-semibold bg-[#25D366] text-white hover:bg-[#20ba5a] transition-colors text-sm flex items-center justify-center"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    <span>Chat on WhatsApp directly</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </main>

      <Footer />
      <FloatingWhatsapp />
    </div>
  );
};
