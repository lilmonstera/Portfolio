const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.main-nav a');
const projectCards = document.querySelectorAll('.project-card');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-visible');
      entry.target.classList.remove('reveal-hidden');
      if (entry.target.id) {
        const activeLink = document.querySelector(`.main-nav a[href="#${entry.target.id}"]`);
        if (activeLink) {
          navLinks.forEach((link) => link.classList.remove('active'));
          activeLink.classList.add('active');
        }
      }
    }
  });
}, {
  threshold: 0.18,
});

sections.forEach((section) => {
  section.classList.add('reveal-hidden');
  sectionObserver.observe(section);
});

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

projectCards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const px = (x / rect.width) - 0.5;
    const py = (y / rect.height) - 0.5;
    const rotateX = clamp(py * 14, -10, 10);
    const rotateY = clamp(px * -14, -10, 10);
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
  });
});

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY + window.innerHeight * 0.45;
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (scrollPosition >= sectionTop) {
      const link = document.querySelector(`.main-nav a[href="#${section.id}"]`);
      if (link) {
        navLinks.forEach((navLink) => navLink.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
});

const buttons = document.querySelectorAll('.btn');
buttons.forEach((button) => {
  button.addEventListener('mouseenter', () => {
    button.classList.add('hovered');
  });

  button.addEventListener('mouseleave', () => {
    button.classList.remove('hovered');
  });
});

window.addEventListener('load', () => {
  document.body.classList.add('js-enabled');
});
