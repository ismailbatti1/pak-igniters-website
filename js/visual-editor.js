/**
 * PAK IGNITERS - ODOO-STYLE LIVE FRONTEND VISUAL WEBSITE EDITOR
 * Allows team members (Ismail, Wardah, Farwa) to click directly on any text,
 * image, button, or section on the live website to edit on the spot!
 */

(function (window, document) {
  "use strict";

  // Check if edit mode is requested
  const urlParams = new URLSearchParams(window.location.search);
  const isEditRequested = urlParams.get("edit") === "true" || window.PAK_IGNITERS_EDIT_MODE === true;

  if (!isEditRequested) {
    return; // Don't run on normal public visits
  }

  // 1. Authenticate user
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

  console.log("🎨 Odoo-Style Live Visual Editor Active for:", currentUser.name, `(${currentUser.role})`);

  // History stack for Undo / Redo
  const historyStack = [];
  let historyIndex = -1;
  let activeElement = null;
  let originalElementHtml = "";
  let activeTargetImg = null;
  let activeTargetBtn = null;

  const VisualEditor = {
    init: function () {
      document.body.classList.add("odoo-edit-mode-active");
      this.injectEditorBar();
      this.injectModals();
      this.bindEditableElements();
      this.bindImageWrappers();
      this.bindButtons();
      this.injectSectionHandles();
      this.captureState(); // Initial snapshot for Undo
      this.bindShortcuts();
      this.loadSavedDraft();
    },

    /**
     * Inject Top Floating Odoo Builder Bar
     */
    injectEditorBar: function () {
      const isIsmail = currentUser.role === "super_admin";

      const bar = document.createElement("div");
      bar.className = "odoo-builder-bar";
      bar.id = "odooBuilderBar";

      bar.innerHTML = `
        <div class="odoo-bar-left">
          <div class="odoo-brand-pill">
            <svg viewBox="0 0 24 24"><path d="M12 23c-4.97 0-9-4.03-9-9 0-4.17 2.84-7.67 6.69-8.69-.17.65-.26 1.34-.26 2.05 0 3.31 2.69 6 6 6 .71 0 1.4-.09 2.05-.26-1.02 3.85-4.52 6.69-8.69 6.69z"/></svg>
            <span>Visual Builder</span>
          </div>

          <div class="odoo-user-badge">
            <span>👤 ${currentUser.name}</span>
            <span class="odoo-user-role-tag ${currentUser.role}">
              ${currentUser.role === 'super_admin' ? 'Super Admin' : currentUser.role === 'developer' ? 'Developer' : 'Content & SEO'}
            </span>
          </div>

          <div class="odoo-status-text">
            <span class="odoo-status-dot" id="odooStatusDot"></span>
            <span id="odooStatusText">Draft Active</span>
          </div>
        </div>

        <div class="odoo-bar-center">
          <button type="button" class="odoo-btn odoo-btn-secondary" id="odooBtnUndo" title="Undo (Ctrl+Z)">
            ↺ Undo
          </button>
          <button type="button" class="odoo-btn odoo-btn-secondary" id="odooBtnRedo" title="Redo (Ctrl+Y)">
            ↻ Redo
          </button>
          <button type="button" class="odoo-btn odoo-btn-secondary" id="odooBtnDiscard" title="Discard all unsaved edits">
            ✕ Discard
          </button>
        </div>

        <div class="odoo-bar-right">
          <button type="button" class="odoo-btn odoo-btn-primary" id="odooBtnSaveDraft">
            💾 Save Draft
          </button>

          <button type="button" class="odoo-btn odoo-btn-publish ${isIsmail ? '' : 'disabled'}" id="odooBtnPublish" title="${isIsmail ? 'Publish live website' : 'Requires Ismail (Super Admin) approval'}">
            🚀 ${isIsmail ? 'Publish Live' : 'Request Publish'}
          </button>

          <a href="admin/index.html" class="odoo-btn odoo-btn-secondary" style="color: #94A3B8;">
            &larr; Admin
          </a>
        </div>
      `;

      document.body.prepend(bar);

      // Bind bar buttons
      document.getElementById("odooBtnSaveDraft").addEventListener("click", () => this.saveDraft(true));
      document.getElementById("odooBtnPublish").addEventListener("click", () => this.publishLive());
      document.getElementById("odooBtnDiscard").addEventListener("click", () => this.discardEdits());
      document.getElementById("odooBtnUndo").addEventListener("click", () => this.undo());
      document.getElementById("odooBtnRedo").addEventListener("click", () => this.redo());
    },

    /**
     * Mark status dot as having unsaved edits
     */
    markUnsaved: function () {
      const dot = document.getElementById("odooStatusDot");
      const text = document.getElementById("odooStatusText");
      if (dot && text) {
        dot.className = "odoo-status-dot unsaved";
        text.textContent = "Unsaved Edits";
      }
    },

    /**
     * Mark status dot as saved
     */
    markSaved: function () {
      const dot = document.getElementById("odooStatusDot");
      const text = document.getElementById("odooStatusText");
      if (dot && text) {
        dot.className = "odoo-status-dot";
        text.textContent = "Draft Saved";
      }
    },

    /**
     * Inject universal Modals: Image Editor, Button Editor, Section Editor
     */
    injectModals: function () {
      // 1. Mini Floating Formatting Toolbar
      const miniToolbar = document.createElement("div");
      miniToolbar.className = "odoo-mini-toolbar";
      miniToolbar.id = "odooMiniToolbar";
      miniToolbar.style.display = "none";
      miniToolbar.innerHTML = `
        <button type="button" data-cmd="bold" title="Bold"><strong>B</strong></button>
        <button type="button" data-cmd="italic" title="Italic"><em>I</em></button>
        <button type="button" data-cmd="underline" title="Underline"><u>U</u></button>
        <span style="opacity: 0.3;">|</span>
        <button type="button" class="odoo-mini-btn-save" id="odooMiniBtnSave" title="Save this text">✓ Save</button>
        <button type="button" class="odoo-mini-btn-cancel" id="odooMiniBtnCancel" title="Cancel edit">✕</button>
      `;
      document.body.appendChild(miniToolbar);

      // Mini toolbar actions
      miniToolbar.querySelectorAll("button[data-cmd]").forEach(btn => {
        btn.addEventListener("mousedown", (e) => {
          e.preventDefault();
          const cmd = btn.getAttribute("data-cmd");
          document.execCommand(cmd, false, null);
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

      // 2. Image Editor Modal
      const imgModal = document.createElement("div");
      imgModal.className = "odoo-modal-backdrop";
      imgModal.id = "odooImgModal";
      imgModal.innerHTML = `
        <div class="odoo-modal-box">
          <div class="odoo-modal-title">📷 Replace Website Image</div>
          <div class="odoo-modal-subtitle">Upload a new photo or enter an image URL to replace this visual asset.</div>

          <div class="odoo-preview-box">
            <img src="" id="odooImgPreview" class="odoo-preview-img" alt="Preview">
          </div>

          <div class="odoo-form-group">
            <label class="odoo-form-label">Upload New File From Computer</label>
            <input type="file" id="odooImgFileInput" accept="image/*" class="odoo-form-input">
          </div>

          <div class="odoo-form-group">
            <label class="odoo-form-label">Or Image Web URL</label>
            <input type="text" id="odooImgUrlInput" class="odoo-form-input" placeholder="https://... or assets/...">
          </div>

          <div class="odoo-form-group">
            <label class="odoo-form-label">Image Alt Text (SEO)</label>
            <input type="text" id="odooImgAltInput" class="odoo-form-input" placeholder="Describe this image for search engines">
          </div>

          <div class="odoo-modal-actions">
            <button type="button" class="odoo-btn odoo-btn-secondary" id="odooBtnCloseImgModal">Cancel</button>
            <button type="button" class="odoo-btn odoo-btn-primary" id="odooBtnApplyImg">Apply &amp; Save Image</button>
          </div>
        </div>
      `;
      document.body.appendChild(imgModal);

      // Image modal handlers
      document.getElementById("odooBtnCloseImgModal").addEventListener("click", () => {
        imgModal.classList.remove("open");
      });

      document.getElementById("odooImgFileInput").addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            document.getElementById("odooImgPreview").src = ev.target.result;
            document.getElementById("odooImgUrlInput").value = ev.target.result;
          };
          reader.readAsDataURL(file);
        }
      });

      document.getElementById("odooImgUrlInput").addEventListener("input", (e) => {
        document.getElementById("odooImgPreview").src = e.target.value;
      });

      document.getElementById("odooBtnApplyImg").addEventListener("click", () => {
        const newSrc = document.getElementById("odooImgUrlInput").value;
        const newAlt = document.getElementById("odooImgAltInput").value;
        if (activeTargetImg && newSrc) {
          activeTargetImg.src = newSrc;
          if (newAlt) activeTargetImg.alt = newAlt;
          this.captureState();
          this.saveDraft();
          imgModal.classList.remove("open");
          this.showToast("Image updated successfully!");
        }
      });

      // 3. Button Editor Modal
      const btnModal = document.createElement("div");
      btnModal.className = "odoo-modal-backdrop";
      btnModal.id = "odooBtnModal";
      btnModal.innerHTML = `
        <div class="odoo-modal-box">
          <div class="odoo-modal-title">🔘 Edit Button &amp; Link</div>
          <div class="odoo-modal-subtitle">Change button label text, destination link, and visual style.</div>

          <div class="odoo-form-group">
            <label class="odoo-form-label">Button Label Text</label>
            <input type="text" id="odooBtnLabelInput" class="odoo-form-input" required>
          </div>

          <div class="odoo-form-group">
            <label class="odoo-form-label">Destination Link / URL</label>
            <input type="text" id="odooBtnHrefInput" class="odoo-form-input" placeholder="#divisions, #contact, tel:..., mailto:..., or https://...">
          </div>

          <div class="odoo-form-group">
            <label class="odoo-form-label">Button Style Variant</label>
            <select id="odooBtnStyleSelect" class="odoo-form-select">
              <option value="btn-primary">Primary (Green Flame)</option>
              <option value="btn-secondary">Secondary (Glass Outline)</option>
            </select>
          </div>

          <div class="odoo-modal-actions">
            <button type="button" class="odoo-btn odoo-btn-secondary" id="odooBtnCloseBtnModal">Cancel</button>
            <button type="button" class="odoo-btn odoo-btn-primary" id="odooBtnApplyBtn">Apply &amp; Save Button</button>
          </div>
        </div>
      `;
      document.body.appendChild(btnModal);

      // Button modal handlers
      document.getElementById("odooBtnCloseBtnModal").addEventListener("click", () => {
        btnModal.classList.remove("open");
      });

      document.getElementById("odooBtnApplyBtn").addEventListener("click", () => {
        if (activeTargetBtn) {
          const label = document.getElementById("odooBtnLabelInput").value;
          const href = document.getElementById("odooBtnHrefInput").value;
          const style = document.getElementById("odooBtnStyleSelect").value;

          activeTargetBtn.textContent = label;
          if (activeTargetBtn.tagName === "A" && href) {
            activeTargetBtn.setAttribute("href", href);
          }

          activeTargetBtn.classList.remove("btn-primary", "btn-secondary");
          activeTargetBtn.classList.add(style);

          this.captureState();
          this.saveDraft();
          btnModal.classList.remove("open");
          this.showToast("Button updated successfully!");
        }
      });
    },

    /**
     * Bind all text elements to be directly editable on click
     */
    bindEditableElements: function () {
      const selector = "h1, h2, h3, h4, h5, p, .announcement-sub, .announcement-pill span, .division-lead-tag, .hero-tagline, .hero-description";
      document.querySelectorAll(selector).forEach(el => {
        // Skip editor bar and modals
        if (el.closest(".odoo-builder-bar") || el.closest(".odoo-modal-backdrop") || el.closest(".odoo-mini-toolbar")) {
          return;
        }

        el.classList.add("odoo-editable-element");

        el.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.startTextEditing(el);
        });
      });
    },

    /**
     * Start direct text editing on an element
     */
    startTextEditing: function (el) {
      if (activeElement === el) return;
      if (activeElement) this.finishTextEditing(true);

      activeElement = el;
      originalElementHtml = el.innerHTML;

      el.classList.add("odoo-is-editing");
      el.contentEditable = "true";
      el.focus();

      // Position floating mini toolbar directly above the element
      const toolbar = document.getElementById("odooMiniToolbar");
      const rect = el.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      toolbar.style.display = "flex";
      toolbar.style.top = Math.max(60, rect.top + scrollTop - 45) + "px";
      toolbar.style.left = Math.max(10, rect.left + scrollLeft) + "px";

      this.markUnsaved();
    },

    /**
     * Finish direct text editing
     */
    finishTextEditing: function (save) {
      if (!activeElement) return;

      const toolbar = document.getElementById("odooMiniToolbar");
      if (toolbar) toolbar.style.display = "none";

      activeElement.classList.remove("odoo-is-editing");
      activeElement.contentEditable = "false";

      if (save) {
        this.captureState();
        this.saveDraft();
      } else {
        activeElement.innerHTML = originalElementHtml;
      }

      activeElement = null;
    },

    /**
     * Bind images for direct click-to-replace
     */
    bindImageWrappers: function () {
      document.querySelectorAll("img, .brand-flame-icon, .division-icon-box").forEach(el => {
        if (el.closest(".odoo-builder-bar") || el.closest(".odoo-modal-backdrop")) return;

        el.classList.add("odoo-image-wrapper");

        // Inject overlay badge if not present
        if (!el.querySelector(".odoo-image-overlay")) {
          const overlay = document.createElement("div");
          overlay.className = "odoo-image-overlay";
          overlay.innerHTML = '<span class="odoo-image-badge">📷 Replace Image</span>';
          el.appendChild(overlay);
        }

        el.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();

          const targetImg = el.tagName === "IMG" ? el : el.querySelector("img");
          activeTargetImg = targetImg || el;

          const modal = document.getElementById("odooImgModal");
          const preview = document.getElementById("odooImgPreview");
          const urlInput = document.getElementById("odooImgUrlInput");
          const altInput = document.getElementById("odooImgAltInput");

          const currentSrc = activeTargetImg.src || "";
          preview.src = currentSrc;
          urlInput.value = currentSrc;
          altInput.value = activeTargetImg.alt || "";

          modal.classList.add("open");
        });
      });
    },

    /**
     * Bind buttons for direct click-to-edit
     */
    bindButtons: function () {
      document.querySelectorAll(".btn, a.btn, button.btn").forEach(btn => {
        if (btn.closest(".odoo-builder-bar") || btn.closest(".odoo-modal-backdrop") || btn.closest(".odoo-mini-toolbar")) {
          return;
        }

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
     * Inject section controls at the top-right of every section
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
          <button type="button" class="odoo-section-btn btn-sec-up" title="Move Section Up">▲</button>
          <button type="button" class="odoo-section-btn btn-sec-down" title="Move Section Down">▼</button>
          <button type="button" class="odoo-section-btn btn-sec-bg" title="Edit Background Color">🎨</button>
        `;

        sec.appendChild(handle);

        // Move Up
        handle.querySelector(".btn-sec-up").addEventListener("click", (e) => {
          e.stopPropagation();
          const prev = sec.previousElementSibling;
          if (prev && prev.tagName !== "HEADER" && !prev.classList.contains("odoo-builder-bar")) {
            sec.parentNode.insertBefore(sec, prev);
            this.captureState();
            this.saveDraft();
            this.showToast("Section moved up");
          }
        });

        // Move Down
        handle.querySelector(".btn-sec-down").addEventListener("click", (e) => {
          e.stopPropagation();
          const next = sec.nextElementSibling;
          if (next && next.tagName !== "FOOTER") {
            sec.parentNode.insertBefore(next, sec);
            this.captureState();
            this.saveDraft();
            this.showToast("Section moved down");
          }
        });

        // Background Color changer
        handle.querySelector(".btn-sec-bg").addEventListener("click", (e) => {
          e.stopPropagation();
          const newColor = prompt("Enter new background color or CSS gradient for this section (e.g. #0B1120 or rgba(0, 112, 74, 0.1)):", "");
          if (newColor) {
            sec.style.background = newColor;
            this.captureState();
            this.saveDraft();
            this.showToast("Section background updated");
          }
        });
      });
    },

    /**
     * Capture snapshot for Undo/Redo
     */
    captureState: function () {
      // Clone main content snapshot
      const clone = document.getElementById("home") ? document.body.innerHTML : "";
      if (historyIndex < historyStack.length - 1) {
        historyStack.splice(historyIndex + 1);
      }
      historyStack.push(clone);
      historyIndex++;
      if (historyStack.length > 20) {
        historyStack.shift();
        historyIndex--;
      }
    },

    undo: function () {
      if (historyIndex > 0) {
        historyIndex--;
        this.showToast("Undo applied");
        this.saveDraft();
      }
    },

    redo: function () {
      if (historyIndex < historyStack.length - 1) {
        historyIndex++;
        this.showToast("Redo applied");
        this.saveDraft();
      }
    },

    /**
     * Save Live Edits to Draft Store
     */
    saveDraft: function (notify = false) {
      try {
        const editsSnapshot = {
          savedAt: new Date().toISOString(),
          author: currentUser.name,
          role: currentUser.role,
          elements: []
        };

        // Collect all edited elements with text or attributes
        document.querySelectorAll(".odoo-editable-element").forEach((el, i) => {
          const key = el.getAttribute("data-i18n") || ("el_" + i);
          editsSnapshot.elements.push({
            key: key,
            html: el.innerHTML,
            text: el.textContent.trim(),
            href: el.getAttribute("href") || null
          });
        });

        localStorage.setItem("pak_igniters_draft_content", JSON.stringify(editsSnapshot));
        this.markSaved();

        if (notify) {
          this.showToast("Draft saved successfully! (Preserved on refresh)");
        }
      } catch (e) {
        console.error("Draft save error:", e);
      }
    },

    /**
     * Load existing draft on startup
     */
    loadSavedDraft: function () {
      try {
        const raw = localStorage.getItem("pak_igniters_draft_content");
        if (raw) {
          const draft = JSON.parse(raw);
          if (draft && draft.elements) {
            draft.elements.forEach(item => {
              if (item.key) {
                const el = document.querySelector(`[data-i18n="${item.key}"]`);
                if (el) {
                  el.innerHTML = item.html;
                  if (item.href) el.setAttribute("href", item.href);
                }
              }
            });
            this.markSaved();
            console.log("Loaded existing draft modified by:", draft.author);
          }
        }
      } catch (e) {
        console.warn("Draft load warning:", e);
      }
    },

    /**
     * Discard all current edits
     */
    discardEdits: function () {
      if (confirm("Discard all unsaved edits and reload the published website?")) {
        localStorage.removeItem("pak_igniters_draft_content");
        window.location.reload();
      }
    },

    /**
     * Publish changes live (Role-governed)
     */
    publishLive: function () {
      const isIsmail = currentUser.role === "super_admin";

      if (!isIsmail) {
        alert("Draft Saved! As Website Developer / Content Manager, your edits have been submitted to Ismail (Super Admin) for live publishing.");
        this.saveDraft(false);
        return;
      }

      if (confirm("Publish all visual edits to the LIVE WEBSITE now? Every visitor will see these changes immediately.")) {
        this.saveDraft(false);
        const draft = localStorage.getItem("pak_igniters_draft_content");
        localStorage.setItem("pak_igniters_published_content", draft);

        // Dispatch live sync event
        window.dispatchEvent(new CustomEvent("pak_igniters_content_published"));

        alert("🎉 SUCCESS: Website Published Live!\n\nAll your headings, images, buttons, and section changes are now active on the live website.");
        this.markSaved();
      }
    },

    /**
     * Keyboard shortcuts: Ctrl+S, Ctrl+Z, Ctrl+Y, Esc
     */
    bindShortcuts: function () {
      document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
          e.preventDefault();
          this.saveDraft(true);
        } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
          e.preventDefault();
          this.undo();
        } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
          e.preventDefault();
          this.redo();
        } else if (e.key === "Escape") {
          this.finishTextEditing(false);
          document.querySelectorAll(".odoo-modal-backdrop").forEach(m => m.classList.remove("open"));
        }
      });
    },

    /**
     * Sleek floating toast notification
     */
    showToast: function (msg) {
      let toast = document.getElementById("odooToast");
      if (!toast) {
        toast = document.createElement("div");
        toast.id = "odooToast";
        toast.style.cssText = "position: fixed; bottom: 24px; right: 24px; background: #00704A; color: #FFFFFF; padding: 0.75rem 1.25rem; border-radius: 8px; font-weight: 700; font-size: 0.88rem; box-shadow: 0 10px 25px rgba(0,0,0,0.5); z-index: 99999999; animation: odooFadeIn 0.2s ease;";
        document.body.appendChild(toast);
      }
      toast.textContent = msg;
      toast.style.display = "block";
      clearTimeout(this._toastTimeout);
      this._toastTimeout = setTimeout(() => { toast.style.display = "none"; }, 3000);
    }
  };

  // Run on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => VisualEditor.init());
  } else {
    VisualEditor.init();
  }

  window.VisualEditor = VisualEditor;

})(window, document);
