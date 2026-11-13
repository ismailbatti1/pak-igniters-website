/**
 * PAK IGNITERS - AI CHATBOT ENGINE
 * Module Lead: Ismail (AI, Creative & UI/UX Development Lead)
 * Features:
 *  - Multilingual query handling (English & Urdu context)
 *  - Built-in Knowledge Base for all 6 Divisions & Team Roles
 *  - Decoupled API architecture (Ready for Google Gemini / Serverless integration)
 */

(function () {
  "use strict";

  // Backend Integration Configuration
  const AI_CHAT_CONFIG = {
    useMockEngine: true, // Set to false when connecting backend API
    apiEndpoint: "/api/chat", // Ismail can connect Vercel Serverless Function here
    defaultTimeoutMs: 8000
  };

  // PAK IGNITERS Knowledge Base
  const KNOWLEDGE_BASE = [
    {
      keywords: ["division", "divisions", "six", "6", "pillars", "شعبہ", "شعبہ جات", "چھ"],
      en: "PAK IGNITERS operates 6 official divisions:\n1. Pak Igniters Digital (SEO & Growth)\n2. Pak Igniters Commerce (WooCommerce & Stores)\n3. Pak Igniters Web Studio (Custom Modern Web)\n4. Pak Igniters Academy (Practical Tech Training)\n5. Pak Igniters Leadership (Youth & Public Speaking)\n6. Pak Igniters Business Solutions (Automation & Consulting). Which division would you like to explore?",
      ur: "پاک اگنائٹرز کے ۶ باضابطہ شعبہ جات ہیں:\n۱. پاک اگنائٹرز ڈیجیٹل (مارکیٹنگ اور ایس ای او)\n۲. پاک اگنائٹرز کامرس (وو کامرس اور ای کامرس)\n۳. پاک اگنائٹرز ویب اسٹوڈیو (جدید ویب ڈویلپمنٹ)\n۴. پاک اگنائٹرز اکیڈمی (عملی ٹریننگ)\n۵. پاک اگنائٹرز لیڈرشپ (قیادت اور پبلک اسپیکنگ)\n۶. پاک اگنائٹرز بزنس سلوشنز (مشاورت اور خودکاری)۔ آپ کس شعبے کے بارے میں جاننا چاہتے ہیں؟"
    },
    {
      keywords: ["academy", "course", "learn", "admission", "student", "skills", "اکیڈمی", "کورس", "داخلہ", "سیکھنا"],
      en: "Pak Igniters Academy bridges the gap between academic theory and commercial software engineering. We offer practical bootcamps in Full-Stack Web Development, WordPress/WooCommerce, AI tools, and hands-on portfolio mentoring. Would you like to connect with an admissions mentor?",
      ur: "پاک اگنائٹرز اکیڈمی طلباء کو عملی تربیت فراہم کرتی ہے۔ ہم فل اسٹیک ویب، ورڈپریس، ای کامرس اور جدید اے آئی ٹولز کے پریکٹیکل بوٹ کیمپس کرواتے ہیں۔ کیا آپ اکیڈمی کے مینٹور سے رابطہ کرنا چاہتے ہیں؟"
    },
    {
      keywords: ["wordpress", "woocommerce", "warda", "wardah", "shop", "store", "commerce", "وو کامرس", "وردہ", "اسٹور"],
      en: "Pak Igniters Commerce is spearheaded by Wardah (WordPress & WooCommerce Lead). We build custom WooCommerce storefronts, manage payment gateway integration (local and cross-border), and automate product catalogs.",
      ur: "پاک اگنائٹرز کامرس کی سربراہی وردہ (ورڈپریس اور وو کامرس لیڈ) کر رہی ہیں۔ ہم مکمل ای کامرس اسٹورز، ملکی و غیر ملکی پیمنٹ گیٹ ویز اور کیٹلاگ کا انتظام سنبھالتے ہیں۔"
    },
    {
      keywords: ["content", "farwa", "seo", "quality", "strategy", "فروہ", "مواد", "کوالٹی"],
      en: "Website Strategy, Content & Quality is led by Farwa. She oversees bilingual content, brand positioning, high-scoring SEO architecture, and rigorous quality assurance across all PAK IGNITERS channels.",
      ur: "ویب سائٹ اسٹریٹجی، مواد اور کوالٹی کی قیادت فروہ کے پاس ہے۔ وہ اردو اور انگریزی مواد، برانڈ اسلوب، ایس ای او (SEO) اور سائٹ کے معیار کی نگرانی کرتی ہیں۔"
    },
    {
      keywords: ["ismail", "ai", "ui", "ux", "chatbot", "lead", "developer", "اسماعیل", "ڈیزائن"],
      en: "Ismail leads AI, Creative & UI/UX Development. He is responsible for building this AI assistant, responsive interactions, modern user experience, creative graphics, and frontend engineering.",
      ur: "اسماعیل اے آئی، کریٹو اور UI/UX ڈویلپمنٹ کے لیڈ ہیں۔ وہ اس اے آئی اسسٹنٹ، انٹرایکٹو فیچرز، جدید یوزر انٹرفیس اور فرنٹ اینڈ سسٹم کو ڈیزائن اور ڈویلپ کر رہے ہیں۔"
    },
    {
      keywords: ["contact", "hire", "join", "email", "phone", "number", "whatsapp", "gmail", "help", "رابطہ", "فون", "میسج", "نمبر", "ای میل"],
      en: "You can reach PAK IGNITERS directly at:\n📞 Phone / WhatsApp: +92 308 2 481 481\n✉️ Official Email: info.pakigniters@gmail.com\nAll web inquiries are monitored directly by our official inquiries desk. You can also send a direct message via our website contact form or chat on WhatsApp!",
      ur: "آپ پاک اگنائٹرز سے براہ راست رابطہ کر سکتے ہیں:\n📞 فون / واٹس ایپ: +92 308 2 481 481\n✉️ باضابطہ ای میل: info.pakigniters@gmail.com\nتمام استفسارات براہ راست ہماری انتظامی ٹیم تک پہنچتے ہیں۔ آپ نیچے دیے گئے فارم سے میسج کر سکتے ہیں یا واٹس ایپ پر رابطہ کر سکتے ہیں!"
    }
  ];

  // DOM Elements
  let chatTriggerBtn, chatWindow, chatCloseBtn, chatMessages, chatInput, chatSendBtn, chatSuggestions;

  function initChatbot() {
    chatTriggerBtn = document.getElementById("chatTriggerBtn");
    chatWindow = document.getElementById("chatWindow");
    chatCloseBtn = document.getElementById("chatCloseBtn");
    chatMessages = document.getElementById("chatMessages");
    chatInput = document.getElementById("chatInput");
    chatSendBtn = document.getElementById("chatSendBtn");
    chatSuggestions = document.getElementById("chatSuggestions");

    if (!chatTriggerBtn || !chatWindow) return;

    // Toggle Window
    chatTriggerBtn.addEventListener("click", () => {
      chatWindow.classList.toggle("open");
      if (chatWindow.classList.contains("open")) {
        chatInput.focus();
      }
    });

    chatCloseBtn.addEventListener("click", () => {
      chatWindow.classList.remove("open");
    });

    // Send on button click or Enter key
    chatSendBtn.addEventListener("click", handleUserMessage);
    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleUserMessage();
      }
    });

    // Suggestions delegation
    if (chatSuggestions) {
      chatSuggestions.addEventListener("click", (e) => {
        const chip = e.target.closest(".suggestion-chip");
        if (chip) {
          const text = chip.innerText.trim();
          chatInput.value = text;
          handleUserMessage();
        }
      });
    }
  }

  function handleUserMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Append user bubble
    appendBubble(text, "user");
    chatInput.value = "";

    // Show typing indicator
    const typingIndicator = showTypingIndicator();

    // Query processing
    setTimeout(async () => {
      removeTypingIndicator(typingIndicator);
      const reply = await generateAIResponse(text);
      appendBubble(reply, "bot");
    }, 700);
  }

  function appendBubble(text, sender) {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${sender}`;
    // Preserve linebreaks
    bubble.innerHTML = text.replace(/\n/g, "<br>");
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTypingIndicator() {
    const el = document.createElement("div");
    el.className = "chat-typing";
    el.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
    chatMessages.appendChild(el);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return el;
  }

  function removeTypingIndicator(el) {
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }

  /**
   * Decoupled AI Response Generator
   * Dispatches to local staging knowledge base or remote API endpoint
   */
  async function generateAIResponse(query) {
    const currentLang = document.documentElement.lang === "ur" ? "ur" : "en";
    const lowerQuery = query.toLowerCase();

    // If configured to use remote backend API (e.g. Gemini via Vercel Function)
    if (!AI_CHAT_CONFIG.useMockEngine) {
      try {
        const response = await fetch(AI_CHAT_CONFIG.apiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: query, language: currentLang })
        });
        if (response.ok) {
          const data = await response.json();
          return data.reply;
        }
      } catch (err) {
        console.warn("[Chatbot] Falling back to staging knowledge engine:", err);
      }
    }

    // Local Staging Knowledge Matcher
    for (const item of KNOWLEDGE_BASE) {
      const match = item.keywords.some(kw => lowerQuery.includes(kw.toLowerCase()));
      if (match) {
        return item[currentLang];
      }
    }

    // Default Fallback
    if (currentLang === "ur") {
      return "آپ کے سوال کا شکریہ! پاک اگنائٹرز کی ٹیم ہر قسم کی رہنمائی کے لیے حاضر ہے۔ آپ ہمارے ۶ شعبہ جات دیکھ سکتے ہیں یا نیچے رابطہ فارم کے ذریعے براہ راست پیغام بھیج سکتے ہیں۔";
    } else {
      return "Thank you for reaching out! PAK IGNITERS is here to unlock your potential. Feel free to ask about any of our 6 divisions, or submit your query in the contact form below to connect with Ismail, Wardah, or Farwa.";
    }
  }

  // Auto-init on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initChatbot);
  } else {
    initChatbot();
  }
})();
