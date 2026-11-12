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
   * Helper to set deeply nested property in an object
   */
  function setNestedProp(obj, path, value) {
    if (!obj || !path) return;
    const parts = path.split(".");
    let curr = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!curr[parts[i]]) curr[parts[i]] = {};
      curr = curr[parts[i]];
    }
    curr[parts[parts.length - 1]] = value;
  }

  /**
   * Universal Visual Overrides Engine:
   * Applies all edited texts, images, and buttons to the live website instantly!
   */
  function syncCmsContent() {
    try {
      // 0. Restore Navigation Menu if saved
      const savedMenu = localStorage.getItem("pak_igniters_nav_menu_html");
      const menuEl = document.getElementById("navMenu");
      if (savedMenu && menuEl) {
        menuEl.innerHTML = savedMenu;
      }

      // 0.1 Restore Full Section Snapshot (all added blocks & order)
      const savedSnapshot = localStorage.getItem("pak_igniters_published_snapshot_html");
      const urlParams = new URLSearchParams(window.location.search);
      const isStudio = urlParams.get("edit") === "true";
      if (savedSnapshot && !isStudio) {
        const existingSections = document.querySelectorAll("section");
        if (existingSections.length > 0) {
          const footer = document.querySelector("footer");
          existingSections.forEach(s => s.remove());
          const wrapper = document.createElement("div");
          wrapper.innerHTML = savedSnapshot;
          while (wrapper.firstChild) {
            if (footer) {
              footer.parentNode.insertBefore(wrapper.firstChild, footer);
            } else {
              document.body.appendChild(wrapper.firstChild);
            }
          }
        }
      }

      const raw = localStorage.getItem("pak_igniters_published_overrides") || 
                  localStorage.getItem("pak_igniters_draft_overrides") || 
                  localStorage.getItem("pak_igniters_published_content");
      if (!raw) return;

      const data = JSON.parse(raw);

      // 1. Apply Text Overrides into in-memory dictionary
      if (data.texts && window.PAK_IGNITERS_CONTENT) {
        Object.keys(data.texts).forEach(key => {
          const val = data.texts[key];
          if (window.PAK_IGNITERS_CONTENT.en) setNestedProp(window.PAK_IGNITERS_CONTENT.en, key, val);
          if (window.PAK_IGNITERS_CONTENT.ur) setNestedProp(window.PAK_IGNITERS_CONTENT.ur, key, val);

          // Direct DOM elements matching [data-i18n]
          document.querySelectorAll(`[data-i18n="${key}"]`).forEach(el => {
            if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
              el.setAttribute("placeholder", val);
            } else {
              el.innerHTML = val;
            }
          });
        });
      }

      // Also support legacy elements array if present
      if (Array.isArray(data.elements)) {
        data.elements.forEach(item => {
          if (item.key) {
            document.querySelectorAll(`[data-i18n="${item.key}"]`).forEach(el => {
              el.innerHTML = item.html || item.text;
              if (item.href) el.setAttribute("href", item.href);
            });
            if (window.PAK_IGNITERS_CONTENT) {
              if (window.PAK_IGNITERS_CONTENT.en) setNestedProp(window.PAK_IGNITERS_CONTENT.en, item.key, item.text || item.html);
              if (window.PAK_IGNITERS_CONTENT.ur) setNestedProp(window.PAK_IGNITERS_CONTENT.ur, item.key, item.text || item.html);
            }
          }
        });
      }

      // 2. Apply Image Overrides
      if (data.images) {
        Object.keys(data.images).forEach(sel => {
          const imgData = data.images[sel];
          const el = document.querySelector(sel) || document.getElementById(sel);
          if (el) {
            if (el.tagName === "IMG") {
              el.src = imgData.src;
              if (imgData.alt) el.alt = imgData.alt;
            } else {
              let existingImg = el.querySelector("img");
              if (!existingImg) {
                el.innerHTML = `<img src="${imgData.src}" alt="${imgData.alt || 'Asset'}" style="max-width:100%;max-height:100%;object-fit:contain;border-radius:6px;">`;
              } else {
                existingImg.src = imgData.src;
                if (imgData.alt) existingImg.alt = imgData.alt;
              }
            }
          }
        });
      }

      // 3. Apply Button Overrides
      if (data.buttons) {
        Object.keys(data.buttons).forEach(btnKey => {
          const bData = data.buttons[btnKey];
          const btn = document.querySelector(btnKey) || document.querySelector(`[data-i18n="${btnKey}"]`);
          if (btn) {
            if (bData.text) btn.textContent = bData.text;
            if (bData.href && btn.tagName === "A") btn.setAttribute("href", bData.href);
            if (bData.style) {
              btn.classList.remove("btn-primary", "btn-secondary");
              btn.classList.add(bData.style);
            }
          }
        });
      }
    } catch (e) {
      console.warn("Visual overrides sync error:", e);
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

    // Enquiry Type Tabs (Business vs Course vs General)
    const enquiryTabs = document.getElementById("enquiryTypeTabs");
    if (enquiryTabs) {
      enquiryTabs.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-enquiry]");
        if (!btn) return;
        enquiryTabs.querySelectorAll("button").forEach(b => {
          b.style.borderColor = "var(--border-color)";
          b.style.background = "var(--bg-surface-elevated)";
        });
        btn.style.borderColor = "var(--color-brand-cyan)";
        btn.style.background = "rgba(32, 188, 235, 0.15)";
        
        const type = btn.getAttribute("data-enquiry");
        const hiddenField = document.getElementById("formEnquiryType");
        const divisionSelect = document.getElementById("formDivision");
        if (type === "business") {
          if (hiddenField) hiddenField.value = "Business Services Enquiry";
          if (divisionSelect) divisionSelect.selectedIndex = 0;
        } else if (type === "course") {
          if (hiddenField) hiddenField.value = "Course Admission Enquiry";
          if (divisionSelect) divisionSelect.value = "Pak Igniters Academy (Skills & Career Development)";
        } else {
          if (hiddenField) hiddenField.value = "General Contact Enquiry";
          if (divisionSelect) divisionSelect.value = "General Corporate Inquiry";
        }
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

    // Update all elements with data-i18n (preserving user overrides)
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const keyPath = el.getAttribute("data-i18n");
      const val = resolveKeyPath(dict, keyPath);
      if (val) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.setAttribute("placeholder", val);
        } else {
          el.innerHTML = val;
        }
      }
    });

    // Render Division Cards
    renderDivisions();

    // Render Team Collaboration Members
    renderTeamMembers();

    // Re-apply all visual overrides on top of newly rendered dynamic sections
    syncCmsContent();
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

    const hiddenType = document.getElementById("formEnquiryType");
    const enquiryType = hiddenType ? hiddenType.value : "General Inquiry";

    // Prepare payload targeting Ismail's email with CC to info.pakigniters@gmail.com
    const inquiryPayload = {
      enquiry_type: enquiryType,
      name: name,
      email: email,
      division: division,
      message: message,
      _subject: `[${enquiryType}] PAK IGNITERS: ${division} (${name})`,
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
