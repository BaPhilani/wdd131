const temples = [
    {
        templeName: "Belem Brazil",
        location: "Belém, Brazil",
        dedicated: "2000, May, 20",
        area: 20400,
        imageUrl: "images/belem_brazil_temple.png"
    },
    {
        templeName: "Buenos Aires Argentina",
        location: "Buenos Aires, Argentina",
        dedicated: "1986, January, 17",
        area: 55500,
        imageUrl: "images/buenos_argentina_temple.jpeg"
    },
    {
        templeName: "Fukuoka Japan",
        location: "Fukuoka, Japan",
        dedicated: "2000, October, 27",
        area: 19600,
        imageUrl: "images/fukuoka_japan_temple.jpeg"
    },
    {
        templeName: "Harare Zimbabwe",
        location: "Harare, Zimbabwe",
        dedicated: "2026, March, 1",
        area: 7600,
        imageUrl: "images/harare_zimbabwe_temple.jpg"
    },
    {
        templeName: "Adelaide Australia",
        location: "Adelaide, Australia",
        dedicated: "2000, April, 13",
        area: 36200,
        imageUrl: "images/adelaide_australia_temple.jpeg"
    },
    {
        templeName: "Johannesburg South Africa",
        location: "Johannesburg, South Africa",
        dedicated: "1985, April, 24",
        area: 18600,
        imageUrl: "images/johannesburg_temple.jpeg"
    },
    {
        templeName: "Kyiv Ukraine",
        location: "Kyiv, Ukraine",
        dedicated: "2010, August, 29",
        area: 17500,
        imageUrl: "images/kyiv_ukraine_temple.jpeg"
    },
    {
        templeName: "Madrid Spain",
        location: "Madrid, Spain",
        dedicated: "1999, July, 7",
        area: 20300,
        imageUrl: "images/madrid_spain_temple.jpeg"
    },
    {
        templeName: "Salt Lake Temple",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 115000,
        imageUrl: "images/salt_lake_temple.jpeg"
    }
];

const hamburger = document.getElementById('hamburger');
const primaryNav = document.querySelector('header nav');
const navLinks = document.querySelectorAll('#primary-nav a[data-filter]');
const templeContainer = document.getElementById('temple-container');
const message = document.getElementById('message');
const lastModified = document.getElementById('lastModified');
const fallbackImageUrl = 'week04/images/placeholder.svg';

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
    img.src = temple.imageUrl || fallbackImageUrl;
    img.alt = `${temple.templeName} temple`;
    img.loading = 'lazy';
    img.decoding = 'async';
    // Fallback image if the remote URL fails to load — use local SVG placeholder
    img.addEventListener('error', () => {
        if (img.src !== fallbackImageUrl) {
            img.src = fallbackImageUrl;
            img.alt = `${temple.templeName} image unavailable`;
            img.style.objectFit = 'contain';
        }
    });
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

// Removed data-URI placeholder; using local SVG file instead to avoid browser issues.

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
    if (templeContainer) {
        renderTemples(temples);
    }
    if (lastModified) {
        lastModified.textContent = `Last modified: ${new Date(document.lastModified).toLocaleDateString()}`;
    }
    // Ensure the Home filter is visually active on load
    setActiveFilter('home');
});
