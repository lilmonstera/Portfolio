// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        mobileMenuBtn.classList.toggle('mobile-menu-btn-open', isOpen);
        mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            mobileMenuBtn.classList.remove('mobile-menu-btn-open');
            mobileMenuBtn.setAttribute('aria-expanded', false);
        });
    });
}

// Contact form submission -> mailto
const contactForm = document.getElementById('contact-form');
const contactConfirmation = document.getElementById('contact-confirmation');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const organization = document.getElementById('contact-org').value;
        const inquiry = document.getElementById('contact-inquiry').value;
        const message = document.getElementById('contact-message').value;

        const body = `Name: ${name}\nEmail: ${email}\nOrganization: ${organization}\nInquiry Type: ${inquiry}\n\nProject Overview:\n${message}`;
        const subject = 'You got mail from your website!';
        const mailtoLink = `mailto:jayson@nucleustech.online?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;

        if (contactConfirmation) {
            contactConfirmation.classList.remove('hidden');
            contactConfirmation.classList.add('flex');
        }
    });
}
