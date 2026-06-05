// ========================================
// SNOW PARTICLE ANIMATION
// ========================================

export function createSnowflakes() {
    const container = document.getElementById('snowContainer');
    const numberOfSnowflakes = 50;

    for (let i = 0; i < numberOfSnowflakes; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');

        const size = Math.random() * 6 + 4;
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 5;
        const horizontalDistance = (Math.random() - 0.5) * 100;

        snowflake.style.width = size + 'px';
        snowflake.style.height = size + 'px';
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.setProperty('--tx', horizontalDistance + 'px');
        snowflake.style.animationDuration = duration + 's';
        snowflake.style.animationDelay = delay + 's';
        snowflake.style.opacity = Math.random() * 0.7 + 0.3;

        container.appendChild(snowflake);

        // Restart animation after it ends
        setTimeout(() => {
            snowflake.addEventListener('animationend', () => {
                snowflake.style.top = '-10px';
                snowflake.style.left = Math.random() * 100 + '%';
                snowflake.style.animationDelay = '0s';
            });
        }, (delay + duration) * 1000);
    }
}
