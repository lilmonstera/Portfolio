// Scroll-in animation for sections
const revealTargets = document.querySelectorAll('main > section');

if (revealTargets.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealTargets.forEach(el => el.classList.add('reveal-on-scroll'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

    revealTargets.forEach(el => revealObserver.observe(el));
}

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        mobileMenuBtn.classList.toggle('mobile-menu-btn-open', isOpen);
        mobileMenuBtn.setAttribute('aria-expanded', isOpen);
        mobileMenu.toggleAttribute('inert', !isOpen);
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            mobileMenuBtn.classList.remove('mobile-menu-btn-open');
            mobileMenuBtn.setAttribute('aria-expanded', false);
            mobileMenu.setAttribute('inert', '');
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

// Homepage hero lead capture -> mailto
const heroLeadForm = document.getElementById('hero-lead-form');
const heroLeadConfirmation = document.getElementById('hero-lead-confirmation');

if (heroLeadForm) {
    heroLeadForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('hero-lead-email').value;

        const body = `Corporate Email: ${email}\n\nRequesting an introductory conversation with the Nucleus team.`;
        const subject = 'You got mail from your website!';
        const mailtoLink = `mailto:jayson@nucleustech.online?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;

        if (heroLeadConfirmation) {
            heroLeadConfirmation.classList.remove('hidden');
        }
    });
}
