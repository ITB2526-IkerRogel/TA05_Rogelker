document.addEventListener('DOMContentLoaded', () => {

    // --- 1. MENÚ DEL MÓVIL ---
    const menuBtn = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navList.classList.toggle('show-menu');
        });
    }

    // --- 2. BOTÓN DE MODO OSCURO ---
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeBtn ? themeBtn.querySelector('i') : null;

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');

            // Cambia el icono: Luna <-> Sol
            if (body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }
});