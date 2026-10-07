export interface SpecialtyItem {
  slug: string;
  iconName: string;
  en: {
    title: string;
    description: string;
    overview: string;
    procedures: string[];
    faqs: { question: string; answer: string }[];
  };
  ru: {
    title: string;
    description: string;
    overview: string;
    procedures: string[];
    faqs: { question: string; answer: string }[];
  };
  ne: {
    title: string;
    description: string;
    overview: string;
    procedures: string[];
    faqs: { question: string; answer: string }[];
  };
}

export const specialtiesData: SpecialtyItem[] = [
  {
    slug: 'oncology',
    iconName: 'Activity',
    en: {
      title: 'Oncology (Cancer Care)',
      description: 'Comprehensive cancer care, surgical oncology, chemotherapy, radiation & immunotherapy.',
      overview: 'Delhi NCR hospitals feature world-renowned medical, surgical, and radiation oncologists using linear accelerators, CyberKnife, and CAR-T cell therapy. Shameem provides full interpretation during tumor board discussions, PET-CT reviews, and daily chemo cycles.',
      procedures: [
        'Robotic & Surgical Tumor Resection',
        'Systemic Chemotherapy & Immunotherapy',
        'CyberKnife & TrueBeam Radiation Therapy',
        'Targeted Molecular Therapy',
        'PET-CT & Molecular Tumor Profiling'
      ],
      faqs: [
        {
          question: 'How long does a typical oncology evaluation take in Delhi?',
          answer: 'Initial consultation and comprehensive staging (PET-CT, biopsy review) usually take 3 to 5 working days.'
        },
        {
          question: 'Will Shameem be present during my doctor consultations?',
          answer: 'Yes, Shameem attends all oncologist appointments, tumor board meetings, and translates every prescription in detail.'
        }
      ]
    },
    ru: {
      title: 'Онкология (Лечение рака)',
      description: 'Комплексное лечение рака, хирургическая онкология, химиотерапия, лучевая и иммунотерапия.',
      overview: 'Госпитали Дели NCR оснащены передовым оборудованием для лучевой терапии (CyberKnife, TrueBeam) и проведение мультидисциплинарных онкоконсилиумов. Шамим обеспечит точный перевод на всех консультациях и процедурах.',
      procedures: [
        'Роботизированные и хирургические операции по удалению опухолей',
        'Химиотерапия и иммунотерапия',
        'Лучевая терапия CyberKnife и TrueBeam',
        'Таргетная молекулярная терапия',
        'ПЭТ-КТ и молекулярный профиль опухоли'
      ],
      faqs: [
        {
          question: 'Сколько времени занимает первичная диагностика?',
          answer: 'Первичный осмотр, пересмотр блоков и ПЭТ-КТ обычно занимают от 3 до 5 рабочих дней.'
        },
        {
          question: 'Будет ли переводчик на всех приемах врача?',
          answer: 'Да, Шамим лично сопровождает пациента на всех приемах, онкоконсилиумах и переводит выписки.'
        }
      ]
    },
    ne: {
      title: 'अन्कोलोजी (क्यान्सर उपचार)',
      description: 'क्यान्सरको पूर्ण उपचार, शल्यक्रिया, किमोथेरापी र विकिरण।',
      overview: 'दिल्लीका प्रमुख क्यान्सर अस्पतालहरूमा अत्याधुनिक प्रविधि र विश्वस्तरीय डाक्टरहरू उपलब्ध छन्।',
      procedures: [
        'रोबोटिक तथा शल्यक्रिया द्वारा ट्युमर हटाउने',
        'किमोथेरापी र इम्युनोथेरापी',
        'साइबरनाइफ विकिरण उपचार',
        'टार्गेटेड थेरापी',
        'PET-CT जाँच'
      ],
      faqs: [
        {
          question: 'क्यान्सर जाँचका लागि कति समय लाग्छ?',
          answer: 'प्रारम्भिक जाँच र परीक्षणका लागि ३ देखि ५ दिन लाग्छ।'
        }
      ]
    }
  },
  {
    slug: 'liver-transplant',
    iconName: 'HeartPulse',
    en: {
      title: 'Liver Transplant',
      description: 'Living & deceased donor liver transplant, pediatric transplant & complex hepatobiliary surgery.',
      overview: 'India is a global destination for living-donor liver transplantation with high success rates (95%+). Full coordination includes legal/donor documentation approval, pre-transplant workup, ICU stay translation, and post-discharge recovery monitoring.',
      procedures: [
        'Living Donor Liver Transplantation (LDLT)',
        'Pediatric Liver Transplantation',
        'Complex Hepato-Pancreato-Biliary (HPB) Surgery',
        'Donor Evaluation & Committee Clearance Assistance',
        'Post-Transplant Immunosuppression Management'
      ],
      faqs: [
        {
          question: 'Can a family member donate a liver segment?',
          answer: 'Yes, living donor laws in India permit close family relatives to donate after thorough donor safety evaluation and government authorization.'
        },
        {
          question: 'How long must we stay in India for a liver transplant?',
          answer: 'Typically 6 to 8 weeks, including pre-op workup, surgery, ICU recovery, and outpatient follow-up.'
        }
      ]
    },
    ru: {
      title: 'Трансплантация печени',
      description: 'Трансплантация от родственного донора, детская трансплантация и гепатобилиарная хирургия.',
      overview: 'Индия является мировым лидером в родственной трансплантации печени с показателем успеха более 95%. Сопровождение включает помощь в подготовке документов для этического комитета, перевод в ОРИТ и послеоперационный уход.',
      procedures: [
        'Трансплантация печени от родственного донора',
        'Детская трансплантация печени',
        'Сложные операции на печени и желчных путях',
        'Оценка донора и оформление документов для комитета',
        'Подбор иммуносупрессивной терапии'
      ],
      faqs: [
        {
          question: 'Кто может стать донором печени?',
          answer: 'Донором может быть близкий родственник после полного медицинского обследования и одобрения этического комитета.'
        },
        {
          question: 'Какова продолжительность пребывания в Индии?',
          answer: 'Обычно от 6 до 8 недель, включая обследование, операцию, реабилитацию и контрольные осмотры.'
        }
      ]
    },
    ne: {
      title: 'कलेजो प्रत्यारोपण (Liver Transplant)',
      description: 'कलेजो प्रत्यारोपण र जटिल शल्यक्रिया।',
      overview: 'नेपाल र विदेशी बिरामीहरूका लागि दिल्लीका अस्पतालहरूमा कलेजो प्रत्यारोपणको उच्च सफलता दर छ।',
      procedures: [
        'नातेदारबाट कलेजो प्रत्यारोपण',
        'बालबालिकाको कलेजो प्रत्यारोपण',
        'दाता जाँच र कागजी प्रक्रिया',
        'शल्यक्रिया पछिको हेरचाह'
      ],
      faqs: [
        {
          question: 'कलेजो प्रत्यारोपणका लागि कति समय भारतमा बस्नुपर्छ?',
          answer: 'सामान्यतया ६ देखि ८ हप्ता बस्नुपर्छ।'
        }
      ]
    }
  },
  {
    slug: 'kidney-transplant',
    iconName: 'ShieldPlus',
    en: {
      title: 'Kidney Transplant',
      description: 'Renal replacement therapy, donor evaluation, laparoscopic donor nephrectomy & post-transplant care.',
      overview: 'Leading nephrology and renal transplant centers in Delhi provide laparoscopic donor nephrectomy and ABO-incompatible kidney transplants with dedicated isolation units.',
      procedures: [
        'Laparoscopic Donor Nephrectomy',
        'ABO-Incompatible (Cross-Match Positive) Transplant',
        'Pediatric Renal Transplant',
        'Dialysis Support & Vascular Access (AV Fistula)',
        'State Ethics Authorization Support'
      ],
      faqs: [
        {
          question: 'What documents are required for kidney transplant in India?',
          answer: 'Proof of family relationship (birth certificates, passports, DNA test if needed) and authorization committee forms.'
        }
      ]
    },
    ru: {
      title: 'Трансплантация почки',
      description: 'Заместительная почечная терапия, оценка донора, лапароскопическая заборная операция и уход.',
      overview: 'Ведущие нефрологические центры Дели проводят лапароскопические операции по забору почки у донора и иногруппные трансплантации с изолированными палатами.',
      procedures: [
        'Лапароскопическая донорская нефрэктомия',
        'Трансплантация при несовместимости по группе крови (ABO-incompatible)',
        'Детская трансплантация почки',
        'Формирование АВ-фистулы и диализная поддержка',
        'Подготовка документов для этического комитета'
      ],
      faqs: [
        {
          question: 'Какие документы необходимы для пересадки почки?',
          answer: 'Подтверждение родства (свидетельства о рождении, паспорта, ДНК-тест при необходимости) и анкета этического комитета.'
        }
      ]
    },
    ne: {
      title: 'मिर्गौला प्रत्यारोपण (Kidney Transplant)',
      description: 'मिर्गौला प्रत्यारोपण र उपचार सेवा।',
      overview: 'अत्याधुनिक प्रविधिबाट मिर्गौला प्रत्यारोपण सेवा उपलब्ध गराइन्छ।',
      procedures: [
        'ल्याप्रोस्कपिक दाता शल्यक्रिया',
        'मिर्गौला प्रत्यारोपण',
        'डायलाइसिस सेवा'
      ],
      faqs: [
        {
          question: 'कागजी प्रक्रिया कसरी हुन्छ?',
          answer: 'सरकारी नियम अनुसार नाता प्रमाणित र आवश्यक कागजातहरू तयार पारिन्छ।'
        }
      ]
    }
  },
  {
    slug: 'bone-marrow-transplantation',
    iconName: 'Dna',
    en: {
      title: 'Bone Marrow Transplantation (BMT)',
      description: 'Autologous & allogeneic BMT for leukemia, lymphoma, thalassemia & aplastic anemia.',
      overview: 'Delhi hospital BMT suites feature HEPA-filtered positive pressure rooms and expertise in matched sibling, matched unrelated, and haploidentical transplants.',
      procedures: [
        'Autologous Stem Cell Transplantation',
        'Allogeneic Matched Sibling / Haploidentical BMT',
        'Pediatric BMT for Thalassemia & Sickle Cell',
        'Chimeric Antigen Receptor (CAR) T-Cell Therapy',
        'HEPA-Filtered HEPA Isolation Care'
      ],
      faqs: [
        {
          question: 'How long is the isolation period during BMT?',
          answer: 'Patients remain in sterile HEPA-filtered rooms for approximately 3 to 4 weeks post-infusion.'
        }
      ]
    },
    ru: {
      title: 'Трансплантация костного мозга (ТКМ)',
      description: 'Аутологичная и аллогенная ТКМ при лейкемии, лимфоме, талассемии и апластической анемии.',
      overview: 'Специализированные боксы ТКМ с ламинарным потоком воздуха и HEPA-фильтрами позволяют проводить все виды пересадок (родственная, гаплоидентичная, неродственная).',
      procedures: [
        'Аутологичная пересадка стволовых клеток',
        'Аллогенная ТКМ (родственная и гаплоидентичная)',
        'Детская ТКМ при талассемии и анемии',
        'CAR-T клеточная терапия',
        'Стерильные боксы с HEPA-фильтрацией'
      ],
      faqs: [
        {
          question: 'Сколько длится период изоляции в боксе?',
          answer: 'Пациент находится в стерильном боксе около 3-4 недель после трансплантации.'
        }
      ]
    },
    ne: {
      title: 'बोन म्यारो प्रत्यारोपण (BMT)',
      description: 'ब्लड क्यान्सर र थालेसेमियाको उन्नत उपचार।',
      overview: 'बोन म्यारो प्रत्यारोपणका लागि विशेष आइसोलेसन कक्षहरू उपलब्ध छन्।',
      procedures: [
        'स्टेम सेल प्रत्यारोपण',
        'ब्लड क्यान्सर उपचार',
        'बालबालिकाको BMT'
      ],
      faqs: [
        {
          question: 'आइसोलेसनमा कति समय बस्नुपर्छ?',
          answer: 'करिब ३ देखि ४ हप्ता बस्नुपर्छ।'
        }
      ]
    }
  },
  {
    slug: 'cardiology',
    iconName: 'Heart',
    en: {
      title: 'Cardiology & Cardiac Surgery',
      description: 'Interventional cardiology, CABG heart bypass, valve replacement & pediatric cardiac surgery.',
      overview: 'Complete cardiac care ranging from complex TAVI/TAVR valve procedures, minimally invasive heart surgery, off-pump CABG, to pediatric congenital heart repairs.',
      procedures: [
        'Coronary Artery Bypass Grafting (CABG)',
        'TAVI / TAVR Transcatheter Valve Replacement',
        'Complex Angioplasty & Stenting',
        'Pediatric Congenital Heart Defect Repair (VSD/ASD)',
        'Electrophysiology & Pacemaker / ICD Implantation'
      ],
      faqs: [
        {
          question: 'Can heart bypass surgery be done without stopping the heart?',
          answer: 'Yes, Delhi surgeons routinely perform Beating-Heart (Off-Pump) CABG with minimal blood loss and faster recovery.'
        }
      ]
    },
    ru: {
      title: 'Кардиохирургия и кардиология',
      description: 'Интервенционная кардиология, аортокоронарное шунтирование (АКШ), замена клапанов.',
      overview: 'Полный спектр кардиологической помощи: малоинвазивные операции на клапанах (TAVI), шунтирование на работающем сердце, детская кардиохирургия.',
      procedures: [
        'Аортокоронарное шунтирование (АКШ)',
        'Замена клапанов TAVI / TAVR без разреза',
        'Сложное стентирование коронарных артерий',
        'Коррекция врожденных пороков сердца у детей',
        'Установка кардиостимуляторов и ЭФИ'
      ],
      faqs: [
        {
          question: 'Проводятся ли операции на работающем сердце?',
          answer: 'Да, кардиохирурги Дели регулярно выполняют операции АКШ без остановки сердца (Off-Pump).'
        }
      ]
    },
    ne: {
      title: 'कार्डियोलोजी (मुटु रोग)',
      description: 'मुटुको शल्यक्रिया, बाइपास र भल्भ फेर्ने सेवा।',
      overview: 'मुटु सम्बन्धी अत्याधुनिक शल्यक्रिया र एन्जियोप्लास्टी सेवा।',
      procedures: [
        'मुटुको बाइपास शल्यक्रिया (CABG)',
        'एन्जियोप्लास्टी र स्टेन्ट',
        'भल्भ फेर्ने शल्यक्रिया'
      ],
      faqs: [
        {
          question: 'उपचार पछि कति समय रिकभरी लाग्छ?',
          answer: 'सामान्यतया १ देखि २ हप्तामा सामान्य अवस्थामा फर्किन सकिन्छ।'
        }
      ]
    }
  },
  {
    slug: 'orthopaedics',
    iconName: 'Bone',
    en: {
      title: 'Orthopaedics & Joint Replacement',
      description: 'Robotic joint replacement, spine surgery, arthroscopy, complex trauma & sports medicine.',
      overview: 'Featuring cutting-edge robotic knee and hip replacement (Mako / CUVIS / Rosa) ensuring sub-millimeter precision, minimal incision, and same-day mobilization.',
      procedures: [
        'Robotic Total Knee & Hip Replacement',
        'Revision Joint Replacement',
        'Arthroscopic Knee ACL/Meniscus Repair',
        'Shoulder Arthroscopy & Rotator Cuff Repair',
        'Complex Trauma & Deformity Correction'
      ],
      faqs: [
        {
          question: 'How quickly can I walk after robotic knee replacement?',
          answer: 'Most patients start walking with assistance within 4 to 6 hours after surgery.'
        }
      ]
    },
    ru: {
      title: 'Ортопедия и эндопротезирование',
      description: 'Роботизированная замена суставов, хирургия позвоночника, артроскопия и травматология.',
      overview: 'Роботизированные системы последнего поколения (Mako, CUVIS) обеспечивают высочайшую точность установки протезов коленного и тазобедренного суставов.',
      procedures: [
        'Роботизированное эндопротезирование коленного и тазобедренного суставов',
        'Ревизионное (повторное) эндопротезирование',
        'Артроскопическая пластика связок колена (ПКС)',
        'Артроскопия плечевого сустава',
        'Коррекция деформаций и сложная травматология'
      ],
      faqs: [
        {
          question: 'Когда я смогу ходить после роботизированной операции?',
          answer: 'Большинство пациентов начинают делать первые шаги уже через 4-6 часов после операции.'
        }
      ]
    },
    ne: {
      title: 'अर्थोपेडिक्स (हड्डी तथा जोर्नी)',
      description: 'रोबोटिक जोर्नी प्रत्यारोपण र मेरुदण्डको शल्यक्रिया।',
      overview: 'रोबोटिक प्रविधिबाट घुँडा र नितम्बको जोर्नी फेर्ने शल्यक्रिया।',
      procedures: [
        'रोबोटिक जोर्नी प्रत्यारोपण',
        'आर्थ्रोस्कोपी शल्यक्रिया',
        'हड्डीको जटिल शल्यक्रिया'
      ],
      faqs: [
        {
          question: 'शल्यक्रिया पछि कहिले हिँड्न सकिन्छ?',
          answer: 'операция पछि केही घण्टामै हिँड्न सुरु गर्न सकिन्छ।'
        }
      ]
    }
  },
  {
    slug: 'oncohematology',
    iconName: 'Microscope',
    en: {
      title: 'Oncohematology',
      description: 'Advanced treatment for blood cancers, multiple myeloma, lymphoma & myelodysplastic syndromes.',
      overview: 'Dedicated clinical hematology units providing targeted therapy, monoclonal antibodies, and high-dose chemotherapy for adult and pediatric blood disorders.',
      procedures: [
        'Leukemia Treatment (AML / ALL / CML)',
        'Multiple Myeloma Targeted Immunotherapy',
        'Hodgkin & Non-Hodgkin Lymphoma Protocol',
        'Bone Marrow Biopsy & Cytogenetic Analysis',
        'Aplastic Anemia Immunosuppressive Therapy'
      ],
      faqs: [
        {
          question: 'What diagnostics are performed first for suspected blood cancer?',
          answer: 'Bone marrow aspirate/biopsy, flow cytometry, immunophenotyping, and cytogenetic FISH testing.'
        }
      ]
    },
    ru: {
      title: 'Онкогематология',
      description: 'Современная терапия рака крови, множественной миеломы, лимфомы и МДС.',
      overview: 'Специализированные отделения гематологии применяют современные протоколы иммунотерапии, моноклональные антитела и высокодозную химиотерапию.',
      procedures: [
        'Лечение лейкозов (ОЛЛ, ОМЛ, ХМЛ)',
        'Таргетная терапия множественной миеломы',
        'Протоколы лечения лимфом Ходжкина и неходжкинских',
        'Биопсия костного мозга и цитогенетика',
        'Иммуносупрессивная терапия апластической анемии'
      ],
      faqs: [
        {
          question: 'Какая диагностика проводиться при подозрении на заболевания крови?',
          answer: 'Пункция/биопсия костного мозга, проточная цитометрия, цитогенетический анализ и FISH.'
        }
      ]
    },
    ne: {
      title: 'अन्कोहेमाटोलोजी',
      description: 'रगत सम्बन्धी क्यान्सरको अत्याधुनिक उपचार।',
      overview: 'रगतको क्यान्सर सम्बन्धी आधुनिक उपचार र किमोथेरापी।',
      procedures: [
        'ब्लड क्यान्सर उपचार',
        'बोन म्यारो जाँच',
        'इम्युनोथेरापी'
      ],
      faqs: [
        {
          question: 'उपचार कति समय चल्छ?',
          answer: 'रोगको प्रकृति अनुसार किमोथेरापी साइकल तय हुन्छ।'
        }
      ]
    }
  },
  {
    slug: 'neurosurgery',
    iconName: 'Brain',
    en: {
      title: 'Neurosurgery & Brain Surgery',
      description: 'Brain tumor excision, stroke management, minimally invasive neurosurgery & aneurysm repair.',
      overview: 'Equipped with intraoperative MRI, neuro-navigation systems, and ultrasonic aspirators for precise resection of deep-seated brain lesions and vascular aneurysms.',
      procedures: [
        'Micro-Neurosurgical Brain Tumor Excision',
        'Endoscopic Pituitary Surgery',
        'Cerebral Aneurysm Clipping & Endovascular Coiling',
        'Stroke & Arteriovenous Malformation (AVM) Surgery',
        'Pediatric Neurosurgery & Hydrocephalus Shunting'
      ],
      faqs: [
        {
          question: 'Is brain tumor surgery safe with modern intraoperative navigation?',
          answer: 'Yes, neuro-navigation and intra-operative monitoring allow maximum tumor removal while safeguarding critical brain function.'
        }
      ]
    },
    ru: {
      title: 'Нейрохирургия',
      description: 'Удаление опухолей головного мозга, лечение инсультов, малоинвазивная нейрохирургия.',
      overview: 'Нейрохирургические операционные Дели оснащены интраоперационным МРТ, системы нейронавигации и микроскопами последнего поколения.',
      procedures: [
        'Микронейрохирургическое удаление опухолей мозга',
        'Эндоскопические операции на гипофизе через нос',
        'Клипирование и эмболизация аневризм сосудов мозга',
        'Лечение АВМ и инсульта',
        'Детская нейрохирургия и шунтирование при гидроцефалии'
      ],
      faqs: [
        {
          question: 'Безопасна ли операция на головном мозге?',
          answer: 'Использование нейронавигации и интраоперационного мониторинга минимизирует риски и защищает жизненно важные зоны мозга.'
        }
      ]
    },
    ne: {
      title: 'न्यूरोसर्जरी (मस्तिष्क शल्यक्रिया)',
      description: 'मस्तिष्कको ट्युमर र नसा सम्बन्धी शल्यक्रिया।',
      overview: 'मस्तिष्कको ट्युमर र नसा सम्बन्धी अत्याधुनिक शल्यक्रिया सेवा।',
      procedures: [
        'मस्तिष्क ट्युमर शल्यक्रिया',
        'न्यूरो-नेभिगेसन शल्यक्रिया',
        'स्ट्रोक र नसा उपचार'
      ],
      faqs: [
        {
          question: 'अस्पतालमा कति दिन बस्नुपर्छ?',
          answer: 'सामान्यतया ७ देखि १० दिन बस्नुपर्छ।'
        }
      ]
    }
  },
  {
    slug: 'spinal-surgery',
    iconName: 'Activity',
    en: {
      title: 'Spinal Surgery',
      description: 'Disc replacement, scoliosis correction, spinal fusion & minimally invasive spine interventions.',
      overview: 'Endoscopic keyhole spine surgeries, artificial cervical/lumbar disc replacement, and complex scoliosis deformity correction with neuromonitoring.',
      procedures: [
        'Minimally Invasive Discectomy (MISS)',
        'Artificial Cervical / Lumbar Disc Replacement',
        'Scoliosis & Kyphosis Deformity Correction',
        'Spinal Fusion (TLIF / PLIF / ALIF)',
        'Vertebroplasty & Kyphoplasty for Fractures'
      ],
      faqs: [
        {
          question: 'What is the benefit of minimally invasive spine surgery?',
          answer: 'Keyhole incisions reduce muscle damage, decrease surgical pain, and shorten hospital stays to 1-2 days.'
        }
      ]
    },
    ru: {
      title: 'Спинальная хирургия',
      description: 'Замена межпозвоночных дисков, коррекция сколиоза, спондилодез и малоинвазивная хирургия.',
      overview: 'Эндоскопические операции через микроразрезы, протезирование шейных и поясничных дисков, коррекция тяжелых форм сколиоза.',
      procedures: [
        'Малоинвазивная дискэктомия (MISS)',
        'Замена межпозвоночных дисков (протезирование)',
        'Коррекция сколиоза и кифоза у детей и взрослых',
        'Спондилодез (фиксация позвонков)',
        'Вертебропластика при переломах'
      ],
      faqs: [
        {
          question: 'В чем преимущество малоинвазивной хирургии позвоночника?',
          answer: 'Минимальный разрез исключает травму мышц, уменьшает боль и сокращает перебувание в стационаре до 1-2 дней.'
        }
      ]
    },
    ne: {
      title: 'स्पाइनल सर्जरी (मेरुदण्ड उपचार)',
      description: 'डिक्स फेर्ने र मेरुदण्डको अत्याधुनिक उपचार।',
      overview: 'मेरुदण्ड सम्बन्धी आधुनिक शल्यक्रिया र डिक्स उपचार।',
      procedures: [
        'मेरुदण्डको शल्यक्रिया',
        'डिक्स फेर्ने सेवा',
        'ढाड दुख्ने समस्याको उपचार'
      ],
      faqs: [
        {
          question: 'कहिले आराम पाउन सकिन्छ?',
          answer: 'शल्यक्रिया लगत्तै दुखाइ कम हुन थाल्छ।'
        }
      ]
    }
  },
  {
    slug: 'ophthalmology',
    iconName: 'Eye',
    en: {
      title: 'Ophthalmology & Eye Care',
      description: 'Lasik, corneal transplant, cataract surgery, vitreoretinal procedures & pediatric eye care.',
      overview: 'Tertiary eye care institutes offering Femto-LASIK, SMILE laser vision correction, DMEK corneal transplants, and vitrectomy for diabetic retinopathy.',
      procedures: [
        'Femto-LASIK & ReLEx SMILE Laser Correction',
        'DMEK / DALK Corneal Transplantation',
        'Micro-Incision Cataract Surgery (MICS / Femto Laser)',
        'Vitreoretinal Surgery for Retinal Detachment',
        'Glaucoma & Pediatric Ophthalmology'
      ],
      faqs: [
        {
          question: 'Is LASIK or SMILE vision correction painful?',
          answer: 'No, numbing eye drops make the 10-minute procedure completely painless.'
        }
      ]
    },
    ru: {
      title: 'Офтальмология',
      description: 'Коррекция зрения LASIK, пересадка роговицы, лечение катаракты и витреоретинальная хирургия.',
      overview: 'Специализированные офтальмологические центры проводят лазерную коррекцию зрения SMILE, пересадку роговицы и лечение отслоения сетчатки.',
      procedures: [
        'Лазерная коррекция зрения Femto-LASIK и SMILE',
        'Пересадка роговицы (DMEK / DALK)',
        'Бесшовное лечение катаракты с имплантацией ИОЛ',
        'Витреоретинальные операции при отслоении сетчатки',
        'Лечение глаукомы'
      ],
      faqs: [
        {
          question: 'Болезненна ли лазерная коррекция зрения?',
          answer: 'Процедура абсолютно безболезненна благодаря капельной анестезии и длится всего 10 минут.'
        }
      ]
    },
    ne: {
      title: 'अप्थाल्मोलोजी (आँखा उपचार)',
      description: 'ल्यासिक, मोतियाविन्दु र आँखाको शल्यक्रिया।',
      overview: 'आँखा सम्बन्धी आधुनिक शल्यक्रिया र ल्यासिक सेवा।',
      procedures: [
        'ल्यासिक पावर हटाउने',
        'मोतियाविन्दु शल्यक्रिया',
        'नानी प्रत्यारोपण'
      ],
      faqs: [
        {
          question: 'उपचार पछि कहिले आँखा देख्न सकिन्छ?',
          answer: 'भोलिपल्ट देखि नै दृष्टि सफा हुन थाल्छ।'
        }
      ]
    }
  },
  {
    slug: 'diabetes',
    iconName: 'Stethoscope',
    en: {
      title: 'Diabetes Mellitus & Endocrinology',
      description: 'Comprehensive metabolic checkups, insulin pump therapy, diabetic foot care & endocrinology.',
      overview: 'Holistic endocrinology centers providing continuous glucose monitoring (CGM), insulin pump setup, diabetic foot salvage, and thyroid management.',
      procedures: [
        'Continuous Glucose Monitoring (CGM) & Insulin Pump Setup',
        'Diabetic Neuropathy & Vascular Foot Salvage',
        'Thyroid & Adrenal Disorder Protocols',
        'Metabolic & Obesity Bariatric Assessment',
        'Comprehensive Microvascular Screening'
      ],
      faqs: [
        {
          question: 'What is included in an executive diabetic evaluation?',
          answer: 'HbA1c, lipid profile, renal panel, eye fundus exam, nerve conduction test, and podiatry assessment.'
        }
      ]
    },
    ru: {
      title: 'Сахарный диабет и эндокринология',
      description: 'Комплексная диагностика метаболизма, инсулинотерапия, диабетическая стопа и эндокринология.',
      overview: 'Центры эндокринологии Дели предлагают непрерывное мониторирование глюкозы (CGM), помповую инсулинотерапию и лечение диабетической стопы.',
      procedures: [
        'Установка инсулиновых помп и CGM мониторов',
        'Лечение диабетической стопы и ангиопатии',
        'Диагностика и лечение заболеваний щитовидной железы',
        'Оценка метаболического синдрома и бариатрия',
        'Скрининг сосудистых осложнений диабета'
      ],
      faqs: [
        {
          question: 'Что входит в комплексное диабетическое обследование?',
          answer: 'HbA1c, липидограмма, почечные пробы, осмотр глазного дна, УЗДГ сосудов и проверка чувствительности стоп.'
        }
      ]
    },
    ne: {
      title: 'डायबिटीज (मधुमेह)',
      description: 'मधुमेह र हर्मोन सम्बन्धी पूर्ण हेरचाह।',
      overview: 'मधुमेह र हर्मोन सम्बन्धी पूर्ण उपचार सेवा।',
      procedures: [
        'सुगर र हर्मोन जाँच',
        'इन्पुलिन पम्प सेवा',
        'खुट्टाको स्याहार सेवा'
      ],
      faqs: [
        {
          question: 'जाँचका लागि कति समय लाग्छ?',
          answer: '१ देखि २ दिनमा सम्पूर्ण जाँच सकिन्छ।'
        }
      ]
    }
  },
  {
    slug: 'full-body-checkup',
    iconName: 'CheckCircle2',
    en: {
      title: 'Full Body Checkup & Executive Health',
      description: 'Executive preventative health packages, advanced imaging, cardiac screening & blood panels.',
      overview: 'Streamlined 1-day executive preventative checkups with MRI/CT imaging, tumor markers, cardiac calcium scoring, and comprehensive consultations.',
      procedures: [
        'Whole Body MRI Screening',
        '64-Slice Cardiac CT Angiography',
        'Comprehensive Tumor Marker Panel',
        'Executive Ultrasound & Dexa Bone Density',
        'Multi-Specialty Physician Consultations'
      ],
      faqs: [
        {
          question: 'How fast will I receive full body checkup reports?',
          answer: 'All reports and final physician debrief are completed within 24 to 36 hours.'
        }
      ]
    },
    ru: {
      title: 'Полное обследование (Чек-ап)',
      description: 'Комплексные программы обследования, точная диагностика, МРТ/КТ и кардиоскрининг.',
      overview: 'Однодневные VIP программы чек-апа организма с МРТ, КТ-ангиографией, онкомаркерами и консультациями узких специалистов.',
      procedures: [
        'МРТ всего тела (Whole Body MRI)',
        'КТ-ангиография коронарных артерий',
        'Полная панель онкомаркеров',
        'УЗИ всех органов и остеоденситометрия',
        'Итоговые консультации врачей экспертов'
      ],
      faqs: [
        {
          question: 'Как быстро готовы результаты обследования?',
          answer: 'Все результаты и заключения врачей предоставляются в течение 24-36 часов.'
        }
      ]
    },
    ne: {
      title: 'पूर्ण शरीर जाँच (Full Body Checkup)',
      description: 'सम्पूर्ण स्वास्थ्य परीक्षण र स्क्रिनिङ।',
      overview: '१-२ दिनमा सम्पूर्ण शरीरको विस्तृत स्वास्थ्य परीक्षण।',
      procedures: [
        'MRI र CT Scan',
        'क्यान्सर मार्कर जाँच',
        'मुटु र रगतको पूर्ण जाँच'
      ],
      faqs: [
        {
          question: 'रिपोर्ट कहिले पाइन्छ?',
          answer: '२४ देखि ३६ घण्टा भित्र रिपोर्ट पाइन्छ।'
        }
      ]
    }
  },
  {
    slug: 'ent',
    iconName: 'Ear',
    en: {
      title: 'ENT & Skull Base Surgery',
      description: 'Cochlear implants, sinus surgery, head & neck oncology, hearing & balance treatment.',
      overview: 'Comprehensive ear, nose, throat & skull base services including advanced cochlear implants for pediatric and adult hearing loss.',
      procedures: [
        'Cochlear Implantation & Hearing Rehabilitation',
        'Endoscopic Functional Sinus Surgery (FESS)',
        'Skull Base Tumor Surgery',
        'Tonsillectomy & Adenoidectomy',
        'Vertigo & Balance Disorders Treatment'
      ],
      faqs: [
        {
          question: 'What is the ideal age for pediatric cochlear implant?',
          answer: 'Early implantation between 12 months to 5 years yields the best speech and hearing outcomes.'
        }
      ]
    },
    ru: {
      title: 'Оториноларингология (ЛОР) и хирургия основания черепа',
      description: 'Кохлеарная имплантация, хирургия пазух носа, лечение слуха и опухолей головы и шеи.',
      overview: 'Передовые ЛОР центры Дели проводят кохлеарную имплантацию детям и взрослым, эндоскопические операции на пазухах носа и удаление опухолей.',
      procedures: [
        'Кохлеарная имплантация и слуховая реабилитация',
        'Эндоскопическая хирургия пазух носа (FESS)',
        'Удаление опухолей основания черепа',
        'Лечение нарушений слуха и головокружения (вертиго)',
        'Пластика барабанной перепонки (тимпанопластика)'
      ],
      faqs: [
        {
          question: 'В каком возрасте лучше проводить кохлеарную имплантацию ребенку?',
          answer: 'Наилучшие результаты слухоречевого развития достигаются при имплантации в возрасте от 12 месяцев до 5 лет.'
        }
      ]
    },
    ne: {
      title: 'नाक, कान, घाँटी (ENT)',
      description: 'कक्लियर इम्प्लान्ट र नाक-घाँटीको शल्यक्रिया।',
      overview: 'नाक, कान, घाँटी सम्बन्धी सम्पूर्ण उपचार र कक्लियर इम्प्लान्ट सेवा।',
      procedures: [
        'कक्लियर इम्प्लान्ट (Cochlear Implant)',
        'नाकको शल्यक्रिया (FESS)',
        'घाँटीको ट्युमर शल्यक्रिया'
      ],
      faqs: [
        {
          question: 'कक्लियर इम्प्लान्ट कुन उमेरमा गर्नु राम्रो हुन्छ?',
          answer: '१ देखि ५ वर्ष सम्मको उमेरमा गर्दा सबैभन्दा राम्रो नतिजा आउँछ।'
        }
      ]
    }
  },
  {
    slug: 'gynaecology',
    iconName: 'UserCheck',
    en: {
      title: 'Gynaecology & Women’s Health',
      description: 'Preconception care, high-risk pregnancy, hormonal management & minimally invasive gynaec surgery.',
      overview: 'Comprehensive women’s clinical department covering high-risk obstetrics, IVF fertility guidance, laparoscopic fibroid excision, and preventive oncology screenings.',
      procedures: [
        'High-Risk Pregnancy & Antenatal Care',
        'Laparoscopic & Robotic Myomectomy (Fibroids)',
        'IVF & Fertility Guidance',
        'Hysteroscopic Uterine Procedures',
        'Cervical Cancer Prevention & HPV Screening'
      ],
      faqs: [
        {
          question: 'Are laparoscopic fibroid removals safe with fast recovery?',
          answer: 'Yes, keyhole laparoscopic procedures result in minimal scarring and quick discharge within 24-48 hours.'
        }
      ]
    },
    ru: {
      title: 'Гинекология и женское здоровье',
      description: 'Подготовка к беременности, ведение высокой степени риска, малоинвазивные операции.',
      overview: 'Комплексное отделение женского здоровья: ведение беременности высокого риска, ЭКО, лапароскопическое удаление миом и профилактика онкологии.',
      procedures: [
        'Ведение беременности высокого риска и роды',
        'Лапароскопическое удаление миом и кист (миомэктомия)',
        'Консультации по ЭКО и репродукции',
        'Гистероскопические операции',
        'Профилактика рака шейки матки и скрининг ВПЧ'
      ],
      faqs: [
        {
          question: 'Безопасна ли лапароскопия при удалении миомы?',
          answer: 'Да, малотравматичные операции обеспечивают быстрый период восстановления и выписку через 24-48 часов.'
        }
      ]
    },
    ne: {
      title: 'गाइनेकोलोजी (स्त्री रोग)',
      description: 'महिला स्वास्थ्य, गर्भवती हेरचाह र शल्यक्रिया।',
      overview: 'महिला स्वास्थ्य, गर्भवती महिलाको विशेष स्याहार र स्त्री रोग शल्यक्रिया सेवा।',
      procedures: [
        'गर्भवती हेरचाह र उच्च जोखिम डेलिभरी',
        'ल्याप्रोस्कपिक पाठेघर शल्यक्रिया',
        'आईभीएफ र निस्सन्तान उपचार'
      ],
      faqs: [
        {
          question: 'पाठेघरको शल्यक्रिया पछि कहिले डिस्चार्ज हुन्छ?',
          answer: 'सामान्यतया २४ देखि ४८ घण्टामा डिस्चार्ज हुन सकिन्छ।'
        }
      ]
    }
  },
  {
    slug: 'urology',
    iconName: 'ShieldAlert',
    en: {
      title: 'Urology & Kidney Stone Care',
      description: 'Advanced laser lithotripsy, prostate care, reconstructive urology & male reproductive health.',
      overview: 'Delhi NCR urology departments offer RIRS laser stone removal, robotic prostatectomy (DaVinci), and minimally invasive reconstructive surgery.',
      procedures: [
        'RIRS & Holmium Laser Stone Lithotripsy',
        'Robotic Radical Prostatectomy',
        'TURP & Laser Prostate Surgery',
        'Reconstructive Uretroplasty',
        'Andrology & Infertility Evaluation'
      ],
      faqs: [
        {
          question: 'How fast is recovery after laser kidney stone removal (RIRS)?',
          answer: 'Keyhole RIRS is incisionless; most patients are discharged within 24 hours.'
        }
      ]
    },
    ru: {
      title: 'Урология и лечение мочекаменной болезни',
      description: 'Лазерное дробление камней в почках, лечение простаты и реконструктивная урология.',
      overview: 'Отделения урологии в Дели проводят лазерную литотрипсию RIRS без разрезов и роботизированные операции на простате.',
      procedures: [
        'Лазерное дробление камней в почках RIRS',
        'Роботизированная простатэктомия DaVinci',
        'Лазерная тупиковая аденомектомия (ТУР)',
        'Реконструктивная пластика уретры',
        'Лечение мужского бесплодия'
      ],
      faqs: [
        {
          question: 'Как быстро происходит восстановление после удаления камня лазером?',
          answer: 'Процедура RIRS выполняется без разрезов, выписка происходит через 24 часа.'
        }
      ]
    },
    ne: {
      title: 'युरोलोजी (मिर्गौला पत्थरी र मुत्ररोग)',
      description: 'मिर्गौलाको पत्थरी, प्रोस्टेट र मुत्ररोगको अत्याधुनिक उपचार।',
      overview: 'लेजर प्रविधिबाट मिर्गौलाको पत्थरी र प्रोस्टेटको शल्यक्रिया।',
      procedures: [
        'लेजर प्रविधिबाट पत्थरी हटाउने (RIRS)',
        'प्रोस्टेट शल्यक्रिया',
        'मुत्ररोग उपचार'
      ],
      faqs: [
        {
          question: 'उपचार पछि कहिले डिस्चार्ज हुन्छ?',
          answer: '२४ घण्टा भित्र डिस्चार्ज हुन सकिन्छ।'
        }
      ]
    }
  },
  {
    slug: 'dermatology',
    iconName: 'Sparkles',
    en: {
      title: 'Dermatology & Cosmetic Surgery',
      description: 'Robotic hair transplant, aesthetic plastic surgery, laser skin therapy & reconstructive care.',
      overview: 'Premier aesthetic centers providing FUE/DHI hair transplantation, rhinoplasty, scar revision, and anti-aging treatments.',
      procedures: [
        'Robotic & Sapphire FUE Hair Transplantation',
        'Cosmetic Rhinoplasty & Facelift',
        'Laser Skin Resurfacing & Pigmentation',
        'Scar Revision & Burn Reconstruction',
        'Body Contouring & Liposuction'
      ],
      faqs: [
        {
          question: 'How many days are needed for hair transplant in Delhi?',
          answer: 'Hair transplant requires 1 day for the procedure and 2 days for initial wash and assessment.'
        }
      ]
    },
    ru: {
      title: 'Дерматология и пластическая хирургия',
      description: 'Пересадка волос, эстетическая пластическая хирургия, лазерная косметология и омоложение.',
      overview: 'Центры пластической хирургии предлагают бесшовную пересадку волос FUE/DHI, ринопластику и лазерное омоложение.',
      procedures: [
        'Бесшовная пересадка волос FUE и Sapphire DHI',
        'Эстетическая ринопластика и подтяжка лица',
        'Лазерная шлифовка кожи и умывание',
        'Реконструкция рубцов и шрамов',
        'Липосакция и моделирование фигуры'
      ],
      faqs: [
        {
          question: 'Сколько дней требуется для пересадки волос?',
          answer: 'Сама процедура занимает 1 день, плюс 2 дня на контроль и первичное мытье головы.'
        }
      ]
    },
    ne: {
      title: 'डर्माटोलोजी र प्लास्टिक सर्जरी',
      description: 'कपाल प्रत्यारोपण, छालाको उपचार र प्लास्टिक सर्जरी।',
      overview: 'आधुनिक प्रविधिबाट कपाल प्रत्यारोपण र छालाको उपचार।',
      procedures: [
        'कपाल प्रत्यारोपण (Hair Transplant)',
        'प्लास्टिक र कस्मेटिक सर्जरी',
        'लेजर छाला उपचार'
      ],
      faqs: [
        {
          question: 'कपाल प्रत्यारोपणका लागि कति समय लाग्छ?',
          answer: '१ दिन शल्यक्रिया र २ दिन ड्रेसिङ/जाँचका लागि लाग्छ।'
        }
      ]
    }
  }
];

export function getSpecialtyBySlug(slug: string): SpecialtyItem | undefined {
  return specialtiesData.find(s => s.slug === slug);
}
