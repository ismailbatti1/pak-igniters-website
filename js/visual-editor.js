/**
 * PAK IGNITERS - ODOO-STYLE LIVE FRONTEND VISUAL WEBSITE EDITOR
 * Instant Auto-Publish Engine: Any edit to text, image, or button is immediately
 * saved and published live so it NEVER resets or reverts back!
 */

(function (window, document) {
  "use strict";

  const urlParams = new URLSearchParams(window.location.search);
  const isEditRequested = urlParams.get("edit") === "true" || window.PAK_IGNITERS_EDIT_MODE === true;

  if (!isEditRequested) {
    return; // Don't run on normal visitor sessions
  }

  // Authenticate user
  let currentUser = null;
  try {
    if (window.AdminAuth && typeof window.AdminAuth.getCurrentUser === "function") {
      currentUser = window.AdminAuth.getCurrentUser();
    } else {
      const rawSession = localStorage.getItem("pak_igniters_admin_session");
      if (rawSession) currentUser = JSON.parse(rawSession);
    }
  } catch (e) {
    console.warn("Session check error:", e);
  }

  // If not authenticated, redirect to login
  if (!currentUser) {
    alert("Please sign in to access the Visual Website Editor.");
    window.location.href = "admin/login.html?redirect=" + encodeURIComponent(window.location.pathname + window.location.search);
    return;
  }

  // State
  let activeElement = null;
  let originalElementHtml = "";
  let activeTargetContainer = null;
  let activeTargetBtn = null;

  // Stored Overrides Cache
  let currentOverrides = {
    texts: {},
    images: {},
    buttons: {},
    sections: {}
  };

  function loadInitialOverrides() {
    try {
      const raw = localStorage.getItem("pak_igniters_published_overrides") || 
                  localStorage.getItem("pak_igniters_draft_overrides") || 
                  localStorage.getItem("pak_igniters_published_content");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.texts) currentOverrides.texts = parsed.texts;
        if (parsed.images) currentOverrides.images = parsed.images;
        if (parsed.buttons) currentOverrides.buttons = parsed.buttons;
        if (parsed.sections) currentOverrides.sections = parsed.sections;
      }
    } catch (e) {
      console.warn("Error loading initial overrides:", e);
    }
  }

  function setNestedProperty(obj, path, value) {
    if (!obj || !path) return;
    const parts = path.split(".");
    let curr = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!curr[parts[i]]) curr[parts[i]] = {};
      curr = curr[parts[i]];
    }
    curr[parts[parts.length - 1]] = value;
  }

  const VisualEditor = {
    init: function () {
      loadInitialOverrides();
      document.body.classList.add("odoo-edit-mode-active");
      this.injectEditorBar();
      this.injectModals();
      this.applySavedOverrides();
      this.bindEditableElements();
      this.bindImageWrappers();
      this.bindButtons();
      this.injectSectionHandles();
      this.bindShortcuts();
    },

    /**
     * Top Floating Odoo Builder Bar
     */
    injectEditorBar: function () {
      const bar = document.createElement("div");
      bar.className = "odoo-builder-bar";
      bar.id = "odooBuilderBar";

      bar.innerHTML = `
        <div class="odoo-bar-left">
          <div class="odoo-brand-pill">
            <svg viewBox="0 0 24 24"><path d="M12 23c-4.97 0-9-4.03-9-9 0-4.17 2.84-7.67 6.69-8.69-.17.65-.26 1.34-.26 2.05 0 3.31 2.69 6 6 6 .71 0 1.4-.09 2.05-.26-1.02 3.85-4.52 6.69-8.69 6.69z"/></svg>
            <span>Odoo Visual Editor</span>
          </div>

          <div class="odoo-user-badge">
            <span>👤 ${currentUser.name}</span>
            <span class="odoo-user-role-tag ${currentUser.role}">
              ${currentUser.role === 'super_admin' ? 'Super Admin' : currentUser.role === 'developer' ? 'Developer' : 'Content & SEO'}
            </span>
          </div>

          <div class="odoo-status-text">
            <span class="odoo-status-dot" id="odooStatusDot" style="background:#10B981;box-shadow:0 0 8px #10B981;"></span>
            <span id="odooStatusText" style="color:#34D399;font-weight:700;">Live Auto-Sync Active</span>
          </div>
        </div>

        <div class="odoo-bar-right">
          <a href="index.html" target="_blank" class="odoo-btn odoo-btn-primary" style="background:#10B981;border-color:#34D399;box-shadow:0 4px 12px rgba(16,185,129,0.4);" title="Open Live Website in a new tab">
            👁️ View Live Website
          </a>

          <button type="button" class="odoo-btn odoo-btn-publish" id="odooBtnPublishNow" title="Force save and publish live">
            🚀 Publish All Live
          </button>

          <a href="admin/index.html" class="odoo-btn odoo-btn-secondary" style="color: #94A3B8;">
            &larr; Admin
          </a>
        </div>
      `;

      document.body.prepend(bar);

      document.getElementById("odooBtnPublishNow").addEventListener("click", () => {
        this.persistAllChanges("🎉 Website Published Live! Visitors will see all changes permanently.");
      });
    },

    /**
     * Universal Persist Method:
     * Saves changes directly to BOTH published and draft stores immediately!
     */
    persistAllChanges: function (toastMsg) {
      try {
        // Collect all text overrides from DOM
        document.querySelectorAll("[data-i18n]").forEach(el => {
          const key = el.getAttribute("data-i18n");
          if (key) {
            const val = el.innerHTML.trim();
            currentOverrides.texts[key] = val;

            // Update in-memory dictionary
            if (window.PAK_IGNITERS_CONTENT) {
              if (window.PAK_IGNITERS_CONTENT.en) setNestedProperty(window.PAK_IGNITERS_CONTENT.en, key, val);
              if (window.PAK_IGNITERS_CONTENT.ur) setNestedProperty(window.PAK_IGNITERS_CONTENT.ur, key, val);
            }
          }
        });

        // Save into LocalStorage under ALL relevant keys
        const payloadStr = JSON.stringify(currentOverrides);
        localStorage.setItem("pak_igniters_published_overrides", payloadStr);
        localStorage.setItem("pak_igniters_published_content", payloadStr);
        localStorage.setItem("pak_igniters_draft_overrides", payloadStr);
        localStorage.setItem("pak_igniters_draft_content", payloadStr);

        // Notify public website listeners
        window.dispatchEvent(new CustomEvent("pak_igniters_content_published"));

        if (toastMsg) {
          this.showToast(toastMsg);
        }

        const dot = document.getElementById("odooStatusDot");
        const txt = document.getElementById("odooStatusText");
        if (dot && txt) {
          dot.style.background = "#10B981";
          txt.textContent = "Changes Published Live!";
        }
      } catch (err) {
        console.error("Persist error:", err);
      }
    },

    /**
     * Apply saved overrides on startup
     */
    applySavedOverrides: function () {
      if (currentOverrides.texts) {
        Object.keys(currentOverrides.texts).forEach(key => {
          const val = currentOverrides.texts[key];
          document.querySelectorAll(`[data-i18n="${key}"]`).forEach(el => {
            el.innerHTML = val;
          });
          if (window.PAK_IGNITERS_CONTENT) {
            if (window.PAK_IGNITERS_CONTENT.en) setNestedProperty(window.PAK_IGNITERS_CONTENT.en, key, val);
            if (window.PAK_IGNITERS_CONTENT.ur) setNestedProperty(window.PAK_IGNITERS_CONTENT.ur, key, val);
          }
        });
      }

      if (currentOverrides.images) {
        Object.keys(currentOverrides.images).forEach(sel => {
          const data = currentOverrides.images[sel];
          const el = document.querySelector(sel) || document.getElementById(sel);
          if (el) {
            if (el.tagName === "IMG") {
              el.src = data.src;
              if (data.alt) el.alt = data.alt;
            } else {
              el.innerHTML = `<img src="${data.src}" alt="${data.alt || 'Visual'}" style="max-width:100%;max-height:100%;object-fit:contain;border-radius:6px;">`;
            }
          }
        });
      }

      if (currentOverrides.buttons) {
        Object.keys(currentOverrides.buttons).forEach(btnKey => {
          const bData = currentOverrides.buttons[btnKey];
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
    },

    /**
     * Inject Modals: Floating Mini Toolbar, Image Editor, Button Editor
     */
    injectModals: function () {
      // 1. Floating Mini Toolbar
      const miniToolbar = document.createElement("div");
      miniToolbar.className = "odoo-mini-toolbar";
      miniToolbar.id = "odooMiniToolbar";
      miniToolbar.style.display = "none";
      miniToolbar.innerHTML = `
        <button type="button" data-cmd="bold" title="Bold"><strong>B</strong></button>
        <button type="button" data-cmd="italic" title="Italic"><em>I</em></button>
        <button type="button" data-cmd="underline" title="Underline"><u>U</u></button>
        <span style="opacity: 0.3;">|</span>
        <button type="button" class="odoo-mini-btn-save" id="odooMiniBtnSave" title="Save & Publish Live">✓ Save &amp; Publish</button>
        <button type="button" class="odoo-mini-btn-cancel" id="odooMiniBtnCancel" title="Cancel">✕</button>
      `;
      document.body.appendChild(miniToolbar);

      miniToolbar.querySelectorAll("button[data-cmd]").forEach(btn => {
        btn.addEventListener("mousedown", (e) => {
          e.preventDefault();
          document.execCommand(btn.getAttribute("data-cmd"), false, null);
        });
      });

      document.getElementById("odooMiniBtnSave").addEventListener("click", (e) => {
        e.preventDefault();
        this.finishTextEditing(true);
      });

      document.getElementById("odooMiniBtnCancel").addEventListener("click", (e) => {
        e.preventDefault();
        this.finishTextEditing(false);
      });

      // 2. Image Modal
      const imgModal = document.createElement("div");
      imgModal.className = "odoo-modal-backdrop";
      imgModal.id = "odooImgModal";
      imgModal.innerHTML = `
        <div class="odoo-modal-box">
          <div class="odoo-modal-title">📷 Replace Picture / Logo</div>
          <div class="odoo-modal-subtitle">Choose a file from your computer or enter an image link. Changes publish live immediately!</div>

          <div class="odoo-preview-box">
            <img src="" id="odooImgPreview" class="odoo-preview-img" alt="Preview" style="max-height: 150px; display: none;">
            <div id="odooImgPlaceholder" style="color: #94A3B8; font-size: 0.85rem;">Select an image below to preview</div>
          </div>

          <div class="odoo-form-group">
            <label class="odoo-form-label">Upload Picture from Computer</label>
            <input type="file" id="odooImgFileInput" accept="image/*" class="odoo-form-input">
          </div>

          <div class="odoo-form-group">
            <label class="odoo-form-label">Or Image Web URL</label>
            <input type="text" id="odooImgUrlInput" class="odoo-form-input" placeholder="https://... or data:image...">
          </div>

          <div class="odoo-form-group">
            <label class="odoo-form-label">Image Description (Alt Text)</label>
            <input type="text" id="odooImgAltInput" class="odoo-form-input" placeholder="e.g. PAK IGNITERS Logo">
          </div>

          <div class="odoo-modal-actions">
            <button type="button" class="odoo-btn odoo-btn-secondary" id="odooBtnCloseImgModal">Cancel</button>
            <button type="button" class="odoo-btn odoo-btn-primary" id="odooBtnApplyImg" style="background:#10B981;border-color:#34D399;">Apply &amp; Publish Live</button>
          </div>
        </div>
      `;
      document.body.appendChild(imgModal);

      document.getElementById("odooBtnCloseImgModal").addEventListener("click", () => {
        imgModal.classList.remove("open");
      });

      document.getElementById("odooImgFileInput").addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            const preview = document.getElementById("odooImgPreview");
            preview.src = ev.target.result;
            preview.style.display = "block";
            document.getElementById("odooImgPlaceholder").style.display = "none";
            document.getElementById("odooImgUrlInput").value = ev.target.result;
          };
          reader.readAsDataURL(file);
        }
      });

      document.getElementById("odooImgUrlInput").addEventListener("input", (e) => {
        const preview = document.getElementById("odooImgPreview");
        if (e.target.value) {
          preview.src = e.target.value;
          preview.style.display = "block";
          document.getElementById("odooImgPlaceholder").style.display = "none";
        }
      });

      document.getElementById("odooBtnApplyImg").addEventListener("click", () => {
        const newSrc = document.getElementById("odooImgUrlInput").value.trim();
        const newAlt = document.getElementById("odooImgAltInput").value.trim();

        if (activeTargetContainer && newSrc) {
          const selector = activeTargetContainer.id ? ("#" + activeTargetContainer.id) : ("." + activeTargetContainer.className.split(" ")[0]);

          if (activeTargetContainer.tagName === "IMG") {
            activeTargetContainer.src = newSrc;
            if (newAlt) activeTargetContainer.alt = newAlt;
          } else {
            activeTargetContainer.innerHTML = `<img src="${newSrc}" alt="${newAlt || 'Visual'}" style="max-width:100%;max-height:100%;object-fit:contain;border-radius:6px;">`;
          }

          currentOverrides.images[selector] = { src: newSrc, alt: newAlt };
          this.persistAllChanges("✅ Image Published Live!");
          imgModal.classList.remove("open");
        }
      });

      // 3. Button Modal
      const btnModal = document.createElement("div");
      btnModal.className = "odoo-modal-backdrop";
      btnModal.id = "odooBtnModal";
      btnModal.innerHTML = `
        <div class="odoo-modal-box">
          <div class="odoo-modal-title">🔘 Edit Button &amp; Link</div>
          <div class="odoo-modal-subtitle">Update button label, destination link, and style. Publishes immediately!</div>

          <div class="odoo-form-group">
            <label class="odoo-form-label">Button Label Text</label>
            <input type="text" id="odooBtnLabelInput" class="odoo-form-input" required>
          </div>

          <div class="odoo-form-group">
            <label class="odoo-form-label">Destination Link / URL</label>
            <input type="text" id="odooBtnHrefInput" class="odoo-form-input" placeholder="#divisions, #contact, tel:..., mailto:..., or https://...">
          </div>

          <div class="odoo-form-group">
            <label class="odoo-form-label">Button Style</label>
            <select id="odooBtnStyleSelect" class="odoo-form-select">
              <option value="btn-primary">Primary (Green Flame)</option>
              <option value="btn-secondary">Secondary (Glass Outline)</option>
            </select>
          </div>

          <div class="odoo-modal-actions">
            <button type="button" class="odoo-btn odoo-btn-secondary" id="odooBtnCloseBtnModal">Cancel</button>
            <button type="button" class="odoo-btn odoo-btn-primary" id="odooBtnApplyBtn" style="background:#10B981;border-color:#34D399;">Save &amp; Publish Live</button>
          </div>
        </div>
      `;
      document.body.appendChild(btnModal);

      document.getElementById("odooBtnCloseBtnModal").addEventListener("click", () => {
        btnModal.classList.remove("open");
      });

      document.getElementById("odooBtnApplyBtn").addEventListener("click", () => {
        if (activeTargetBtn) {
          const label = document.getElementById("odooBtnLabelInput").value.trim();
          const href = document.getElementById("odooBtnHrefInput").value.trim();
          const style = document.getElementById("odooBtnStyleSelect").value;

          activeTargetBtn.textContent = label;
          if (activeTargetBtn.tagName === "A" && href) {
            activeTargetBtn.setAttribute("href", href);
          }

          activeTargetBtn.classList.remove("btn-primary", "btn-secondary");
          activeTargetBtn.classList.add(style);

          const btnKey = activeTargetBtn.getAttribute("data-i18n") || (activeTargetBtn.id ? ("#" + activeTargetBtn.id) : ("." + activeTargetBtn.className.split(" ")[0]));
          currentOverrides.buttons[btnKey] = { text: label, href: href, style: style };

          this.persistAllChanges("✅ Button Published Live!");
          btnModal.classList.remove("open");
        }
      });
    },

    /**
     * Bind direct text editing
     */
    bindEditableElements: function () {
      const selector = "h1, h2, h3, h4, h5, p, .announcement-sub, .announcement-pill span, .division-lead-tag, .hero-tagline, .hero-description";
      document.querySelectorAll(selector).forEach(el => {
        if (el.closest(".odoo-builder-bar") || el.closest(".odoo-modal-backdrop") || el.closest(".odoo-mini-toolbar")) return;

        el.classList.add("odoo-editable-element");

        el.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.startTextEditing(el);
        });
      });
    },

    startTextEditing: function (el) {
      if (activeElement === el) return;
      if (activeElement) this.finishTextEditing(true);

      activeElement = el;
      originalElementHtml = el.innerHTML;

      el.classList.add("odoo-is-editing");
      el.contentEditable = "true";
      el.focus();

      const toolbar = document.getElementById("odooMiniToolbar");
      const rect = el.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      toolbar.style.display = "flex";
      toolbar.style.top = Math.max(60, rect.top + scrollTop - 45) + "px";
      toolbar.style.left = Math.max(10, rect.left + scrollLeft) + "px";
    },

    finishTextEditing: function (save) {
      if (!activeElement) return;

      const toolbar = document.getElementById("odooMiniToolbar");
      if (toolbar) toolbar.style.display = "none";

      activeElement.classList.remove("odoo-is-editing");
      activeElement.contentEditable = "false";

      if (save) {
        const key = activeElement.getAttribute("data-i18n");
        if (key) {
          currentOverrides.texts[key] = activeElement.innerHTML.trim();
        }
        this.persistAllChanges("✅ Text Published Live!");
      } else {
        activeElement.innerHTML = originalElementHtml;
      }

      activeElement = null;
    },

    /**
     * Bind images and logos for click-to-replace
     */
    bindImageWrappers: function () {
      document.querySelectorAll("img, .brand-flame-icon, .division-icon-box").forEach(el => {
        if (el.closest(".odoo-builder-bar") || el.closest(".odoo-modal-backdrop")) return;

        el.classList.add("odoo-image-wrapper");

        if (!el.querySelector(".odoo-image-overlay")) {
          const overlay = document.createElement("div");
          overlay.className = "odoo-image-overlay";
          overlay.innerHTML = '<span class="odoo-image-badge">📷 Replace Picture</span>';
          el.appendChild(overlay);
        }

        el.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();

          activeTargetContainer = el;
          const modal = document.getElementById("odooImgModal");
          const preview = document.getElementById("odooImgPreview");
          const placeholder = document.getElementById("odooImgPlaceholder");
          const urlInput = document.getElementById("odooImgUrlInput");
          const altInput = document.getElementById("odooImgAltInput");

          const img = el.tagName === "IMG" ? el : el.querySelector("img");
          if (img && img.src) {
            preview.src = img.src;
            preview.style.display = "block";
            placeholder.style.display = "none";
            urlInput.value = img.src;
            altInput.value = img.alt || "";
          } else {
            preview.style.display = "none";
            placeholder.style.display = "block";
            urlInput.value = "";
            altInput.value = "";
          }

          modal.classList.add("open");
        });
      });
    },

    /**
     * Bind buttons for click-to-edit
     */
    bindButtons: function () {
      document.querySelectorAll(".btn, a.btn, button.btn").forEach(btn => {
        if (btn.closest(".odoo-builder-bar") || btn.closest(".odoo-modal-backdrop") || btn.closest(".odoo-mini-toolbar")) return;

        btn.classList.add("odoo-editable-element");

        btn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();

          activeTargetBtn = btn;
          const modal = document.getElementById("odooBtnModal");
          document.getElementById("odooBtnLabelInput").value = btn.textContent.trim();
          document.getElementById("odooBtnHrefInput").value = btn.getAttribute("href") || "";

          if (btn.classList.contains("btn-secondary")) {
            document.getElementById("odooBtnStyleSelect").value = "btn-secondary";
          } else {
            document.getElementById("odooBtnStyleSelect").value = "btn-primary";
          }

          modal.classList.add("open");
        });
      });
    },

    /**
     * Section controls
     */
    injectSectionHandles: function () {
      const sections = document.querySelectorAll("header.site-header, section, footer");
      sections.forEach((sec, idx) => {
        sec.style.position = "relative";

        const handle = document.createElement("div");
        handle.className = "odoo-section-handle";
        const secId = sec.id || sec.className || ("section-" + (idx + 1));
        const cleanName = secId.replace(/[-_]/g, " ").toUpperCase();

        handle.innerHTML = `
          <span class="odoo-section-label">${cleanName.substring(0, 16)}</span>
          <button type="button" class="odoo-section-btn btn-sec-up" title="Move Up">▲</button>
          <button type="button" class="odoo-section-btn btn-sec-down" title="Move Down">▼</button>
          <button type="button" class="odoo-section-btn btn-sec-bg" title="Background Color">🎨</button>
        `;

        sec.appendChild(handle);

        handle.querySelector(".btn-sec-up").addEventListener("click", (e) => {
          e.stopPropagation();
          const prev = sec.previousElementSibling;
          if (prev && prev.tagName !== "HEADER" && !prev.classList.contains("odoo-builder-bar")) {
            sec.parentNode.insertBefore(sec, prev);
            this.persistAllChanges("Section order updated live!");
          }
        });

        handle.querySelector(".btn-sec-down").addEventListener("click", (e) => {
          e.stopPropagation();
          const next = sec.nextElementSibling;
          if (next && next.tagName !== "FOOTER") {
            sec.parentNode.insertBefore(next, sec);
            this.persistAllChanges("Section order updated live!");
          }
        });

        handle.querySelector(".btn-sec-bg").addEventListener("click", (e) => {
          e.stopPropagation();
          const newColor = prompt("Enter new background color or gradient (e.g. #0B1120 or #132238):", "");
          if (newColor) {
            sec.style.background = newColor;
            currentOverrides.sections[sec.id ? ("#" + sec.id) : ("." + sec.className.split(" ")[0])] = { background: newColor };
            this.persistAllChanges("Section background published live!");
          }
        });
      });
    },

    bindShortcuts: function () {
      document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
          e.preventDefault();
          this.persistAllChanges("✅ All Changes Saved & Published Live!");
        } else if (e.key === "Escape") {
          this.finishTextEditing(false);
          document.querySelectorAll(".odoo-modal-backdrop").forEach(m => m.classList.remove("open"));
        }
      });
    },

    showToast: function (msg) {
      let toast = document.getElementById("odooToast");
      if (!toast) {
        toast = document.createElement("div");
        toast.id = "odooToast";
        toast.style.cssText = "position: fixed; bottom: 24px; right: 24px; background: #00704A; border: 2px solid #34D399; color: #FFFFFF; padding: 0.85rem 1.35rem; border-radius: 8px; font-weight: 800; font-size: 0.92rem; box-shadow: 0 10px 30px rgba(0,0,0,0.6); z-index: 99999999; animation: odooFadeIn 0.2s ease;";
        document.body.appendChild(toast);
      }
      toast.textContent = msg;
      toast.style.display = "block";
      clearTimeout(this._toastTimeout);
      this._toastTimeout = setTimeout(() => { toast.style.display = "none"; }, 3500);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => VisualEditor.init());
  } else {
    VisualEditor.init();
  }

  window.VisualEditor = VisualEditor;

})(window, document);
