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
