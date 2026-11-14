/* ========================================================
   PRELOADER BOOT SEQUENCE
   ======================================================== */
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
