// Micro-interactions and parallax-lite
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) / 100;
    const moveY = (e.clientY - window.innerHeight / 2) / 100;

    document.querySelectorAll('.glass-card').forEach(card => {
        card.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

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
