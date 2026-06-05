// ========================================
// ENTRY POINT
// ========================================

import { createSnowflakes } from './js/snow.js';
import { typeEffect } from './js/typing.js';
import { downloadResume } from './js/hero.js';
import { initImageFadeIn } from './js/animations.js';

// Side-effect imports (register event listeners on load)
import './js/nav.js';
import './js/contact.js';
import './js/skills.js';
import './js/projects.js';

// ========================================
// DARK MODE / LIGHT MODE TOGGLE (OPTIONAL)
// ========================================

export function toggleTheme() {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
}

// Check saved theme preference
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
}

// Expose downloadResume globally for inline onclick in HTML
window.downloadResume = downloadResume;

// ========================================
// INITIALIZE ON PAGE LOAD
// ========================================

window.addEventListener('load', () => {
    createSnowflakes();
    typeEffect();
    initImageFadeIn();
});
