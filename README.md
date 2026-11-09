# PAK IGNITERS OFFICIAL STAGING WEBSITE

> **Tagline:** Unlock Your Potential.  
> **Supporting Message:** Learn. Create. Earn. Lead.

Welcome to the official repository for the **PAK IGNITERS** website. This project is built using a modern, fast Jamstack staging architecture deployed through **Antigravity → GitHub → Vercel**, designed for team collaboration before final migration to the official domain and WordPress environment.

---

## 1. Project Overview & Six Divisions

PAK IGNITERS empowers youth, creators, and enterprises across Pakistan through six dedicated pillars:

1. **Pak Igniters Digital:** Data-driven performance marketing, SEO, and social growth.
2. **Pak Igniters Commerce:** E-commerce solutions, WooCommerce store development, and catalog automation.
3. **Pak Igniters Web Studio:** Modern, high-performance Jamstack and custom web platforms.
4. **Pak Igniters Academy:** Hands-on vocational bootcamps, coding courses, and direct mentorship.
5. **Pak Igniters Leadership:** Youth empowerment, public speaking, and executive leadership clinics.
6. **Pak Igniters Business Solutions:** Enterprise digital transformation and business process automation.

---

## 2. Team Roles & Scopes

| Team Member | Role | Responsibility Scope | Dedicated Branch |
| :--- | :--- | :--- | :--- |
| **Ismail** | AI, Creative & UI/UX Lead | AI chatbot engine, button interactions, UI/UX styling, graphics, and frontend performance | `dev-ismail` |
| **Warda** | WordPress & WooCommerce Lead | WooCommerce product catalog, WordPress theme migration planning, and payment gateways | `dev-warda` |
| **Farwa** | Strategy, Content & Quality Lead | Bilingual copy (English & Urdu), SEO metadata, brand messaging, and QA testing | `dev-farwa` |

---

## 3. Safe GitHub Collaboration Workflow

To ensure team members never overwrite each other's work:

### Branch Rules
1. **Never commit directly to `main`**. The `main` branch is reserved for verified staging code that auto-deploys to Vercel.
2. Each member works exclusively inside their designated branch:
   ```bash
   # For Ismail:
   git checkout dev-ismail

   # For Warda:
   git checkout dev-warda

   # For Farwa:
   git checkout dev-farwa
   ```
3. When ready with an update, push your branch to GitHub and create a **Pull Request (PR)** into `main`.
4. Team members review and approve the PR before merging.

---

## 4. Project Directory Structure

```
pak-igniters-website/
├── index.html                  # Semantic, accessible staging landing page
├── css/
│   └── style.css               # Official brand tokens, responsive grid, LTR/RTL engine
├── js/
│   ├── app.js                  # Main UI controller, division filter, language switch
│   ├── chatbot.js              # Ismail's AI Chatbot & query engine (decoupled API)
│   └── content-data.js         # Farwa's centralized bilingual content dictionary
├── wordpress-prep/
│   ├── MIGRATION_GUIDE.md      # Warda's WordPress theme migration instructions
│   └── woocommerce-spec.md     # E-commerce store and payment gateway blueprint
├── vercel.json                 # Vercel deployment routing & security headers
├── .gitignore                  # Protection against secret leaks (.env, logs, node_modules)
└── README.md                   # Project documentation & team guidelines
```

---

## 5. Local Testing

Open `index.html` directly in any modern browser, or run a local static server:

```powershell
# Using Python:
python -m http.server 3000

# Using Node:
npx serve .
```

Visit `http://localhost:3000` to preview.

---

## 6. Deployment Workflow (Antigravity → GitHub → Vercel)

1. **Step 1:** Initialize Git repository and commit local code.
2. **Step 2:** Create a new empty repository on your GitHub account (`github.com/new`).
3. **Step 3:** Push the repository:
   ```bash
   git remote add origin https://github.com/<YOUR_USERNAME>/pak-igniters-website.git
   git push -u origin main
   ```
4. **Step 4:** In [Vercel](https://vercel.com), click **Add New Project** → Import `pak-igniters-website` from GitHub.
5. **Step 5:** Vercel automatically deploys a live staging URL (e.g., `pak-igniters-website.vercel.app`).
