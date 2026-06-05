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
// SCROLL PROGRESS INDICATOR
// ========================================

window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    // Could be used to update a progress bar
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

// ========================================
// IMAGE FADE-IN ON LOAD
// ========================================

export function initImageFadeIn() {
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
}
