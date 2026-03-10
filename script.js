// ============================================
// BIN RABIE FOOD - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Loader
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1800);
    });

    // Fallback: hide loader after 3 seconds
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 3000);

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const scrollTop = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll to top button
        if (scrollY > 500) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }

        // Active nav link
        updateActiveNavLink();

        // Reveal animations
        revealOnScroll();
    });

    // Scroll to top
    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Mobile menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    let menuOverlay = document.createElement('div');
    menuOverlay.classList.add('menu-overlay');
    document.body.appendChild(menuOverlay);

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Active nav link on scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink && scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    }

    // Counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        counters.forEach(counter => {
            if (counter.dataset.animated) return;

            const rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                counter.dataset.animated = 'true';
                const target = parseInt(counter.dataset.count);
                const duration = 2000;
                const start = performance.now();

                function update(currentTime) {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(eased * target);

                    counter.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        counter.textContent = target;
                    }
                }

                requestAnimationFrame(update);
            }
        });
    }

    // Reveal on scroll
    function revealOnScroll() {
        const elements = document.querySelectorAll(
            '.section-header, .about-image, .about-content, .vmm-card, .ps-card, .why-card, .features-content, .features-visual, .region-card, .contact-info, .contact-form-wrapper'
        );

        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                el.classList.add('reveal', 'active');
            }
        });

        animateCounters();
    }

    // Initial check
    revealOnScroll();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalContent = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
            btn.disabled = true;

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    btn.innerHTML = '<i class="fas fa-check"></i> تم الإرسال بنجاح!';
                    btn.style.background = 'linear-gradient(135deg, #4CAF50, #2E7D32)';
                    contactForm.reset();
                } else {
                    btn.innerHTML = '<i class="fas fa-times"></i> حدث خطأ، حاول مرة أخرى';
                    btn.style.background = 'linear-gradient(135deg, #E53935, #C62828)';
                }
            })
            .catch(() => {
                btn.innerHTML = '<i class="fas fa-times"></i> حدث خطأ، حاول مرة أخرى';
                btn.style.background = 'linear-gradient(135deg, #E53935, #C62828)';
            })
            .finally(() => {
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            });
        });
    }

    // Add subtle parallax to hero
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.scrollY;
            const shapes = hero.querySelectorAll('.hero-shape');
            if (scrolled < window.innerHeight) {
                shapes.forEach((shape, i) => {
                    const speed = (i + 1) * 0.15;
                    shape.style.transform = `translateY(${scrolled * speed}px)`;
                });
            }
        }
    });
});
