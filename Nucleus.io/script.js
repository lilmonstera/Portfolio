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

// Micro-interactions and parallax-lite (desktop only)
if (window.matchMedia('(min-width: 768px)').matches) {
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) / 100;
        const moveY = (e.clientY - window.innerHeight / 2) / 100;

        document.querySelectorAll('.glass-card').forEach(card => {
            card.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

// Intersection Observer for scroll reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
    observer.observe(section);
});
