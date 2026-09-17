lucide.createIcons();

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');

const layer1 = document.createElement('div');
layer1.className = 'theme-transition-layer layer-1';
document.body.appendChild(layer1);

const layer2 = document.createElement('div');
layer2.className = 'theme-transition-layer layer-2';
document.body.appendChild(layer2);

const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
updateToggleIcon(currentTheme);

let isAnimating = false;

themeToggle.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';

    // Set colors for the layers
    layer1.style.backgroundColor = 'var(--accent)';
    layer2.style.backgroundColor = nextTheme === 'dark' ? '#111827' : '#ffffff';

    // Apply animation
    layer1.style.animation = 'slideDownSkew 2.2s cubic-bezier(0.77, 0, 0.175, 1) forwards';
    layer2.style.animation = 'slideDownSkew 2.2s cubic-bezier(0.77, 0, 0.175, 1) 0.2s forwards';

    // Switch theme midway through the animation (when screen is covered)
    setTimeout(() => {
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
        updateToggleIcon(nextTheme);
    }, 1100); // wait for layers to cover the screen

    // Reset animation
    setTimeout(() => {
        layer1.style.animation = 'none';
        layer2.style.animation = 'none';
        isAnimating = false;
    }, 2600);
});

function updateToggleIcon(theme) {
    if (theme === 'dark') {
        themeToggle.innerHTML = '<i data-lucide="sun"></i>';
    } else {
        themeToggle.innerHTML = '<i data-lucide="moon"></i>';
    }
    lucide.createIcons();
}