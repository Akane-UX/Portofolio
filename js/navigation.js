/* ========================================================
   CORE NAVIGATION & TAB SWITCHER
   ======================================================== */
const mainMenu = document.getElementById('mainMenu');
const contentArea = document.getElementById('contentArea');
const menuBtns = document.querySelectorAll('.menu-btn');
const closeBtns = document.querySelectorAll('.close-btn');
const tabs = document.querySelectorAll('.tab-content');
const activeNodeBadge = document.getElementById('activeNodeBadge');

let isMenuOpen = false;
let activeTab = null;

gsap.set(mainMenu, { opacity: 0 });
gsap.set(contentArea, { display: 'none', opacity: 0, x: 80 });
gsap.set(tabs, { display: 'none', opacity: 0, y: 15 });

/* Menu Button Interactions */
menuBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        sfx.playHover();
    });

    btn.addEventListener('click', () => {
        sfx.playClick();
        const targetId = btn.getAttribute('data-target');
        menuBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const btnTitle = btn.querySelector('.btn-title');
        if (btnTitle) {
            scrambleText(btnTitle, btnTitle.getAttribute('data-original') || btnTitle.innerText, 200);
        }

        if (!isMenuOpen) {
            openContentArea(targetId);
        } else if (activeTab !== targetId) {
            switchTab(targetId);
        }
    });
});

/* Close Buttons */
closeBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        sfx.playHover();
    });
    btn.addEventListener('click', () => {
        sfx.playClose();
        closeContentArea();
    });
});

/* Interactive Card & Link SFX */
document.querySelectorAll('.cyber-card, .cyber-panel, .cyber-btn-link').forEach(el => {
    el.addEventListener('mouseenter', () => {
        sfx.playHover();
    });
});

/* Open Content Panel */
function openContentArea(targetId) {
    isMenuOpen = true;
    activeTab = targetId;

    mainMenu.classList.remove('center-mode');
    mainMenu.classList.add('side-mode');

    updateActiveNodeIndicator(targetId);

    gsap.killTweensOf(contentArea);
    gsap.to(contentArea, {
        display: 'block',
        opacity: 1,
        x: 0,
        duration: prefersReducedMotion ? 0.05 : 0.6,
        ease: easeCyber,
        delay: prefersReducedMotion ? 0 : 0.15
    });

    const targetTab = document.getElementById(targetId);
    if (targetTab) {
        gsap.killTweensOf(targetTab);
        gsap.to(targetTab, {
            display: 'flex',
            opacity: 1,
            y: 0,
            duration: prefersReducedMotion ? 0.05 : 0.5,
            ease: easeCyber,
            delay: prefersReducedMotion ? 0 : 0.25
        });
        animateTabContent(targetTab);
    }
}

/* Switch Active Tab */
function switchTab(targetId) {
    if (!targetId || targetId === activeTab) return;
    const currentTab = activeTab ? document.getElementById(activeTab) : null;
    const targetTab = document.getElementById(targetId);
    if (!targetTab) return;

    sfx.playTabSwitch();
    updateActiveNodeIndicator(targetId);

    if (currentTab) gsap.killTweensOf(currentTab);
    gsap.killTweensOf(targetTab);

    activeTab = targetId;

    if (currentTab) {
        gsap.to(currentTab, {
            opacity: 0,
            y: -12,
            duration: prefersReducedMotion ? 0.05 : 0.18,
            ease: easeSnappy,
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
        { opacity: 1, y: 0, duration: prefersReducedMotion ? 0.05 : 0.35, ease: easeCyber, overwrite: "auto" }
    );
    animateTabContent(targetTab);
}

/* Close Content Panel */
function closeContentArea() {
    isMenuOpen = false;
    menuBtns.forEach(b => b.classList.remove('active'));
    const currentTab = activeTab ? document.getElementById(activeTab) : null;

    if (activeNodeBadge) {
        activeNodeBadge.innerText = `SYSTEM // ROOT_INDEX`;
    }

    gsap.killTweensOf([contentArea, ...tabs]);

    gsap.to(contentArea, {
        opacity: 0,
        x: 40,
        duration: prefersReducedMotion ? 0.05 : 0.22,
        ease: easeSnappy,
        onComplete: () => {
            gsap.set(contentArea, { display: 'none' });
            if (currentTab) {
                gsap.set(currentTab, { display: 'none', opacity: 0, y: 15 });
            }
            activeTab = null;
            mainMenu.classList.remove('side-mode');
            mainMenu.classList.add('center-mode');
        }
    });
}

function updateActiveNodeIndicator(tabId) {
    if (!activeNodeBadge) return;
    const names = {
        projects: "SYSTEM_NODE // [ 01 ] DATABASE",
        skills: "SYSTEM_NODE // [ 02 ] CYBERWARE",
        about: "SYSTEM_NODE // [ 03 ] DOSSIER",
        contact: "SYSTEM_NODE // [ 04 ] HOLOCALL"
    };
    activeNodeBadge.innerText = names[tabId] || `NODE // ${tabId.toUpperCase()}`;
}

/* Animate Inside Tab */
function animateTabContent(tabElement) {
    if (prefersReducedMotion) return;

    const cards = tabElement.querySelectorAll('.cyber-card, .cyber-panel, .dossier-card, .about-image, .cyber-btn-link');
    if (cards.length > 0) {
        gsap.fromTo(cards,
            { opacity: 0, x: -15 },
            {
                opacity: 1,
                x: 0,
                duration: 0.3,
                stagger: 0.04,
                ease: easeCyber,
                delay: 0.08
            }
        );
    }

    /* Animate Segmented LED Cyber Gauges */
    const progressBars = tabElement.querySelectorAll('.cyber-progress');
    progressBars.forEach((bar, index) => {
        const activeSegs = bar.querySelectorAll('.seg.active, .seg.active-red');
        if (activeSegs.length > 0) {
            gsap.fromTo(activeSegs,
                { opacity: 0.15, transform: "scaleY(0.5)" },
                {
                    opacity: 1,
                    transform: "scaleY(1)",
                    duration: 0.03,
                    stagger: 0.025,
                    ease: "none",
                    delay: 0.15 + (index * 0.04)
                }
            );
        }
    });
}
