lucide.createIcons();
gsap.registerPlugin();
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const easeFluid = "power2.out";
const easeDrawer = "power2.inOut";
const mainMenu = document.getElementById('mainMenu');
const contentArea = document.getElementById('contentArea');
const menuBtns = document.querySelectorAll('.menu-btn');
const closeBtns = document.querySelectorAll('.close-btn');
const tabs = document.querySelectorAll('.tab-content');
let isMenuOpen = false;
let activeTab = null;
gsap.set(mainMenu, { opacity: 0 });
gsap.set(contentArea, { display: 'none', opacity: 0, x: 100 });
gsap.set(tabs, { display: 'none', opacity: 0, y: 20 });
const loaderTexts = [
    "ESTABLISHING SECURE CONNECTION...",
    "BYPASSING FIREWALLS...",
    "DECRYPTING NEURAL DATA...",
    "LOADING UI MODULES...",
    "ACCESS GRANTED."
];
const loaderTextEl = document.getElementById('loader-text');
const loaderBarFill = document.getElementById('loader-bar-fill');
const preloader = document.getElementById('preloader');
let textIndex = 0;
const textInterval = setInterval(() => {
    textIndex++;
    if(textIndex < loaderTexts.length) {
        loaderTextEl.innerText = loaderTexts[textIndex];
    }
}, prefersReducedMotion ? 100 : 600);
gsap.to(loaderBarFill, {
    scaleX: 1,
    duration: prefersReducedMotion ? 0.1 : 3,
    ease: "power2.inOut",
    onComplete: () => {
        clearInterval(textInterval);
        loaderTextEl.innerText = loaderTexts[loaderTexts.length - 1];
        gsap.to(preloader, {
            opacity: 0,
            duration: prefersReducedMotion ? 0.1 : 0.8,
            ease: "power2.inOut",
            delay: prefersReducedMotion ? 0 : 0.3,
            onComplete: () => {
                preloader.style.display = 'none';
                gsap.to(mainMenu, { opacity: 1, duration: prefersReducedMotion ? 0.1 : 0.6, ease: easeFluid });
            }
        });
    }
});
menuBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const targetId = btn.getAttribute('data-target');
        menuBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const btnText = btn.querySelector('.btn-text');
        gsap.fromTo(btnText, 
            { opacity: 0.5, x: -5 }, 
            { opacity: 1, x: 0, duration: 0.15, ease: "power2.out" }
        );
        if (!isMenuOpen) {
            openContentArea(targetId);
        } else if (activeTab !== targetId) {
            switchTab(targetId);
        }
    });
});
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        closeContentArea();
    });
});
function openContentArea(targetId) {
    isMenuOpen = true;
    activeTab = targetId;
    mainMenu.classList.remove('center-mode');
    mainMenu.classList.add('side-mode');
    gsap.to(contentArea, {
        display: 'block',
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: easeFluid,
        delay: 0.2
    });
    const targetTab = document.getElementById(targetId);
    gsap.to(targetTab, {
        display: 'flex',
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: easeFluid,
        delay: 0.4
    });
    animateTabContent(targetTab);
}
function switchTab(targetId) {
    if (!targetId || targetId === activeTab) return;
    const currentTab = activeTab ? document.getElementById(activeTab) : null;
    const targetTab = document.getElementById(targetId);
    if (!targetTab) return;

    if (currentTab) gsap.killTweensOf(currentTab);
    gsap.killTweensOf(targetTab);

    activeTab = targetId;

    if (currentTab) {
        gsap.to(currentTab, {
            opacity: 0,
            y: -10,
            duration: 0.18,
            ease: "power2.out",
            onComplete: () => {
                if (activeTab !== currentTab.id) {
                    gsap.set(currentTab, { display: 'none' });
                }
            }
        });
    }

    gsap.set(targetTab, { display: 'flex' });
    gsap.fromTo(targetTab, 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.35, ease: easeFluid, overwrite: "auto" }
    );
    animateTabContent(targetTab);
}
function closeContentArea() {
    isMenuOpen = false;
    menuBtns.forEach(b => b.classList.remove('active'));
    const currentTab = activeTab ? document.getElementById(activeTab) : null;
    gsap.killTweensOf([contentArea, ...tabs]);

    gsap.to(contentArea, {
        opacity: 0,
        x: 30,
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => {
            gsap.set(contentArea, { display: 'none' });
            if (currentTab) {
                gsap.set(currentTab, { display: 'none', opacity: 0, y: 20 });
            }
            activeTab = null;
            mainMenu.classList.remove('side-mode');
            mainMenu.classList.add('center-mode');
        }
    });
}
function animateTabContent(tabElement) {
    if (prefersReducedMotion) {
        return;
    }
    const cards = tabElement.querySelectorAll('.cyber-card, .cyber-panel, .about-layout > div, .cyber-btn-link');
    if (cards.length > 0) {
        gsap.fromTo(cards, 
            { opacity: 0, x: -20 },
            { 
                opacity: 1, 
                x: 0, 
                duration: 0.35, 
                stagger: 0.05, 
                ease: easeFluid,
                delay: 0.1
            }
        );
    }
    
    const progressBars = tabElement.querySelectorAll('.cyber-progress');
    progressBars.forEach((bar, index) => {
        const activeSegs = bar.querySelectorAll('.seg.active');
        if (activeSegs.length > 0) {
            gsap.from(activeSegs, {
                backgroundColor: "transparent", 
                boxShadow: "none", 
                borderColor: "rgba(255, 255, 255, 0.1)", 
                duration: 0.04, 
                stagger: 0.03, 
                ease: "none",
                delay: 0.2 + (index * 0.05),
                clearProps: "all"
            });
        }
    });
}
