document.addEventListener('DOMContentLoaded', () => {

    // --- 1. MOBILE MENU & DARK MODE ---
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

    // --- 2. PROJECTS LOGIC ---
    const gridContainer = document.getElementById('projects-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (gridContainer) {
        // Translated Project Data
        const allProjects = [
            // FIRST TWO WITH LINKS
            {
                title: "Wi-Fi Audit",
                cat: "ciber",
                desc: "Vulnerability analysis in WPA2 networks with Aircrack-ng.",
                tech: ["fas fa-wifi", "fab fa-linux"],
                url: "project-detail-2.html"
            },
            {
                title: "E-Commerce",
                cat: "web",
                desc: "Complete online store with Stripe payment gateway.",
                tech: ["fab fa-react", "fab fa-node"],
                url: "project-detail-1.html"
            },
            // THE REST
            { title: "SQL Manager", cat: "prog", desc: "Desktop app to manage MySQL DBs.", tech: ["fab fa-java", "fas fa-database"] },
            { title: "Web Pentesting", cat: "ciber", desc: "SQL injection and XSS tests in safe environments.", tech: ["fas fa-shield-alt", "fas fa-database"] },
            { title: "IP Firewall", cat: "ciber", desc: "Configuration and hardening of iptables in Linux.", tech: ["fas fa-server", "fas fa-lock"] },
            { title: "Malware Analysis", cat: "ciber", desc: "Reverse engineering of trojans in sandbox.", tech: ["fas fa-bug", "fab fa-windows"] },
            { title: "Phishing Sim", cat: "ciber", desc: "Awareness campaign simulator for employees.", tech: ["fas fa-user-secret", "fas fa-envelope"] },
            { title: "Portfolio V1", cat: "web", desc: "Personal responsive web design from scratch.", tech: ["fab fa-html5", "fab fa-css3"] },
            { title: "Linux Hardening", cat: "ciber", desc: "Securing Ubuntu Servers following CIS guides.", tech: ["fab fa-linux", "fas fa-key"] },
            { title: "Dashboard", cat: "web", desc: "Interactive admin panel for companies.", tech: ["fab fa-vuejs", "fas fa-chart-pie"] },
            { title: "Network Sniffer", cat: "ciber", desc: "Packet capture and analysis with Python/Scapy.", tech: ["fab fa-python", "fas fa-network-wired"] },
            { title: "Corp VPN", cat: "ciber", desc: "OpenVPN deployment with 2FA.", tech: ["fas fa-globe", "fas fa-unlock"] },
            { title: "Blog CMS", cat: "web", desc: "Custom content management system in PHP.", tech: ["fab fa-php", "fas fa-database"] },
            { title: "Real-time Chat", cat: "web", desc: "Instant messaging app with Socket.io.", tech: ["fab fa-js", "fas fa-comments"] },
            { title: "Weather App", cat: "web", desc: "Forecast using external API and geolocation.", tech: ["fab fa-js", "fas fa-cloud-sun"] },
            { title: "Landing Page", cat: "web", desc: "High conversion optimized landing page.", tech: ["fab fa-sass", "fab fa-html5"] },
            { title: "2D Game", cat: "prog", desc: "Platform game created in Unity and C#.", tech: ["fab fa-unity", "fas fa-gamepad"] },
            { title: "Auto Script", cat: "prog", desc: "Daily backup automation with Python.", tech: ["fab fa-python", "fas fa-robot"] },
            { title: "Calculator", cat: "prog", desc: "Complex scientific calculator made in C++.", tech: ["fas fa-calculator", "fas fa-code"] },
            { title: "Stock Manager", cat: "prog", desc: "Inventory control for SME warehouses.", tech: ["fas fa-boxes"] },
            { title: "Discord Bot", cat: "prog", desc: "Moderation and music bot for gaming servers.", tech: ["fab fa-node-js", "fab fa-discord"] },
            { title: "Web Scraper", cat: "prog", desc: "Automatic competitor price extraction.", tech: ["fab fa-python", "fas fa-spider"] },
            { title: "Mobile App", cat: "prog", desc: "Native shopping list app in Kotlin.", tech: ["fab fa-android", "fas fa-mobile-alt"] },
            { title: "AI Algorithm", cat: "prog", desc: "Basic neural network for image classification.", tech: ["fab fa-python", "fas fa-brain"] },
            { title: "File Compressor", cat: "prog", desc: "Custom file compressor in C#.", tech: ["fas fa-file-archive"] }
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
            const elementType = project.url ? 'a' : 'article';
            const card = document.createElement(elementType);

            card.className = `project-card ${project.cat}`;

            if(project.url) {
                card.href = project.url;
                card.style.textDecoration = 'none';
                card.style.color = 'inherit';
                card.style.display = 'flex';
            }

            let mainIcon = 'fas fa-code';
            let catName = 'General';

            if (project.cat === 'ciber') { mainIcon = 'fas fa-shield-alt'; catName = 'Cybersecurity'; }
            if (project.cat === 'web')   { mainIcon = 'fas fa-globe'; catName = 'Web Dev'; }
            if (project.cat === 'prog')  { mainIcon = 'fas fa-terminal'; catName = 'Programming'; }

            let techHtml = '';
            if(project.tech) {
                project.tech.forEach(iconClass => {
                    techHtml += `<i class="${iconClass}"></i>`;
                });
            }

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
                    ${project.url ? '<p style="margin-top:15px; font-weight:bold; color:var(--itb-red)">CLICK FOR DETAILS <i class="fas fa-arrow-right"></i></p>' : ''}
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
                gridContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No projects found.</p>';
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

    // --- 3. CONTACT LOGIC ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-check"></i> SENT!';
            btn.style.background = '#28a745';

            setTimeout(() => {
                alert('Message sent successfully! (Simulation)');
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.style.background = '';
            }, 1000);
        });
    }

    // --- 4. SCROLL ANIMATIONS ---
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