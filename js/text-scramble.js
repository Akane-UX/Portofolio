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
