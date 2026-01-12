# 🛡️ Cybersecurity & Web Development Portfolio - ITB

This repository contains the source code for a personal/professional portfolio website, designed to showcase Cybersecurity, Web Development, and Programming projects. The site is fully responsive, features a dark mode, and utilizes dynamic project management via JavaScript.

## 🚀 Key Features

* **Responsive Design:** Adaptable to mobile, tablet, and desktop (Mobile-First approach).
* **Dark Mode:** User preference is saved in the browser (`localStorage`) to remember the choice.
* **Dynamic Project Management:** Projects on the `projects.html` page are generated automatically from a JavaScript object array, making it easy to scale.
* **Filtering System:** Functional filters to view projects by category (All, Cybersecurity, Web Dev, Programming).
* **Detail Pages (Zig-Zag):** Alternating visual structure (image-text / text-image) for in-depth project descriptions.
* **Contact Simulation:** Form with visual validation, "Loading" state, and "Toast" style notifications (no page reload).
* **Animations:** Smooth fade-in effects upon scrolling (`IntersectionObserver`).
* **Clean Code:** Strict separation of Structure (HTML), Style (CSS), and Logic (JS). **Zero inline styles.**

## 🛠️ Technologies Used

* **HTML5:** Semantic structure (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
* **CSS3:** CSS Variables (`:root`), Flexbox, CSS Grid, and Media Queries.
* **JavaScript (Vanilla):** DOM manipulation, Event Listeners, and rendering logic.
* **External Resources:**
    * [FontAwesome](https://fontawesome.com/) (Icons).
    * [Google Fonts](https://fonts.google.com/) (Inter Typography).

## 📂 Project Structure

```text
/
├── index.html            # Landing Page
├── projects.html         # Complete project gallery (with filters)
├── about-me.html         # Biography, skills, and timeline
├── contact.html          # Contact form
├── project-detail-1.html # Project Detail: Palma Protocol (Game Dev)
├── project-detail-2.html # Project Detail: SSI Computer (Hardware/IT)
│
├── CSS/
│   └── index.css         # Single global stylesheet
│
├── JS/
│   └── java.js           # Logic for menu, dark mode, and project database
│
└── IMG/                  # General images (Logos, icons, etc.)
    ├── IMG_PROY_CIB/     # Specific folder for cybersecurity screenshots
    │   ├── proy_cib_1.png
    │   ├── proy_cib_2.png
    │   └── ...
    └── ...
