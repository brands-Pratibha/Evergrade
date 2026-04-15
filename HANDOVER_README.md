# 🌐 Evergrade – Complete Project Handover Guide

> **For:** The person taking over this project  
> **Written by:** Outgoing developer  
> **Live Site:** [www.evergrade.in](https://www.evergrade.in)  
> **Last Updated:** April 2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [File & Folder Structure](#3-file--folder-structure)
4. [How the Website Works (Page by Page)](#4-how-the-website-works-page-by-page)
5. [How Authentication Works](#5-how-authentication-works)
6. [How Products Are Managed](#6-how-products-are-managed)
7. [How Orders & Inquiries Work](#7-how-orders--inquiries-work)
8. [How the Contact Form & Emails Work](#8-how-the-contact-form--emails-work)
9. [Seller Dashboard – Full Walkthrough](#9-seller-dashboard--full-walkthrough)
10. [GitHub Repository & Version Control](#10-github-repository--version-control)
11. [Hosting – GitHub Pages + Hostinger Domain](#11-hosting--github-pages--hostinger-domain)
12. [How to Make Changes & Deploy](#12-how-to-make-changes--deploy)
13. [How to Add New Blog Posts](#13-how-to-add-new-blog-posts)
14. [Upgrading from Mock Firebase to Real Firebase](#14-upgrading-from-mock-firebase-to-real-firebase)
15. [Common Maintenance Tasks](#15-common-maintenance-tasks)


---

## 1. Project Overview

**Evergrade** is a B2B (Business-to-Business) raw materials trade platform connecting Indian exporters and manufacturers with global buyers.

### What the Platform Does
- Lists hundreds of industrial raw material products across 19+ categories (Steel, Textiles, Grains, Chemicals, Polymers, etc.)
- Allows **Buyers** to browse products, send inquiries, and contact suppliers
- Allows **Sellers/Manufacturers** to register, list their products, manage inventory, and respond to buyer inquiries
- Provides educational **Blog** content about Indian trade, exports, compliance (GST, DGFT, FEMA, Incoterms, etc.)
- Has a **Resources** hub for trade guides and tools
- Displays Evergrade's **Services** and **How It Works** flows

### Business Contact Info (as shown on the website)
- **Email:** info@evergrade.in
- **Phone:** +91 98186 23615
- **Offices:** Mumbai, New Delhi, Dubai, Latvia

---

## 2. Technology Stack

| Layer | Technology | Notes |
|---|---|---|
| Structure | **HTML5** | Pure static HTML pages, no build step |
| Styling | **Vanilla CSS** (`style.css`) | Single large CSS file, all pages share it |
| Logic | **Vanilla JavaScript** | No frameworks – plain JS files |
| Authentication | **Firebase** | Real Firebase Auth via `firebase-init.js` |
| Database | **Browser localStorage / Firebase Firestore** | Seller products, inquiries locally, Users in Firestore |
| Hosting | **GitHub Pages** | Free static site hosting |
| Domain | **Hostinger** → `www.evergrade.in` | CNAME points to GitHub Pages |
| Fonts | **Google Fonts** | Outfit + Playfair Display |

> ⚠️ **IMPORTANT:** There is NO backend server like Node.js or Python. Everything runs in the browser and uses Google's Firebase as a backend-as-a-service for Authentication and User Storage. Parts of the system (seller products) still fall back to `localStorage` for now.

---

## 3. File & Folder Structure

```
evergrade/
│
├── index.html                  ← Homepage
├── products.html               ← Product listing / marketplace
├── product-detail.html         ← Individual product detail page
├── exports.html                ← Exports landing page
├── imports.html                ← Imports landing page
├── services.html               ← Services page
├── how-it-works.html           ← Platform flow explanation
├── about.html                  ← About Evergrade
├── contact.html                ← Contact form + office locations
├── resources.html              ← Trade guides and tools
├── blog.html                   ← Blog listing page
├── faq.html                    ← Frequently Asked Questions
├── become-supplier.html        ← CTA page for suppliers to join
│
├── seller-register.html        ← Seller/Manufacturer registration wizard
├── seller-dashboard.html       ← Seller dashboard (inventory, inquiries, etc.)
├── seller-dashboard.css        ← CSS specific to dashboard
│
├── login.html                  ← Standalone login page (legacy)
├── signup.html                 ← Standalone signup page (legacy)
├── profile.html                ← Buyer profile page
│
│── Blog Articles (one file each):
├── blog-africa-markets.html
├── blog-customs-documentation.html
├── blog-dgft-licenses.html
├── blog-engineering-exports.html
├── blog-fema-compliance.html
├── blog-gst-exports.html
├── blog-hs-codes.html
├── blog-incoterms-guide.html
├── blog-middle-east-markets.html
├── blog-shipping-containers.html
├── blog-southeast-asia-trade.html
├── blog-spices-export.html
├── blog-textile-markets.html
├── blog-trade-finance.html
│
├── style.css                   ← MAIN stylesheet (all pages share this)
├── style.css backups           ← style_backup.css, style_clean.css, etc. (ignore these)
│
├── main.js                     ← Shared JS (mobile menu, FAQ toggles, etc.)
├── products.js                 ← Products page logic (filter, sort, render)
├── product-data.js             ← Static product catalog (~1300 lines, 50+ products)
│
├── CNAME                       ← Contains: www.evergrade.in (for GitHub Pages custom domain)
│
├── js/                         ← JavaScript modules
│   ├── firebase-init.js        ← Real Firebase config and initialization
│   ├── auth-modal.js           ← Login/Signup popup modal logic
│   ├── auth.js                 ← Auth utilities
│   ├── nav-auth.js             ← Updates header (Login button ↔ Profile avatar)
│   ├── seller-auth.js          ← Seller registration wizard logic
│   └── dashboard.js            ← Complete seller dashboard logic (947 lines)
│
├── assets/                     ← Visual assets
│   ├── logo.svg                ← Evergrade logo (dark background)
│   ├── logo-white.svg          ← Evergrade logo (light background)
│   ├── icon_mumbai.png         ← Office location images
│   ├── icon_delhi.png
│   ├── icon_dubai.png
│   ├── icon_latvia.png
│   ├── world_map_dots.png      ← World map graphic
│   └── home/, about/           ← Section-specific images
│
└── images/                     ← Additional product/page images
```

---

## 4. How the Website Works (Page by Page)

### `index.html` – Homepage
- The main landing page. Has a hero section, stats, product category grid, how-it-works teaser, blog teasers, global offices map, and footer.
- Clicking a product category navigates to `products.html?category=CATEGORY_NAME`.
- The "Become a Supplier" CTA goes to `become-supplier.html`.

### `products.html` – Marketplace
- Shows ALL products (static + seller-uploaded).
- **Static products** come from `product-data.js` (the `PRODUCTS_DATA` array).
- **Seller-uploaded products** are pulled from `localStorage.getItem('mockDB_sellerProducts')`.
- Seller products appear **at the top** of the list.
- Has left-side filters: category, certification, rating, MOQ range.
- Has a search bar and sort dropdown.
- Can be pre-filtered via URL: `products.html?category=steel` or `products.html?search=cotton`.
- Clicking **View Details** on any card goes to `product-detail.html?id=PRODUCT_ID`.

### `product-detail.html` – Product Detail
- Reads the `?id=` URL parameter.
- Searches `PRODUCTS_DATA` first, then localStorage seller products for a matching ID.
- Shows full specs, certifications, supplier info, MOQ, lead time.
- Has "Request Quote" and "Contact Supplier" buttons (open auth modal if not logged in).

### `contact.html` – Contact Page
- Has a contact form with tabs: "I'm a Buyer", "I'm a Seller", "Need Consultant".
- **The form is currently frontend only** – it shows a UI but does NOT send emails automatically. See Section 8 for how to wire it up.
- Shows phone, email, and office locations.
- Has an integrated FAQ section.

### `seller-register.html` – Seller Registration Wizard
- A 3-step wizard for sellers/manufacturers to sign up.
- Step 1: Personal details (name, email, mobile, password).
- Step 2: Business details (company name, type, GST, address).
- Step 3: Product categories they deal in.
- On completion, creates a mock user and redirects to `seller-dashboard.html`.

### `seller-dashboard.html` – Seller Dashboard
- Only accessible to logged-in users with role = `seller` or `manufacturer`.
- See full walkthrough in **Section 9**.

### Blog Pages (`blog-*.html`)
- Each article is a standalone HTML file.
- The `blog.html` page is the index listing all articles.
- See Section 13 for how to add new blog posts.

### `resources.html` – Resources Hub
- A curated page with trade guides, HS code lookup links, government portals, and documentation checklists.

### `how-it-works.html` – Platform Flow
- Explains the Evergrade process to buyers and sellers with step-by-step visuals.

---

## 5. How Authentication Works

### Current State: Firebase Integrated

> ✅ The app uses real Firebase Authentication and Firestore for users. Registered accounts are secure and persist across devices.

### The Files Involved

| File | Role |
|---|---|
| `js/firebase-init.js` | Contains the real Firebase config and initializes the `firebase` object. Replaced the old mock. |
| `js/auth-modal.js` | The Login/Signup popup modal. Uses real Firebase API. |
| `js/nav-auth.js` | Updates the header (shows "Log In" button when logged out, profile avatar when logged in). |
| `js/seller-auth.js` | Handles the seller registration wizard form submission. |
| `js/dashboard.js` | Checks auth state on seller dashboard, redirects if not logged in. |

### How to Include Auth on a New Page

Every page that needs auth must include the Firebase CDNs, the init file, and the auth UI scripts **at the bottom of `<body>`**, in this exact order:

```html
<script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore-compat.js"></script>
<script src="js/firebase-init.js"></script>
<script src="js/auth-modal.js"></script>
<script src="js/nav-auth.js"></script>
```

And the header must have this container:

```html
<div id="auth-container" style="display: flex; gap: 10px; align-items: center;">
    <button class="btn btn-primary trigger-auth-login">Log In</button>
</div>
```

### How Login Works (Step by Step)

1. User clicks **Log In** (any element with class `trigger-auth-login`).
2. `auth-modal.js` opens a popup overlay with a login form.
3. User enters email + password and submits.
4. Auth logic checks Firebase.
5. If found: calls all auth listeners.
6. `nav-auth.js` detects the auth change and replaces the "Log In" button with a profile avatar dropdown.
7. If the user's role is `seller` or `manufacturer`, the dropdown shows a "Dashboard" link.

### How Signup Works

1. User clicks **Sign Up** and selects role: Buyer, Seller, or Manufacturer.
2. If **Buyer**: Creates account in Firebase, closes modal.
3. If **Seller/Manufacturer**: Redirects to `seller-register.html` with name/email pre-filled via URL params.

### LocalStorage Keys Used by Auth

| Key | What it stores |
|---|---|
| (Managed by Firebase) | Logged-in user state, token, etc. |
| `users` (Firestore) | Firestore collection (uid → {name, email, role, createdAt}) |
| `sellers` (Firestore) | Firestore collection (uid → business data) |

---

## 6. How Products Are Managed

### Two Types of Products

#### Type 1: Static Products (in `product-data.js`)
These are the permanent, pre-loaded showcase products on the platform.
The file contains `const PRODUCTS_DATA = [...]` — an array of 50+ product objects.

**To add a static product:** Open `product-data.js` and add a new object:

```javascript
{
    id: 51,                         // ← Must be unique, increment from last
    name: "Product Name",
    category: "grains",             // ← Must match a valid category slug (see table below)
    rating: 4.7,
    supplier: {
        name: "Supplier Company Name",
        location: "State, India",
        experience: "X years experience"
    },
    certifications: ["FSSAI", "ISO"],   // ← Show as tags on card
    moq: "10 MT",
    leadTime: "7-10 days",
    capacity: "500 MT/month",
    description: "Full product description...",
    specifications: {
        "Key 1": "Value 1",
        "Key 2": "Value 2"
    }
}
```

#### Valid Category Slugs

| Slug | Display Name |
|---|---|
| `steel` | Steel Products |
| `nonferrous` | Non Ferrous Metals |
| `polymers` | Polymers & Plastics |
| `chemicals` | Chemicals |
| `wood` | Natural Wood |
| `plywood` | Plywood & Boards |
| `leather` | Leather & Leather Goods |
| `grains` | Grains & Cereals |
| `pulses` | Pulses & Lentils |
| `grocery` | Grocery & Spices |
| `agriculture` | Agriculture |
| `textiles` | Textiles & Fabrics |
| `engineering` | Engineering Goods |
| `electronics` | Electronics |
| `building` | Building Materials |
| `handicrafts` | Handicrafts |
| `gems` | Gems & Jewelry |
| `toys` | Toys & Games |
| `consumer` | Consumer Goods |

#### Type 2: Seller-Uploaded Products (via Seller Dashboard)
- Sellers add products through **Seller Dashboard → Add Product**.
- Saved in `localStorage['mockDB_sellerProducts']` as a JSON array.
- On `products.html`, `products.js` reads this localStorage and merges them **on top of** the static products.
- **⚠️ These products only exist in that specific browser.** If the seller clears browser data or switches devices, the products are lost. This is a current limitation of the mock system.

---

## 7. How Orders & Inquiries Work

### Current State: Inquiry-Based Model

> ⚠️ There is no real order management system yet. The platform uses an **inquiry model** — buyers express interest and sellers respond manually. No payment processing exists.

### How a Buyer Sends an Inquiry

1. Buyer browses to `products.html` or `product-detail.html`.
2. Clicks **"Request Quote"** or **"Contact Supplier"** on a product.
3. If not logged in → The auth modal opens.
4. Once logged in → A contact/inquiry form appears or redirects to `contact.html`.
5. The inquiry is submitted (currently handled by the contact form — see Section 8).

### Where Inquiries Go

- **Contact form submissions** go to `contact.html` form — which currently has no backend to capture them (see Section 8 to wire up EmailJS).
- **In the seller dashboard**, pre-seeded mock inquiries appear in "Inquiries & Leads" to demonstrate the UI.
- Real seller notifications are **not yet implemented** — the seller must manually check their dashboard.

### Seller Inquiry Workflow

1. Seller logs in → goes to `seller-dashboard.html`.
2. Clicks **"Inquiries & Leads"** in the sidebar.
3. Sees a table: Product, Buyer Name, Message, Date, Status (New / Responded / Closed).
4. Clicks **"Respond"** on a new inquiry → A modal opens to type a response.
5. Marks inquiry as Responded or Closed.
6. All stored in `localStorage['mockDB_inquiries']`.

---

## 8. How the Contact Form & Emails Work

### Current State

The contact form on `contact.html` has a fully styled UI but **does not send emails automatically**. The form submission is handled client-side only.

### How to Wire Up Email Sending (Recommended: EmailJS)

The easiest way to send emails from a pure static site is **EmailJS** (free tier: 200 emails/month).

**Step 1:** Go to [emailjs.com](https://www.emailjs.com/) and create a free account.

**Step 2:** Create an email service (connect your Gmail or info@evergrade.in inbox).

**Step 3:** Create an email template in EmailJS.

**Step 4:** Add this to `contact.html` before the closing `</body>`:

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
<script>
  emailjs.init("YOUR_PUBLIC_KEY");
  document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
      .then(() => alert('Message sent!'))
      .catch((error) => alert('Failed: ' + error.text));
  });
</script>
```

### Where Emails Currently Go

- **info@evergrade.in** – The business support email (shown on the contact page)
- This inbox is managed by **Hostinger email hosting** (since the domain is on Hostinger)
- **Access Hostinger Webmail:** Log in to [hpanel.hostinger.com](https://hpanel.hostinger.com) → Emails → Webmail
- **Set up email forwarding:** Hostinger Dashboard → Emails → Forwarders → Create forwarder from `info@evergrade.in` to any personal Gmail

---

## 9. Seller Dashboard – Full Walkthrough

**Files:** `seller-dashboard.html` + `js/dashboard.js` + `seller-dashboard.css`

### Access Control

The dashboard immediately checks authentication on load:
- **Not logged in** → Redirected to `index.html`
- **Logged in as Buyer** → Redirected to `index.html`
- **Logged in as Seller/Manufacturer** → Dashboard loads ✓

### Dashboard Sections (Sidebar Navigation)

| Section | What It Does |
|---|---|
| **Overview** | Stats cards (Total Products, Active Listings, New Inquiries, Response Rate) + Activity Feed + Profile Completion bar |
| **My Products** | Table of all seller's products. Toggle active/inactive. Edit or delete any product. Search and filter by category. |
| **Add Product** | Form to add a new product (name, category, MOQ, lead time, capacity, description, certifications, custom key-value specs). |
| **Bulk Upload** | Upload a CSV file to add multiple products at once. Includes template download, validation preview, and import. |
| **Inquiries & Leads** | Table of all buyer inquiries. Seller can respond via modal or close inquiries. |
| **Profile & Business** | Edit personal profile (phone, designation) and business details (company, GST, address). |
| **Support** | Seller can raise support tickets (product issues, payment, logistics). View existing ticket statuses. |

### CSV Bulk Upload Format

The downloadable template has these columns:

```
name, category, moq, leadTime, capacity, description, certifications
```

Example row:
```
"Basmati Rice","grains","10 MT","7-10 days","500 MT/month","Premium rice","FSSAI,ISO"
```

Required: `name`, `category`, `moq`, `description`. Others optional.

### Data Storage (Dashboard)

| localStorage Key | What's Stored |
|---|---|
| `mockDB_sellerProducts` | Array of this seller's products |
| `mockDB_inquiries` | Array of buyer inquiries |
| `mockDB_tickets` | Array of support tickets |
| `mockDB_sellerProfile` | Personal profile data |
| `mockDB_sellerBusiness` | Business details |
| `mockDB_activity` | Activity log (last 20 actions) |

---

## 10. GitHub Repository & Version Control

### What You Need to Access It

- **GitHub Account** with access to the Evergrade repository
- Get these credentials from the outgoing team

### Understanding the Repository

- The `main` branch is the **live production branch**. Every push to `main` automatically updates the live website within ~1-2 minutes.
- All `.html`, `.css`, `.js`, and asset files in the root are served directly.
- The `CNAME` file in the root tells GitHub Pages to serve the site at `www.evergrade.in`.

### ⚠️ Critical Rules

- **Never delete the `CNAME` file.** If deleted, the custom domain stops working.
- **Never commit real passwords or API keys** to the repository. The `firebase-config.js` currently has placeholder values only.
- Always test locally before pushing to `main`, since `main` = live site.

---

## 11. Hosting – GitHub Pages + Hostinger Domain

### How It All Connects

```
User types: www.evergrade.in
       ↓
Hostinger DNS → CNAME record → [github-org].github.io
       ↓
GitHub Pages → serves files from main branch
       ↓
User sees www.evergrade.in
```

### GitHub Pages Settings

- Go to: GitHub Repository → **Settings** → **Pages**
- Source: Deploy from branch → `main` → `/ (root)`
- Custom domain: `www.evergrade.in` (set via the `CNAME` file in the repo)
- HTTPS: ✅ Enforce HTTPS should be checked

### Hostinger DNS Settings

Log in to [hpanel.hostinger.com](https://hpanel.hostinger.com) → Domains → `evergrade.in` → DNS / Nameservers → DNS Records.

The critical CNAME record:

| Type | Name | Value |
|---|---|---|
| `CNAME` | `www` | `[your-github-org].github.io` |

GitHub also requires these **A records** for the apex domain (`evergrade.in` without www):

| Type | Name | Value |
|---|---|---|
| `A` | `@` | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |

> DNS changes can take up to 48 hours to propagate but usually happen within an hour.

### Domain Renewal

- The domain `evergrade.in` is registered on **Hostinger**.
- Check renewal date: Hostinger Dashboard → Domains → `evergrade.in`.
- Ensure auto-renew is enabled, or manually renew before expiry. An expired domain means the site goes dark.

---

## 12. How to Make Changes & Deploy

This is a static site with no build process. Making changes is straightforward.

### Workflow for Any Change

```
1. Edit the file(s) locally in your code editor
2. Test by opening the HTML file in your browser
   (Use VS Code's "Live Server" extension for best experience)
3. Commit and push to the main branch on GitHub
4. GitHub Pages automatically deploys — site updates in ~1-2 minutes
```

### Using Git (Command Line)

```bash
# Get the latest version first
git pull origin main

# After editing files, stage all changes
git add .

# Commit with a descriptive message
git commit -m "Updated contact phone number"

# Push — this triggers live deployment
git push origin main
```

### Editing Directly on GitHub (Quick Fixes)

For small text changes, you can edit in the browser:
1. Go to the file on GitHub.com
2. Click the **pencil (edit) icon** (top right of the file view)
3. Make your edits
4. Click **"Commit changes"** → commit to `main`

---

## 13. How to Add New Blog Posts

### Step 1: Create the Article File

Copy an existing blog file (e.g., `blog-hs-codes.html`) and rename it, e.g., `blog-payment-terms.html`.

### Step 2: Update the Content

Inside the copied file, change:
- The `<title>` tag
- The `<meta name="description">` tag
- The `<h1>` heading
- The article body (paragraphs, sections, list items)
- The publication date

**Keep** the `<header>`, `<footer>`, and `<script>` tags exactly as-is.

### Step 3: Link It in `blog.html`

Open `blog.html` and add a new card in the blog grid:

```html
<article class="blog-card">
    <div class="blog-card-img">
        <img src="assets/home/your-image.jpg" alt="Article Title">
    </div>
    <div class="blog-card-content">
        <span class="blog-tag">Trade Finance</span>
        <h3><a href="blog-payment-terms.html">Your New Article Title</a></h3>
        <p>Short description of the article (1-2 sentences).</p>
        <div class="blog-card-footer">
            <span>April 2026</span>
            <a href="blog-payment-terms.html" class="blog-read-more">Read More →</a>
        </div>
    </div>
</article>
```

### Step 4: Deploy

Commit and push both the new article file and the updated `blog.html`.

---

## 14. Firebase Configuration

Real Firebase is now integrated! The application connects to a live Firebase project (`evergrade-c716e`). 

### How It Was Set Up
- **Auth:** Email/Password authentication is enabled.
- **Database:** Firestore is enabled and stores the `users` and `sellers` collections.
- **Initialization:** Instead of loading full NPM packages, we load Firebase via CDN links in the HTML files and wrap the config in `js/firebase-init.js`.

### Where to Find the Config
If you ever need to change the Firebase project, open `js/firebase-init.js` and update the `firebaseConfig` object:

```javascript
// js/firebase-init.js
const firebaseConfig = {
    apiKey: "AIza...",
    authDomain: "evergrade-c716e.firebaseapp.com",
    projectId: "evergrade-c716e",
    storageBucket: "evergrade-c716e.firebasestorage.app",
    messagingSenderId: "307999208769",
    appId: "1:307999208769:web:2379c77d40b3438df09dc0",
    measurementId: "G-NK0LY1Q60W"
};
```

---

## 15. Common Maintenance Tasks

### ✅ Update a Product's Details

1. Open `product-data.js`
2. Find the product by `name` or `id`
3. Edit the relevant fields
4. Commit and push

### ✅ Add a New Product Category

1. Add slug + name to `categoryNames` in `products.js`
2. Add the filter checkbox in `products.html`
3. Add it to the footer links in all pages
4. Add it to the header dropdown menus

### ✅ Update Contact Details (Phone, Email, Address)

These appear in `contact.html` and the footer of every page.
Use **VS Code's Find in Files** (`Ctrl+Shift+F`) to search for `98186 23615` or `info@evergrade.in` across all files and update each occurrence.

### ✅ Change the Logo

Replace `assets/logo.svg` (dark bg) and `assets/logo-white.svg` (light bg) with new files of the same filenames. No code changes needed.

### ✅ Change Brand Colors

Open `style.css`. At the very top, find the CSS custom properties (variables):

```css
:root {
  --color-primary: #F37021;   /* Orange brand color */
  --color-text-dark: #1a1a2e;
  /* etc. */
}
```

Change values here — they apply everywhere site-wide automatically.

### ✅ Site Not Loading / Down

1. Check the GitHub Pages deployment: Repo → **Actions** tab → look for failed workflows
2. Check DNS: Is the Hostinger CNAME record still pointing to GitHub Pages?
3. Check the `CNAME` file still exists in the repo root with content `www.evergrade.in`
4. Check the domain hasn't expired: Hostinger → Domains → `evergrade.in`

### ✅ A Page Shows a 404 Error

GitHub Pages serves files by their exact filename. Common causes:
- You renamed a file but didn't update links pointing to it
- A link has a typo (`Products.html` vs `products.html` — servers are case-sensitive)

---



> **You're all set!** This document covers the complete Evergrade platform — how it was built, how it works, and how to keep it running. The codebase is well-commented; start with any HTML page and trace the `<script>` tags at the bottom to find the controlling JS file for that page.
>
> Good luck with the handover, and feel free to reach out to the outgoing team with any questions during the transition period. 🚀
