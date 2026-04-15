# AVN Techno — Solar Company Website

A modern, responsive, professional React website for **AVN Techno** solar company.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm installed

### 1. Install Dependencies

```bash
cd avn-techno
npm install
npm install -D tailwindcss postcss autoprefixer
```

### 2. Start Development Server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
avn-techno/
├── public/
│   └── index.html              # HTML template with Google Fonts
├── src/
│   ├── components/
│   │   ├── Navbar.js           # Sticky navbar with hamburger menu
│   │   ├── Footer.js           # Footer with newsletter strip
│   │   ├── WhatsAppButton.js   # Floating WhatsApp CTA
│   │   ├── SectionHeader.js    # Reusable section title block
│   │   ├── StatsBar.js         # Animated statistics counter
│   │   ├── FAQ.js              # Accordion FAQ section
│   │   └── useScrollAnimation.js  # IntersectionObserver hook
│   ├── pages/
│   │   ├── Home.js             # Hero, Features, Testimonials, CTA
│   │   ├── About.js            # Company intro, Mission/Vision, Team
│   │   ├── Services.js         # 6 service cards with details
│   │   ├── Projects.js         # Filterable project gallery
│   │   └── Contact.js          # Contact form + map + FAQ
│   ├── App.js                  # Router + layout wrapper
│   ├── index.js                # React entry point
│   └── index.css               # Tailwind + custom styles
├── tailwind.config.js          # Tailwind theme (colors, fonts, animations)
├── postcss.config.js           # PostCSS config
└── package.json
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary color | Green (`#16a34a` – Tailwind `primary-600`) |
| Accent color | Amber/Solar Yellow (`#F59E0B`) |
| Display font | Playfair Display (serif) |
| Body font | DM Sans (sans-serif) |
| Border radius | `rounded-xl` / `rounded-2xl` / `rounded-3xl` |

---

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, Stats, Features, Process, Testimonials, CTA, FAQ |
| About | `/about` | Story, Mission/Vision, Why Us, Team |
| Services | `/services` | 6 service cards (Residential, Commercial, Battery, Pump, AMC, Audit) |
| Projects | `/projects` | Filterable gallery (All / Residential / Commercial / Agricultural) |
| Contact | `/contact` | Validated form, Google Maps embed, contact cards, FAQ |

---

## ✨ Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Sticky navbar with scroll shadow + mobile hamburger
- ✅ Smooth scroll animations (IntersectionObserver)
- ✅ Animated statistics counter
- ✅ Accordion FAQ component
- ✅ Floating WhatsApp button with tooltip
- ✅ Contact form with validation + success state
- ✅ Project gallery with category filters
- ✅ Google Maps embed
- ✅ Newsletter subscription strip in footer

---

## ⚙️ Customization

### Update WhatsApp Number
In `src/components/WhatsAppButton.js`:
```js
const phone = '919876543210'; // Replace with your number (country code + number)
```

### Update Contact Details
In `src/components/Footer.js` and `src/pages/Contact.js` — search for `+91 12345 67890` and `info@avntechno.in`.

### Update Google Maps
In `src/pages/Contact.js` — replace the `src` URL in the `<iframe>` with your own Google Maps embed URL.

---

## 🛠 Tech Stack

- **React 18** — UI library
- **React Router v6** — client-side routing
- **Tailwind CSS** — utility-first styling
- **Lucide React** — icon library

---

© 2025 AVN Techno. Built with ☀️ and React.
