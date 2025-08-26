        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });

        // Theme management without localStorage
        let currentTheme = 'light';
        let currentLanguage = 'english';

        const themeData = {
            light: { button: 'lightTheme', attr: 'light' },
            dark: { button: 'darkTheme', attr: 'dark' }
        };

        const languageData = {
            arabic: { 
                button: 'arabicLang', 
                dir: 'rtl', 
                lang: 'ar',
                content: {
                    brand: 'محمود أحمد',
                    nav: ['عني', 'المهارات', 'المهارات المتقدمة', 'الخبرة', 'المشاريع', 'التعليم', 'التواصل'],
                    hero: {
                        name: 'محمود أحمد محمود',
                        title: 'مطور Full Stack .NET | مطور CRM',
                        description: 'أطور أنظمة عالية الأداء وقابلة للتوسع باستخدام .NET و Angular و React وحلول CRM المتقدمة لتحقيق التحول الرقمي الفعال',
                        contactBtn: 'تواصل معي',
                        projectsBtn: 'مشاهدة الأعمال'
                    }
                }
            },
            english: { 
                button: 'englishLang', 
                dir: 'ltr', 
                lang: 'en',
                content: {
                    brand: 'Mahmoud Ahmed',
                    nav: ['About', 'Skills', 'Advanced Skills', 'Experience', 'Projects', 'Education', 'Contact'],
                    hero: {
                        name: 'Mahmoud Ahmed Mahmoud',
                        title: 'Full Stack .NET Developer | CRM Developer',
                        description: 'I build high-performance, scalable systems using .NET, Angular, React, and advanced CRM solutions to drive effective digital transformation',
                        contactBtn: 'Contact Me',
                        projectsBtn: 'View Projects'
                    }
                }
            }
        };

        // Theme switching
        function switchTheme(theme) {
            currentTheme = theme;
            document.documentElement.setAttribute('data-theme', theme);
            
            // Update active button
            Object.values(themeData).forEach(data => {
                document.getElementById(data.button).classList.remove('active');
            });
            document.getElementById(themeData[theme].button).classList.add('active');
        }

        // Language switching  
        function switchLanguage(language) {
            currentLanguage = language;
            const langData = languageData[language];
            
            document.documentElement.setAttribute('dir', langData.dir);
            document.documentElement.setAttribute('lang', langData.lang);
            
            // Update active button
            Object.values(languageData).forEach(data => {
                document.getElementById(data.button).classList.remove('active');
            });
            document.getElementById(langData.button).classList.add('active');
            
            // Update content
            updateContent(langData.content);
        }

        function updateContent(content) {
            // Update brand
            document.querySelector('.navbar-brand').textContent = content.brand;
            
            // Update navigation
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach((link, index) => {
                if (content.nav[index]) {
                    link.textContent = content.nav[index];
                }
            });
            
            // Update hero section
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.querySelector('h1').textContent = content.hero.name;
                heroContent.querySelector('h2').textContent = content.hero.title;
                heroContent.querySelector('.lead').textContent = content.hero.description;
                
                const buttons = heroContent.querySelectorAll('.btn');
                if (buttons[0]) buttons[0].innerHTML = `<i class="bi bi-envelope-fill"></i> ${content.hero.contactBtn}`;
                if (buttons[1]) buttons[1].innerHTML = `<i class="bi bi-code-square"></i> ${content.hero.projectsBtn}`;
            }
        }

        // Create particles for background
        function createParticles() {
            const container = document.getElementById('particles');
            const particleCount = 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random size between 3 and 8px
                const size = Math.random() * 5 + 3;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Random position
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                // Random animation duration
                const duration = Math.random() * 20 + 10;
                particle.style.animationDuration = `${duration}s`;
                
                // Random delay
                const delay = Math.random() * 5;
                particle.style.animationDelay = `-${delay}s`;
                
                container.appendChild(particle);
            }
        }

        // Back to top functionality
        const backToTopBtn = document.getElementById('backToTop');
        
        function toggleBackToTop() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Update progress bar on scroll
        function updateProgressBar() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            document.getElementById("progressBar").style.width = scrolled + "%";
        }

        window.addEventListener('scroll', () => {
            toggleBackToTop();
            updateProgressBar();
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 140;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Initialize particles
        createParticles();

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            // Set initial theme and language
            switchTheme('light');
            switchLanguage('english');
            
            // Add active class to current nav item based on scroll
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            function updateActiveNav() {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 160;
                    const sectionHeight = section.clientHeight;
                    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            }
            
            window.addEventListener('scroll', updateActiveNav);
            
            // Navbar background on scroll
            const navbar = document.querySelector('.navbar');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.style.backgroundColor = 'rgba(26, 54, 93, 0.98)';
                } else {
                    navbar.style.backgroundColor = 'rgba(26, 54, 93, 0.95)';
                }
            });
            
            // Add loading animation delay
            const loadingElements = document.querySelectorAll('.loading');
            loadingElements.forEach((el, index) => {
                el.style.animationDelay = `${index * 0.1}s`;
            });
            
            // Typing effect for hero title
            const heroTitle = document.querySelector('.hero h1');
            if (heroTitle) {
                const originalText = heroTitle.textContent;
                heroTitle.textContent = '';
                let i = 0;
                
                function typeWriter() {
                    if (i < originalText.length) {
                        heroTitle.textContent += originalText.charAt(i);
                        i++;
                        setTimeout(typeWriter, 100);
                    }
                }
                
                setTimeout(typeWriter, 1000);
            }
            
            // Animate timeline items on scroll
            const timelineItems = document.querySelectorAll('.timeline-item');
            const timelineObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.3 });
            
            timelineItems.forEach(item => {
                timelineObserver.observe(item);
            });
        });

        // Event listeners
        document.getElementById('darkTheme').addEventListener('click', () => switchTheme('dark'));
        document.getElementById('lightTheme').addEventListener('click', () => switchTheme('light'));
        document.getElementById('arabicLang').addEventListener('click', () => switchLanguage('arabic'));
        document.getElementById('englishLang').addEventListener('click', () => switchLanguage('english'));