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

// Legacy file: keep it parseable so it can't break the site build
// (React app is mounted from /src/main.jsx).

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function typeEffect() {
    const typingElement = document.getElementById('typingText');
    const currentText = typingTexts[currentTextIndex];

    if (!isDeleting) {
        // Typing
        if (currentCharIndex < currentText.length) {
            typingElement.textContent += currentText[currentCharIndex];
            currentCharIndex++;
            setTimeout(typeEffect, 80);
        } else {
            // Pause before deleting
            isDeleting = true;
            setTimeout(typeEffect, 2000);
        }
    } else {
        // Deleting
        if (currentCharIndex > 0) {
            typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            setTimeout(typeEffect, 50);
        } else {
            // Move to next text
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
            setTimeout(typeEffect, 500);
        }
    }
}

// ========================================
// PARALLAX EFFECT
// ========================================

document.addEventListener('mousemove', (e) => {
    const parallaxElements = document.querySelectorAll('.hero::before');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    parallaxElements.forEach(element => {
        const element_offset = element.offsetParent;
        if (element_offset) {
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            element.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
        }
    });
});

// ========================================
// SMOOTH SCROLL BEHAVIOR
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// ========================================
// FORM HANDLING
// ========================================

// const contactForm = document.getElementById('contactForm');
// if (contactForm) {
//     contactForm.addEventListener('submit', (e) => {
//         //e.preventDefault();

//         const name = contactForm.querySelector('input[type="text"]').value;
//         const email = contactForm.querySelector('input[type="email"]').value;
//         const message = contactForm.querySelector('textarea').value;

//         if (name && email && message) {
//             // Show success message
//             const successMessage = document.createElement('div');
//             successMessage.style.cssText = `
//                 position: fixed;
//                 top: 100px;
//                 right: 20px;
//                 background: linear-gradient(135deg, #66d9ff, #9b7cff);
//                 color: #000000;
//                 padding: 1rem 1.5rem;
//                 border-radius: 6px;
//                 font-weight: 600;
//                 z-index: 9999;
//                 animation: slideInRight 0.5s ease-out;
//                 box-shadow: 0 0 30px rgba(102, 217, 255, 0.5);
//             `;
//             successMessage.textContent = '✓ Message sent successfully!';
//             document.body.appendChild(successMessage);

//             // Reset form
//             contactForm.reset();

//             // Remove message after 3 seconds
//             setTimeout(() => {
//                 successMessage.style.animation = 'slideOutRight 0.5s ease-in';
//                 setTimeout(() => successMessage.remove(), 500);
//             }, 3000);
//         }
//     });
// }

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {

        // Remove preventDefault so form can POST to FormSubmit
        // e.preventDefault(); ❌ REMOVE THIS

        // Show success message immediately
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #66d9ff, #9b7cff);
            color: #000000;
            padding: 1rem 1.5rem;
            border-radius: 6px;
            font-weight: 600;
            z-index: 9999;
            animation: slideInRight 0.5s ease-out;
            box-shadow: 0 0 30px rgba(102, 217, 255, 0.5);
        `;
        successMessage.textContent = '✓ Sending message...';
        document.body.appendChild(successMessage);

        // Remove popup after 2 seconds (FormSubmit will redirect)
        setTimeout(() => {
            successMessage.style.animation = 'slideOutRight 0.5s ease-in';
            setTimeout(() => successMessage.remove(), 500);
        }, 2000);

        // LET THE FORM SUBMIT NORMALLY ✔
    });
}

// ========================================
// DOWNLOAD RESUME FUNCTION
// ========================================

function downloadResume() {
    // Create a simple PDF or document link
    // In a real scenario, this would link to an actual resume file
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/file/d/1OA_NXcuJTXZRuA7jjMSpJBRy6NMcazPI/view?usp=drivesdk';
    link.download = 'Nivetha_Resume.txt';
    link.click();

    // Show notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #66d9ff, #9b7cff);
        color: #000000;
        padding: 1rem 1.5rem;
        border-radius: 6px;
        font-weight: 600;
        z-index: 9999;
        animation: slideInRight 0.5s ease-out;
        box-shadow: 0 0 30px rgba(102, 217, 255, 0.5);
    `;
    notification.textContent = '⬇ Resume downloaded!';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-in';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// ========================================
// MOBILE HAMBURGER MENU
// ========================================

// Hamburger menu is disabled - navbar is always fully visible
// No toggle or collapse behavior applied

// ========================================
// ADD ANIMATIONS TO STYLES
// ========================================

const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);

// ========================================
// SCROLL PROGRESS INDICATOR
// ========================================

window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    // Could be used to update a progress bar
});

// ========================================
// HIGHLIGHT CURRENT SECTION IN NAV
// ========================================

function updateActiveNavLink() {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        // Check if section is in viewport
        if (window.pageYOffset >= sectionTop - 150 && window.pageYOffset < sectionTop + sectionHeight - 150) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active-link');
        }
    });
}

// Update active link on scroll
window.addEventListener('scroll', updateActiveNavLink);

// Update active link on page load
window.addEventListener('load', updateActiveNavLink);

// Update active link after smooth scroll completes
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Remove active class from all links
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active-link');
            });
            // Add active class to clicked link
            this.classList.add('active-link');
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// GLOW EFFECT ON MOUSE OVER ELEMENTS
// ========================================

document.querySelectorAll('.glass, .skill-pill, .project-card').forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const glowElement = element.querySelector('.glow-effect');
        if (glowElement) {
            glowElement.style.left = x + 'px';
            glowElement.style.top = y + 'px';
            glowElement.style.opacity = '1';
        }
    });

    element.addEventListener('mouseleave', () => {
        const glowElement = element.querySelector('.glow-effect');
        if (glowElement) {
            glowElement.style.opacity = '0';
        }
    });
});

// ========================================
// INITIALIZE ON PAGE LOAD
// ========================================

window.addEventListener('load', () => {
    createSnowflakes();
    typeEffect();

    // Add smooth fade-in to all images
    document.querySelectorAll('img').forEach(img => {
    img.style.transition = 'opacity 0.6s ease-out';
    if (img.complete) {
        img.style.opacity = '1';
    } else {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    }
});

});

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to go to home
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
    }

    // Ctrl/Cmd + / to focus on contact
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
});

// ========================================
// PERFORMANCE: LAZY LOAD IMAGES
// ========================================

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                imageObserver.unobserve(img);
            }
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Navbar is sticky and always visible — no hide-on-scroll behavior applied.

// ========================================
// SKILL PILL INTERACTION
// ========================================

document.querySelectorAll('.skill-pill').forEach(pill => {
    pill.addEventListener('click', () => {
        const skill = pill.textContent;
        console.log('Selected skill:', skill);

        // Visual feedback
        pill.style.transform = 'scale(1.1)';
        setTimeout(() => {
            pill.style.transform = 'scale(1)';
        }, 300);
    });
});

// ========================================
// PROJECT CARD CLICK EFFECT
// ========================================

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        // Could open a modal or link to project details
        console.log('Project clicked');
    });
});


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
