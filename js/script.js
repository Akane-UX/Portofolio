lucide.createIcons();
gsap.registerPlugin();

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const easeCyber = "power3.out";
const easeSnappy = "power2.out";

/* ========================================================
   CYBERPUNK HUD SYNTHESIZED AUDIO ENGINE (Web Audio API)
   Zero external audio files required!
   ======================================================== */
class CyberAudioEngine {
    constructor() {
        this.ctx = null;
        this.enabled = localStorage.getItem('cp_sfx') !== 'false'; // Default enabled
        this.initOnUserGesture();
    }

    initContext() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    initOnUserGesture() {
        const unlock = () => {
            this.initContext();
            window.removeEventListener('click', unlock);
            window.removeEventListener('keydown', unlock);
        };
        window.addEventListener('click', unlock, { once: true });
        window.addEventListener('keydown', unlock, { once: true });
    }

    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('cp_sfx', this.enabled);
        if (this.enabled) {
            this.initContext();
            this.playClick();
        }
        return this.enabled;
    }

    playHover() {
        if (!this.enabled || prefersReducedMotion) return;
        try {
            this.initContext();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(2600, now);
            osc.frequency.exponentialRampToValueAtTime(1800, now + 0.025);

            gain.gain.setValueAtTime(0.02, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.025);
        } catch (e) {
            // Audio context safely suppressed if blocked
        }
    }

    playClick() {
        if (!this.enabled || prefersReducedMotion) return;
        try {
            this.initContext();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(1600, now + 0.04);

            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.045);
        } catch (e) {}
    }

    playTabSwitch() {
        if (!this.enabled || prefersReducedMotion) return;
        try {
            this.initContext();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(320, now);
            osc.frequency.exponentialRampToValueAtTime(840, now + 0.06);

            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.065);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.065);
        } catch (e) {}
    }

    playClose() {
        if (!this.enabled || prefersReducedMotion) return;
        try {
            this.initContext();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(1200, now);
            osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.04);
        } catch (e) {}
    }
}

const sfx = new CyberAudioEngine();

/* ========================================================
   HUD TOPBAR CONTROLS & LIVE CLOCK
   ======================================================== */
const clockEl = document.getElementById('hudClock');
const sfxToggleBtn = document.getElementById('sfxToggle');
const sfxStatusText = document.getElementById('sfxStatus');

function updateHudClock() {
    if (!clockEl) return;
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());
    clockEl.innerText = `2077.11.07 // ${hours}:${minutes}:${seconds} WIB`;
}
setInterval(updateHudClock, 1000);
updateHudClock();

if (sfxToggleBtn && sfxStatusText) {
    const syncSfxUI = () => {
        sfxStatusText.innerText = sfx.enabled ? 'ON' : 'OFF';
        if (sfx.enabled) {
            sfxToggleBtn.classList.add('active');
        } else {
            sfxToggleBtn.classList.remove('active');
        }
    };
    syncSfxUI();

    sfxToggleBtn.addEventListener('click', () => {
        sfx.toggle();
        syncSfxUI();
    });
}

/* ========================================================
   TEXT DECODE / SCRAMBLE EFFECT
   ======================================================== */
const CYBER_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#@$%&*<>~/";

function scrambleText(element, originalText, duration = 300) {
    if (prefersReducedMotion || !element) return;
    let start = performance.now();
    const len = originalText.length;

    function frame(time) {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        const resolvedChars = Math.floor(progress * len);

        let output = "";
        for (let i = 0; i < len; i++) {
            if (i < resolvedChars) {
                output += originalText[i];
            } else if (originalText[i] === " " || originalText[i] === "/" || originalText[i] === ">") {
                output += originalText[i];
            } else {
                output += CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];
            }
        }
        element.innerText = output;

        if (progress < 1) {
            requestAnimationFrame(frame);
        } else {
            element.innerText = originalText;
        }
    }
    requestAnimationFrame(frame);
}

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

/* Preloader Boot Sequence */
const loaderTexts = [
    "INITIALIZING MILITECH CYBERDECK...",
    "ESTABLISHING SECURE MESH PROTOCOL...",
    "AUTHENTICATING BIOMONITOR TELEMETRY...",
    "MOUNTING REPOSITORY SHARDS...",
    "ACCESS GRANTED // WELCOME OPERATIVE"
];

const loaderTextEl = document.getElementById('loader-text');
const loaderBarFill = document.getElementById('loader-bar-fill');
const preloader = document.getElementById('preloader');
let textIndex = 0;

const textInterval = setInterval(() => {
    textIndex++;
    if (textIndex < loaderTexts.length && loaderTextEl) {
        loaderTextEl.innerText = loaderTexts[textIndex];
    }
}, prefersReducedMotion ? 60 : 450);

if (loaderBarFill) {
    gsap.to(loaderBarFill, {
        scaleX: 1,
        duration: prefersReducedMotion ? 0.05 : 2.2,
        ease: "power2.inOut",
        onComplete: () => {
            clearInterval(textInterval);
            if (loaderTextEl) {
                loaderTextEl.innerText = loaderTexts[loaderTexts.length - 1];
            }
            gsap.to(preloader, {
                opacity: 0,
                duration: prefersReducedMotion ? 0.05 : 0.6,
                ease: "power2.inOut",
                delay: prefersReducedMotion ? 0 : 0.2,
                onComplete: () => {
                    if (preloader) preloader.style.display = 'none';
                    gsap.to(mainMenu, { opacity: 1, duration: prefersReducedMotion ? 0.05 : 0.5, ease: easeCyber });
                    sfx.playClick();
                }
            });
        }
    });
}

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
