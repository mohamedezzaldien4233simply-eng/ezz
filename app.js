(function () {
  const header = document.getElementById('header');
  const navList = document.querySelector('.nav-list');
  const burger = document.querySelector('.hamburger');
  const links = document.querySelectorAll('.nav-list ul a');

  // Mobile menu
  const toggle = () => {
    const open = navList.classList.toggle('open');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  burger.addEventListener('click', toggle);
  burger.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });
  links.forEach(a => a.addEventListener('click', () => navList.classList.remove('open')));

  // Header background on scroll
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Highlight the active section link
  const sections = [...links].map(a => document.querySelector(a.getAttribute('href')));
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => s && spy.observe(s));

  // Reveal on scroll
  const items = document.querySelectorAll('.project-item, .contact-item, .about .col-left, .about .col-right');
  items.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('show'); obs.unobserve(en.target); } });
  }, { threshold: 0.12 });
  items.forEach(el => io.observe(el));
})();
