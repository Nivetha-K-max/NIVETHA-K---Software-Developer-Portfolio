// ========================================
// DOWNLOAD RESUME FUNCTION
// ========================================

export function downloadResume() {
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
