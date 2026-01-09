document.addEventListener('DOMContentLoaded', () => {

    // --- 1. MENÚ MÓVIL Y MODO OSCURO ---
    const menuBtn = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;

    if (menuBtn) {
        menuBtn.addEventListener('click', () => navList.classList.toggle('show-menu'));
    }

    if (localStorage.getItem('dark-mode') === 'true') {
        body.classList.add('dark-mode');
        if(themeBtn) themeBtn.querySelector('i').className = 'fas fa-sun';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('dark-mode', isDark);
            themeBtn.querySelector('i').className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        });
    }

    // --- 2. LÓGICA DE PROYECTOS ---
    const gridContainer = document.getElementById('projects-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (gridContainer) {
        const allProjects = [
            // CIBERSEGURIDAD
            { title: "Auditoría Wi-Fi", cat: "ciber", desc: "Análisis de vulnerabilidades en redes WPA2 con Aircrack-ng.", tech: ["fas fa-wifi", "fab fa-linux"] },
            { title: "Pentesting Web", cat: "ciber", desc: "Pruebas de inyección SQL y XSS en entornos de prueba seguros.", tech: ["fas fa-shield-alt", "fas fa-database"] },
            { title: "Firewall IP", cat: "ciber", desc: "Configuración y endurecimiento de iptables en servidores Linux.", tech: ["fas fa-server", "fas fa-lock"] },
            { title: "Análisis Malware", cat: "ciber", desc: "Ingeniería inversa básica de troyanos en entorno sandbox.", tech: ["fas fa-bug", "fab fa-windows"] },
            { title: "Phishing Sim", cat: "ciber", desc: "Simulador de campañas de concienciación para empleados.", tech: ["fas fa-user-secret", "fas fa-envelope"] },
            { title: "Hardening Linux", cat: "ciber", desc: "Aseguramiento de servidores Ubuntu Server.", tech: ["fab fa-linux", "fas fa-key"] },
            { title: "Sniffer Red", cat: "ciber", desc: "Captura y análisis de paquetes con Python y Scapy.", tech: ["fab fa-python", "fas fa-network-wired"] },
            { title: "VPN Corp", cat: "ciber", desc: "Despliegue de OpenVPN con autenticación 2FA.", tech: ["fas fa-globe", "fas fa-unlock"] },
            { title: "SIEM Monitor", cat: "ciber", desc: "Monitorización de logs con Elastic Stack.", tech: ["fas fa-eye", "fas fa-chart-line"] },
            { title: "Criptografía", cat: "ciber", desc: "Herramienta de cifrado AES-256 en Java.", tech: ["fab fa-java", "fas fa-file-code"] },

            // DESARROLLO WEB
            { title: "E-Commerce", cat: "web", desc: "Tienda online completa con pasarela de pago Stripe.", tech: ["fab fa-react", "fab fa-node"] },
            { title: "Portfolio V1", cat: "web", desc: "Diseño de web personal responsive desde cero.", tech: ["fab fa-html5", "fab fa-css3"] },
            { title: "Dashboard", cat: "web", desc: "Panel de administración interactivo para empresas.", tech: ["fab fa-vuejs", "fas fa-chart-pie"] },
            { title: "Blog CMS", cat: "web", desc: "Sistema de gestión de contenidos a medida en PHP.", tech: ["fab fa-php", "fas fa-database"] },
            { title: "Chat Real-time", cat: "web", desc: "Aplicación de mensajería instantánea con Socket.io.", tech: ["fab fa-js", "fas fa-comments"] },
            { title: "Weather App", cat: "web", desc: "Consulta del tiempo usando API externa.", tech: ["fab fa-js", "fas fa-cloud-sun"] },
            { title: "Landing Page", cat: "web", desc: "Página de aterrizaje optimizada para alta conversión.", tech: ["fab fa-sass", "fab fa-html5"] },
            { title: "Task Manager", cat: "web", desc: "Gestor de tareas tipo Trello con Drag & Drop.", tech: ["fab fa-angular", "fab fa-docker"] },
            { title: "Social Network", cat: "web", desc: "Red social para desarrolladores.", tech: ["fab fa-react", "fas fa-users"] },
            { title: "Restaurant App", cat: "web", desc: "Web de reservas y menú digital.", tech: ["fab fa-wordpress", "fas fa-utensils"] },

            // PROGRAMACIÓN
            { title: "Gestor SQL", cat: "prog", desc: "Aplicación de escritorio para gestionar BBDD MySQL.", tech: ["fab fa-java", "fas fa-database"] },
            { title: "Juego 2D", cat: "prog", desc: "Juego de plataformas creado en Unity y C#.", tech: ["fab fa-unity", "fas fa-gamepad"] },
            { title: "Script Auto", cat: "prog", desc: "Automatización de backups diarios con Python.", tech: ["fab fa-python", "fas fa-robot"] },
            { title: "Calculadora", cat: "prog", desc: "Calculadora científica compleja hecha en C++.", tech: ["fas fa-calculator", "fas fa-code"] },
            { title: "Gestor Stock", cat: "prog", desc: "Control de inventario para almacenes pymes.", tech: ["fab fa-windows", "fas fa-boxes"] },
            { title: "Bot Discord", cat: "prog", desc: "Bot de moderación y música para servidores gaming.", tech: ["fab fa-node-js", "fab fa-discord"] },
            { title: "Scraper Web", cat: "prog", desc: "Extracción automática de precios de la competencia.", tech: ["fab fa-python", "fas fa-spider"] },
            { title: "Mobile App", cat: "prog", desc: "App nativa de lista de la compra en Kotlin.", tech: ["fab fa-android", "fas fa-mobile-alt"] },
            { title: "Algoritmo IA", cat: "prog", desc: "Red neuronal básica para clasificar imágenes simples.", tech: ["fab fa-python", "fas fa-brain"] },
            { title: "File Compressor", cat: "prog", desc: "Compresor de archivos personalizado en C#.", tech: ["fab fa-windows", "fas fa-file-archive"] }
        ];

        let currentFilter = 'all';
        let projectsShown = 0;
        const initialLoad = 9;
        const loadBatch = 6;

        function getFilteredProjects() {
            if (currentFilter === 'all') return allProjects;
            return allProjects.filter(p => p.cat === currentFilter);
        }

        function createCard(project) {
            const card = document.createElement('article');
            card.className = `project-card ${project.cat}`;

            let mainIcon = 'fas fa-code';
            let catName = 'General';

            if (project.cat === 'ciber') { mainIcon = 'fas fa-shield-alt'; catName = 'Ciberseguretat'; }
            if (project.cat === 'web')   { mainIcon = 'fas fa-globe'; catName = 'Web Dev'; }
            if (project.cat === 'prog')  { mainIcon = 'fas fa-terminal'; catName = 'Programació'; }

            let techHtml = '';
            project.tech.forEach(iconClass => {
                techHtml += `<i class="${iconClass}"></i>`;
            });

            card.innerHTML = `
                <div class="card-visual">
                    <i class="${mainIcon}"></i>
                </div>
                <div class="card-basic-info">
                    <h3>${project.title}</h3>
                    <span>${catName}</span>
                </div>
                <div class="card-hover-info">
                    <p>${project.desc}</p>
                    <div class="tech-stack-icons">
                        ${techHtml}
                    </div>
                </div>
            `;
            return card;
        }

        function renderProjects(reset = false) {
            if (reset) {
                gridContainer.innerHTML = '';
                projectsShown = 0;
                loadMoreBtn.style.display = 'block';
            }
            const filtered = getFilteredProjects();
            const total = filtered.length;
            if (total === 0) {
                gridContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No hay proyectos disponibles.</p>';
                loadMoreBtn.style.display = 'none';
                return;
            }
            let nextLimit = reset ? initialLoad : projectsShown + loadBatch;
            if (nextLimit > total) nextLimit = total;
            for (let i = projectsShown; i < nextLimit; i++) {
                gridContainer.appendChild(createCard(filtered[i]));
            }
            projectsShown = nextLimit;
            if (projectsShown >= total) {
                loadMoreBtn.style.display = 'none';
            }
        }

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.getAttribute('data-filter');
                renderProjects(true);
            });
        });

        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => renderProjects(false));
        }

        renderProjects(true);
    }

    // --- 3. LÓGICA DE CONTACTO ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;

            // Efecto de éxito
            btn.innerHTML = '<i class="fas fa-check"></i> ENVIAT!';
            btn.style.background = '#28a745';

            setTimeout(() => {
                alert('Missatge enviat correctament! (Simulació)');
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.style.background = '';
            }, 1000);
        });
    }

    // --- 4. ANIMACIONES SCROLL (ABOUT ME) ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => observer.observe(el));
    }
});