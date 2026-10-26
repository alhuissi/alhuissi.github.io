(() => {
 const menuButton = document.querySelector('.menu-toggle');
 const nav = document.querySelector('.main-nav');
 const setOpen = (isOpen) => {
   menuButton?.setAttribute('aria-expanded', String(isOpen));
   menuButton?.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
   nav?.classList.toggle('is-open', isOpen);
 };
 menuButton?.addEventListener('click', () => setOpen(menuButton.getAttribute('aria-expanded') !== 'true'));
 nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
 document.addEventListener('keydown', event => { if (event.key === 'Escape') setOpen(false); });
 const year = document.getElementById('year'); if (year) year.textContent = String(new Date().getFullYear());
 if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
   const observer = new IntersectionObserver(entries => {
     entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } });
   }, { threshold: .09, rootMargin: '0px 0px -20px 0px' });
   document.querySelectorAll('.project, .explore-card, .about-copy, .social-list').forEach(el => {el.classList.add('reveal'); observer.observe(el);});
 }
})();
document.querySelectorAll('[data-gallery]').forEach(gallery=>{const img=gallery.querySelector('[data-gallery-image]');gallery.querySelectorAll('.gallery-controls button').forEach(b=>{b.addEventListener('click',()=>{gallery.querySelectorAll('.gallery-controls button').forEach(t=>{t.setAttribute('aria-pressed','false');t.classList.remove('selected');});b.classList.add('selected');b.setAttribute('aria-pressed','true');img.src=b.dataset.src;img.alt=b.dataset.alt;});});});
