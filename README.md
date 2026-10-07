# Shameem Ahmad · Medical Interpreter & Patient Coordinator

A modern, minimalist, fast, fully responsive website built for **Shameem Ahmad**, a premier medical interpreter and international patient coordination service in Delhi NCR, India (serving patients from Russia, Nepal, Turkmenistan, Kazakhstan, Uzbekistan, and Central Asia).

---

## 🌟 Key Features

1. **Multi-Language Support (EN / RU / NE)**
   - Language switcher available in header and footer.
   - Real, authentic Russian translations (`/locales/ru.json`) and clean Nepali translations (`/locales/ne.json`).
   - English master translation (`/locales/en.json`).
   - State persisted in `localStorage` & html `lang` attribute.

2. **Design System & Minimalist Aesthetics**
   - Color Palette: Deep Navy (`#0B2A4A`), Warm Off-White (`#FAFAF8`), Soft Teal Accent (`#14B8A6`), Light Grey Borders (`#E5E7EB`).
   - Typography: **Plus Jakarta Sans** (headings) & **Inter** (body).
   - Generous whitespace, 12-column grid, max-width `1200px`.
   - Subtle Framer Motion animations (scroll fade-ins, card hover lifts).
   - Floating WhatsApp button bottom-right with pulse indicator.

3. **Complete Site Structure & Pages**
   - **Hero**: Headline, subline, tagline, WhatsApp & Consultation CTAs, portrait image, trust banner with country flags.
   - **What We Do**: 6 minimal icon cards detailing doctor-patient communication, medical report translation, hospital assistance, cultural support, 24/7 availability, and confidentiality.
   - **Specialties**: Grid of 14 medical departments with icons, descriptions, and "Get Price Estimate →" links to dynamic `/specialties/[slug]` detail pages.
   - **Partner Hospitals**: Logo & accreditation cards for Max Healthcare, Artemis Hospitals, Fortis Hospital, Apollo Hospitals, Medanta, and Yatharth Super Speciality Hospital.
   - **Doctors I Work With**: Photo cards with 4:5 portrait crops, specialties, hospital titles, and interpreter captions (Dr. Sumit Bhushan Sharma, Dr. (Prof) Anand Gupta, Dr. Shweta Mendiratta, Dr. Bhoopendra Fouzdaar). Mobile horizontal carousel support.
   - **How It Works**: 4-step minimal numbered timeline.
   - **Why Choose Me**: 5 key points + quote banner (*"Communication Makes Care Better."*).
   - **Reviews**: Testimonial cards & "Our Patients" photo gallery section.
   - **About**: Bio, spoken languages, served countries, quote (*"Health is the key of happiness."*).
   - **Contact**: Direct phone/WhatsApp (`+91 81783 00511`), email (`shameemahmadaams@gmail.com`), location, interactive consultation form with medical report file upload & WhatsApp fallback button.
   - **Footer**: Bio, quick links, social links (Instagram & Threads `@innocent_pathan_000`), medical disclaimer.

4. **SEO & Performance**
   - OpenGraph metadata, Twitter cards, semantic HTML5 tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<h1>`).
   - JSON-LD structured data for `MedicalBusiness`, `LocalBusiness`, and `Person`.
   - Keyboard accessible focus rings and `prefers-reduced-motion` support.

---

## 🚀 Getting Started & Run Instructions

### Prerequisites
- Node.js 18.x or higher installed.

### Installation
```bash
npm install
```

### Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production
```bash
npm run build
```

### Static Export / Hosting
The application is Next.js App Router static-export friendly. To start production server:
```bash
npm run start
```

---

## 📝 Customization Checklist (Items to Replace)

Here is a short checklist of items you can update with real assets in the future:

1. **Patient Testimonials (`/src/components/Reviews.tsx`)**:
   - Replace placeholder review quotes with real written feedback from your patients.
2. **Patient Photo Gallery (`/public/images/patient-1.jpg` to `patient-4.jpg`)**:
   - Replace placeholder gallery images with actual patient moments upon consent.
3. **Hospital Logos (`/public/images/hosp-*.jpg`)**:
   - Replace with official vector/transparent PNG logos approved by partner hospital networks.
4. **Form Integration**:
   - The form submits to `/api/contact` and provides a 1-click **WhatsApp direct button**. You can wire `/api/contact` to Formspree, Resend, or SendGrid email API by adding an API key.
