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
