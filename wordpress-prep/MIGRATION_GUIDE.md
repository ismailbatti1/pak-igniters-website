# PAK IGNITERS: WordPress & WooCommerce Migration Guide
**Prepared for:** Wardah (WordPress & WooCommerce Development Lead)  
**Author:** Technical Architecture Team / Ismail Bhatti  

---

## 1. Objective

This document outlines the step-by-step roadmap for converting the PAK IGNITERS HTML/CSS/JS staging build into a fully dynamic WordPress theme with WooCommerce integration when moving to the official domain.

---

## 2. Recommended WordPress Stack

| Component | Recommendation | Rationale |
| :--- | :--- | :--- |
| **CMS** | WordPress 6.x (Latest Stable) | Standard, secure enterprise CMS |
| **Theme Architecture** | Custom Child Theme or Block Theme | Matches exact PAK IGNITERS brand guidelines |
| **E-Commerce Engine** | WooCommerce | Powering the *Pak Igniters Commerce* division |
| **Bilingual Multilingual** | Polylang or WPML | Native support for English (LTR) & Urdu (RTL) |
| **SEO Optimization** | Rank Math SEO | Structured schema markup for all 6 divisions |
| **Form Engine** | Fluent Forms or WPForms | Connected to WhatsApp or CRM |

---

## 3. Page & Template Mapping

The current staging components map directly to WordPress template hierarchy:

1. **Header & Footer:**
   - `header.php`: Navigation, language switcher (`do_action('wpml_add_language_selector')` or Polylang switcher), and brand logo.
   - `footer.php`: 4-column footer, legal notices, and staging disclaimer removal.

2. **Front Page:**
   - `front-page.php`: Hero banner (*"Unlock Your Potential"*, *"Learn. Create. Earn. Lead."*), 6 Division loops, Team architecture, and Contact inquiry.

3. **Custom Post Types (CPTs):**
   - `cpt_divisions`: Custom post type for the 6 divisions so Farwa can edit division content via the WP Admin dashboard without touching PHP code.
   - `cpt_team`: Team members and lead roles.

4. **WooCommerce Integration (Commerce Division):**
   - `woocommerce/`: Custom template overrides for course admissions (Pak Igniters Academy) and digital service packages (Pak Igniters Web Studio).

---

## 4. Urdu RTL Styling in WordPress

WordPress has built-in RTL support. When an Urdu locale (`ur`) is active, WordPress automatically enqueues `rtl.css`:
- Ensure `style.css` contains standard LTR rules.
- Place all RTL overrides into `rtl.css` using the styles already validated in `css/style.css`.
- Use the Google Fonts: **Noto Nastaliq Urdu** / **Noto Sans Arabic**.

---

## 5. Collaboration Notice for Wardah

- Work on your dedicated branch: `dev-wardah`.
- Do not commit entire WordPress core files (e.g. `wp-admin`, `wp-includes`) into GitHub.
- Keep your WordPress theme and plugin code cleanly isolated in `wp-content/themes/pak-igniters-theme/`.
- Test all pull requests before merging into `main`.
