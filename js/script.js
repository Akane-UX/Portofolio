lucide.createIcons();

gsap.registerPlugin();
const easeFluid = "power4.out";
const easeDrawer = "power3.inOut";

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
}, 600);

gsap.to(loaderBarFill, {
    width: "100%",
    duration: 3,
    ease: "power2.inOut",
    onComplete: () => {
        clearInterval(textInterval);
        loaderTextEl.innerText = loaderTexts[loaderTexts.length - 1];
        
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            delay: 0.3,
            onComplete: () => {
                preloader.style.display = 'none';
                gsap.to(mainMenu, { opacity: 1, duration: 1, ease: easeFluid });
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
            { opacity: 1, x: 0, duration: 0.2, ease: "power2.out" }
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
    const currentTab = document.getElementById(activeTab);
    const targetTab = document.getElementById(targetId);
    
    activeTab = targetId;

    gsap.to(currentTab, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
            gsap.set(currentTab, { display: 'none' });
            
            gsap.fromTo(targetTab, 
                { display: 'flex', opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: easeFluid }
            );
            
            animateTabContent(targetTab);
        }
    });
}

function closeContentArea() {
    isMenuOpen = false;
    
    menuBtns.forEach(b => b.classList.remove('active'));

    const currentTab = document.getElementById(activeTab);

    gsap.to(contentArea, {
        opacity: 0,
        x: 50,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
            gsap.set(contentArea, { display: 'none' });
            gsap.set(currentTab, { display: 'none', opacity: 0, y: 20 });
            activeTab = null;

            mainMenu.classList.remove('side-mode');
            mainMenu.classList.add('center-mode');
        }
    });
}

function animateTabContent(tabElement) {
    const cards = tabElement.querySelectorAll('.cyber-card, .cyber-panel, .about-layout > div, .cyber-btn-link');
    if (cards.length > 0) {
        gsap.fromTo(cards, 
            { opacity: 0, y: 30 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.6, 
                stagger: 0.1, 
                ease: easeFluid,
                delay: 0.1
            }
        );
    }
}
