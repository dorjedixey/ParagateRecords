/*
 * Implements subtle micro-interactions and scroll‑based animations.
 * Sections fade in when they enter the viewport, and the navigation bar
 * highlights the link corresponding to the current section. These
 * micro‑interactions help guide users and improve engagement, which aligns
 * with modern web design trends that emphasise immersive interactions and
 * micro‑animations【937519119749979†L144-L149】.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Fade sections in when they come into view
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // Highlight current nav link based on scroll position
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section');

  function highlightNav() {
    let current = '';
    const scrollPos = window.pageYOffset;
    sections.forEach(sec => {
      const sectionTop = sec.offsetTop - 80;
      if (scrollPos >= sectionTop) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNav);
  highlightNav();
});