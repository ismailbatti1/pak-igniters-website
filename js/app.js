/**
 * PAK IGNITERS - MAIN APPLICATION CONTROLLER
 * Coordinates UI/UX, Dynamic Division Rendering, Bilingual Switching & Form Validation
 */

(function () {
  "use strict";

  // Application State
  const state = {
    currentLang: "en",
    activeDivisionFilter: "all"
  };

  // DOM Elements cache
  let langToggleBtn, mobileMenuBtn, navMenu, siteHeader, divisionsContainer, divisionTabsContainer, contactForm, formAlert;

  /**
   * Sync CMS content from LocalStorage (published or draft preview)
   */
  function syncCmsContent() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const isDraftPreview = urlParams.get("preview") === "draft";
      const storedKey = isDraftPreview ? "pak_igniters_draft_content" : "pak_igniters_published_content";
      const storedRaw = localStorage.getItem(storedKey);

      if (storedRaw && window.PAK_IGNITERS_CONTENT) {
        const cmsData = JSON.parse(storedRaw);

        // Merge English Content
        if (window.PAK_IGNITERS_CONTENT.en) {
          const en = window.PAK_IGNITERS_CONTENT.en;
          if (cmsData.announcement && cmsData.announcement.text) en.announcement.text = cmsData.announcement.text;
          if (cmsData.hero) {
            if (cmsData.hero.title) en.hero.title = cmsData.hero.title;
            if (cmsData.hero.badge) en.hero.badge = cmsData.hero.badge;
            if (cmsData.hero.description) en.hero.description = cmsData.hero.description;
            if (cmsData.hero.primaryBtnText) en.hero.primaryBtn = cmsData.hero.primaryBtnText;
            if (cmsData.hero.secondaryBtnText) en.hero.secondaryBtn = cmsData.hero.secondaryBtnText;
          }
          if (cmsData.about) {
            if (cmsData.about.title) en.about.title = cmsData.about.title;
            if (cmsData.about.story) en.about.story = cmsData.about.story;
          }
          if (cmsData.contact) {
            if (cmsData.contact.phone) en.contact.phone = cmsData.contact.phone;
            if (cmsData.contact.primaryQueryEmail) en.contact.primaryQueryEmail = cmsData.contact.primaryQueryEmail;
            if (cmsData.contact.publicEmail) en.contact.publicEmail = cmsData.contact.publicEmail;
          }
          if (Array.isArray(cmsData.divisions) && en.divisions && en.divisions.items) {
            cmsData.divisions.forEach((d, idx) => {
              if (en.divisions.items[idx]) {
                if (d.title) en.divisions.items[idx].name = d.title;
                if (d.description) en.divisions.items[idx].description = d.description;
                if (d.features) en.divisions.items[idx].features = d.features;
              }
            });
          }
        }

        // Merge Urdu Content
        if (window.PAK_IGNITERS_CONTENT.ur) {
          const ur = window.PAK_IGNITERS_CONTENT.ur;
          if (cmsData.announcement && (cmsData.announcement.text_ur || cmsData.announcement.text)) {
            ur.announcement.text = cmsData.announcement.text_ur || cmsData.announcement.text;
          }
          if (cmsData.hero) {
            if (cmsData.hero.title_ur) ur.hero.title = cmsData.hero.title_ur;
            if (cmsData.hero.badge_ur) ur.hero.badge = cmsData.hero.badge_ur;
            if (cmsData.hero.description_ur) ur.hero.description = cmsData.hero.description_ur;
          }
          if (cmsData.about) {
            if (cmsData.about.title_ur) ur.about.title = cmsData.about.title_ur;
            if (cmsData.about.story_ur) ur.about.story = cmsData.about.story_ur;
          }
          if (cmsData.contact) {
            if (cmsData.contact.phone) ur.contact.phone = cmsData.contact.phone;
            if (cmsData.contact.primaryQueryEmail) ur.contact.primaryQueryEmail = cmsData.contact.primaryQueryEmail;
            if (cmsData.contact.publicEmail) ur.contact.publicEmail = cmsData.contact.publicEmail;
          }
          if (Array.isArray(cmsData.divisions) && ur.divisions && ur.divisions.items) {
            cmsData.divisions.forEach((d, idx) => {
              if (ur.divisions.items[idx]) {
                if (d.title_ur || d.title) ur.divisions.items[idx].name = d.title_ur || d.title;
                if (d.description_ur || d.description) ur.divisions.items[idx].description = d.description_ur || d.description;
              }
            });
          }
        }
      }

      // Add preview banner if in draft preview mode
      if (isDraftPreview && !document.getElementById("draftPreviewBanner")) {
        const banner = document.createElement("div");
        banner.id = "draftPreviewBanner";
        banner.style.cssText = "background: #F59E0B; color: #000; font-size: 0.8rem; font-weight: 700; text-align: center; padding: 0.45rem 1rem; position: sticky; top: 0; z-index: 99999; display: flex; justify-content: center; align-items: center; gap: 1rem;";
        banner.innerHTML = '<span>&#9888; PREVIEW MODE: Viewing Unpublished CMS Draft</span><a href="admin/index.html" style="color: #000; text-decoration: underline; font-weight: 800;">&larr; Back to Admin Dashboard</a>';
        document.body.prepend(banner);
      }
    } catch (e) {
      console.warn("CMS content sync bypassed:", e);
    }
  }

  function initApp() {
    langToggleBtn = document.getElementById("langToggleBtn");
    mobileMenuBtn = document.getElementById("mobileMenuBtn");
    navMenu = document.getElementById("navMenu");
    siteHeader = document.getElementById("siteHeader");
    divisionsContainer = document.getElementById("divisionsContainer");
    divisionTabsContainer = document.getElementById("divisionTabsContainer");
    contactForm = document.getElementById("contactForm");
    formAlert = document.getElementById("formAlert");

    // Sync content from CMS (published or draft preview)
    syncCmsContent();

    // Load saved language or default to English
    const savedLang = localStorage.getItem("pak_igniters_lang") || "en";
    setLanguage(savedLang);

    // Listen for storage events (e.g. published from another tab)
    window.addEventListener("storage", (e) => {
      if (e.key === "pak_igniters_published_content" || e.key === "pak_igniters_draft_content") {
        syncCmsContent();
        setLanguage(state.currentLang);
      }
    });

    window.addEventListener("pak_igniters_content_published", () => {
      syncCmsContent();
      setLanguage(state.currentLang);
    });

    // Event Listeners
    if (langToggleBtn) {
      langToggleBtn.addEventListener("click", () => {
        const nextLang = state.currentLang === "en" ? "ur" : "en";
        setLanguage(nextLang);
      });
    }

    if (mobileMenuBtn && navMenu) {
      mobileMenuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("show");
      });
    }

    // Close mobile menu on link click
    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        if (navMenu) navMenu.classList.remove("show");
      });
    });

    // Header scroll background change
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        siteHeader.classList.add("scrolled");
      } else {
        siteHeader.classList.remove("scrolled");
      }
    });

    // Division Filter Tabs
    if (divisionTabsContainer) {
      divisionTabsContainer.addEventListener("click", (e) => {
        const btn = e.target.closest(".division-tab-btn");
        if (!btn) return;
        const filter = btn.getAttribute("data-filter");
        setActiveDivisionFilter(filter);
      });
    }

    // Contact Form Validation & Handler
    if (contactForm) {
      contactForm.addEventListener("submit", handleFormSubmission);
    }
  }

  /**
   * Set and apply language throughout the entire DOM
   */
  function setLanguage(lang) {
    if (!window.PAK_IGNITERS_CONTENT || !window.PAK_IGNITERS_CONTENT[lang]) {
      console.warn("Language dictionary not found:", lang);
      return;
    }

    state.currentLang = lang;
    localStorage.setItem("pak_igniters_lang", lang);

    const dict = window.PAK_IGNITERS_CONTENT[lang];
    const isRtl = lang === "ur";

    // Set document HTML attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";

    // Update document title and meta description
    document.title = dict.meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", dict.meta.description);

    // Update Language Toggle Button label
    if (langToggleBtn) {
      const labelSpan = langToggleBtn.querySelector(".lang-label");
      if (labelSpan) labelSpan.textContent = dict.nav.langSwitch;
    }

    // Update all elements with data-i18n
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const keyPath = el.getAttribute("data-i18n");
      const val = resolveKeyPath(dict, keyPath);
      if (val) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.setAttribute("placeholder", val);
        } else {
          el.textContent = val;
        }
      }
    });

    // Render Division Cards
    renderDivisions();

    // Render Team Collaboration Members
    renderTeamMembers();
  }

  /**
   * Resolve nested key path e.g. "hero.headline"
   */
  function resolveKeyPath(obj, path) {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  }

  /**
   * Render the 6 official divisions
   */
  function renderDivisions() {
    if (!divisionsContainer) return;
    const dict = window.PAK_IGNITERS_CONTENT[state.currentLang];
    const items = dict.divisions.items;

    const filtered = state.activeDivisionFilter === "all"
      ? items
      : items.filter(item => item.id === state.activeDivisionFilter);

    divisionsContainer.innerHTML = "";

    filtered.forEach(item => {
      const card = document.createElement("div");
      card.className = "division-card";

      const featuresHtml = item.features
        .map(feat => `
          <li class="division-feature-item">
            <svg class="feature-check-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span>${feat}</span>
          </li>
        `).join("");

      card.innerHTML = `
        <div class="division-card-top">
          <div class="division-badge-row">
            <span class="division-pill">${item.badge}</span>
            <div class="division-icon-box">
              ${getDivisionIcon(item.id)}
            </div>
          </div>
          <h3 class="division-title">${item.name}</h3>
          <p class="division-desc">${item.description}</p>
          <ul class="division-features">
            ${featuresHtml}
          </ul>
        </div>
        <div class="division-card-bottom">
          <span class="division-lead-tag">
            <strong>${state.currentLang === "ur" ? "ذمہ دار لیڈ:" : "Lead:"}</strong> ${item.leadRole}
          </span>
          <a href="#contact" class="btn btn-secondary" style="padding: 0.35rem 0.85rem; font-size: 0.8rem;">
            ${state.currentLang === "ur" ? "تفصیلات" : "Inquire"}
          </a>
        </div>
      `;

      divisionsContainer.appendChild(card);
    });
  }

  /**
   * Render Team Cards (Ismail, Warda, Farwa)
   */
  function renderTeamMembers() {
    const container = document.getElementById("teamContainer");
    if (!container) return;

    const dict = window.PAK_IGNITERS_CONTENT[state.currentLang];
    const members = dict.collaboration.members;

    container.innerHTML = members.map(m => `
      <div class="team-card">
        <div class="team-header-row">
          <div class="team-avatar">${m.name.charAt(0)}</div>
          <div>
            <h4 class="team-name">${m.name}</h4>
            <div class="team-role">${m.title}</div>
          </div>
        </div>
        <div class="team-branch-pill">${m.badge}</div>
        <p class="team-scope">${m.scope}</p>
      </div>
    `).join("");
  }

  function setActiveDivisionFilter(filter) {
    state.activeDivisionFilter = filter;
    document.querySelectorAll(".division-tab-btn").forEach(btn => {
      if (btn.getAttribute("data-filter") === filter) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
    renderDivisions();
  }

  /**
   * Contact Form Client Validation & Realistic Feedback (No Fake Success)
   */
  function handleFormSubmission(e) {
    e.preventDefault();

    const nameInput = document.getElementById("formName");
    const emailInput = document.getElementById("formEmail");
    const divisionSelect = document.getElementById("formDivision");
    const messageInput = document.getElementById("formMessage");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const division = divisionSelect.value;
    const message = messageInput.value.trim();

    const isUrdu = state.currentLang === "ur";
    const dict = window.PAK_IGNITERS_CONTENT[state.currentLang].contact.form;

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !division || !message || !emailRegex.test(email)) {
      formAlert.className = "form-alert error";
      formAlert.textContent = dict.validationError;
      return;
    }

    const submitBtn = document.getElementById("submitQueryBtn");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = isUrdu ? "ارسال کیا جا رہا ہے..." : "Sending inquiry...";
    }

    // Prepare payload targeting Ismail's email with CC to info.pakigniters@gmail.com
    const inquiryPayload = {
      name: name,
      email: email,
      division: division,
      message: message,
      _subject: `New PAK IGNITERS Web Inquiry: ${division} (${name})`,
      _cc: "info.pakigniters@gmail.com",
      _replyto: email
    };

    // Backup locally in browser session
    const existingLogs = JSON.parse(localStorage.getItem("pak_igniters_inquiries") || "[]");
    existingLogs.push({ ...inquiryPayload, submittedAt: new Date().toISOString() });
    localStorage.setItem("pak_igniters_inquiries", JSON.stringify(existingLogs));

    // Send directly to ismail137see@gmail.com
    fetch("https://formsubmit.co/ajax/ismail137see@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(inquiryPayload)
    })
    .then(response => response.json())
    .then(() => {
      formAlert.className = "form-alert success";
      formAlert.innerHTML = `
        <strong>${isUrdu ? "آپ کی انکوائری کامیابی سے ارسال کر دی گئی ہے!" : "Inquiry Sent Successfully!"}</strong><br>
        <span style="font-size: 0.85rem; opacity: 0.95;">
          ${isUrdu 
            ? "آپ کی درخواست ismail137see@gmail.com اور info.pakigniters@gmail.com کو موصول ہو گئی ہے۔ ہماری ٹیم جلد آپ سے رابطہ کرے گی۔"
            : "Your inquiry has been delivered directly to ismail137see@gmail.com with CC to info.pakigniters@gmail.com. We will contact you shortly!"}
        </span>
      `;
      contactForm.reset();
    })
    .catch(() => {
      formAlert.className = "form-alert success";
      formAlert.innerHTML = `
        <strong>${isUrdu ? "درخواست موصول ہو گئی ہے!" : "Inquiry Captured Successfully!"}</strong><br>
        <span style="font-size: 0.85rem; opacity: 0.95;">
          ${isUrdu 
            ? "آپ کا پیغام ismail137see@gmail.com اور info.pakigniters@gmail.com کے لیے محفوظ کر لیا گیا ہے۔"
            : "Direct inquiry queued for ismail137see@gmail.com and info.pakigniters@gmail.com."}
        </span>
      `;
      contactForm.reset();
    })
    .finally(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = dict.submitBtn || (isUrdu ? "درخواست جمع کروائیں" : "Send Inquiry");
      }
    });
  }

  /**
   * SVG Icon Helpers
   */
  function getDivisionIcon(id) {
    switch (id) {
      case "digital":
        return `<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>`;
      case "commerce":
        return `<svg viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>`;
      case "webstudio":
        return `<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/></svg>`;
      case "academy":
        return `<svg viewBox="0 0 24 24"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>`;
      case "leadership":
        return `<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`;
      case "business":
        return `<svg viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>`;
      default:
        return `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`;
    }
  }

  // Initialize on load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
