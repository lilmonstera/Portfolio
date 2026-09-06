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

// Shared submit handler: posts a form to Web3Forms so submissions land
// reliably in the team's inbox instead of depending on the visitor having
// a configured email client.
async function submitToWeb3Forms(form, { onSuccess, onError, submitButton } = {}) {
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.classList.add('opacity-60', 'cursor-not-allowed');
    }

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: new FormData(form)
        });
        const result = await response.json();

        if (result.success) {
            form.reset();
            if (onSuccess) onSuccess();
        } else {
            throw new Error(result.message || 'Submission failed');
        }
    } catch (error) {
        if (onError) onError(error);
    } finally {
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.classList.remove('opacity-60', 'cursor-not-allowed');
        }
    }
}

// Contact form submission
const contactForm = document.getElementById('contact-form');
const contactConfirmation = document.getElementById('contact-confirmation');
const contactSubmitButton = document.getElementById('contact-submit');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        submitToWeb3Forms(contactForm, {
            submitButton: contactSubmitButton,
            onSuccess: () => {
                if (contactConfirmation) {
                    contactConfirmation.classList.remove('hidden');
                    contactConfirmation.classList.add('flex');
                }
            },
            onError: () => {
                alert("Something went wrong sending your request. Please email jayson@nucleustech.online directly.");
            }
        });
    });
}

// Homepage hero lead capture
const heroLeadForm = document.getElementById('hero-lead-form');
const heroLeadConfirmation = document.getElementById('hero-lead-confirmation');

if (heroLeadForm) {
    heroLeadForm.addEventListener('submit', (e) => {
        e.preventDefault();

        submitToWeb3Forms(heroLeadForm, {
            onSuccess: () => {
                if (heroLeadConfirmation) {
                    heroLeadConfirmation.classList.remove('hidden');
                }
            },
            onError: () => {
                alert("Something went wrong sending your details. Please email jayson@nucleustech.online directly.");
            }
        });
    });
}
