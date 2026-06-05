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
