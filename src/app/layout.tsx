import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { SiteContentProvider } from '@/context/SiteContentContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://shameemmedinterpreter.com'),
  title: 'Shameem Ahmad · Medical Interpreter & Patient Coordinator in Delhi NCR',
  description:
    'Professional Russian, Nepali & English medical interpreter for international patients at Delhi NCR top hospitals (Max, Artemis, Fortis, Apollo, Medanta, Yatharth). Direct hospital coordination, report translation, and visa invitation support.',
  keywords: [
    'Medical Interpreter Delhi',
    'Russian Medical Interpreter India',
    'Nepali Medical Interpreter Delhi NCR',
    'Medical Tourism India',
    'Shameem Ahmad Interpreter',
    'Patient Coordinator Delhi Hospitals',
    'Max Healthcare Russian Interpreter',
    'Apollo Hospital Medical Tourism',
    'Yatharth Hospital International Patient Support',
  ],
  authors: [{ name: 'Shameem Ahmad' }],
  openGraph: {
    title: 'Shameem Ahmad · Medical Interpreter & Patient Coordinator in Delhi NCR',
    description:
      'Russian, Nepali & English medical interpreter for international patients at Delhi top hospitals. Clear Communication. Better Care.',
    url: 'https://shameemmedinterpreter.com',
    siteName: 'Shameem Ahmad Medical Interpreter',
    images: [
      {
        url: '/images/shameem-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Shameem Ahmad - Senior Medical Interpreter in Delhi NCR',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shameem Ahmad · Medical Interpreter in Delhi NCR',
    description:
      'Russian, Nepali & English medical interpreter for international patients at Delhi top hospitals.',
    images: ['/images/shameem-hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalBusiness',
      '@id': 'https://shameemmedinterpreter.com/#business',
      name: 'Shameem Ahmad · Medical Interpreter & Patient Coordinator',
      url: 'https://shameemmedinterpreter.com',
      telephone: '+918178300511',
      email: 'info@shameemcare.com',
      image: '/images/shameem-hero.jpg',
      priceRange: 'Request Estimate',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Delhi NCR',
        addressRegion: 'Delhi',
        addressCountry: 'IN',
      },
      areaServed: ['Russia', 'Nepal', 'Turkmenistan', 'Kazakhstan', 'Uzbekistan', 'India'],
      knowsLanguage: ['en', 'ru', 'ne', 'hi'],
      medicalSpecialty: [
        'Oncology',
        'TransplantSurgery',
        'Cardiovascular',
        'Orthopedic',
        'Neurology',
        'Ophthalmology',
      ],
    },
    {
      '@type': 'Person',
      '@id': 'https://shameemmedinterpreter.com/#person',
      name: 'Shameem Ahmad',
      jobTitle: 'Medical Interpreter & International Patient Coordinator',
      telephone: '+918178300511',
      email: 'info@shameemcare.com',
      sameAs: [
        'https://www.instagram.com/innocent_pathan_000',
        'https://www.threads.net/@innocent_pathan_000',
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="antialiased bg-[#FAFAF8] text-brand-text">
        <LanguageProvider>
          <SiteContentProvider>{children}</SiteContentProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
