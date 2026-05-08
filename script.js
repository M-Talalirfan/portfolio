document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Custom Cursor
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');

    document.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
        follower.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
    });

    // Cursor interaction with links
    const links = document.querySelectorAll('a, .btn, .nav-toggle, .project-card');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = `translate3d(${cursor.offsetLeft}px, ${cursor.offsetTop}px, 0) scale(4)`;
            cursor.style.background = 'rgba(255,255,255,0.1)';
            follower.style.transform = `translate3d(${follower.offsetLeft}px, ${follower.offsetTop}px, 0) scale(1.5)`;
        });

        link.addEventListener('mouseleave', () => {
            cursor.style.transform = `scale(1)`;
            cursor.style.background = 'white';
            follower.style.transform = `scale(1)`;
        });
    });

    // Scroll Header Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('section, .project-card, .initiative-item, .about-text');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });

    // Add CSS for intersection observer dynamically if not in CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .reveal {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Mobile Nav Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            // This is a simple toggle. For a premium feel, 
            // you'd typically want a full-screen menu.
            // But staying "plain" as requested.
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.position = 'fixed';
                navLinks.style.top = '0';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.height = '100vh';
                navLinks.style.background = '#050505';
                navLinks.style.flexDirection = 'column';
                navLinks.style.justifyContent = 'center';
                navLinks.style.alignItems = 'center';
                navLinks.style.zIndex = '999';
            }
        });
    }

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // If mobile nav is open, close it
                if (window.innerWidth <= 1024) {
                    navLinks.style.display = 'none';
                }

                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Optional: Horizontal Scroll for Projects on Desktop
    // Not implemented here to keep "plain" and clean.
});
