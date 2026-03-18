const yearSpan = document.getElementById('currentyear');
const lastModifiedP = document.getElementById('lastModified');
 
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
 
if (lastModifiedP) {
    lastModifiedP.textContent = `Last Modification: ${document.lastModified}`;
}
 
const hamburger = document.getElementById('hamburger');
const navUl = document.querySelector('nav ul');
 
if (hamburger && navUl) {
    hamburger.addEventListener('click', () => {
        const isOpen = navUl.classList.toggle('open');
        hamburger.innerHTML = isOpen ? '&#10005;' : '&#9776;';
        hamburger.setAttribute('aria-expanded', isOpen);
    });
}
 
const navLinks = document.querySelectorAll('.nav-link');
const figures = document.querySelectorAll('.gallery figure');
const galleryTitle = document.getElementById('gallery-title');
 
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
 
        const filter = link.dataset.filter;
 
        if (galleryTitle) {
            galleryTitle.textContent = link.textContent;
        }
 
        figures.forEach(fig => {
            const tags = fig.dataset.tags || '';
 
            if (filter === 'all') {
                fig.classList.remove('hidden');
            } else if (filter === 'old' && tags.includes('old')) {
                fig.classList.remove('hidden');
            } else if (filter === 'new' && tags.includes('new')) {
                fig.classList.remove('hidden');
            } else if (filter === 'large' && tags.includes('large')) {
                fig.classList.remove('hidden');
            } else if (filter === 'small' && tags.includes('small')) {
                fig.classList.remove('hidden');
            } else {
                fig.classList.add('hidden');
            }
        });
 
        if (navUl.classList.contains('open')) {
            navUl.classList.remove('open');
            hamburger.innerHTML = '&#9776;';
            hamburger.setAttribute('aria-expanded', false);
        }
    });
});