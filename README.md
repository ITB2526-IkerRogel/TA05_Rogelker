# 🛡️ Portfolio de Ciberseguridad y Desarrollo Web - ITB

Este repositorio contiene el código fuente de un sitio web tipo portfolio personal/profesional, diseñado para mostrar proyectos de Ciberseguridad, Desarrollo Web y Programación. El sitio es totalmente responsivo, cuenta con modo oscuro y una gestión dinámica de proyectos mediante JavaScript.

## 🚀 Características Principales

* **Diseño Responsivo:** Adaptable a móviles, tablets y escritorio (Mobile-First).
* **Modo Oscuro (Dark Mode):** Preferencia guardada en el navegador (`localStorage`) para recordar la elección del usuario.
* **Gestión Dinámica de Proyectos:** Los proyectos en la página `projects.html` se generan automáticamente desde un array de objetos en JavaScript, facilitando la escalabilidad.
* **Sistema de Filtrado:** Filtros funcionales para ver proyectos por categoría (All, Cybersecurity, Web Dev, Programming).
* **Páginas de Detalle (Zig-Zag):** Estructura visual alterna (imagen-texto / texto-imagen) para la descripción profunda de proyectos.
* **Simulación de Contacto:** Formulario con validación visual, estado de "Cargando" y notificaciones tipo "Toast" (sin recarga de página).
* **Animaciones:** Efectos de aparición suave al hacer scroll (`IntersectionObserver`).
* **Código Limpio:** Separación estricta de estructura (HTML), estilo (CSS) y lógica (JS). **Cero estilos en línea.**

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Estructura semántica (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
* **CSS3:** Variables CSS (`:root`), Flexbox, CSS Grid y Media Queries.
* **JavaScript (Vanilla):** Manipulación del DOM, Event Listeners y lógica de renderizado.
* **Recursos Externos:**
    * [FontAwesome](https://fontawesome.com/) (Iconos).
    * [Google Fonts](https://fonts.google.com/) (Tipografía Inter).

## 📂 Estructura del Proyecto

```text
/
├── index.html            # Página de inicio (Landing Page)
├── projects.html         # Galería completa de proyectos (con filtros)
├── about-me.html         # Biografía, habilidades y línea de tiempo
├── contact.html          # Formulario de contacto
├── project-detail-1.html # Detalle Proyecto: Palma Protocol (Game Dev)
├── project-detail-2.html # Detalle Proyecto: SSI Computer (Hardware/IT)
│
├── CSS/
│   └── index.css         # Hoja de estilos única y global
│
├── JS/
│   └── java.js           # Lógica del menú, modo oscuro y base de datos de proyectos
│
└── IMG/                  # Imágenes generales (Logos, iconos, etc.)
    ├── IMG_PROY_CIB/     # Carpeta específica para capturas de ciberseguridad
    │   ├── proy_cib_1.png
    │   ├── proy_cib_2.png
    │   └── ...
    └── ...
