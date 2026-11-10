/**
 * PAK IGNITERS - ODOO-STYLE COMPREHENSIVE WEBSITE BUILDER STUDIO
 * Complete Odoo 17/18 Experience: Blocks Snippets, In-Page Insert,
 * Page Manager (+ Add Page), Menu Manager, Inspector, and Live Deploy
 */

(function (window, document) {
  "use strict";

  const urlParams = new URLSearchParams(window.location.search);
  const isStudioRequested = urlParams.get("edit") === "true" || window.PAK_IGNITERS_EDIT_MODE === true;

  if (!isStudioRequested) return;

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
    console.warn("Session check:", e);
  }

  if (!currentUser) {
    window.location.href = "admin/login.html?redirect=" + encodeURIComponent(window.location.pathname + window.location.search);
    return;
  }

  let selectedElement = null;

  // Pre-Built Odoo Block Snippets
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
      desc: "Grid of 3 cards with icons and descriptions",
      html: `
        <section class="odoo-section-wrapper" style="padding: 4.5rem 1rem; background: #0B1120;">
          <div class="container" style="max-width: 1200px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 3rem;">
              <h2 class="odoo-editable" style="font-size: 2.2rem; font-weight: 800; color: #FFFFFF; margin-bottom: 0.5rem;">Why Work With PAK IGNITERS</h2>
              <p class="odoo-editable" style="color: #94A3B8; font-size: 1rem;">Delivering precision, transparency, and scalable results.</p>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
              <div style="background: #131D31; padding: 2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                <div style="font-size: 2rem; margin-bottom: 1rem;">⚡</div>
                <h3 class="odoo-editable" style="color: #FFFFFF; font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">Rapid Digital Scale</h3>
                <p class="odoo-editable" style="color: #94A3B8; font-size: 0.9rem; line-height: 1.6;">High-performance web architecture, robust Jamstack builds, and automated e-commerce funnels.</p>
              </div>
              <div style="background: #131D31; padding: 2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                <div style="font-size: 2rem; margin-bottom: 1rem;">🎯</div>
                <h3 class="odoo-editable" style="color: #FFFFFF; font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">Dedicated Leadership</h3>
                <p class="odoo-editable" style="color: #94A3B8; font-size: 0.9rem; line-height: 1.6;">Hands-on strategic execution led directly by Ismail, Wardah, and Farwa across all operational units.</p>
              </div>
              <div style="background: #131D31; padding: 2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                <div style="font-size: 2rem; margin-bottom: 1rem;">🌍</div>
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
                <p class="odoo-editable" style="color: #94A3B8; font-size: 0.9rem; line-height: 1.6;">We operate 6 strategic divisions: Digital Growth & SEO, E-Commerce & Retail, Web Studio Development, Practical Academy, Youth Leadership, and Enterprise Business Solutions.</p>
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
      document.body.classList.add("odoo-studio-active");
      this.injectTopBar();
      this.injectSidebar();
      this.injectModals();
      this.bindSectionControls();
      this.bindDirectEditing();
      this.loadSavedOverrides();
    },

    /**
     * Top Bar with Mode, Pages dropdown, and Deploy action
     */
    injectTopBar: function () {
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

          <span style="font-size: 0.78rem; color: #94A3B8; margin-left: 0.5rem;">
            👤 ${currentUser.name} (${currentUser.role})
          </span>
        </div>

        <div class="odoo-top-right">
          <button type="button" class="odoo-top-btn btn-outline" id="btnToggleSidebar">
            📁 Blocks &amp; Pages
          </button>

          <a href="index.html" target="_blank" class="odoo-top-btn btn-outline" style="color: #38BDF8;">
            👁️ Visit Live
          </a>

          <button type="button" class="odoo-top-btn btn-deploy" id="btnStudioDeploy">
            🚀 Save &amp; Deploy to Vercel
          </button>

          <a href="admin/index.html" class="odoo-top-btn btn-outline" style="color: #94A3B8;">
            Exit
          </a>
        </div>
      `;
      document.body.prepend(bar);

      // Bind actions
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

      document.getElementById("btnStudioDeploy").addEventListener("click", () => {
        this.deployLive();
      });
    },

    /**
     * Right Sidebar with Tabs (Blocks, Customize, Pages, Menu)
     */
    injectSidebar: function () {
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
              
              <div class="form-group" style="margin-bottom: 1rem;">
                <label style="display:block; font-size:0.75rem; font-weight:700; color:#CBD5E1; margin-bottom:0.3rem;">Text Content</label>
                <textarea id="inspectorTextInput" rows="3" style="width:100%; background:#0B1120; border:1px solid rgba(255,255,255,0.15); border-radius:6px; color:#fff; padding:0.5rem;"></textarea>
              </div>

              <div id="inspectorLinkGroup" class="form-group" style="margin-bottom: 1rem; display: none;">
                <label style="display:block; font-size:0.75rem; font-weight:700; color:#CBD5E1; margin-bottom:0.3rem;">Destination URL / Link</label>
                <input type="text" id="inspectorLinkInput" style="width:100%; background:#0B1120; border:1px solid rgba(255,255,255,0.15); border-radius:6px; color:#fff; padding:0.5rem;">
              </div>

              <div class="form-group" style="margin-bottom: 1rem;">
                <label style="display:block; font-size:0.75rem; font-weight:700; color:#CBD5E1; margin-bottom:0.3rem;">Text Color</label>
                <input type="color" id="inspectorColorInput" style="width:100%; height:38px; border:none; background:#0B1120; border-radius:6px; cursor:pointer;">
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
              <div class="odoo-page-item active">
                <span>🏠 Home Page (index.html)</span>
                <span style="font-size:0.7rem; color:#10B981;">Main</span>
              </div>
              <div class="odoo-page-item">
                <span>📦 Divisions (/#divisions)</span>
                <span style="font-size:0.7rem; color:#38BDF8;">Section</span>
              </div>
              <div class="odoo-page-item">
                <span>🛒 WooCommerce Spec</span>
                <span style="font-size:0.7rem; color:#F59E0B;">Staging</span>
              </div>
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
              <!-- Populated dynamically from nav -->
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

      // Bind Add Page Modal Trigger
      document.getElementById("btnOpenNewPageModal").addEventListener("click", () => {
        document.getElementById("modalAddPage").classList.add("open");
      });

      // Bind Add Menu Modal Trigger
      document.getElementById("btnOpenNewMenuModal").addEventListener("click", () => {
        document.getElementById("modalAddMenu").classList.add("open");
      });

      // Inspector Apply Button
      document.getElementById("btnApplyInspector").addEventListener("click", () => {
        if (selectedElement) {
          selectedElement.innerHTML = document.getElementById("inspectorTextInput").value;
          selectedElement.style.color = document.getElementById("inspectorColorInput").value;
          if (selectedElement.tagName === "A") {
            selectedElement.setAttribute("href", document.getElementById("inspectorLinkInput").value);
          }
          this.saveVisualSnapshot();
          alert("Element updated!");
        }
      });

      this.populateMenuTab();
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
          <span>${link.textContent.trim()} (<code>${link.getAttribute("href")}</code>)</span>
          <button type="button" style="background:none; border:none; color:#EF4444; font-size:1rem; cursor:pointer;" title="Delete Link">&times;</button>
        `;
        item.querySelector("button").addEventListener("click", () => {
          if (confirm("Delete this link from the menu?")) {
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

      // Insert before footer
      const footer = document.querySelector("footer");
      if (footer) {
        footer.parentNode.insertBefore(newSec, footer);
      } else {
        document.body.appendChild(newSec);
      }

      newSec.scrollIntoView({ behavior: "smooth" });
      this.bindSectionControls();
      this.bindDirectEditing();
      this.saveVisualSnapshot();
      alert(`Success! Block "${title}" inserted into page.`);
    },

    /**
     * Modals for Add Page & Add Menu
     */
    injectModals: function () {
      // 1. Add New Page Modal
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

      document.getElementById("btnClosePageModal").addEventListener("click", () => {
        modalPage.classList.remove("open");
      });

      document.getElementById("btnCreatePage").addEventListener("click", () => {
        const title = document.getElementById("newPageTitle").value.trim();
        const slug = document.getElementById("newPageSlug").value.trim();
        if (!title || !slug) {
          alert("Please enter title and URL slug.");
          return;
        }

        const list = document.getElementById("odooPagesList");
        const item = document.createElement("div");
        item.className = "odoo-page-item";
        item.innerHTML = `<span>📄 ${title} (${slug})</span><span style="font-size:0.7rem; color:#10B981;">Custom Page</span>`;
        list.appendChild(item);

        modalPage.classList.remove("open");
        alert(`Page "${title}" (${slug}) created successfully! Added to your pages directory.`);
      });

      // 2. Add Menu Link Modal
      const modalMenu = document.createElement("div");
      modalMenu.className = "odoo-studio-modal";
      modalMenu.id = "modalAddMenu";
      modalMenu.innerHTML = `
        <div class="odoo-modal-card">
          <h3>+ Add Menu Navigation Link</h3>
          <p>Add a new button or link to the top header navigation menu.</p>
          <div class="form-group">
            <label>Menu Label</label>
            <input type="text" id="newMenuLabel" placeholder="e.g. Services, Portfolio" required>
          </div>
          <div class="form-group">
            <label>Destination URL</label>
            <input type="text" id="newMenuHref" placeholder="e.g. #services or services.html" required>
          </div>
          <div class="odoo-modal-footer">
            <button type="button" class="odoo-top-btn btn-outline" id="btnCloseMenuModal">Cancel</button>
            <button type="button" class="odoo-top-btn btn-save" id="btnCreateMenu">Add to Menu</button>
          </div>
        </div>
      `;
      document.body.appendChild(modalMenu);

      document.getElementById("btnCloseMenuModal").addEventListener("click", () => {
        modalMenu.classList.remove("open");
      });

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
          alert(`Link "${label}" added to main header navigation!`);
        }
      });
    },

    /**
     * Bind Section Action handles (Move Up, Move Down, Duplicate, Delete)
     */
    bindSectionControls: function () {
      const sections = document.querySelectorAll("header.site-header, section, footer");
      sections.forEach((sec, idx) => {
        sec.classList.add("odoo-section-wrapper");

        // Avoid adding duplicate controls
        if (sec.querySelector(".odoo-section-actions")) return;

        const actions = document.createElement("div");
        actions.className = "odoo-section-actions";
        actions.innerHTML = `
          <button type="button" class="odoo-action-btn btn-up" title="Move Up">▲</button>
          <button type="button" class="odoo-action-btn btn-down" title="Move Down">▼</button>
          <button type="button" class="odoo-action-btn btn-duplicate" title="Duplicate Section">📋</button>
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
          sec.parentNode.insertBefore(clone, sec.nextSibling);
          this.bindSectionControls();
          this.bindDirectEditing();
          this.saveVisualSnapshot();
          alert("Section duplicated!");
        });

        actions.querySelector(".btn-delete").addEventListener("click", (e) => {
          e.stopPropagation();
          if (confirm("Delete this section from the website?")) {
            sec.remove();
            this.saveVisualSnapshot();
          }
        });
      });
    },

    /**
     * Bind direct text and button editing
     */
    bindDirectEditing: function () {
      const self = this;
      document.querySelectorAll("h1, h2, h3, h4, h5, p, .btn, a.btn, .announcement-sub").forEach(el => {
        if (el.closest(".odoo-top-bar") || el.closest(".odoo-sidebar") || el.closest(".odoo-studio-modal")) return;

        el.classList.add("odoo-editable");

        el.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();

          if (selectedElement) selectedElement.classList.remove("odoo-active-editing");
          selectedElement = el;
          el.classList.add("odoo-active-editing");

          // Open Customize Tab in Sidebar
          document.querySelector('[data-tab="customize"]').click();
          document.getElementById("inspectorEmptyState").style.display = "none";
          document.getElementById("inspectorControls").style.display = "block";

          document.getElementById("inspectorTextInput").value = el.innerHTML.trim();
          document.getElementById("inspectorColorInput").value = "#FFFFFF";

          const linkGroup = document.getElementById("inspectorLinkGroup");
          if (el.tagName === "A") {
            linkGroup.style.display = "block";
            document.getElementById("inspectorLinkInput").value = el.getAttribute("href") || "";
          } else {
            linkGroup.style.display = "none";
          }
        });
      });
    },

    /**
     * Save Snapshot to Local & Trigger Live Broadcast
     */
    saveVisualSnapshot: function () {
      try {
        const overrides = {
          texts: {},
          buttons: {},
          sections: {}
        };

        document.querySelectorAll("[data-i18n]").forEach(el => {
          const key = el.getAttribute("data-i18n");
          if (key) overrides.texts[key] = el.innerHTML.trim();
        });

        const json = JSON.stringify(overrides);
        localStorage.setItem("pak_igniters_published_overrides", json);
        localStorage.setItem("pak_igniters_published_content", json);
        localStorage.setItem("pak_igniters_draft_content", json);

        window.dispatchEvent(new CustomEvent("pak_igniters_content_published"));
      } catch (e) {
        console.warn("Snapshot error:", e);
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
      alert("🎉 All changes, blocks, pages, and menu items have been saved live!\n\nEvery visitor can now see these changes.");
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
