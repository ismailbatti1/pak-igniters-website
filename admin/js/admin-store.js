/**
 * PAK IGNITERS - Unified CMS Content Store & State Synchronization Engine
 * Manages Content for: 6 Divisions, Pages, Media Library, Blogs, SEO & Navigation
 * Supports: English (LTR) & Urdu (RTL) Dual-Language Editing
 */

(function () {
  "use strict";

  const STORAGE_KEY_PUBLISHED = "pak_igniters_published_content";
  const STORAGE_KEY_DRAFT = "pak_igniters_draft_content";
  const STORAGE_KEY_MEDIA = "pak_igniters_media_library";
  const STORAGE_KEY_BLOGS = "pak_igniters_blogs_data";

  /**
   * Default Base Content (Derived from existing content-data.js)
   */
  function getDefaultContent() {
    if (window.PAK_IGNITERS_CONTENT) {
      return JSON.parse(JSON.stringify(window.PAK_IGNITERS_CONTENT));
    }
    return {
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
              badge: "Growth & Performance",
              description: "Data-driven performance marketing, global search engine optimization, content strategy, and dynamic brand positioning designed to scale Pakistani digital footprint globally.",
              features: [
                "Data-Backed SEO & Content Architecture",
                "Performance Marketing & Social Campaigns",
                "Brand Strategy & Multi-Channel Positioning",
                "Analytics & Market Research Reports"
              ],
              leadRole: "Farwa (Strategy) & Ismail (Creative Direction)"
            },
            {
              id: "commerce",
              name: "Pak Igniters Commerce",
              badge: "E-Commerce & Scale",
              description: "End-to-end e-commerce solutions, WooCommerce store architectures, catalog optimization, and frictionless cross-border transaction funnels.",
              features: [
                "WooCommerce & Storefront Architecture",
                "Payment Gateway Integration (Local & Global)",
                "Product Catalog & Inventory Automation",
                "Conversion Rate Optimization (CRO)"
              ],
              leadRole: "Wardah (WordPress & WooCommerce Lead)"
            },
            {
              id: "webstudio",
              name: "Pak Igniters Web Studio",
              badge: "Engineering & Design",
              description: "Modern, blazing-fast web platforms built with human-centered UI/UX design, mobile responsiveness, Jamstack architecture, and custom CMS implementations.",
              features: [
                "Custom UI/UX & Responsive Web Applications",
                "Modern Jamstack & Vercel Edge Deployments",
                "Performance Tuning & Accessibility (WCAG)",
                "Future-Proof WordPress Custom Theme Migration"
              ],
              leadRole: "Ismail (UI/UX & AI) & Wardah (WordPress)"
            },
            {
              id: "academy",
              name: "Pak Igniters Academy",
              badge: "Education & Skills",
              description: "Hands-on vocational masterclasses, coding bootcamps, and digital apprenticeship programs bridging the gap between student theory and commercial delivery.",
              features: [
                "Practical Full-Stack & WordPress Bootcamps",
                "AI Integration & Prompt Engineering Workshops",
                "Portfolio Building & Industry Mentorship",
                "Certification & Direct Project Placements"
              ],
              leadRole: "Joint Technical Leads"
            },
            {
              id: "leadership",
              name: "Pak Igniters Leadership",
              badge: "Empowerment & Impact",
              description: "Fostering the next generation of Pakistani leaders, community innovators, and executive decision-makers through structured public speaking, team management, and ethics.",
              features: [
                "Youth Leadership & Public Speaking Clinics",
                "Project Management & Collaborative Workflows",
                "Cross-Functional Team Building",
                "Community Impact Initiatives"
              ],
              leadRole: "Executive Mentorship Council"
            },
            {
              id: "business",
              name: "Pak Igniters Business Solutions",
              badge: "Enterprise & Consulting",
              description: "Tailored digital transformation advisory, process automation, workflow optimization, and scalable systems for startups and mid-market organizations.",
              features: [
                "Process Digitization & Automation",
                "Technical Feasibility & RFP Preparation",
                "CRM & Pipeline Implementations",
                "Cost-Optimized Cloud & Web Roadmaps"
              ],
              leadRole: "Strategic Advisory"
            }
          ]
        },
        contact: {
          phone: "+92 308 2 481 481",
          email: "info.pakigniters@gmail.com",
          desk: "ismail137see@gmail.com"
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
          ctaSecondary: "اے آئی سے سوال کریں"
        },
        divisions: {
          title: "ہمارے ۶ باضابطہ شعبہ جات",
          subtitle: "ہماری ڈیجیٹل ترقی، ای کامرس حل، پیشہ ورانہ تعلیم اور اسٹریٹجک قیادت کو بااختیار بنانے والے ستون۔",
          items: [
            {
              id: "digital",
              name: "پاک اگنائٹرز ڈیجیٹل",
              badge: "ترقی اور کارکردگی",
              description: "ڈیٹا پر مبنی ڈیجیٹل مارکیٹنگ، سرچ انجن آپٹیمائزیشن (SEO)، مواد کی منصوبہ بندی اور پاکستانی برانڈز کو عالمی سطح پر روشناس کروانے کی اسٹریٹجی۔"
            },
            {
              id: "commerce",
              name: "پاک اگنائٹرز کامرس",
              badge: "ای کامرس اور بزنس",
              description: "جدید ای کامرس حل، وو کامرس (WooCommerce) اسٹور کی تعمیر، پروڈکٹ کیٹلاگ کا انتظام اور بین الاقوامی ادائیگیوں کا آسان مربوط نظام۔"
            },
            {
              id: "webstudio",
              name: "پاک اگنائٹرز ویب اسٹوڈیو",
              badge: "انجینئرنگ اور ڈیزائن",
              description: "جدید، تیز رفتار اور دلکش ویب سائٹس، بہترین UI/UX ڈیزائن، موبائل رسپانسونس اور جدید Jamstack و ورڈپریس سسٹمز۔"
            },
            {
              id: "academy",
              name: "پاک اگنائٹرز اکیڈمی",
              badge: "تعلیم اور ہنر",
              description: "عملی فنی ورکشاپس، کوڈنگ بوٹ کیمپس اور اپرنٹس شپ پروگرام جو طلباء کو کتابی نظریات سے نکال کر مارکیٹ کی حقیقی ضروریات کے قابل بناتے ہیں۔"
            },
            {
              id: "leadership",
              name: "پاک اگنائٹرز لیڈرشپ",
              badge: "خود اعتمادی اور قیادت",
              description: "پاکستان کے نوجوانوں میں خود اعتمادی، عوامی خطاب (Public Speaking)، ٹیم مینجمنٹ اور اخلاقی قیادت کی صلاحیتوں کو نکھارنے کا پلیٹ فارم۔"
            },
            {
              id: "business",
              name: "پاک اگنائٹرز بزنس سلوشنز",
              badge: "کاروباری مشاورت",
              description: "کاروباروں کے لیے ڈیجیٹل خودکاری (Automation)، انتظامی بہتری، جدید ٹیکنالوجی کا نفاذ اور اخراجات کم کرنے کی پیشہ ورانہ رہنمائی۔"
            }
          ]
        }
      }
    };
  }

  function getContent() {
    const published = localStorage.getItem(STORAGE_KEY_PUBLISHED);
    if (published) {
      try { return JSON.parse(published); } catch {}
    }
    return getDefaultContent();
  }

  function getDraft() {
    const draft = localStorage.getItem(STORAGE_KEY_DRAFT);
    if (draft) {
      try { return JSON.parse(draft); } catch {}
    }
    return getContent();
  }

  function saveDraft(content) {
    localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(content));
    return true;
  }

  function publishLive(userSession) {
    const draft = getDraft();
    draft._lastPublished = {
      by: userSession.name,
      email: userSession.email,
      role: userSession.role,
      at: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY_PUBLISHED, JSON.stringify(draft));
    // Trigger real-time sync event across any open client tabs
    window.dispatchEvent(new CustomEvent("pak_igniters_content_published", { detail: draft }));
    return draft;
  }

  /**
   * Media Library Management
   */
  function getMediaLibrary() {
    const media = localStorage.getItem(STORAGE_KEY_MEDIA);
    if (media) {
      try { return JSON.parse(media); } catch {}
    }
    return [
      {
        id: "img_hero",
        name: "hero-igniter-banner.png",
        altText: "PAK IGNITERS Technology and Innovation Hub",
        category: "Hero Banner",
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
        uploadedAt: "2026-11-09T18:00:00.000Z",
        uploadedBy: "Ismail"
      },
      {
        id: "img_academy",
        name: "academy-students-workshop.png",
        altText: "Hands-on tech bootcamps at Pak Igniters Academy",
        category: "Academy",
        url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
        uploadedAt: "2026-11-09T18:30:00.000Z",
        uploadedBy: "Farwa"
      },
      {
        id: "img_webstudio",
        name: "web-studio-workspace.png",
        altText: "Modern web architecture and UI/UX design studio",
        category: "Web Studio",
        url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
        uploadedAt: "2026-11-09T19:00:00.000Z",
        uploadedBy: "Wardah"
      }
    ];
  }

  function saveMediaItem(item) {
    const library = getMediaLibrary();
    library.unshift(item);
    localStorage.setItem(STORAGE_KEY_MEDIA, JSON.stringify(library));
    return library;
  }

  function deleteMediaItem(id) {
    let library = getMediaLibrary();
    library = library.filter(img => img.id !== id);
    localStorage.setItem(STORAGE_KEY_MEDIA, JSON.stringify(library));
    return library;
  }

  /**
   * Blog Articles Management (Farwa's primary module)
   */
  function getBlogs() {
    const blogs = localStorage.getItem(STORAGE_KEY_BLOGS);
    if (blogs) {
      try { return JSON.parse(blogs); } catch {}
    }
    return [
      {
        id: "blog_1",
        title: "How PAK IGNITERS is Building Pakistan's Next-Gen Tech Talent",
        slug: "building-pakistans-next-gen-tech-talent",
        category: "Academy & Leadership",
        author: "Farwa Wajid",
        status: "published",
        date: "2026-11-09",
        excerpt: "An in-depth look at how practical bootcamps and collaborative mentorship bridge the gap between academic theory and commercial enterprise delivery.",
        content: "Pak Igniters is committed to empowering the youth with practical, commercial skills. Through our six official divisions, we provide direct apprenticeships, coding workshops, and business consulting to help creators learn, create, earn, and lead.",
        seoTitle: "Building Pakistan's Next-Gen Tech Talent | PAK IGNITERS Blog",
        seoDescription: "Discover how PAK IGNITERS prepares youth and students for global software and digital commerce success."
      },
      {
        id: "blog_2",
        title: "Scaling Pakistani E-Commerce with Custom WooCommerce Systems",
        slug: "scaling-pakistani-ecommerce-woocommerce",
        category: "Pak Igniters Commerce",
        author: "Wardah",
        status: "published",
        date: "2026-11-08",
        excerpt: "Explore best practices for local and cross-border payment gateway integrations (JazzCash, EasyPaisa, Stripe) with high-converting store architectures.",
        content: "Pak Igniters Commerce develops seamless WooCommerce platforms engineered for speed, reliability, and local payment gateways. Learn how to optimize catalog performance and increase customer conversion rates.",
        seoTitle: "Scaling Pakistani E-Commerce with WooCommerce | PAK IGNITERS",
        seoDescription: "Step-by-step guide to local payment gateways, inventory scaling, and WooCommerce architectures."
      }
    ];
  }

  function saveBlog(blog) {
    const blogs = getBlogs();
    const index = blogs.findIndex(b => b.id === blog.id);
    if (index >= 0) {
      blogs[index] = blog;
    } else {
      blogs.unshift(blog);
    }
    localStorage.setItem(STORAGE_KEY_BLOGS, JSON.stringify(blogs));
    return blogs;
  }

  function deleteBlog(id) {
    let blogs = getBlogs();
    blogs = blogs.filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEY_BLOGS, JSON.stringify(blogs));
    return blogs;
  }

  // Export to Global Scope
  window.AdminStore = {
    getContent,
    getDraft,
    saveDraft,
    publishLive,
    getMediaLibrary,
    saveMediaItem,
    deleteMediaItem,
    getBlogs,
    saveBlog,
    deleteBlog
  };
})();
