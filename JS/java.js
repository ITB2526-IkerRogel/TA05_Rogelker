document.addEventListener('DOMContentLoaded', () => {

    // --- 1. MENU & DARK MODE ---
    const menuBtn = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;

    if (menuBtn) menuBtn.addEventListener('click', () => navList.classList.toggle('show-menu'));

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

    // --- 2. PROJECTS GENERATOR ---
    const gridContainer = document.getElementById('projects-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (gridContainer) {
        // FULL DATABASE (ALL IMAGES INCLUDED)
        const allProjects = [
            // 1. LINKED SOC
            {
                title: "SOC Automation & SIEM", cat: "ciber",
                desc: "Complete ELK Stack deployment for threat hunting.",
                tech: ["fas fa-shield-virus", "fas fa-server"],
                url: "project-detail-1.html",
                image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop"
            },
            // 2. LINKED RED TEAM
            {
                title: "Corporate Pentest Audit", cat: "ciber",
                desc: "Black box audit: Network recon and exploitation.",
                tech: ["fas fa-user-secret", "fab fa-linux"],
                url: "project-detail-2.html",
                image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop"
            },
            // REST OF PROJECTS (28 more)
            {
                title: "Wi-Fi Security Audit", cat: "ciber", desc: "WPA2 Handshake analysis with Aircrack-ng.", tech: ["fas fa-wifi"],
                image: "https://images.unsplash.com/photo-1544197150-b99a580bbcbf?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "SQL Injection Labs", cat: "ciber", desc: "Testing database vulnerabilities.", tech: ["fas fa-database"],
                image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "E-Commerce Secure", cat: "web", desc: "Online store with secure payments.", tech: ["fab fa-react"],
                image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Linux Hardening", cat: "ciber", desc: "Securing production servers.", tech: ["fab fa-linux"],
                image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Network Sniffer", cat: "ciber", desc: "Packet analysis with Python.", tech: ["fab fa-python"],
                image: "https://images.unsplash.com/photo-1551721434-8b94353ba0af?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Malware Analysis", cat: "ciber", desc: "Reverse engineering in sandbox.", tech: ["fas fa-bug"],
                image: "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Corporate VPN", cat: "ciber", desc: "OpenVPN setup with 2FA.", tech: ["fas fa-key"],
                image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Phishing Simulator", cat: "ciber", desc: "Employee awareness tool.", tech: ["fas fa-envelope"],
                image: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Firewall Rules", cat: "ciber", desc: "Advanced iptables configuration.", tech: ["fas fa-server"],
                image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Cryptography Tool", cat: "ciber", desc: "AES-256 encryption utility.", tech: ["fab fa-java"],
                image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Portfolio V1", cat: "web", desc: "Responsive personal website.", tech: ["fab fa-html5", "fab fa-css3"],
                image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Admin Dashboard", cat: "web", desc: "Internal management tool.", tech: ["fab fa-vuejs"],
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Secure Chat", cat: "web", desc: "Encrypted messaging app.", tech: ["fab fa-js"],
                image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Blog CMS", cat: "web", desc: "Content management system.", tech: ["fab fa-php"],
                image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Weather API", cat: "web", desc: "Forecast dashboard.", tech: ["fas fa-cloud-sun"],
                image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Landing Page", cat: "web", desc: "High conversion design.", tech: ["fab fa-sass"],
                image: "https://images.unsplash.com/photo-1467232031835-444db162ef80?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Task Manager", cat: "web", desc: "Kanban board app.", tech: ["fab fa-angular"],
                image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Restaurant App", cat: "web", desc: "Booking system.", tech: ["fab fa-wordpress"],
                image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Inventory System", cat: "prog", desc: "Desktop stock management.", tech: ["fab fa-java"],
                image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "2D Game Engine", cat: "prog", desc: "Unity game development.", tech: ["fab fa-unity"],
                image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Backup Script", cat: "prog", desc: "Automated Python backups.", tech: ["fab fa-python"],
                image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Scientific Calc", cat: "prog", desc: "C++ Calculator.", tech: ["fas fa-calculator"],
                image: "https://images.unsplash.com/photo-1587145820266-a2651c463853?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Gestor Stock", cat: "prog", desc: "Inventory.", tech: ["fas fa-boxes"],
                image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Bot Discord", cat: "prog", desc: "Server moderation bot.", tech: ["fab fa-discord"],
                image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Web Scraper", cat: "prog", desc: "Data extraction tool.", tech: ["fas fa-spider"],
                image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Android App", cat: "prog", desc: "Native Kotlin app.", tech: ["fab fa-android"],
                image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "AI Classifier", cat: "prog", desc: "Neural network model.", tech: ["fas fa-brain"],
                image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "File Compressor", cat: "prog", desc: "Custom compression tool.", tech: ["fas fa-file-archive"],
                image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=800&auto=format&fit=crop"
            }
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

            let backgroundStyle = '';
            if (project.image) {
                backgroundStyle = `background-image: url('${project.image}');`;
            }

            let visualContent = '';
            if (!project.image) {
                let mainIcon = 'fas fa-code';
                if (project.cat === 'ciber') mainIcon = 'fas fa-shield-alt';
                if (project.cat === 'web')   mainIcon = 'fas fa-globe';
                if (project.cat === 'prog')  mainIcon = 'fas fa-terminal';
                visualContent = `<i class="${mainIcon}"></i>`;
            }

            let techHtml = '';
            if(project.tech) {
                project.tech.forEach(iconClass => {
                    techHtml += `<i class="${iconClass}"></i>`;
                });
            }

            card.innerHTML = `
                <div class="card-visual" style="${backgroundStyle}">
                    ${visualContent}
                </div>
                <div class="card-basic-info">
                    <h3>${project.title}</h3>
                    <span>${project.cat === 'ciber' ? 'Cybersecurity' : project.cat === 'web' ? 'Web Dev' : 'Programming'}</span>
                </div>
                <div class="card-hover-info">
                    <p>${project.desc}</p>
                    <div class="tech-stack-icons">
                        ${techHtml}
                    </div>
                    ${project.url ? '<p style="margin-top:15px; font-weight:bold; color:var(--itb-red); text-transform:uppercase; font-size:0.9rem;">Click for Details <i class="fas fa-arrow-right"></i></p>' : ''}
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
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1 });
        animatedElements.forEach(el => observer.observe(el));
    }
});