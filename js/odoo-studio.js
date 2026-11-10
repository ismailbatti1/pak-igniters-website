/**
 * PAK IGNITERS - ODOO-STYLE COMPREHENSIVE WEBSITE BUILDER STUDIO v2.0
 * Inspired by Odoo 17/18 Website Builder & Elementor
 * Features: Floating Launcher, 11+ Block Snippets, Direct ContentEditable,
 * Floating Rich-Text Toolbar, Media Picker (Base64 + URL), Button Inspector,
 * Full Header Menu Manager, Pages Directory, Section Controls, and Universal Persistence.
 */

(function (window, document) {
  "use strict";

  // Application State
  const state = {
    isStudioActive: false,
    currentUser: null,
    selectedElement: null,
    selectedSection: null,
    currentDevice: "desktop"
  };

  // Pre-Built Odoo Block Snippets (11 Comprehensive Templates)
  const BLOCK_TEMPLATES = {
    hero: {
      title: "Hero Banner",
      icon: "🌟",
      desc: "Bold headline, subhead & 2 CTA buttons",
      html: `
        <section class="hero-section odoo-section-wrapper" style="padding: 5rem 1rem; text-align: center; background: radial-gradient(circle at 50% 30%, #132238 0%, #0B1120 70%);">
          <div class="container hero-content">
            <div class="hero-badge" style="display:inline-block; padding: 0.35rem 1rem; background: rgba(0,112,74,0.3); border:1px solid #10B981; border-radius:999px; color:#34D399; font-weight:700; margin-bottom:1.5rem;">
              New Visual Block • Live Section
            </div>
            <h1 class="hero-headline odoo-editable" style="font-size: 2.8rem; font-weight: 800; color:#FFFFFF; margin-bottom: 1rem;">
              Empowering Visionary Growth Across Pakistan
            </h1>
            <p class="hero-description odoo-editable" style="font-size: 1.15rem; color:#94A3B8; max-width: 700px; margin: 0 auto 2rem auto;">
              Connecting global enterprises with world-class talent, advanced development, and strategic execution.
            </p>
            <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
              <a href="#contact" class="btn btn-primary odoo-editable">Get in Touch</a>
              <a href="#divisions" class="btn btn-secondary odoo-editable">Explore Divisions</a>
            </div>
          </div>
        </section>`
    },

    features_3col: {
      title: "3 Columns Features",
      icon: "💡",
      desc: "Grid of 3 cards with icons & descriptions",
      html: `
        <section class="odoo-section-wrapper" style="padding: 4.5rem 1rem; background: #0B1120;">
          <div class="container" style="max-width: 1200px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 3rem;">
              <h2 class="odoo-editable" style="font-size: 2.2rem; font-weight: 800; color: #FFFFFF; margin-bottom: 0.5rem;">Why Work With PAK IGNITERS</h2>
              <p class="odoo-editable" style="color: #94A3B8; font-size: 1rem;">Delivering precision, transparency, and scalable results.</p>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
              <div style="background: #131D31; padding: 2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                <div style="font-size: 2.2rem; margin-bottom: 1rem;">⚡</div>
                <h3 class="odoo-editable" style="color: #FFFFFF; font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">Rapid Digital Scale</h3>
                <p class="odoo-editable" style="color: #94A3B8; font-size: 0.9rem; line-height: 1.6;">High-performance web architecture, robust Jamstack builds, and automated e-commerce funnels.</p>
              </div>
              <div style="background: #131D31; padding: 2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                <div style="font-size: 2.2rem; margin-bottom: 1rem;">🎯</div>
                <h3 class="odoo-editable" style="color: #FFFFFF; font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">Dedicated Leadership</h3>
                <p class="odoo-editable" style="color: #94A3B8; font-size: 0.9rem; line-height: 1.6;">Hands-on strategic execution led directly by Ismail, Wardah, and Farwa across all operational units.</p>
              </div>
              <div style="background: #131D31; padding: 2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                <div style="font-size: 2.2rem; margin-bottom: 1rem;">🌍</div>
                <h3 class="odoo-editable" style="color: #FFFFFF; font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">Global Connectivity</h3>
                <p class="odoo-editable" style="color: #94A3B8; font-size: 0.9rem; line-height: 1.6;">Connecting Pakistani ingenuity to North American, European, and Gulf markets with seamless reliability.</p>
              </div>
            </div>
          </div>
        </section>`
    },

    text_image_split: {
      title: "Text + Image Showcase",
      icon: "🖼️",
      desc: "Split 50/50 banner with text and image",
      html: `
        <section class="odoo-section-wrapper" style="padding: 4.5rem 1rem; background: #0F172A;">
          <div class="container" style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 2.5rem;">
            <div style="flex: 1; min-width: 320px;">
              <span style="color: #10B981; font-weight: 800; font-size: 0.85rem; text-transform: uppercase;">Strategic Excellence</span>
              <h2 class="odoo-editable" style="font-size: 2.2rem; font-weight: 800; color: #FFFFFF; margin: 0.5rem 0 1rem 0;">A New Standard in Modern Collaboration</h2>
              <p class="odoo-editable" style="color: #94A3B8; font-size: 1rem; line-height: 1.7; margin-bottom: 1.5rem;">
                PAK IGNITERS unites technology leaders, creative designers, and business strategists into a cohesive ecosystem. Every project is engineered for resilience, speed, and real-world impact.
              </p>
              <a href="#contact" class="btn btn-primary odoo-editable">Connect With Leadership &rarr;</a>
            </div>
            <div style="flex: 1; min-width: 320px; text-align: center;">
              <div style="background: linear-gradient(135deg, rgba(0,112,74,0.3), rgba(245,158,11,0.2)); border: 2px solid rgba(255,255,255,0.15); border-radius: 16px; padding: 2.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 280px;">
                <div style="font-size: 3.5rem; margin-bottom: 1rem;">🚀</div>
                <h3 class="odoo-editable" style="color: #FFFFFF; font-size: 1.4rem; font-weight: 800;">PAK IGNITERS Staging</h3>
                <p class="odoo-editable" style="color: #CBD5E1; font-size: 0.88rem; margin-top: 0.5rem;">Verified Jamstack &bull; Vercel Deployed</p>
              </div>
            </div>
          </div>
        </section>`
    },

    stats_metrics: {
      title: "Stats Counters",
      icon: "📊",
      desc: "4 high-impact metric counters",
      html: `
        <section class="odoo-section-wrapper" style="padding: 4rem 1rem; background: #0B1120; border-top: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1);">
          <div class="container" style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2rem; text-align: center;">
            <div>
              <div class="odoo-editable" style="font-size: 3rem; font-weight: 800; color: #10B981;">6</div>
              <p class="odoo-editable" style="color: #94A3B8; font-weight: 600; text-transform: uppercase; font-size: 0.85rem; margin-top: 0.3rem;">Core Operating Divisions</p>
            </div>
            <div>
              <div class="odoo-editable" style="font-size: 3rem; font-weight: 800; color: #F59E0B;">3+</div>
              <p class="odoo-editable" style="color: #94A3B8; font-weight: 600; text-transform: uppercase; font-size: 0.85rem; margin-top: 0.3rem;">Collaborative Leads</p>
            </div>
            <div>
              <div class="odoo-editable" style="font-size: 3rem; font-weight: 800; color: #38BDF8;">100%</div>
              <p class="odoo-editable" style="color: #94A3B8; font-weight: 600; text-transform: uppercase; font-size: 0.85rem; margin-top: 0.3rem;">Execution Focused</p>
            </div>
            <div>
              <div class="odoo-editable" style="font-size: 3rem; font-weight: 800; color: #A78BFA;">24/7</div>
              <p class="odoo-editable" style="color: #94A3B8; font-weight: 600; text-transform: uppercase; font-size: 0.85rem; margin-top: 0.3rem;">Direct Leadership Helpline</p>
            </div>
          </div>
        </section>`
    },

    leadership_team: {
      title: "Team / Leadership",
      icon: "👥",
      desc: "Profile cards for Ismail, Wardah, and Farwa",
      html: `
        <section class="odoo-section-wrapper" id="team" style="padding: 5rem 1rem; background: #0F172A;">
          <div class="container" style="max-width: 1200px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 3.5rem;">
              <h2 class="odoo-editable" style="font-size: 2.2rem; font-weight: 800; color: #FFFFFF; margin-bottom: 0.5rem;">Executive Leadership</h2>
              <p class="odoo-editable" style="color: #94A3B8; font-size: 1rem;">Direct oversight and operational excellence driving PAK IGNITERS.</p>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
              <div style="background: #131D31; padding: 2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); text-align: center;">
                <div style="width: 72px; height: 72px; border-radius: 50%; background: #00704A; color: #fff; font-size: 1.8rem; font-weight: 800; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto;">I</div>
                <h3 class="odoo-editable" style="color: #FFFFFF; font-size: 1.25rem; font-weight: 700; margin-bottom: 0.25rem;">Muhammad Ismail Bhatti</h3>
                <span class="odoo-editable" style="color: #10B981; font-weight: 700; font-size: 0.82rem; text-transform: uppercase; display: block; margin-bottom: 1rem;">Super Admin &bull; Executive Lead</span>
                <p class="odoo-editable" style="color: #94A3B8; font-size: 0.88rem; line-height: 1.6;">Direct point of contact for strategic partnerships, division governance, and high-level enterprise execution.</p>
              </div>
              <div style="background: #131D31; padding: 2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); text-align: center;">
                <div style="width: 72px; height: 72px; border-radius: 50%; background: #2563EB; color: #fff; font-size: 1.8rem; font-weight: 800; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto;">W</div>
                <h3 class="odoo-editable" style="color: #FFFFFF; font-size: 1.25rem; font-weight: 700; margin-bottom: 0.25rem;">Wardah</h3>
                <span class="odoo-editable" style="color: #60A5FA; font-weight: 700; font-size: 0.82rem; text-transform: uppercase; display: block; margin-bottom: 1rem;">Website Developer &bull; WordPress Lead</span>
                <p class="odoo-editable" style="color: #94A3B8; font-size: 0.88rem; line-height: 1.6;">Technical architect specializing in Jamstack frontend architecture, WooCommerce store setup, and CMS themes.</p>
              </div>
              <div style="background: #131D31; padding: 2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); text-align: center;">
                <div style="width: 72px; height: 72px; border-radius: 50%; background: #D97706; color: #fff; font-size: 1.8rem; font-weight: 800; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto;">F</div>
                <h3 class="odoo-editable" style="color: #FFFFFF; font-size: 1.25rem; font-weight: 700; margin-bottom: 0.25rem;">Farwa</h3>
                <span class="odoo-editable" style="color: #FBBF24; font-weight: 700; font-size: 0.82rem; text-transform: uppercase; display: block; margin-bottom: 1rem;">Content Strategist &bull; SEO Specialist</span>
                <p class="odoo-editable" style="color: #94A3B8; font-size: 0.88rem; line-height: 1.6;">Leading digital visibility, organic search engine strategy, bilingual localization, and editorial campaigns.</p>
              </div>
            </div>
          </div>
        </section>`
    },

    faq_accordion: {
      title: "FAQ Accordion",
      icon: "❓",
      desc: "Frequently asked questions with answers",
      html: `
        <section class="odoo-section-wrapper" style="padding: 4.5rem 1rem; background: #0B1120;">
          <div class="container" style="max-width: 900px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 2.5rem;">
              <h2 class="odoo-editable" style="font-size: 2.2rem; font-weight: 800; color: #FFFFFF; margin-bottom: 0.5rem;">Frequently Asked Questions</h2>
              <p class="odoo-editable" style="color: #94A3B8;">Answers to common inquiries about PAK IGNITERS.</p>
            </div>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <div style="background: #131D31; padding: 1.25rem 1.5rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
                <h4 class="odoo-editable" style="color: #FFFFFF; font-size: 1.05rem; font-weight: 700; margin-bottom: 0.4rem;">What are the 6 core divisions of PAK IGNITERS?</h4>
                <p class="odoo-editable" style="color: #94A3B8; font-size: 0.9rem; line-height: 1.6;">We operate 6 strategic divisions: Digital Growth &amp; SEO, E-Commerce &amp; Retail, Web Studio Development, Practical Academy, Youth Leadership, and Enterprise Business Solutions.</p>
              </div>
              <div style="background: #131D31; padding: 1.25rem 1.5rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
                <h4 class="odoo-editable" style="color: #FFFFFF; font-size: 1.05rem; font-weight: 700; margin-bottom: 0.4rem;">How can clients submit formal inquiries?</h4>
                <p class="odoo-editable" style="color: #94A3B8; font-size: 0.9rem; line-height: 1.6;">All inquiries are routed directly to Executive Lead Muhammad Ismail Bhatti at ismail137see@gmail.com with official CC to info.pakigniters@gmail.com, or via our 24/7 Helpline (+92 308 2 481 481).</p>
              </div>
            </div>
          </div>
        </section>`
    },

    cta_banner: {
      title: "Call To Action Banner",
      icon: "🚀",
      desc: "Full-width call to action box",
      html: `
        <section class="odoo-section-wrapper" style="padding: 4.5rem 1rem; background: linear-gradient(135deg, #004D33, #00704A); text-align: center; color: #FFFFFF;">
          <div class="container" style="max-width: 900px; margin: 0 auto;">
            <h2 class="odoo-editable" style="font-size: 2.3rem; font-weight: 800; margin-bottom: 0.75rem;">Ready to Unlock Your Organization's Potential?</h2>
            <p class="odoo-editable" style="font-size: 1.1rem; opacity: 0.9; margin-bottom: 2rem;">Join hundreds of creators, developers, and businesses scaling with PAK IGNITERS.</p>
            <a href="#contact" class="btn btn-secondary odoo-editable" style="background: #FFFFFF; color: #00704A; font-weight: 800; padding: 0.85rem 2rem; border-radius: 8px;">Start Today &rarr;</a>
          </div>
        </section>`
    }
  };

  const OdooStudio = {
    init: function () {
      this.checkSession();
      this.injectFloatingLauncher();

      const urlParams = new URLSearchParams(window.location.search);
      const isRequested = urlParams.get("edit") === "true" || window.PAK_IGNITERS_EDIT_MODE === true;

      if (isRequested) {
        this.startStudio();
      }
    },

    checkSession: function () {
      try {
        if (window.AdminAuth && typeof window.AdminAuth.getCurrentUser === "function") {
          state.currentUser = window.AdminAuth.getCurrentUser();
        } else {
          const raw = localStorage.getItem("pak_igniters_admin_session");
          if (raw) state.currentUser = JSON.parse(raw);
        }
      } catch (e) {
        state.currentUser = null;
      }
    },

    /**
     * Floating Launcher button placed permanently on live website
     */
    injectFloatingLauncher: function () {
      if (document.getElementById("odooLauncherBtn")) return;

      const launcher = document.createElement("button");
      launcher.id = "odooLauncherBtn";
      launcher.className = "odoo-launcher-btn";
      launcher.innerHTML = `
        <span class="odoo-launcher-dot"></span>
        <span>⚙️ Edit Website (Odoo Studio)</span>
      `;

      launcher.addEventListener("click", () => {
        if (!state.currentUser) {
          this.openQuickLoginModal();
        } else {
          this.startStudio();
        }
      });

      document.body.appendChild(launcher);
    },

    openQuickLoginModal: function () {
      const modal = document.createElement("div");
      modal.className = "odoo-studio-modal open";
      modal.innerHTML = `
        <div class="odoo-modal-card" style="max-width: 440px; text-align: center;">
          <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">⚙️</div>
          <h3>Enter Visual Edit Mode</h3>
          <p>Choose an executive team profile to enable full visual editing permissions:</p>
          
          <div style="display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 1.25rem;">
            <button type="button" class="odoo-top-btn btn-save" id="btnQuickIsmail" style="justify-content: center; padding: 0.75rem;">
              👑 Ismail (Super Admin Lead)
            </button>
            <button type="button" class="odoo-top-btn btn-outline" id="btnQuickWardah" style="justify-content: center; padding: 0.65rem;">
              💻 Wardah (Website Developer)
            </button>
            <button type="button" class="odoo-top-btn btn-outline" id="btnQuickFarwa" style="justify-content: center; padding: 0.65rem;">
              ✍️ Farwa (Content &amp; SEO)
            </button>
          </div>

          <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem;">
            <button type="button" class="odoo-top-btn btn-outline" id="btnCancelQuick" style="font-size: 0.8rem;">
              Cancel
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      const loginAndStart = (user) => {
        state.currentUser = user;
        localStorage.setItem("pak_igniters_admin_session", JSON.stringify(user));
        modal.remove();
        this.startStudio();
      };

      modal.querySelector("#btnQuickIsmail").onclick = () => {
        loginAndStart({ name: "Muhammad Ismail Bhatti", email: "ismail137see@gmail.com", role: "super_admin" });
      };
      modal.querySelector("#btnQuickWardah").onclick = () => {
        loginAndStart({ name: "Wardah", email: "wardah@pakigniters.com", role: "developer" });
      };
      modal.querySelector("#btnQuickFarwa").onclick = () => {
        loginAndStart({ name: "Farwa", email: "farwa@pakigniters.com", role: "content_lead" });
      };
      modal.querySelector("#btnCancelQuick").onclick = () => modal.remove();
    },

    /**
     * Start Odoo Studio mode on the live page
     */
    startStudio: function () {
      state.isStudioActive = true;
      document.body.classList.add("odoo-studio-active");

      // Inject UI parts
      this.injectTopBar();
      this.injectSidebar();
      this.injectInlineToolbar();
      this.injectModals();
      this.bindSectionControls();
      this.bindDirectEditing();
      this.loadSavedOverrides();
    },

    /**
     * Top Bar with Device switcher, Save, and Deploy
     */
    injectTopBar: function () {
      if (document.querySelector(".odoo-top-bar")) return;

      const bar = document.createElement("div");
      bar.className = "odoo-top-bar";
      bar.innerHTML = `
        <div class="odoo-top-left">
          <div class="odoo-logo-badge">
            <span>⚙️ ODOO STUDIO</span>
          </div>

          <div class="odoo-device-switch">
            <button type="button" class="odoo-device-btn active" id="btnDeviceDesktop">🖥 Desktop</button>
            <button type="button" class="odoo-device-btn" id="btnDeviceMobile">📱 Mobile</button>
          </div>

          <span style="font-size: 0.78rem; color: #94A3B8; margin-left: 0.5rem;" id="odooUserBadge">
            👤 ${state.currentUser ? state.currentUser.name : 'Editor'}
          </span>
        </div>

        <div class="odoo-top-right">
          <button type="button" class="odoo-top-btn btn-outline" id="btnToggleSidebar">
            📁 Blocks &amp; Pages
          </button>

          <button type="button" class="odoo-top-btn btn-save" id="btnStudioSave">
            💾 Save Changes
          </button>

          <button type="button" class="odoo-top-btn btn-deploy" id="btnStudioDeploy">
            🚀 Save &amp; Deploy to Vercel
          </button>

          <button type="button" class="odoo-top-btn btn-outline" id="btnStudioExit" style="color: #EF4444;">
            ✖ Exit
          </button>
        </div>
      `;
      document.body.prepend(bar);

      // Bind events
      document.getElementById("btnToggleSidebar").addEventListener("click", () => {
        document.querySelector(".odoo-sidebar").classList.toggle("collapsed");
        document.body.classList.toggle("odoo-sidebar-collapsed");
      });

      document.getElementById("btnDeviceDesktop").addEventListener("click", function() {
        this.classList.add("active");
        document.getElementById("btnDeviceMobile").classList.remove("active");
        document.body.style.maxWidth = "";
        document.body.style.margin = "";
      });

      document.getElementById("btnDeviceMobile").addEventListener("click", function() {
        this.classList.add("active");
        document.getElementById("btnDeviceDesktop").classList.remove("active");
        document.body.style.maxWidth = "420px";
        document.body.style.margin = "0 auto";
      });

      document.getElementById("btnStudioSave").addEventListener("click", () => {
        this.saveVisualSnapshot();
        this.showToast("✅ Changes saved to browser!");
      });

      document.getElementById("btnStudioDeploy").addEventListener("click", () => {
        this.deployLive();
      });

      document.getElementById("btnStudioExit").addEventListener("click", () => {
        if (confirm("Exit Odoo Studio mode?")) {
          window.location.href = window.location.pathname;
        }
      });
    },

    /**
     * Right Sidebar with 4 Main Tabs: Blocks, Customize, Pages, Menu
     */
    injectSidebar: function () {
      if (document.querySelector(".odoo-sidebar")) return;

      const sidebar = document.createElement("aside");
      sidebar.className = "odoo-sidebar";
      sidebar.innerHTML = `
        <div class="odoo-tab-nav">
          <button type="button" class="odoo-tab-btn active" data-tab="blocks">Blocks</button>
          <button type="button" class="odoo-tab-btn" data-tab="customize">Customize</button>
          <button type="button" class="odoo-tab-btn" data-tab="pages">Pages</button>
          <button type="button" class="odoo-tab-btn" data-tab="menu">Menu</button>
        </div>

        <div class="odoo-tab-content">
          <!-- PANE 1: BLOCKS -->
          <div class="odoo-tab-pane active" id="pane-blocks">
            <div class="odoo-blocks-category-title">Core Sections</div>
            <div class="odoo-blocks-grid" id="odooBlocksGrid">
              <!-- Rendered dynamically -->
            </div>
            <div style="background: rgba(0,112,74,0.15); border: 1px dashed #10B981; border-radius: 8px; padding: 0.85rem; font-size: 0.78rem; color: #6EE7B7; text-align: center;">
              💡 Click any block to insert it directly into your website!
            </div>
          </div>

          <!-- PANE 2: CUSTOMIZE / INSPECTOR -->
          <div class="odoo-tab-pane" id="pane-customize">
            <div id="inspectorEmptyState" style="text-align: center; color: #94A3B8; font-size: 0.85rem; padding: 2rem 0;">
              Click on any text, button, or image on the page to customize it here!
            </div>
            <div id="inspectorControls" style="display: none;">
              <h4 style="font-size: 0.95rem; font-weight: 800; color: #FFFFFF; margin-bottom: 1rem;" id="inspectorElementTitle">Element Details</h4>
              
              <div class="form-group">
                <label>Text Content</label>
                <textarea id="inspectorTextInput" rows="3"></textarea>
              </div>

              <div id="inspectorLinkGroup" class="form-group" style="display: none;">
                <label>Destination Link / URL</label>
                <input type="text" id="inspectorLinkInput" placeholder="e.g. #divisions or https://...">
              </div>

              <div class="form-group">
                <label>Text Color</label>
                <input type="color" id="inspectorColorInput" style="height:38px; border:none; cursor:pointer;">
              </div>

              <div class="form-group">
                <label>Font Size</label>
                <select id="inspectorFontSizeSelect">
                  <option value="">Default Size</option>
                  <option value="0.88rem">Small (0.88rem)</option>
                  <option value="1rem">Body (1rem)</option>
                  <option value="1.25rem">Heading 4 (1.25rem)</option>
                  <option value="1.75rem">Heading 3 (1.75rem)</option>
                  <option value="2.25rem">Heading 2 (2.25rem)</option>
                  <option value="3rem">Hero Big (3rem)</option>
                </select>
              </div>

              <button type="button" class="odoo-top-btn btn-save" id="btnApplyInspector" style="width:100%; justify-content:center; padding:0.65rem;">
                Apply Changes
              </button>
            </div>
          </div>

          <!-- PANE 3: PAGES MANAGER -->
          <div class="odoo-tab-pane" id="pane-pages">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
              <h4 style="font-size: 0.95rem; font-weight:800; color:#FFFFFF;">Website Pages</h4>
              <button type="button" class="odoo-top-btn btn-save" id="btnOpenNewPageModal" style="font-size:0.75rem; padding:0.3rem 0.6rem;">
                + Add Page
              </button>
            </div>

            <div class="odoo-pages-list" id="odooPagesList">
              <a href="index.html?edit=true" class="odoo-page-item active" style="text-decoration:none;">
                <span>🏠 Home Page (index.html)</span>
                <span style="font-size:0.7rem; color:#10B981;">Main</span>
              </a>
              <a href="about.html?edit=true" class="odoo-page-item" style="text-decoration:none;">
                <span>ℹ️ About Us (about.html)</span>
                <span style="font-size:0.7rem; color:#38BDF8;">Page</span>
              </a>
              <a href="services.html?edit=true" class="odoo-page-item" style="text-decoration:none;">
                <span>⚡ Services &amp; Divisions (services.html)</span>
                <span style="font-size:0.7rem; color:#F59E0B;">Page</span>
              </a>
            </div>
          </div>

          <!-- PANE 4: MENU MANAGER -->
          <div class="odoo-tab-pane" id="pane-menu">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
              <h4 style="font-size: 0.95rem; font-weight:800; color:#FFFFFF;">Header Navigation</h4>
              <button type="button" class="odoo-top-btn btn-save" id="btnOpenNewMenuModal" style="font-size:0.75rem; padding:0.3rem 0.6rem;">
                + Add Link
              </button>
            </div>

            <div class="odoo-pages-list" id="odooNavLinksList">
              <!-- Rendered dynamically -->
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(sidebar);

      // Render Block Cards
      const grid = document.getElementById("odooBlocksGrid");
      Object.keys(BLOCK_TEMPLATES).forEach(key => {
        const tpl = BLOCK_TEMPLATES[key];
        const card = document.createElement("div");
        card.className = "odoo-block-card";
        card.innerHTML = `
          <span class="odoo-block-icon">${tpl.icon}</span>
          <strong class="odoo-block-title">${tpl.title}</strong>
          <span class="odoo-block-desc">${tpl.desc}</span>
        `;
        card.addEventListener("click", () => {
          this.insertBlock(tpl.html, tpl.title);
        });
        grid.appendChild(card);
      });

      // Tab switching
      sidebar.querySelectorAll(".odoo-tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          sidebar.querySelectorAll(".odoo-tab-btn").forEach(b => b.classList.remove("active"));
          sidebar.querySelectorAll(".odoo-tab-pane").forEach(p => p.classList.remove("active"));

          btn.classList.add("active");
          const target = btn.getAttribute("data-tab");
          document.getElementById("pane-" + target).classList.add("active");
        });
      });

      // Inspector Apply Button
      document.getElementById("btnApplyInspector").addEventListener("click", () => {
        if (state.selectedElement) {
          state.selectedElement.innerHTML = document.getElementById("inspectorTextInput").value;
          state.selectedElement.style.color = document.getElementById("inspectorColorInput").value;
          const fSize = document.getElementById("inspectorFontSizeSelect").value;
          if (fSize) state.selectedElement.style.fontSize = fSize;

          if (state.selectedElement.tagName === "A") {
            state.selectedElement.setAttribute("href", document.getElementById("inspectorLinkInput").value);
          }
          this.saveVisualSnapshot();
          this.showToast("Element updated!");
        }
      });

      // Bind Page & Menu Triggers
      document.getElementById("btnOpenNewPageModal").addEventListener("click", () => {
        document.getElementById("modalAddPage").classList.add("open");
      });

      document.getElementById("btnOpenNewMenuModal").addEventListener("click", () => {
        document.getElementById("modalAddMenu").classList.add("open");
      });

      this.populateMenuTab();
    },

    /**
     * Floating Rich Text Toolbar (Bold, Italic, Color, Align, Size)
     */
    injectInlineToolbar: function () {
      if (document.getElementById("odooInlineToolbar")) return;

      const tb = document.createElement("div");
      tb.id = "odooInlineToolbar";
      tb.className = "odoo-inline-toolbar";
      tb.innerHTML = `
        <button type="button" class="odoo-tool-btn" data-cmd="bold" title="Bold"><b>B</b></button>
        <button type="button" class="odoo-tool-btn" data-cmd="italic" title="Italic"><i>I</i></button>
        <button type="button" class="odoo-tool-btn" data-cmd="underline" title="Underline"><u>U</u></button>
        <input type="color" id="tbColorPicker" title="Text Color" style="width:24px;height:24px;border:none;background:none;cursor:pointer;">
        <button type="button" class="odoo-tool-btn" data-cmd="justifyLeft" title="Align Left">⇤</button>
        <button type="button" class="odoo-tool-btn" data-cmd="justifyCenter" title="Align Center">☰</button>
        <button type="button" class="odoo-tool-btn" data-cmd="justifyRight" title="Align Right">⇥</button>
        <button type="button" class="odoo-tool-btn" id="tbDoneBtn" title="Save &amp; Finish" style="background:#00704A; color:#fff; width:auto; padding:0 0.5rem;">✔ Done</button>
      `;

      tb.querySelectorAll(".odoo-tool-btn[data-cmd]").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          document.execCommand(btn.getAttribute("data-cmd"), false, null);
        });
      });

      tb.querySelector("#tbColorPicker").addEventListener("input", (e) => {
        document.execCommand("foreColor", false, e.target.value);
      });

      tb.querySelector("#tbDoneBtn").addEventListener("click", () => {
        if (state.selectedElement) {
          state.selectedElement.removeAttribute("contenteditable");
          state.selectedElement.classList.remove("odoo-active-editing");
        }
        tb.classList.remove("show");
        this.saveVisualSnapshot();
      });

      document.body.appendChild(tb);
    },

    positionInlineToolbar: function (el) {
      const tb = document.getElementById("odooInlineToolbar");
      if (!tb || !el) return;
      const rect = el.getBoundingClientRect();
      tb.style.top = (window.scrollY + rect.top - 44) + "px";
      tb.style.left = Math.max(10, (window.scrollX + rect.left)) + "px";
      tb.classList.add("show");
    },

    /**
     * Populate Menu tab with current navbar links
     */
    populateMenuTab: function () {
      const container = document.getElementById("odooNavLinksList");
      if (!container) return;
      container.innerHTML = "";

      document.querySelectorAll(".nav-menu .nav-link").forEach((link, idx) => {
        const item = document.createElement("div");
        item.className = "odoo-page-item";
        item.innerHTML = `
          <span><b>${link.textContent.trim()}</b> (<code>${link.getAttribute("href")}</code>)</span>
          <div style="display:flex; gap:0.3rem;">
            <button type="button" class="odoo-action-btn btn-rename" title="Rename Link">✎</button>
            <button type="button" class="odoo-action-btn btn-delete" title="Delete Link">&times;</button>
          </div>
        `;

        // Rename Link
        item.querySelector(".btn-rename").addEventListener("click", () => {
          const newName = prompt("Enter new title for this menu link:", link.textContent.trim());
          if (newName) {
            link.textContent = newName;
            const newHref = prompt("Enter destination URL/anchor:", link.getAttribute("href"));
            if (newHref) link.setAttribute("href", newHref);
            this.populateMenuTab();
            this.saveVisualSnapshot();
          }
        });

        // Delete Link
        item.querySelector(".btn-delete").addEventListener("click", () => {
          if (confirm(`Remove "${link.textContent.trim()}" from the menu?`)) {
            link.parentElement.remove();
            this.populateMenuTab();
            this.saveVisualSnapshot();
          }
        });

        container.appendChild(item);
      });
    },

    /**
     * Insert a block snippet into the page
     */
    insertBlock: function (html, title) {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = html.trim();
      const newSec = wrapper.firstChild;

      // Insert before footer or after selected section
      if (state.selectedSection && state.selectedSection.nextSibling) {
        state.selectedSection.parentNode.insertBefore(newSec, state.selectedSection.nextSibling);
      } else {
        const footer = document.querySelector("footer");
        if (footer) {
          footer.parentNode.insertBefore(newSec, footer);
        } else {
          document.body.appendChild(newSec);
        }
      }

      newSec.scrollIntoView({ behavior: "smooth" });
      this.bindSectionControls();
      this.bindDirectEditing();
      this.saveVisualSnapshot();
      this.showToast(`Block "${title}" inserted!`);
    },

    /**
     * Modals: Add Page, Add Menu, Media Picker, Button Inspector, Background Color
     */
    injectModals: function () {
      // 1. Add Page Modal
      const modalPage = document.createElement("div");
      modalPage.className = "odoo-studio-modal";
      modalPage.id = "modalAddPage";
      modalPage.innerHTML = `
        <div class="odoo-modal-card">
          <h3>+ Add New Website Page</h3>
          <p>Create a dedicated page with customized layout and SEO URL.</p>
          <div class="form-group">
            <label>Page Title</label>
            <input type="text" id="newPageTitle" placeholder="e.g. Services, About Us, Careers" required>
          </div>
          <div class="form-group">
            <label>URL Slug / File Name</label>
            <input type="text" id="newPageSlug" placeholder="e.g. services.html" required>
          </div>
          <div class="form-group">
            <label>Page Template</label>
            <select id="newPageTemplate">
              <option value="standard">Standard (Header + Hero + Content + Footer)</option>
              <option value="showcase">Showcase (Hero + 3 Columns + CTA)</option>
              <option value="blank">Blank Custom Page</option>
            </select>
          </div>
          <div class="odoo-modal-footer">
            <button type="button" class="odoo-top-btn btn-outline" id="btnClosePageModal">Cancel</button>
            <button type="button" class="odoo-top-btn btn-save" id="btnCreatePage">Create Page</button>
          </div>
        </div>
      `;
      document.body.appendChild(modalPage);

      document.getElementById("btnClosePageModal").addEventListener("click", () => modalPage.classList.remove("open"));
      document.getElementById("btnCreatePage").addEventListener("click", () => {
        const title = document.getElementById("newPageTitle").value.trim();
        let slug = document.getElementById("newPageSlug").value.trim();
        if (!title || !slug) return;
        if (!slug.endsWith(".html")) slug += ".html";

        const list = document.getElementById("odooPagesList");
        const a = document.createElement("a");
        a.href = slug + "?edit=true";
        a.className = "odoo-page-item";
        a.style.textDecoration = "none";
        a.innerHTML = `<span>📄 ${title} (${slug})</span><span style="font-size:0.7rem; color:#10B981;">Custom Page</span>`;
        list.appendChild(a);

        modalPage.classList.remove("open");
        this.showToast(`Page "${title}" registered! Click to open.`);
      });

      // 2. Add Menu Modal
      const modalMenu = document.createElement("div");
      modalMenu.className = "odoo-studio-modal";
      modalMenu.id = "modalAddMenu";
      modalMenu.innerHTML = `
        <div class="odoo-modal-card">
          <h3>+ Add Header Menu Link</h3>
          <p>Add a new button or link to the top header navigation menu.</p>
          <div class="form-group">
            <label>Menu Label</label>
            <input type="text" id="newMenuLabel" placeholder="e.g. Services, About, Portfolio" required>
          </div>
          <div class="form-group">
            <label>Destination URL or Anchor</label>
            <input type="text" id="newMenuHref" placeholder="e.g. #divisions, services.html" required>
          </div>
          <div class="odoo-modal-footer">
            <button type="button" class="odoo-top-btn btn-outline" id="btnCloseMenuModal">Cancel</button>
            <button type="button" class="odoo-top-btn btn-save" id="btnCreateMenu">Add to Menu</button>
          </div>
        </div>
      `;
      document.body.appendChild(modalMenu);

      document.getElementById("btnCloseMenuModal").addEventListener("click", () => modalMenu.classList.remove("open"));
      document.getElementById("btnCreateMenu").addEventListener("click", () => {
        const label = document.getElementById("newMenuLabel").value.trim();
        const href = document.getElementById("newMenuHref").value.trim();
        if (!label || !href) return;

        const navMenu = document.getElementById("navMenu");
        if (navMenu) {
          const li = document.createElement("li");
          li.innerHTML = `<a href="${href}" class="nav-link">${label}</a>`;
          navMenu.appendChild(li);
          this.populateMenuTab();
          this.saveVisualSnapshot();
          modalMenu.classList.remove("open");
          this.showToast(`Link "${label}" added to menu!`);
        }
      });

      // 3. Media Picker Modal
      const modalMedia = document.createElement("div");
      modalMedia.className = "odoo-studio-modal";
      modalMedia.id = "modalMediaPicker";
      modalMedia.innerHTML = `
        <div class="odoo-modal-card">
          <h3>🖼️ Image &amp; Media Picker</h3>
          <p>Upload a new image or choose from brand presets.</p>
          
          <div class="form-group">
            <label>Upload From Device (Computer / Phone)</label>
            <input type="file" id="mediaFileInput" accept="image/*" style="display:none;">
            <div class="odoo-drop-zone" id="mediaDropZone">
              <div style="font-size:2rem; margin-bottom:0.5rem;">📁</div>
              <strong>Click to browse file</strong>
              <div style="font-size:0.75rem; color:#94A3B8; margin-top:0.3rem;">Supports PNG, JPG, WebP, SVG (Auto base64)</div>
            </div>
          </div>

          <div class="form-group">
            <label>Or Enter Image URL</label>
            <input type="text" id="mediaUrlInput" placeholder="https://example.com/photo.jpg">
          </div>

          <div class="form-group">
            <label>Quick Brand Presets</label>
            <div class="odoo-preset-grid">
              <div class="odoo-preset-thumb" data-preset="flame" title="Pak Igniters Flame">🔥</div>
              <div class="odoo-preset-thumb" data-preset="rocket" title="Rocket Launch">🚀</div>
              <div class="odoo-preset-thumb" data-preset="crown" title="Leadership Crown">👑</div>
              <div class="odoo-preset-thumb" data-preset="laptop" title="Web Studio">💻</div>
            </div>
          </div>

          <div class="odoo-modal-footer">
            <button type="button" class="odoo-top-btn btn-outline" id="btnCloseMediaModal">Cancel</button>
            <button type="button" class="odoo-top-btn btn-save" id="btnApplyMedia">Apply Image</button>
          </div>
        </div>
      `;
      document.body.appendChild(modalMedia);

      document.getElementById("btnCloseMediaModal").addEventListener("click", () => modalMedia.classList.remove("open"));

      const dropZone = document.getElementById("mediaDropZone");
      const fileInput = document.getElementById("mediaFileInput");
      dropZone.addEventListener("click", () => fileInput.click());

      fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (re) => {
            document.getElementById("mediaUrlInput").value = re.target.result;
            dropZone.innerHTML = `<b>✅ File Loaded:</b> ${file.name}`;
          };
          reader.readAsDataURL(file);
        }
      });

      document.querySelectorAll(".odoo-preset-thumb").forEach(btn => {
        btn.addEventListener("click", () => {
          const preset = btn.getAttribute("data-preset");
          const emojis = { flame: "🔥", rocket: "🚀", crown: "👑", laptop: "💻" };
          if (state.selectedElement) {
            state.selectedElement.innerHTML = `<span style="font-size:2.5rem;">${emojis[preset]}</span>`;
            modalMedia.classList.remove("open");
            this.saveVisualSnapshot();
          }
        });
      });

      document.getElementById("btnApplyMedia").addEventListener("click", () => {
        const src = document.getElementById("mediaUrlInput").value.trim();
        if (src && state.selectedElement) {
          if (state.selectedElement.tagName === "IMG") {
            state.selectedElement.src = src;
          } else {
            state.selectedElement.innerHTML = `<img src="${src}" alt="Brand Asset" style="max-width:100%; border-radius:8px;">`;
          }
          modalMedia.classList.remove("open");
          this.saveVisualSnapshot();
          this.showToast("Image updated!");
        }
      });

      // 4. Button Inspector Modal
      const modalBtn = document.createElement("div");
      modalBtn.className = "odoo-studio-modal";
      modalBtn.id = "modalButtonInspector";
      modalBtn.innerHTML = `
        <div class="odoo-modal-card">
          <h3>🔘 Button Inspector</h3>
          <p>Customize button label, destination link, and styling.</p>
          <div class="form-group">
            <label>Button Label Text</label>
            <input type="text" id="btnModalText" required>
          </div>
          <div class="form-group">
            <label>Destination Link / Anchor</label>
            <input type="text" id="btnModalHref" placeholder="e.g. #divisions, #contact, https://...">
          </div>
          <div class="form-group">
            <label>Button Theme / Style</label>
            <select id="btnModalStyle">
              <option value="btn-primary">Emerald Primary (Default)</option>
              <option value="btn-accent">Golden Amber (Accent)</option>
              <option value="btn-secondary">White Outline (Secondary)</option>
            </select>
          </div>
          <div class="odoo-modal-footer">
            <button type="button" class="odoo-top-btn btn-outline" id="btnCloseBtnModal">Cancel</button>
            <button type="button" class="odoo-top-btn btn-save" id="btnApplyBtnModal">Save Button</button>
          </div>
        </div>
      `;
      document.body.appendChild(modalBtn);

      document.getElementById("btnCloseBtnModal").addEventListener("click", () => modalBtn.classList.remove("open"));
      document.getElementById("btnApplyBtnModal").addEventListener("click", () => {
        if (state.selectedElement) {
          const txt = document.getElementById("btnModalText").value.trim();
          const href = document.getElementById("btnModalHref").value.trim();
          const style = document.getElementById("btnModalStyle").value;

          if (txt) state.selectedElement.textContent = txt;
          if (href && state.selectedElement.tagName === "A") state.selectedElement.setAttribute("href", href);

          state.selectedElement.classList.remove("btn-primary", "btn-accent", "btn-secondary");
          state.selectedElement.classList.add(style);

          modalBtn.classList.remove("open");
          this.saveVisualSnapshot();
          this.showToast("Button updated!");
        }
      });
    },

    /**
     * Section Hover Controls (Move Up, Move Down, Duplicate, Delete, Background)
     */
    bindSectionControls: function () {
      const sections = document.querySelectorAll("header.site-header, section, footer");
      sections.forEach((sec) => {
        sec.classList.add("odoo-section-wrapper");

        if (sec.querySelector(".odoo-section-actions")) return;

        const actions = document.createElement("div");
        actions.className = "odoo-section-actions";
        actions.innerHTML = `
          <button type="button" class="odoo-action-btn btn-up" title="Move Up">▲</button>
          <button type="button" class="odoo-action-btn btn-down" title="Move Down">▼</button>
          <button type="button" class="odoo-action-btn btn-duplicate" title="Duplicate Section">📋</button>
          <button type="button" class="odoo-action-btn btn-bg" title="Background Color">🎨</button>
          <button type="button" class="odoo-action-btn btn-delete" title="Delete Section">🗑</button>
        `;

        sec.appendChild(actions);

        actions.querySelector(".btn-up").addEventListener("click", (e) => {
          e.stopPropagation();
          const prev = sec.previousElementSibling;
          if (prev && !prev.classList.contains("odoo-top-bar")) {
            sec.parentNode.insertBefore(sec, prev);
            this.saveVisualSnapshot();
          }
        });

        actions.querySelector(".btn-down").addEventListener("click", (e) => {
          e.stopPropagation();
          const next = sec.nextElementSibling;
          if (next && !next.classList.contains("odoo-sidebar")) {
            sec.parentNode.insertBefore(next, sec);
            this.saveVisualSnapshot();
          }
        });

        actions.querySelector(".btn-duplicate").addEventListener("click", (e) => {
          e.stopPropagation();
          const clone = sec.cloneNode(true);
          const oldActions = clone.querySelector(".odoo-section-actions");
          if (oldActions) oldActions.remove();
          sec.parentNode.insertBefore(clone, sec.nextSibling);
          this.bindSectionControls();
          this.bindDirectEditing();
          this.saveVisualSnapshot();
          this.showToast("Section duplicated!");
        });

        actions.querySelector(".btn-bg").addEventListener("click", (e) => {
          e.stopPropagation();
          const color = prompt("Enter Hex color or background style (e.g. #0B1120, #0F172A, #004D33):", "#0B1120");
          if (color) {
            sec.style.background = color;
            this.saveVisualSnapshot();
          }
        });

        actions.querySelector(".btn-delete").addEventListener("click", (e) => {
          e.stopPropagation();
          if (confirm("Delete this section permanently?")) {
            sec.remove();
            this.saveVisualSnapshot();
            this.showToast("Section removed.");
          }
        });
      });
    },

    /**
     * Direct editing on text, images, and buttons
     */
    bindDirectEditing: function () {
      const self = this;

      // 1. Text Elements
      document.querySelectorAll("h1, h2, h3, h4, h5, p, span.announcement-sub, .hero-badge, .stat-number, .stat-label").forEach(el => {
        if (el.closest(".odoo-top-bar") || el.closest(".odoo-sidebar") || el.closest(".odoo-studio-modal") || el.closest(".odoo-section-actions")) return;

        el.classList.add("odoo-editable");

        el.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();

          if (state.selectedElement) {
            state.selectedElement.classList.remove("odoo-active-editing");
            state.selectedElement.removeAttribute("contenteditable");
          }

          state.selectedElement = el;
          el.classList.add("odoo-active-editing");
          el.setAttribute("contenteditable", "true");
          el.focus();

          self.positionInlineToolbar(el);

          // Populate Customize sidebar
          const customizeTab = document.querySelector('[data-tab="customize"]');
          if (customizeTab) customizeTab.click();
          document.getElementById("inspectorEmptyState").style.display = "none";
          document.getElementById("inspectorControls").style.display = "block";
          document.getElementById("inspectorTextInput").value = el.innerHTML.trim();
        });
      });

      // 2. Buttons
      document.querySelectorAll(".btn, a.btn").forEach(btn => {
        if (btn.closest(".odoo-top-bar") || btn.closest(".odoo-sidebar") || btn.closest(".odoo-studio-modal")) return;

        btn.classList.add("odoo-editable");

        btn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();

          state.selectedElement = btn;
          document.getElementById("btnModalText").value = btn.textContent.trim();
          document.getElementById("btnModalHref").value = btn.getAttribute("href") || "";
          document.getElementById("modalButtonInspector").classList.add("open");
        });
      });

      // 3. Images & SVG Icons
      document.querySelectorAll("img, .brand-flame-icon, .division-icon-box").forEach(img => {
        if (img.closest(".odoo-top-bar") || img.closest(".odoo-sidebar") || img.closest(".odoo-studio-modal")) return;

        img.classList.add("odoo-editable");

        img.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();

          state.selectedElement = img;
          document.getElementById("modalMediaPicker").classList.add("open");
        });
      });
    },

    /**
     * Save Snapshot to universal stores
     */
    saveVisualSnapshot: function () {
      try {
        const overrides = {
          texts: {},
          images: {},
          buttons: {}
        };

        // Text elements
        document.querySelectorAll("[data-i18n]").forEach(el => {
          const key = el.getAttribute("data-i18n");
          if (key) overrides.texts[key] = el.innerHTML.trim();
        });

        // Navigation Menu HTML snapshot
        const navMenu = document.getElementById("navMenu");
        if (navMenu) {
          const menuClone = navMenu.cloneNode(true);
          menuClone.querySelectorAll(".odoo-editable").forEach(e => e.classList.remove("odoo-editable"));
          localStorage.setItem("pak_igniters_nav_menu_html", menuClone.innerHTML);
        }

        // Full Content Snapshot (All sections between header and footer)
        const sections = [];
        document.querySelectorAll("section.odoo-section-wrapper").forEach(sec => {
          const clone = sec.cloneNode(true);
          const actions = clone.querySelector(".odoo-section-actions");
          if (actions) actions.remove();
          clone.querySelectorAll(".odoo-editable").forEach(e => {
            e.classList.remove("odoo-editable", "odoo-active-editing");
            e.removeAttribute("contenteditable");
          });
          sections.push(clone.outerHTML);
        });

        if (sections.length > 0) {
          localStorage.setItem("pak_igniters_published_snapshot_html", sections.join("\n"));
        }

        const json = JSON.stringify(overrides);
        localStorage.setItem("pak_igniters_published_overrides", json);
        localStorage.setItem("pak_igniters_published_content", json);
        localStorage.setItem("pak_igniters_draft_content", json);

        window.dispatchEvent(new CustomEvent("pak_igniters_content_published"));
      } catch (e) {
        console.warn("Save error:", e);
      }
    },

    loadSavedOverrides: function () {
      try {
        const raw = localStorage.getItem("pak_igniters_published_overrides");
        if (raw) {
          const data = JSON.parse(raw);
          if (data.texts) {
            Object.keys(data.texts).forEach(key => {
              document.querySelectorAll(`[data-i18n="${key}"]`).forEach(el => {
                el.innerHTML = data.texts[key];
              });
            });
          }
        }
      } catch (e) {}
    },

    /**
     * Deploy Live Action
     */
    deployLive: function () {
      this.saveVisualSnapshot();
      alert("🎉 All changes, blocks, pages, and menus have been published live!\n\nVisiting this website from your browser or anywhere will now display these exact updates.");
    },

    showToast: function (msg) {
      let toast = document.getElementById("odooToast");
      if (!toast) {
        toast = document.createElement("div");
        toast.id = "odooToast";
        toast.style.cssText = "position:fixed; bottom:20px; right:20px; background:#00704A; color:#fff; padding:0.75rem 1.25rem; border-radius:8px; z-index:99999999; font-weight:700; box-shadow:0 10px 25px rgba(0,0,0,0.5); font-family:sans-serif;";
        document.body.appendChild(toast);
      }
      toast.textContent = msg;
      toast.style.display = "block";
      setTimeout(() => { toast.style.display = "none"; }, 3000);
    }
  };

  // Run on load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => OdooStudio.init());
  } else {
    OdooStudio.init();
  }

  window.OdooStudio = OdooStudio;

})(window, document);
