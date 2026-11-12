/**
 * PAK IGNITERS - Centralized Content & Translation Registry
 * Managed by: Farwa (Website Strategy, Content & Quality Lead)
 * Supports: English (Default / LTR) & Urdu (RTL)
 */

const PAK_IGNITERS_CONTENT = {
  en: {
    meta: {
      title: "PAK IGNITERS | Unlock Your Potential - Learn. Create. Earn. Lead.",
      description: "Official portal of PAK IGNITERS. Empowering youth and businesses across Pakistan through digital innovation, creative web studios, commerce, practical academies, and leadership."
    },
    nav: {
      brand: "PAK IGNITERS",
      taglineMini: "Unlock Your Potential",
      divisions: "Divisions",
      about: "About Us",
      team: "Team Roles",
      contact: "Get in Touch",
      cta: "Explore Divisions",
      langSwitch: "اردو"
    },
    hero: {
      badge: "Official Digital Hub • Staging v1.0",
      headline: "Unlock Your Potential.",
      supporting: "Learn. Create. Earn. Lead.",
      description: "PAK IGNITERS is an integrated ecosystem dedicated to elevating Pakistan's technological, creative, and entrepreneurial talents through structured divisions, real-world execution, and collaborative mentorship.",
      ctaPrimary: "Explore 6 Divisions",
      ctaSecondary: "Ask Igniter AI",
      stats: [
        { value: "6", label: "Specialized Divisions" },
        { value: "3+", label: "Collaborative Leads" },
        { value: "100%", label: "Execution Focused" }
      ]
    },
    divisions: {
      title: "Six Core Divisions",
      subtitle: "Dedicated pillars powering our digital innovation, commerce solutions, professional education, and strategic leadership.",
      allTab: "All Divisions",
      items: [
        {
          id: "digital",
          name: "Pak Igniters Digital",
          badge: "#20BCEB • Digital Marketing & Growth",
          color: "#20BCEB",
          icon: "digital",
          description: "Performance-minded digital growth partner for businesses. It plans and executes digital marketing that improves visibility, engagement, qualified enquiries and measurable commercial outcomes.",
          features: [
            "Social Media Strategy & Management",
            "Content Production & Copywriting",
            "Meta & Paid Advertising Campaigns",
            "SEO & Funnel Optimization"
          ],
          leadRole: "Department Lead: Mr. Saeed ul Hassan",
          slogan: "Your Business. Our Digital Growth."
        },
        {
          id: "commerce",
          name: "Pak Igniters Commerce",
          badge: "#24B47E • E-Commerce & Marketplaces",
          color: "#24B47E",
          icon: "commerce",
          description: "Reliable e-commerce operations and growth partner for brands on Amazon, eBay, Etsy, Shopify, and WooCommerce with disciplined store management and catalog SEO.",
          features: [
            "Amazon, eBay & Etsy Operations",
            "Shopify & WooCommerce Setup",
            "Product Research & Competitor Analysis",
            "Catalogue Quality & Store Merchandising"
          ],
          leadRole: "Department Lead: Mr. Zaigham ullah",
          slogan: "Turn Online Stores into Growing Businesses."
        },
        {
          id: "webstudio",
          name: "Pak Igniters Web Studio",
          badge: "#8B78E6 • Web Development & Creative",
          color: "#8B78E6",
          icon: "webstudio",
          description: "Creative and technology studio that turns business ideas into professional digital experiences combining visual design, fast Jamstack web builds, and multimedia production.",
          features: [
            "Brand Identity & Graphic Design",
            "Business Websites & Landing Pages",
            "WordPress, Shopify & WooCommerce Development",
            "UI/UX Interface Design & Video Editing"
          ],
          leadRole: "Department Lead: Mr. Hamza",
          slogan: "Design. Develop. Deliver."
        },
        {
          id: "academy",
          name: "Pak Igniters Academy",
          badge: "#D6A84F • Skills & Career Development",
          color: "#D6A84F",
          icon: "academy",
          description: "Practical learning institution where participants gain relevant skills, demonstrate competence, build portfolios, and prepare for freelancing, employment, or entrepreneurship.",
          features: [
            "Graphic Design & Creative Tools",
            "Digital Marketing & Content Operations",
            "Web Development & WordPress Bootcamps",
            "AI Tools, Productivity & Freelancing SOPs"
          ],
          leadRole: "Department Lead: Mr. Saeed ul Hassan",
          slogan: "Learn Skills. Build Your Future."
        },
        {
          id: "leadership",
          name: "Pak Igniters Leadership",
          badge: "#E47B62 • Human Growth & Teacher Dev",
          color: "#E47B62",
          icon: "leadership",
          description: "Trusted learning and development platform for educators, parents, youth, and professionals providing teacher training, modern pedagogy, parenting education, and human growth.",
          features: [
            "Teacher Professional Development & Pedagogy",
            "AI & Digital Tools for Educators",
            "Parenting Education in the Digital Age",
            "Youth Leadership & Executive Confidence"
          ],
          leadRole: "Department Lead: Miss Asma",
          slogan: "Develop People. Transform Lives."
        },
        {
          id: "business",
          name: "Pak Igniters Business Solutions",
          badge: "#3974C6 • Commercial Growth & CRM",
          color: "#3974C6",
          icon: "business",
          description: "Commercial relationship and growth engine for Pak Igniters identifying opportunities, qualifying prospects, packaging proposals, and driving strategic partnerships.",
          features: [
            "Corporate Lead Generation & Research",
            "Client Discovery & Proposal Coordination",
            "Institutional Outreach & Partnerships",
            "CRM & Sales-Pipeline Management"
          ],
          leadRole: "Department Lead: Mirza Usman Ghani (CEO)",
          slogan: "Turning Opportunities into Results."
        }
      ]
    },
    collaboration: {
      title: "Executive Leadership & Team Architecture",
      subtitle: "Under the executive leadership of CEO Mirza Usman Ghani, our dedicated leads drive operational excellence across Pakistan.",
      members: [
        {
          name: "Mirza Usman Ghani",
          title: "Chief Executive Officer & Founder",
          scope: "Master brand strategy, organizational governance, high-value institutional partnerships, and executive vision across all 6 divisions.",
          badge: "Executive Leadership"
        },
        {
          name: "Muhammad Ismail Bhatti",
          title: "Super Admin & Executive Lead",
          scope: "Technical oversight, CMS architecture, live Vercel deployments, AI assistant integration, and overall operations desk.",
          badge: "Branch: dev-ismail"
        },
        {
          name: "Wardah",
          title: "Website Developer & WordPress Lead",
          scope: "Jamstack architecture, WooCommerce store setup, headless CMS implementation, and technical frontend engineering.",
          badge: "Branch: dev-wardah"
        },
        {
          name: "Farwa",
          title: "Content Strategist & Quality Lead",
          scope: "Search engine optimization (SEO), bilingual localization (English/Urdu), editorial campaigns, and brand consistency.",
          badge: "Branch: dev-farwa"
        }
      ]
    },
    contact: {
      title: "Connect with PAK IGNITERS",
      subtitle: "Have a project inquiry, partnership request, or academy question? Reach our leadership team directly.",
      form: {
        nameLabel: "Your Full Name",
        namePlaceholder: "e.g. Ali Khan",
        emailLabel: "Email Address",
        emailPlaceholder: "e.g. ali@example.com",
        divisionLabel: "Interested Division",
        divisionPlaceholder: "Select a division",
        messageLabel: "Project Details or Question",
        messagePlaceholder: "Tell us about your requirements, inquiry, or goals...",
        submitBtn: "Send Inquiry",
        validationError: "Please fill in all required fields with valid details.",
        successMsg: "Inquiry delivered directly to ismail137see@gmail.com and info.pakigniters@gmail.com!"
      }
    },
    chatbot: {
      triggerTitle: "Chat with AI",
      windowHeader: "Igniter AI Assistant",
      onlineStatus: "Online • Knowledge Staging",
      greeting: "Salam & Welcome to PAK IGNITERS! I am your AI assistant. How can I help you explore our 6 divisions, academy programs, or website project today?",
      suggestions: [
        "Tell me about the 6 Divisions",
        "What does the Academy offer?",
        "How will WordPress migration work?",
        "Who is on the team?"
      ],
      inputPlaceholder: "Type your question here...",
      sendBtn: "Send"
    },
    footer: {
      aboutText: "PAK IGNITERS is on a mission to empower youth, creators, and businesses across Pakistan through modern technology, e-commerce, and world-class education.",
      divisionsHeading: "Our Divisions",
      quickLinksHeading: "Quick Links",
      legalHeading: "Staging Notice",
      stagingNotice: "This is a temporary development staging site deployed via Antigravity → GitHub → Vercel for team review. Final launch will occur on the approved official domain.",
      copyright: "© 2026 PAK IGNITERS. All rights reserved. Unlock Your Potential."
    }
  },

  ur: {
    meta: {
      title: "پاک اگنائٹرز | اپنی صلاحیتوں کو اجاگر کریں - سیکھیں، تخلیق کریں، کمائیں، رہنمائی کریں",
      description: "پاک اگنائٹرز کا باضابطہ پورٹل۔ ڈیجیٹل جدت، تخلیقی ویب اسٹوڈیو، کامرس، عملی اکیڈمی اور قیادت کے ذریعے پاکستان بھر میں نوجوانوں اور کاروباروں کو بااختیار بنانا۔"
    },
    nav: {
      brand: "پاک اگنائٹرز",
      taglineMini: "اپنی صلاحیتوں کو اجاگر کریں",
      divisions: "شعبہ جات",
      about: "ہمارے بارے میں",
      team: "ٹیم کی ذمہ داریاں",
      contact: "رابطہ کریں",
      cta: "شعبہ جات دیکھیں",
      langSwitch: "English"
    },
    hero: {
      badge: "باضابطہ ڈیجیٹل حب • اسٹیجنگ ورژن 1.0",
      headline: "اپنی صلاحیتوں کو اجاگر کریں۔",
      supporting: "سیکھیں، تخلیق کریں، کمائیں، رہنمائی کریں۔",
      description: "پاک اگنائٹرز ایک ایسا جدید پلیٹ فارم ہے جو پاکستان کی تکنیکی، تخلیقی اور کاروباری صلاحیتوں کو عملی منصوبوں، منظم شعبوں اور باہمی رہنمائی کے ذریعے عالمی سطح پر پہنچانے کے لیے پرعزم ہے۔",
      ctaPrimary: "چھ شعبہ جات دریافت کریں",
      ctaSecondary: "اے آئی سے سوال کریں",
      stats: [
        { value: "۶", label: "مخصوص شعبہ جات" },
        { value: "۳+", label: "ٹیم لیڈرز" },
        { value: "۱۰۰٪", label: "عملی اور مؤثر نتائج" }
      ]
    },
    divisions: {
      title: "ہمارے ۶ باضابطہ شعبہ جات",
      subtitle: "ہماری ڈیجیٹل ترقی، ای کامرس حل، پیشہ ورانہ تعلیم اور اسٹریٹجک قیادت کو بااختیار بنانے والے ستون۔",
      allTab: "تمام شعبہ جات",
      items: [
        {
          id: "digital",
          name: "پاک اگنائٹرز ڈیجیٹل",
          badge: "#20BCEB • ڈیجیٹل مارکیٹنگ اور گروتھ سروسز",
          color: "#20BCEB",
          icon: "digital",
          description: "کاروباروں کے لیے کارکردگی پر مبنی ڈیجیٹل گروتھ پارٹنر۔ ڈیجیٹل مارکیٹنگ کی منصوبہ بندی اور عملدرآمد جو نمائش، کسٹمر انکوائریز اور تجارتی نتائج میں اضافہ کرتا ہے۔",
          features: [
            "سوشل میڈیا اسٹریٹجی اور مینجمنٹ",
            "مواد کی تیاری اور کاپی رائٹنگ",
            "میٹا اور پیڈ ایڈورٹائزنگ مہمات",
            "ایس ای او اور سیلز فنل آپٹیمائزیشن"
          ],
          leadRole: "ڈیپارٹمنٹ لیڈ: جناب سعید الحسن",
          slogan: "آپ کا کاروبار۔ ہماری ڈیجیٹل ترقی۔"
        },
        {
          id: "commerce",
          name: "پاک اگنائٹرز کامرس",
          badge: "#24B47E • ای کامرس اسٹور اور مارکیٹ پلیس مینجمنٹ",
          color: "#24B47E",
          icon: "commerce",
          description: "ایمازون، ای بے، ایٹسی، شاپائف اور وو کامرس استعمال کرنے والے برانڈز کے لیے قابل اعتماد ای کامرس آپریشنز اور گروتھ پارٹنر۔",
          features: [
            "ایمازون، ای بے اور ایٹسی آپریشنز",
            "شاپائف اور وو کامرس اسٹور سیٹ اپ",
            "پروڈکٹ ریسرچ اور حریفوں کا تجزیہ",
            "کیٹلاگ مینجمنٹ اور اسٹور مرچنڈائزنگ"
          ],
          leadRole: "ڈیپارٹمنٹ لیڈ: جناب ضیغم اللہ",
          slogan: "آن لائن اسٹورز کو منافع بخش کاروبار بنائیں۔"
        },
        {
          id: "webstudio",
          name: "پاک اگنائٹرز ویب اسٹوڈیو",
          badge: "#8B78E6 • ویب ڈویلپمنٹ اور تخلیقی پروڈکشن",
          color: "#8B78E6",
          icon: "webstudio",
          description: "تخلیقی اور تکنیکی اسٹوڈیو جو تجارتی خیالات کو پیشہ ورانہ ڈیجیٹل تجربات میں بدلتا ہے۔ جدید بصری ڈیزائن، تیز رفتار ویب سائٹس اور ملٹی میڈیا پروڈکشن۔",
          features: [
            "برانڈ شناخت اور گرافک ڈیزائن",
            "بزنس ویب سائٹس اور لینڈنگ پیجز",
            "ورڈپریس، شاپائف اور وو کامرس ڈویلپمنٹ",
            "UI/UX انٹرفیس ڈیزائن اور ویڈیو ایڈیٹنگ"
          ],
          leadRole: "ڈیپارٹمنٹ لیڈ: جناب حمزہ",
          slogan: "ڈیزائن۔ ڈویلپ۔ ڈلیور۔"
        },
        {
          id: "academy",
          name: "پاک اگنائٹرز اکیڈمی",
          badge: "#D6A84F • پیشہ ورانہ مہارتیں اور کیریئر ڈویلپمنٹ",
          color: "#D6A84F",
          icon: "academy",
          description: "ایک عملی تربیتی ادارہ جہاں شرکاء عملی مہارتیں حاصل کرتے ہیں، پورٹ فولیوز بناتے ہیں اور فری لانسنگ، ملازمت یا انٹرپرینیورشپ کے لیے تیار ہوتے ہیں۔",
          features: [
            "گرافک ڈیزائن اور تخلیقی ٹولز",
            "ڈیجیٹل مارکیٹنگ اور مواد کے آپریشنز",
            "ویب ڈویلپمنٹ اور ورڈپریس تربیت",
            "اے آئی ٹولز، پیداواری صلاحیت اور فری لانسنگ"
          ],
          leadRole: "ڈیپارٹمنٹ لیڈ: جناب سعید الحسن",
          slogan: "ہنر سیکھیں۔ اپنا مستقبل بنائیں۔"
        },
        {
          id: "leadership",
          name: "پاک اگنائٹرز لیڈرشپ",
          badge: "#E47B62 • اساتذہ کی تربیت، پیرنٹنگ اور انسانی ترقی",
          color: "#E47B62",
          icon: "leadership",
          description: "اساتذہ، والدین، نوجوانوں اور پیشہ ور افراد کے لیے قابل اعتماد لرننگ پلیٹ فارم۔ جدید تدریسی طریقے، اساتذہ کے لیے اے آئی ٹولز اور قیادت کی صلاحیتیں۔",
          features: [
            "اساتذہ کی پیشہ ورانہ تربیت اور جدید پیڈاگوجی",
            "اساتذہ کے لیے اے آئی اور ڈیجیٹل ٹولز",
            "ڈیجیٹل دور میں پیرنٹنگ ایجوکیشن",
            "نوجوانوں میں قیادت، خود اعتمادی اور کمیونیکیشن"
          ],
          leadRole: "ڈیپارٹمنٹ لیڈ: مس عاصمہ",
          slogan: "لوگوں کو بااختیار بنائیں۔ زندگیاں بدلیں۔"
        },
        {
          id: "business",
          name: "پاک اگنائٹرز بزنس سلوشنز",
          badge: "#3974C6 • بزنس ڈویلپمنٹ، پارٹنرشپ اور کلائنٹ کامیابی",
          color: "#3974C6",
          icon: "business",
          description: "پاک اگنائٹرز کا تجارتی تعلقات اور گروتھ انجن۔ مواقع کی شناخت، کوالیفائیڈ تجاویز کی تیاری اور اسٹریٹجک شراکت داریاں۔",
          features: [
            "کارپوریٹ لیڈ جنریشن اور ریسرچ",
            "کلائنٹ ڈسکوری اور تجاویز کی ہم آہنگی",
            "ادارہ جاتی تعاون اور پارٹنرشپ ڈویلپمنٹ",
            "سی آر ایم اور سیلز پائپ لائن مینجمنٹ"
          ],
          leadRole: "ڈیپارٹمنٹ لیڈ: مرزا عثمان غنی (سی ای او)",
          slogan: "مواقع کو نتائج میں بدلیں۔"
        }
      ]
    },
    collaboration: {
      title: "ایگزیکٹو لیڈرشپ اور انتظامی ڈھانچہ",
      subtitle: "سی ای او مرزا عثمان غنی کی ایگزیکٹو قیادت میں، ہماری سرشار ٹیم پاکستان بھر میں بہترین خدمات انجام دے رہی ہے۔",
      members: [
        {
          name: "مرزا عثمان غنی",
          title: "چیف ایگزیکٹو آفیسر اور بانی",
          scope: "ماسٹر برانڈ اسٹریٹجی، تنظیمی گورننس، اعلیٰ سطحی ادارہ جاتی شراکت داریاں اور تمام ۶ شعبہ جات کی ایگزیکٹو رہنمائی۔",
          badge: "ایگزیکٹو لیڈرشپ"
        },
        {
          name: "محمد اسماعیل بھٹی",
          title: "سپر ایڈمن اور ایگزیکٹو لیڈ",
          scope: "تکنیکی نگرانی، سی ایم ایس آرکیٹیکچر، لائیو ورسل ڈیپلائمنٹ، اے آئی اسسٹنٹ انٹیگریشن اور مجموعی آپریشنز ڈیسک۔",
          badge: "برانچ: dev-ismail"
        },
        {
          name: "وردہ",
          title: "ویب سائٹ ڈویلپر اور ورڈپریس لیڈ",
          scope: "جام اسٹیک آرکیٹیکچر، وو کامرس اسٹور سیٹ اپ، ہیڈلیس سی ایم ایس نفاذ اور تکنیکی فرنٹ اینڈ انجینئرنگ۔",
          badge: "برانچ: dev-wardah"
        },
        {
          name: "فروہ",
          title: "مواد کی اسٹریٹجسٹ اور کوالٹی لیڈ",
          scope: "سرچ انجن آپٹیمائزیشن (SEO)، دو لسانی لوکلائزیشن (انگریزی/اردو)، ادارتی مہمات اور برانڈ کا مستقل معیار۔",
          badge: "برانچ: dev-farwa"
        }
      ]
    },
    contact: {
      title: "پاک اگنائٹرز سے رابطہ کریں",
      subtitle: "کیا آپ کا کوئی سوال ہے، شراکت داری کی تجویز ہے، یا اکیڈمی سے متعلق معلومات چاہیے؟ ہم سے رابطہ کریں۔",
      form: {
        nameLabel: "آپ کا پورا نام",
        namePlaceholder: "مثلاً: علی خان",
        emailLabel: "ای میل ایڈریس",
        emailPlaceholder: "مثلاً: ali@example.com",
        divisionLabel: "مطلوبہ شعبہ",
        divisionPlaceholder: "شعبہ منتخب کریں",
        messageLabel: "پراجیکٹ یا سوال کی تفصیلات",
        messagePlaceholder: "ہمیں اپنی ضروریات یا سوال کے بارے میں بتائیں...",
        submitBtn: "درخواست جمع کروائیں",
        validationError: "براہ کرم تمام مطلوبہ خانے درست معلومات کے ساتھ پر کریں۔",
        successMsg: "آپ کی انکوائری کامیابی سے ismail137see@gmail.com اور info.pakigniters@gmail.com کو بھیج دی گئی ہے!"
      }
    },
    chatbot: {
      triggerTitle: "اے آئی سے بات کریں",
      windowHeader: "اگنائٹر اے آئی اسسٹنٹ",
      onlineStatus: "آن لائن • باضابطہ گائیڈ",
      greeting: "السلام علیکم! پاک اگنائٹرز میں خوش آمدید۔ میں آپ کا ورچوئل اے آئی اسسٹنٹ ہوں۔ میں آپ کو ہمارے ۶ شعبہ جات، اکیڈمی یا ویب سائٹ پراجیکٹ کے بارے میں کیا معلومات فراہم کر سکتا ہوں؟",
      suggestions: [
        "چھ شعبہ جات کے بارے میں بتائیں",
        "اکیڈمی کیا سہولیات دیتی ہے؟",
        "ورڈپریس منتقلی کا کیا منصوبہ ہے؟",
        "ٹیم کے اراکین کون ہیں؟"
      ],
      inputPlaceholder: "اپنا سوال یہاں لکھیں...",
      sendBtn: "بھیجیں"
    },
    footer: {
      aboutText: "پاک اگنائٹرز کا مشن پاکستان بھر کے طلباء، تخلیق کاروں اور کاروباری افراد کو جدید ٹیکنالوجی، ای کامرس اور عالمی معیار کی عملی تعلیم کے ذریعے بااختیار بنانا ہے۔",
      divisionsHeading: "ہمارے شعبہ جات",
      quickLinksHeading: "اہم لنکس",
      legalHeading: "اسٹیجنگ نوٹس",
      stagingNotice: "یہ ایک عارضی ڈویلپمنٹ اسٹیجنگ سائٹ ہے جو Antigravity → GitHub → Vercel کے ذریعے ٹیم کے جائزے کے لیے چلائی جا رہی ہے۔ باضابطہ لانچ حتمی ڈومین پر ہوگی۔",
      copyright: "© 2026 پاک اگنائٹرز۔ جملہ حقوق محفوظ ہیں۔ اپنی صلاحیتوں کو اجاگر کریں۔"
    }
  }
};

// Export to window for global browser usage
if (typeof window !== "undefined") {
  window.PAK_IGNITERS_CONTENT = PAK_IGNITERS_CONTENT;
}
