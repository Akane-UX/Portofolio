lucide.createIcons();

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// GSAP Animations
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Prevent FOUC by making sure items are visible before animating them from 0
    gsap.set('.gsap-hero, .gsap-hero-item, .gsap-hero-asset, .gsap-about-img, .gsap-about-text, .gsap-header, .gsap-bento, .gsap-project, .gsap-contact', { visibility: 'visible' });

    // Match media for reduced motion
    let mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Hero Section
        gsap.from('.gsap-hero-item', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.1
        });

        gsap.from('.gsap-hero-asset', {
            opacity: 0,
            scale: 0.95,
            duration: 1,
            ease: 'power3.out',
            delay: 0.3
        });

        // About Section
        gsap.from('.gsap-about-img', {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 80%',
            },
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            ease: 'power3.out'
        });
        
        gsap.from('.gsap-about-text', {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 80%',
            },
            opacity: 0,
            x: 20,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.2
        });

        // Skills / Bento Grid
        gsap.from('.gsap-header', {
            scrollTrigger: {
                trigger: '.skills-section',
                start: 'top 85%',
            },
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out'
        });

        gsap.from('.gsap-bento', {
            scrollTrigger: {
                trigger: '.bento-grid',
                start: 'top 85%',
            },
            opacity: 0,
            scale: 0.92,
            y: 16,
            duration: 0.5,
            stagger: {
                each: 0.08,
                grid: 'auto'
            },
            ease: 'back.out(1.2)'
        });

        // Projects Section
        gsap.utils.toArray('.projects-section .gsap-header').forEach(header => {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: '.projects-section',
                    start: 'top 85%',
                },
                opacity: 0,
                y: 20,
                duration: 0.6,
                ease: 'power3.out'
            });
        });

        gsap.from('.gsap-project', {
            scrollTrigger: {
                trigger: '.projects-layout',
                start: 'top 85%',
            },
            opacity: 0,
            y: 24,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out'
        });

        // Contact Section
        gsap.utils.toArray('.contact-section .gsap-header').forEach(header => {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: '.contact-section',
                    start: 'top 85%',
                },
                opacity: 0,
                y: 20,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out'
            });
        });

        gsap.from('.gsap-contact', {
            scrollTrigger: {
                trigger: '.contact-links',
                start: 'top 90%',
            },
            opacity: 0,
            scale: 0.95,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.2)'
        });
    });
}

// Emil Kowalski Page Transition (Smooth Exit)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('href');
            
            // Skip if no target, hash link, external link, or open in new tab
            if (!target || 
                target.startsWith('#') || 
                target.startsWith('mailto:') || 
                target.startsWith('http') || 
                link.target === '_blank' ||
                e.ctrlKey || e.metaKey) {
                return;
            }

            e.preventDefault();

            // Hardware accelerated exit animation (scale down slightly, fade out fast)
            if (typeof gsap !== 'undefined') {
                gsap.to('main, .page-header', {
                    opacity: 0,
                    scale: 0.98,
                    y: -10,
                    duration: 0.2, // Exit should be fast (200ms)
                    ease: 'power2.in',
                    onComplete: () => {
                        window.location.href = target;
                    }
                });
            } else {
                window.location.href = target;
            }
        });
    });
});

// Theme Toggle Logic with Clip-Path Wipe (Hardware Accelerated)
const themeToggle = document.getElementById('theme-toggle');

const wipeLayer = document.createElement('div');
wipeLayer.className = 'theme-wipe';
document.body.appendChild(wipeLayer);

const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
updateToggleIcon(currentTheme);

let isAnimating = false;

themeToggle.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';

    // Get trigger button coordinates for origin-aware animation
    const rect = themeToggle.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    wipeLayer.style.backgroundColor = nextTheme === 'dark' ? '#09090b' : '#ffffff';

    if (typeof gsap !== 'undefined') {
        // Modern clip-path circle wipe
        gsap.fromTo(wipeLayer, 
            { clipPath: `circle(0px at ${x}px ${y}px)` },
            { 
                clipPath: `circle(${window.innerWidth * 1.5}px at ${x}px ${y}px)`, 
                duration: 0.6, 
                ease: "power2.inOut",
                onComplete: () => {
                    document.documentElement.setAttribute('data-theme', nextTheme);
                    localStorage.setItem('theme', nextTheme);
                    updateToggleIcon(nextTheme);
                    
                    // Fade out the wipe layer
                    gsap.to(wipeLayer, {
                        opacity: 0,
                        duration: 0.4,
                        ease: "power2.inOut",
                        onComplete: () => {
                            wipeLayer.style.clipPath = 'inset(0 0 100% 0)'; // reset
                            wipeLayer.style.opacity = 1;
                            isAnimating = false;
                        }
                    });
                }
            }
        );
    } else {
        // Fallback if GSAP is missing
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
        updateToggleIcon(nextTheme);
        isAnimating = false;
    }
});

function updateToggleIcon(theme) {
    if (theme === 'dark') {
        themeToggle.innerHTML = '<i data-lucide="sun"></i>';
    } else {
        themeToggle.innerHTML = '<i data-lucide="moon"></i>';
    }
    lucide.createIcons();
}