const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, December, 10",
        area: 58352,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/400x250/rome-italy-temple-exterior-1050943-wallpaper.jpg"
    },
    {
        templeName: "Kirtland Ohio",
        location: "Kirtland, Ohio, United States",
        dedicated: "1836, March, 27",
        area: 9580,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/kirtland-ohio/400x250/kirtland-ohio-temple-exterior-270990-wallpaper.jpg"
    },
    {
        templeName: "Winter Quarters Nebraska",
        location: "Florence, Nebraska, United States",
        dedicated: "2001, April, 22",
        area: 107900,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/winter-quarters/400x250/winter-quarters-temple-1416672-wallpaper.jpg"
    },
    {
        templeName: "São Paulo Brazil",
        location: "São Paulo, Brazil",
        dedicated: "1978, October, 28",
        area: 82900,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/sao-paulo-brazil/400x250/sao-paulo-brazil-temple-1432195-wallpaper.jpg"
    }
];

const hamburger = document.getElementById('hamburger');
const primaryNav = document.querySelector('header nav');
const navLinks = document.querySelectorAll('#primary-nav a[data-filter]');
const templeContainer = document.getElementById('temple-container');
const message = document.getElementById('message');
const lastModified = document.getElementById('lastModified');

function getYear(dedicated) {
    const year = Number(dedicated.split(',')[0].trim());
    return Number.isFinite(year) ? year : null;
}

function setActiveFilter(filterName) {
    navLinks.forEach((link) => {
        link.classList.toggle('is-active', link.dataset.filter === filterName);
    });
}

function createTempleCard(temple) {
    const article = document.createElement('article');
    article.className = 'temple-card';

    const img = document.createElement('img');
    img.src = temple.imageUrl;
    img.alt = `${temple.templeName} temple`;
    img.loading = 'lazy';
    article.appendChild(img);

    const content = document.createElement('div');
    content.className = 'temple-card-content';

    const title = document.createElement('h2');
    title.textContent = temple.templeName;
    content.appendChild(title);

    const location = document.createElement('p');
    location.innerHTML = `<span>Location:</span> ${temple.location}`;
    content.appendChild(location);

    const dedicated = document.createElement('p');
    dedicated.innerHTML = `<span>Dedicated:</span> ${temple.dedicated}`;
    content.appendChild(dedicated);

    const area = document.createElement('p');
    area.innerHTML = `<span>Area:</span> ${temple.area.toLocaleString()} sq ft`;
    content.appendChild(area);

    article.appendChild(content);
    return article;
}

function renderTemples(list) {
    templeContainer.innerHTML = '';

    if (list.length === 0) {
        message.textContent = 'No temples match this filter.';
        templeContainer.appendChild(message);
        return;
    }

    list.forEach((temple) => {
        templeContainer.appendChild(createTempleCard(temple));
    });
}

function filterTemples(filterName) {
    let filtered = temples.slice();

    if (filterName === 'old') {
        filtered = temples.filter((temple) => {
            const year = getYear(temple.dedicated);
            return year !== null && year < 1900;
        });
    }

    if (filterName === 'new') {
        filtered = temples.filter((temple) => {
            const year = getYear(temple.dedicated);
            return year !== null && year > 2000;
        });
    }

    if (filterName === 'large') {
        filtered = temples.filter((temple) => temple.area > 90000);
    }

    if (filterName === 'small') {
        filtered = temples.filter((temple) => temple.area < 10000);
    }

    renderTemples(filtered);
    setActiveFilter(filterName);
}

function closeMobileNav() {
    if (primaryNav.classList.contains('open')) {
        primaryNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.innerHTML = '&#9776;';
    }
}

if (hamburger && primaryNav) {
    hamburger.addEventListener('click', () => {
        const isOpen = primaryNav.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        hamburger.innerHTML = isOpen ? '&#10005;' : '&#9776;';
    });
}

navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const filterName = event.currentTarget.dataset.filter;
        filterTemples(filterName);
        closeMobileNav();
    });
});

window.addEventListener('DOMContentLoaded', () => {
    renderTemples(temples);
    if (lastModified) {
        lastModified.textContent = `Last modified: ${new Date(document.lastModified).toLocaleDateString()}`;
    }
});
