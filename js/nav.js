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
// HIGHLIGHT CURRENT SECTION IN NAV
// ========================================

export function updateActiveNavLink() {
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
