import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Language = "en" | "ur" | "ar" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
  speechLang: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const speechLangMap: Record<Language, string> = {
  en: "en-US",
  ur: "ur-PK",
  ar: "ar-SA",
  hi: "hi-IN",
};

export const languageLabels: Record<Language, string> = {
  en: "EN",
  ur: "اردو",
  ar: "عربي",
  hi: "हिंदी",
};

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.certifications": "Certifications",
    "nav.contact": "Contact",
    "nav.connect": "Connect",
    "nav.hireMe": "Hire Me",

    // Hero
    "hero.greeting": "Hello, I'm",
    "hero.role": "Backend Engineer",
    "hero.desc": "B.Tech graduate building scalable backend services with Java & Spring Boot. Passionate about production systems, debugging, and cloud-aware development.",
    "hero.viewProjects": "View Projects",
    "hero.getInTouch": "Get in Touch",
    "hero.followLinkedIn": "Follow on LinkedIn",

    // About
    "about.label": "About Me",
    "about.heading1": "Backend is not just code — ",
    "about.heading2": "it's responsibility",
    "about.desc": "I'm Hasnain Haidar, a B.Tech graduate (2025) and backend-focused software engineer from Lucknow, India. I enjoy working close to real production systems, fixing bugs that matter, and building scalable backend services. Previously interned at PearlThoughts where I built custom session modules, fixed production issues, and contributed to the Schedula Backend Project.",
    "about.card1.title": "Backend Engineering",
    "about.card1.desc": "Building scalable backend services with Java, Spring Boot, and RESTful microservices.",
    "about.card2.title": "Production Debugger",
    "about.card2.desc": "Strong debugging & issue-analysis mindset — fixing bugs that matter in real production systems.",
    "about.card3.title": "Cloud-Aware Dev",
    "about.card3.desc": "Experience with AWS, DynamoDB, PostgreSQL, and deploying cloud-ready applications.",

    // Projects
    "projects.label": "Portfolio",
    "projects.heading1": "Featured ",
    "projects.heading2": "Projects",
    "projects.p1.title": "Microservices Architecture",
    "projects.p1.desc": "RESTful Microservices built with Java and Spring Boot, demonstrating scalable service-oriented architecture patterns.",
    "projects.p2.title": "Spring Boot Backend",
    "projects.p2.desc": "A collection of Spring Boot backend projects showcasing authentication, CRUD operations, and enterprise patterns.",
    "projects.p3.title": "Schedula Backend (PearlThoughts)",
    "projects.p3.desc": "Production backend system with custom session module using AWS DynamoDB, appointment & leave workflows, and WhatsApp notifications.",
    "projects.p4.title": "JavaScript Tutorials",
    "projects.p4.desc": "Comprehensive JavaScript tutorials and projects covering core concepts, DOM manipulation, and modern ES6+ features.",

    // Skills
    "skills.label": "Skills",
    "skills.heading1": "Tech ",
    "skills.heading2": "Stack",
    "skills.cat1": "Languages & Frameworks",
    "skills.cat2": "Cloud & Databases",
    "skills.cat3": "Tools & DevOps",

    // Certifications
    "certs.label": "Certifications",
    "certs.heading1": "Credentials that ",
    "certs.heading2": "validate expertise",
    "certs.viewCredential": "View Credential",

    // Footer
    "footer.text": "Built with passion & code",

    // Connect page
    "connect.label": "Get in Touch",
    "connect.heading1": "Let's ",
    "connect.heading2": "Connect",
    "connect.desc": "I'm always open to new opportunities, collaborations, and conversations.",
    "connect.backToPortfolio": "Back to Portfolio",
    "connect.github.desc": "Check out my repositories & open source work",
    "connect.linkedin.desc": "Connect with me professionally",
    "connect.instagram.desc": "Follow my tech journey & daily life",
    "connect.email.desc": "Drop me a message anytime",
    "connect.sendMessage": "Send a Message",
    "connect.yourName": "Your Name",
    "connect.yourEmail": "Your Email",
    "connect.yourMessage": "Your Message",
    "connect.sendBtn": "Send Message",
    "connect.resumeTitle": "Download My Resume",
    "connect.resumeDesc": "Get a detailed overview of my experience, skills, and projects.",
    "connect.downloadResume": "Download Resume (PDF)",
    "connect.location": "Location",
    "connect.email": "Email",

    // Chatbot
    "chatbot.greeting": "Hey there! 👋 I'm Hasnain's assistant bot. Ask me anything or pick a question below!",
    "chatbot.askMe": "Ask Me",
    "chatbot.quickAnswers": "Quick answers about Hasnain",
    "chatbot.placeholder": "Type a question...",
    "chatbot.fallback": "Great question! For more details, feel free to reach out via email at hhk2170@gmail.com or connect on LinkedIn. 😊",

    // Accessibility
    "a11y.enabled": "Accessibility mode enabled - Hover over text to listen",
    "a11y.disabled": "Accessibility mode disabled",
    "a11y.notSupported": "Text-to-speech not supported in your browser",

    // Introduction
    "intro.btn": "Listen to Introduction",
    "intro.btnStop": "Stop",
    "intro.text": "Hi, I'm Hasnain Haidar, a Computer Science graduate and an aspiring Backend Developer with a strong interest in building scalable web applications. I have hands-on experience working with Java, Spring Boot, REST APIs, and databases like MySQL and PostgreSQL. During my internship, I worked on backend development tasks such as debugging APIs, resolving CORS and configuration issues, and integrating cloud services like AWS Lambda and DynamoDB. I enjoy learning new technologies, solving technical problems, and building practical projects that improve my development skills. As a fresher, I am looking for an opportunity where I can contribute to real-world projects, learn from experienced developers, and grow as a backend engineer.",
  },
  ur: {
    "nav.about": "میرے بارے میں",
    "nav.projects": "پروجیکٹس",
    "nav.skills": "مہارتیں",
    "nav.certifications": "سرٹیفیکیشنز",
    "nav.contact": "رابطہ",
    "nav.connect": "جڑیں",
    "nav.hireMe": "مجھے ہائر کریں",

    "hero.greeting": "ہیلو، میں ہوں",
    "hero.role": "بیک اینڈ انجینئر",
    "hero.desc": "بی ٹیک گریجویٹ جو جاوا اور سپرنگ بوٹ کے ساتھ اسکیل ایبل بیک اینڈ سروسز بنا رہا ہے۔ پروڈکشن سسٹمز، ڈیبگنگ، اور کلاؤڈ آگاہ ترقی کا شوق رکھتا ہوں۔",
    "hero.viewProjects": "پروجیکٹس دیکھیں",
    "hero.getInTouch": "رابطہ کریں",
    "hero.followLinkedIn": "LinkedIn پر فالو کریں",

    "about.label": "میرے بارے میں",
    "about.heading1": "بیک اینڈ صرف کوڈ نہیں — ",
    "about.heading2": "یہ ذمہ داری ہے",
    "about.desc": "میں حسنین حیدر ہوں، بی ٹیک گریجویٹ (2025) اور لکھنؤ، بھارت سے بیک اینڈ فوکسڈ سافٹ ویئر انجینئر۔ مجھے حقیقی پروڈکشن سسٹمز کے قریب کام کرنا، اہم بگز کو ٹھیک کرنا، اور اسکیل ایبل بیک اینڈ سروسز بنانا پسند ہے۔",
    "about.card1.title": "بیک اینڈ انجینئرنگ",
    "about.card1.desc": "جاوا، سپرنگ بوٹ، اور RESTful مائیکرو سروسز کے ساتھ اسکیل ایبل بیک اینڈ سروسز بنانا۔",
    "about.card2.title": "پروڈکشن ڈیبگر",
    "about.card2.desc": "مضبوط ڈیبگنگ اور مسئلہ تجزیہ کی ذہنیت — حقیقی پروڈکشن سسٹمز میں اہم بگز کو ٹھیک کرنا۔",
    "about.card3.title": "کلاؤڈ آگاہ ڈیو",
    "about.card3.desc": "AWS، DynamoDB، PostgreSQL، اور کلاؤڈ ریڈی ایپلیکیشنز کی تعیناتی کا تجربہ۔",

    "projects.label": "پورٹ فولیو",
    "projects.heading1": "نمایاں ",
    "projects.heading2": "پروجیکٹس",
    "projects.p1.title": "مائیکرو سروسز آرکیٹیکچر",
    "projects.p1.desc": "جاوا اور سپرنگ بوٹ کے ساتھ بنائے گئے RESTful مائیکرو سروسز۔",
    "projects.p2.title": "سپرنگ بوٹ بیک اینڈ",
    "projects.p2.desc": "سپرنگ بوٹ بیک اینڈ پروجیکٹس کا مجموعہ جو تصدیق، CRUD آپریشنز دکھاتا ہے۔",
    "projects.p3.title": "شیڈولا بیک اینڈ (PearlThoughts)",
    "projects.p3.desc": "AWS DynamoDB کے ساتھ کسٹم سیشن ماڈیول والا پروڈکشن بیک اینڈ سسٹم۔",
    "projects.p4.title": "جاوا اسکرپٹ ٹیوٹوریلز",
    "projects.p4.desc": "جامع جاوا اسکرپٹ ٹیوٹوریلز اور بنیادی تصورات کا احاطہ کرنے والے پروجیکٹس۔",

    "skills.label": "مہارتیں",
    "skills.heading1": "ٹیک ",
    "skills.heading2": "اسٹیک",
    "skills.cat1": "زبانیں اور فریم ورکس",
    "skills.cat2": "کلاؤڈ اور ڈیٹا بیسز",
    "skills.cat3": "ٹولز اور ڈیو آپس",

    "certs.label": "سرٹیفیکیشنز",
    "certs.heading1": "اسناد جو ",
    "certs.heading2": "مہارت کی تصدیق کرتی ہیں",
    "certs.viewCredential": "سند دیکھیں",

    "footer.text": "جذبے اور کوڈ سے بنایا گیا",

    "connect.label": "رابطہ کریں",
    "connect.heading1": "آئیے ",
    "connect.heading2": "جڑیں",
    "connect.desc": "میں ہمیشہ نئے مواقع، تعاون، اور بات چیت کے لیے تیار ہوں۔",
    "connect.backToPortfolio": "پورٹ فولیو پر واپس",
    "connect.github.desc": "میرے ریپوزٹریز اور اوپن سورس کام دیکھیں",
    "connect.linkedin.desc": "پیشہ ورانہ طور پر جڑیں",
    "connect.instagram.desc": "میرے ٹیک سفر کو فالو کریں",
    "connect.email.desc": "کسی بھی وقت پیغام بھیجیں",
    "connect.sendMessage": "پیغام بھیجیں",
    "connect.yourName": "آپ کا نام",
    "connect.yourEmail": "آپ کا ای میل",
    "connect.yourMessage": "آپ کا پیغام",
    "connect.sendBtn": "پیغام بھیجیں",
    "connect.resumeTitle": "میرا ریزیومے ڈاؤن لوڈ کریں",
    "connect.resumeDesc": "میرے تجربے، مہارتوں، اور پروجیکٹس کا تفصیلی جائزہ حاصل کریں۔",
    "connect.downloadResume": "ریزیومے ڈاؤن لوڈ (PDF)",
    "connect.location": "مقام",
    "connect.email": "ای میل",

    "chatbot.greeting": "ہیلو! 👋 میں حسنین کا اسسٹنٹ بوٹ ہوں۔ کچھ بھی پوچھیں!",
    "chatbot.askMe": "مجھ سے پوچھیں",
    "chatbot.quickAnswers": "حسنین کے بارے میں فوری جوابات",
    "chatbot.placeholder": "سوال ٹائپ کریں...",
    "chatbot.fallback": "بہترین سوال! مزید تفصیلات کے لیے ای میل یا LinkedIn پر رابطہ کریں۔ 😊",

    "a11y.enabled": "قابل رسائی موڈ فعال - سننے کے لیے متن پر ہوور کریں",
    "a11y.disabled": "قابل رسائی موڈ غیر فعال",
    "a11y.notSupported": "ٹیکسٹ ٹو اسپیچ آپ کے براؤزر میں تعاون یافتہ نہیں",
  },
  ar: {
    "nav.about": "عني",
    "nav.projects": "المشاريع",
    "nav.skills": "المهارات",
    "nav.certifications": "الشهادات",
    "nav.contact": "اتصل",
    "nav.connect": "تواصل",
    "nav.hireMe": "وظفني",

    "hero.greeting": "مرحبًا، أنا",
    "hero.role": "مهندس خلفية",
    "hero.desc": "خريج بكالوريوس تقنية يبني خدمات خلفية قابلة للتوسع باستخدام Java و Spring Boot. شغوف بأنظمة الإنتاج وتصحيح الأخطاء والتطوير السحابي.",
    "hero.viewProjects": "عرض المشاريع",
    "hero.getInTouch": "تواصل معي",
    "hero.followLinkedIn": "تابع على LinkedIn",

    "about.label": "عني",
    "about.heading1": "الخلفية ليست مجرد كود — ",
    "about.heading2": "إنها مسؤولية",
    "about.desc": "أنا حسنين حيدر، خريج بكالوريوس تقنية (2025) ومهندس برمجيات متخصص في الخلفية من لكناؤ، الهند. أستمتع بالعمل على أنظمة الإنتاج الحقيقية وإصلاح الأخطاء المهمة وبناء خدمات خلفية قابلة للتوسع.",
    "about.card1.title": "هندسة الخلفية",
    "about.card1.desc": "بناء خدمات خلفية قابلة للتوسع باستخدام Java و Spring Boot والخدمات المصغرة RESTful.",
    "about.card2.title": "مصحح الإنتاج",
    "about.card2.desc": "عقلية قوية في تصحيح الأخطاء وتحليل المشاكل — إصلاح الأخطاء المهمة في أنظمة الإنتاج.",
    "about.card3.title": "مطور سحابي",
    "about.card3.desc": "خبرة في AWS و DynamoDB و PostgreSQL ونشر التطبيقات السحابية.",

    "projects.label": "معرض الأعمال",
    "projects.heading1": "المشاريع ",
    "projects.heading2": "المميزة",
    "projects.p1.title": "بنية الخدمات المصغرة",
    "projects.p1.desc": "خدمات مصغرة RESTful مبنية بـ Java و Spring Boot توضح أنماط البنية الموجهة للخدمات.",
    "projects.p2.title": "خلفية Spring Boot",
    "projects.p2.desc": "مجموعة من مشاريع Spring Boot تعرض المصادقة وعمليات CRUD.",
    "projects.p3.title": "شيدولا (PearlThoughts)",
    "projects.p3.desc": "نظام خلفية إنتاجي مع وحدة جلسات مخصصة باستخدام AWS DynamoDB.",
    "projects.p4.title": "دروس JavaScript",
    "projects.p4.desc": "دروس JavaScript شاملة تغطي المفاهيم الأساسية ومعالجة DOM.",

    "skills.label": "المهارات",
    "skills.heading1": "حزمة ",
    "skills.heading2": "التقنيات",
    "skills.cat1": "اللغات والأطر",
    "skills.cat2": "السحابة وقواعد البيانات",
    "skills.cat3": "الأدوات و DevOps",

    "certs.label": "الشهادات",
    "certs.heading1": "أوراق اعتماد ",
    "certs.heading2": "تثبت الخبرة",
    "certs.viewCredential": "عرض الشهادة",

    "footer.text": "بُني بشغف وكود",

    "connect.label": "تواصل",
    "connect.heading1": "دعنا ",
    "connect.heading2": "نتواصل",
    "connect.desc": "أنا دائمًا منفتح على الفرص والتعاون والمحادثات الجديدة.",
    "connect.backToPortfolio": "العودة للمعرض",
    "connect.github.desc": "تصفح مستودعاتي وأعمالي مفتوحة المصدر",
    "connect.linkedin.desc": "تواصل معي مهنيًا",
    "connect.instagram.desc": "تابع رحلتي التقنية",
    "connect.email.desc": "أرسل رسالة في أي وقت",
    "connect.sendMessage": "أرسل رسالة",
    "connect.yourName": "اسمك",
    "connect.yourEmail": "بريدك الإلكتروني",
    "connect.yourMessage": "رسالتك",
    "connect.sendBtn": "إرسال الرسالة",
    "connect.resumeTitle": "تحميل سيرتي الذاتية",
    "connect.resumeDesc": "احصل على نظرة تفصيلية على خبرتي ومهاراتي ومشاريعي.",
    "connect.downloadResume": "تحميل السيرة الذاتية (PDF)",
    "connect.location": "الموقع",
    "connect.email": "البريد الإلكتروني",

    "chatbot.greeting": "مرحبًا! 👋 أنا مساعد حسنين. اسأل أي شيء!",
    "chatbot.askMe": "اسألني",
    "chatbot.quickAnswers": "إجابات سريعة عن حسنين",
    "chatbot.placeholder": "اكتب سؤالاً...",
    "chatbot.fallback": "سؤال رائع! لمزيد من التفاصيل تواصل عبر البريد أو LinkedIn. 😊",

    "a11y.enabled": "تم تفعيل وضع إمكانية الوصول - مرر فوق النص للاستماع",
    "a11y.disabled": "تم تعطيل وضع إمكانية الوصول",
    "a11y.notSupported": "تحويل النص إلى كلام غير مدعوم في متصفحك",
  },
  hi: {
    "nav.about": "मेरे बारे में",
    "nav.projects": "प्रोजेक्ट्स",
    "nav.skills": "कौशल",
    "nav.certifications": "प्रमाणपत्र",
    "nav.contact": "संपर्क",
    "nav.connect": "जुड़ें",
    "nav.hireMe": "मुझे हायर करें",

    "hero.greeting": "नमस्ते, मैं हूं",
    "hero.role": "बैकएंड इंजीनियर",
    "hero.desc": "बी.टेक ग्रेजुएट जो Java और Spring Boot के साथ स्केलेबल बैकएंड सेवाएं बना रहा है। प्रोडक्शन सिस्टम, डिबगिंग, और क्लाउड-अवेयर डेवलपमेंट का जुनून।",
    "hero.viewProjects": "प्रोजेक्ट्स देखें",
    "hero.getInTouch": "संपर्क करें",
    "hero.followLinkedIn": "LinkedIn पर फॉलो करें",

    "about.label": "मेरे बारे में",
    "about.heading1": "बैकएंड सिर्फ कोड नहीं — ",
    "about.heading2": "यह जिम्मेदारी है",
    "about.desc": "मैं हसनैन हैदर हूं, बी.टेक ग्रेजुएट (2025) और लखनऊ, भारत से बैकएंड-फोकस्ड सॉफ्टवेयर इंजीनियर। मुझे असली प्रोडक्शन सिस्टम के करीब काम करना, महत्वपूर्ण बग्स ठीक करना, और स्केलेबल बैकएंड सेवाएं बनाना पसंद है।",
    "about.card1.title": "बैकएंड इंजीनियरिंग",
    "about.card1.desc": "Java, Spring Boot, और RESTful माइक्रोसर्विसेज के साथ स्केलेबल बैकएंड सेवाएं बनाना।",
    "about.card2.title": "प्रोडक्शन डिबगर",
    "about.card2.desc": "मजबूत डिबगिंग और समस्या-विश्लेषण मानसिकता — असली प्रोडक्शन सिस्टम में महत्वपूर्ण बग्स ठीक करना।",
    "about.card3.title": "क्लाउड-अवेयर डेव",
    "about.card3.desc": "AWS, DynamoDB, PostgreSQL, और क्लाउड-रेडी एप्लिकेशन डिप्लॉय करने का अनुभव।",

    "projects.label": "पोर्टफोलियो",
    "projects.heading1": "विशेष ",
    "projects.heading2": "प्रोजेक्ट्स",
    "projects.p1.title": "माइक्रोसर्विसेज आर्किटेक्चर",
    "projects.p1.desc": "Java और Spring Boot के साथ बनाई गई RESTful माइक्रोसर्विसेज।",
    "projects.p2.title": "Spring Boot बैकएंड",
    "projects.p2.desc": "Spring Boot बैकएंड प्रोजेक्ट्स का संग्रह जो प्रमाणीकरण और CRUD संचालन दिखाता है।",
    "projects.p3.title": "शेड्यूला बैकएंड (PearlThoughts)",
    "projects.p3.desc": "AWS DynamoDB के साथ कस्टम सेशन मॉड्यूल वाला प्रोडक्शन बैकएंड सिस्टम।",
    "projects.p4.title": "JavaScript ट्यूटोरियल्स",
    "projects.p4.desc": "व्यापक JavaScript ट्यूटोरियल्स जो मूल अवधारणाओं और DOM मैनिपुलेशन को कवर करते हैं।",

    "skills.label": "कौशल",
    "skills.heading1": "टेक ",
    "skills.heading2": "स्टैक",
    "skills.cat1": "भाषाएं और फ्रेमवर्क",
    "skills.cat2": "क्लाउड और डेटाबेस",
    "skills.cat3": "टूल्स और DevOps",

    "certs.label": "प्रमाणपत्र",
    "certs.heading1": "विशेषज्ञता को ",
    "certs.heading2": "प्रमाणित करने वाले क्रेडेंशियल",
    "certs.viewCredential": "प्रमाणपत्र देखें",

    "footer.text": "जुनून और कोड से बनाया गया",

    "connect.label": "संपर्क करें",
    "connect.heading1": "आइए ",
    "connect.heading2": "जुड़ें",
    "connect.desc": "मैं हमेशा नए अवसरों, सहयोग, और बातचीत के लिए तैयार हूं।",
    "connect.backToPortfolio": "पोर्टफोलियो पर वापस",
    "connect.github.desc": "मेरे रिपॉजिटरी और ओपन सोर्स काम देखें",
    "connect.linkedin.desc": "पेशेवर रूप से जुड़ें",
    "connect.instagram.desc": "मेरी टेक यात्रा को फॉलो करें",
    "connect.email.desc": "कभी भी संदेश भेजें",
    "connect.sendMessage": "संदेश भेजें",
    "connect.yourName": "आपका नाम",
    "connect.yourEmail": "आपका ईमेल",
    "connect.yourMessage": "आपका संदेश",
    "connect.sendBtn": "संदेश भेजें",
    "connect.resumeTitle": "मेरा रिज्यूमे डाउनलोड करें",
    "connect.resumeDesc": "मेरे अनुभव, कौशल, और प्रोजेक्ट्स का विस्तृत अवलोकन प्राप्त करें।",
    "connect.downloadResume": "रिज्यूमे डाउनलोड (PDF)",
    "connect.location": "स्थान",
    "connect.email": "ईमेल",

    "chatbot.greeting": "नमस्ते! 👋 मैं हसनैन का असिस्टेंट बॉट हूं। कुछ भी पूछें!",
    "chatbot.askMe": "मुझसे पूछें",
    "chatbot.quickAnswers": "हसनैन के बारे में त्वरित उत्तर",
    "chatbot.placeholder": "सवाल टाइप करें...",
    "chatbot.fallback": "बढ़िया सवाल! अधिक जानकारी के लिए ईमेल या LinkedIn पर संपर्क करें। 😊",

    "a11y.enabled": "एक्सेसिबिलिटी मोड सक्षम - सुनने के लिए टेक्स्ट पर होवर करें",
    "a11y.disabled": "एक्सेसिबिलिटी मोड अक्षम",
    "a11y.notSupported": "टेक्स्ट-टू-स्पीच आपके ब्राउज़र में समर्थित नहीं है",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = useCallback(
    (key: string) => translations[language]?.[key] || translations.en[key] || key,
    [language]
  );

  const dir = language === "ur" || language === "ar" ? "rtl" : "ltr";
  const speechLang = speechLangMap[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir, speechLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
