export interface DoctorItem {
  id: string;
  name: string;
  title: string;
  hospital: string;
  specialties: string[];
  image: string;
}

export interface HospitalItem {
  id: string;
  name: string;
  location: string;
  image: string;
  accreditation: string;
  highlights: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  country: string;
  flag: string;
  treatment: string;
  comment: string;
  rating: number;
  date?: string;
}

export interface PatientPhotoItem {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface HeroSettings {
  tagline: string;
  headline: string;
  subline: string;
  statLanguages: string;
  statHospitals: string;
  statConfidential: string;
  portraitImage: string;
}

export interface ContactSettings {
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  workingHours: string;
}

export interface InquiryItem {
  id: string;
  name: string;
  country: string;
  language: string;
  specialty: string;
  message: string;
  fileName?: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'resolved';
}

export interface SiteData {
  doctors: DoctorItem[];
  hospitals: HospitalItem[];
  testimonials: TestimonialItem[];
  patientPhotos: PatientPhotoItem[];
  hero: HeroSettings;
  contact: ContactSettings;
  inquiries: InquiryItem[];
  adminPassword?: string;
}

export const defaultSiteData: SiteData = {
  doctors: [
    {
      id: 'doc-1',
      name: 'Dr. Abhishek Goyal',
      title: 'Consultant, General & Minimally Invasive Surgery',
      hospital: 'Max Healthcare',
      specialties: [
        'Laparoscopic Surgery',
        'GI Surgery',
        'Hernia Surgery',
        'Gallbladder Surgery',
        'Advanced Surgical Care',
      ],
      image: '/images/doc-dr-abhishek-goyal.jpg',
    },
    {
      id: 'doc-2',
      name: 'Dr. Siddhartha S. Shrivastava',
      title: 'Consultant, ENT (Ear, Nose and Throat)',
      hospital: 'Max Healthcare',
      specialties: [
        'ENT & Skull Base Surgery',
        'Hearing & Balance Disorders',
        'Rhinology & Sinus Surgery',
        'Voice & Throat Care',
        'Head & Neck Surgery',
      ],
      image: '/images/doc-dr-siddhartha-shrivastava.jpg',
    },
    {
      id: 'doc-3',
      name: 'Dr. Anil Prasad Bhatt',
      title: 'Director & Head, Nephrology & Kidney Transplant',
      hospital: 'Max Healthcare',
      specialties: [
        'Kidney Transplantation',
        'Dialysis Care',
        'Chronic Kidney Disease',
        'Renal Replacement Therapy',
        'Hypertension & Nephrology',
      ],
      image: '/images/doc-dr-anil-prasad-bhatt.jpg',
    },
    {
      id: 'doc-4',
      name: 'Dr. Saumya Saxena',
      title: 'Consultant, Surgical Oncology & Cancer Care',
      hospital: 'Max Healthcare',
      specialties: [
        'Surgical Oncology',
        'Breast Cancer Care',
        'Gynecologic Oncology',
        'Minimally Invasive Tumor Excision',
        'Cancer Staging & Biopsy',
      ],
      image: '/images/doc-dr-saumya-saxena.jpg',
    },
  ],
  hospitals: [
    {
      id: 'hosp-1',
      name: 'Max Healthcare',
      location: 'Saket, SmartCity, Gurugram',
      image: '/images/hosp-max.jpg',
      accreditation: 'JCI & NABH Accredited',
      highlights: ['Robotic Surgery Center', 'Organ Transplant Suite'],
    },
    {
      id: 'hosp-2',
      name: 'Artemis Hospitals',
      location: 'Gurugram, Delhi NCR',
      image: '/images/hosp-artemis.jpg',
      accreditation: 'JCI Accredited',
      highlights: ['International Patient Lounge', 'Oncology Institute'],
    },
    {
      id: 'hosp-3',
      name: 'Fortis Hospital',
      location: 'Vasant Kunj & Gurgaon',
      image: '/images/hosp-fortis..jpg',
      accreditation: 'JCI & NABH Accredited',
      highlights: ['Bone Marrow Unit', 'Advanced Cardiology'],
    },
    {
      id: 'hosp-4',
      name: 'Apollo Hospitals',
      location: 'Sarita Vihar, New Delhi',
      image: '/images/hosp-apollo.jpg',
      accreditation: 'JCI Accredited',
      highlights: ['Proton Therapy Center', 'Pediatric Surgery'],
    },
    {
      id: 'hosp-5',
      name: 'Medanta - The Medicity',
      location: 'Gurugram, Delhi NCR',
      image: '/images/hosp-medanta.jpg',
      accreditation: 'JCI & NABH Accredited',
      highlights: ['Multi-Organ Transplant', 'CyberKnife Radiosurgery'],
    },
    {
      id: 'hosp-6',
      name: 'Yatharth Super Speciality Hospital',
      location: 'Faridabad & Noida Extension',
      image: '/images/hosp-yatharth.jpg',
      accreditation: 'NABH Super Speciality',
      highlights: ['ENT & Skull Base', 'Neurosurgery & Spine'],
    },
  ],
  testimonials: [
    {
      id: 'test-1',
      name: 'Elena Rostova',
      country: 'Moscow, Russia',
      flag: '🇷🇺',
      treatment: 'Orthopaedics & Joint Replacement',
      comment:
        'Shameem made our knee replacement journey at Max Healthcare so smooth. He translated every doctor consultation into Russian perfectly and helped with hospital discharge.',
      rating: 5,
    },
    {
      id: 'test-2',
      name: 'Bikram Thapa',
      country: 'Kathmandu, Nepal',
      flag: '🇳🇵',
      treatment: 'Cardiology & Heart Bypass',
      comment:
        'Having a Nepali-speaking interpreter in Delhi gave our family immense confidence. Shameem took care of everything from hospital admission to medicine instructions.',
      rating: 5,
    },
    {
      id: 'test-3',
      name: 'Meret Durdyev',
      country: 'Ashgabat, Turkmenistan',
      flag: '🇹🇲',
      treatment: 'Liver Transplant Coordination',
      comment:
        'Highly professional medical interpreter. Shameem attended all ethical committee meetings with us and explained all procedures in detail. Very trustworthy!',
      rating: 5,
    },
    {
      id: 'test-4',
      name: 'Alisher Karimov',
      country: 'Tashkent, Uzbekistan',
      flag: '🇺🇿',
      treatment: 'Neurosurgery & Spine',
      comment:
        'Available 24/7 during our stays in Gurgaon and Faridabad hospitals. Accurate translation and genuine care. Thank you Shameem brother!',
      rating: 5,
    },
  ],
  patientPhotos: [
    { id: 'photo-1', src: '/images/all-patient-1.jpg', alt: 'Patient hospital arrival & welcome' },
    { id: 'photo-2', src: '/images/all-patient-2.jpg', alt: 'Diagnostic consultation & report translation' },
    { id: 'photo-3', src: '/images/all-patient-3.jpg', alt: 'Hospital OPD registration assistance' },
    { id: 'photo-4', src: '/images/all-patient-4.jpg', alt: 'Specialist consultation briefing' },
    { id: 'photo-5', src: '/images/all-patient-5.jpg', alt: 'Surgical unit preparation & coordination' },
    { id: 'photo-6', src: '/images/all-patient-6.jpg', alt: 'Family dining & hospital support' },
    { id: 'photo-7', src: '/images/all-patient-7.jpg', alt: 'ICU recovery room translation' },
    { id: 'photo-8', src: '/images/all-patient-8.jpg', alt: 'Patient lounge & hotel stay support' },
    { id: 'photo-9', src: '/images/all-patient-9.jpg', alt: 'Hospital lobby guidance with family' },
    { id: 'photo-10', src: '/images/all-patient-10.jpg', alt: 'Post-op rehabilitation & walking care' },
    { id: 'photo-11', src: '/images/all-patient-11.jpg', alt: 'Oncology department consultation' },
    { id: 'photo-12', src: '/images/all-patient-12.jpg', alt: 'Gynecological & women care guidance' },
    { id: 'photo-14', src: '/images/all-patient-14.jpg', alt: 'ENT & skull base consultation' },
    { id: 'photo-15', src: '/images/all-patient-15.jpg', alt: 'Gynaecology consultation assistance' },
    { id: 'photo-16', src: '/images/all-patient-16.jpg', alt: 'Neurosurgery patient assistance' },
    { id: 'photo-17', src: '/images/all-patient-17.jpg', alt: 'Discharge summary & prescription review' },
    { id: 'photo-18', src: '/images/all-patient-18.jpg', alt: 'Follow-up consultation before departure' },
    { id: 'photo-19', src: '/images/all-patient-19.jpg', alt: 'Medical report review with specialist' },
    { id: 'photo-20', src: '/images/all-patient-20.jpg', alt: 'Patient coordinator Shameem Ahmad' },
    { id: 'photo-21', src: '/images/all-patient-21.jpg', alt: 'Successful treatment departure & farewell' },
  ],
  hero: {
    tagline: 'Certified Medical Interpreter & Patient Coordinator',
    headline: "Connecting International Patients to Delhi NCR's Best Hospitals",
    subline:
      'Fluent Russian, Nepali & English interpretation, hospital coordination, doctor appointments, and compassionate support for your medical journey in India.',
    statLanguages: '3+ Fluent Languages',
    statHospitals: '6+ Top Hospital Networks',
    statConfidential: '100% Confidential & Direct',
    portraitImage: '/images/shameem-hero.jpg',
  },
  contact: {
    phone: '+91 81783 00511',
    whatsapp: '918178300511',
    email: 'info@shameemcare.com',
    location: 'Delhi NCR, India (Gurugram, Saket, Noida, Faridabad)',
    workingHours: '24/7 International Patient Assistance',
  },
  inquiries: [],
  adminPassword: 'admin',
};
