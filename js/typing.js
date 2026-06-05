// ========================================
// TYPING ANIMATION
// ========================================

const typingTexts = [
    'Web Developer',
    'Full Stack Developer',
    'Software Engineer'
];

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

export function typeEffect() {
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
