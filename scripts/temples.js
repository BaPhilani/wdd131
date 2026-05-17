const hamburger = document.getElementById('hamburger');
const primaryNav = document.querySelector('header nav');

if (hamburger && primaryNav) {
    hamburger.addEventListener('click', () => {
        const isOpen = primaryNav.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        hamburger.innerHTML = isOpen ? '&#10005;' : '&#9776;';
    });
}
