const servicesData = [
  {
    title: 'Solar Energy Solutions',
    category: 'Energy',
    description: 'Design and install solar systems with battery backup, monitoring, and load management for homes and businesses.',
    packages: ['10kVA', '5kVA', '3.2kVA', '1.5kVA', '1kVA']
  },
  {
    title: 'CCTV Surveillance Systems',
    category: 'Security',
    description: 'Install reliable CCTV systems with remote access, motion detection, and expert placement for clear coverage.'
  },
  {
    title: 'Electric Fence Systems',
    category: 'Security',
    description: 'Protect property boundaries with professionally installed electric fencing that adds a strong layer of deterrence.'
  },
  {
    title: 'Access Control Systems',
    category: 'Security',
    description: 'Manage entrances securely with gate automation, access cards, and smart locking systems for residences and estates.'
  },
  {
    title: 'Electrical Installation',
    category: 'Electrical',
    description: 'Deliver safe wiring, lighting, and electrical upgrades that comply with industry standards and reduce risk.'
  },
  {
    title: 'Estates Management',
    category: 'Management',
    description: 'Coordinate multi-site installations, maintenance schedules, and support services for estate managers.'
  }
];

const localStorageKeys = {
  chosenCategory: 'paviChosenCategory',
  contactRequest: 'paviContactRequest'
};

function setCurrentYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

function setLastModified() {
  const el = document.getElementById('lastModified');
  if (!el) return;
  const modified = document.lastModified || '';
  el.textContent = `Last modified: ${modified} — Victor Mtisi`;
}

function setInnerHTML(container, html) {
  if (container) {
    container.innerHTML = html;
  }
}

function buildServiceCard(service) {
  const packagesHtml = service.packages
    ? `<p><strong>Packages:</strong> ${service.packages.join(', ')}</p>`
    : '';

  return `
    <article>
      <h3>${service.title}</h3>
      <p>${service.description}</p>
      ${packagesHtml}
      <p><strong>Category:</strong> ${service.category}</p>
    </article>
  `;
}

function renderServiceCards(services, selector) {
  const container = document.querySelector(selector);
  if (!container) {
    return;
  }

  if (services.length === 0) {
    setInnerHTML(container, '<p>No services match this selection.</p>');
    return;
  }

  const cards = services.map(buildServiceCard).join('');
  setInnerHTML(container, cards);
}

function buildCategoryButtons() {
  const categories = ['All', ...new Set(servicesData.map(service => service.category))];
  return categories.map(category => `
    <button type="button" data-category="${category}" class="filter-button">${category}</button>
  `).join('');
}

function highlightActiveButton(activeButton) {
  const buttons = document.querySelectorAll('[data-category-buttons] button');
  buttons.forEach(button => {
    button.classList.toggle('active', button === activeButton);
  });
}

function saveCategoryChoice(category) {
  localStorage.setItem(localStorageKeys.chosenCategory, category);
}

function getSavedCategory() {
  return localStorage.getItem(localStorageKeys.chosenCategory) || 'All';
}

function applyCategoryFilter(category) {
  const filtered = category === 'All'
    ? servicesData
    : servicesData.filter(service => service.category === category);
  renderServiceCards(filtered, '.services-grid');
  renderServiceCards(filtered.slice(0, 3), '[data-home-services]');
  saveCategoryChoice(category);

  const savedNote = document.getElementById('saved-category');
  if (savedNote) {
    savedNote.textContent = `Showing ${filtered.length} service${filtered.length === 1 ? '' : 's'} for “${category}”.`;
  }
}

function initCategoryButtons() {
  const container = document.querySelector('[data-category-buttons]');
  if (!container) {
    return;
  }

  container.innerHTML = buildCategoryButtons();
  const savedCategory = getSavedCategory();
  const button = container.querySelector(`[data-category="${savedCategory}"]`) || container.querySelector('[data-category="All"]');
  if (button) {
    highlightActiveButton(button);
  }

  container.addEventListener('click', event => {
    const button = event.target.closest('button[data-category]');
    if (!button) {
      return;
    }

    const category = button.dataset.category;
    highlightActiveButton(button);
    applyCategoryFilter(category);
  });
}

function initServicesPage() {
  const servicesGrid = document.querySelector('.services-grid');
  if (!servicesGrid) {
    return;
  }

  initCategoryButtons();
  applyCategoryFilter(getSavedCategory());
}

function initHomePreview() {
  const homeContainer = document.querySelector('[data-home-services]');
  if (!homeContainer) {
    return;
  }

  renderServiceCards(servicesData.slice(0, 3), '[data-home-services]');
}

function buildContactSummary(data) {
  const entries = [
    ['Name', data.name],
    ['Email', data.email],
    ['Phone', data.phone || 'Not provided'],
    ['Service requested', data.service],
    ['Timeline', data.timeline || 'Flexible'],
    ['Project details', data.details],
    ['Newsletter opt-in', data.newsletter ? 'Yes' : 'No']
  ];

  return `
    <div class="review-summary">
      <h2>Saved request details</h2>
      <dl>
        ${entries.map(([term, value]) => `
          <dt>${term}</dt>
          <dd>${value}</dd>
        `).join('')}
      </dl>
    </div>
  `;
}

function showFormMessage(message, status = 'info') {
  const messageElement = document.querySelector('.form-message');
  if (!messageElement) {
    return;
  }

  messageElement.textContent = message;
  messageElement.style.color = status === 'error' ? '#C1121F' : '#003566';
}

function saveContactRequest(request) {
  localStorage.setItem(localStorageKeys.contactRequest, JSON.stringify(request));
}

function getSavedContactRequest() {
  try {
    return JSON.parse(localStorage.getItem(localStorageKeys.contactRequest));
  } catch {
    return null;
  }
}

function displayContactSummary(request) {
  const summary = document.getElementById('contact-summary');
  if (!summary) {
    return;
  }

  summary.classList.remove('visually-hidden');
  summary.innerHTML = buildContactSummary(request);
}

function resetFormFields(form) {
  form.reset();
}

function initContactPage() {
  const form = document.getElementById('contact-form');
  if (!form) {
    return;
  }

  const savedRequest = getSavedContactRequest();
  if (savedRequest) {
    displayContactSummary(savedRequest);
  }

  form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form);
    const request = {
      name: formData.get('name')?.trim(),
      email: formData.get('email')?.trim(),
      phone: formData.get('phone')?.trim(),
      service: formData.get('service'),
      timeline: formData.get('timeline')?.trim(),
      details: formData.get('details')?.trim(),
      newsletter: formData.get('newsletter') === 'on'
    };

    if (!request.name || !request.email || !request.service || !request.details) {
      showFormMessage('Please complete all required fields before sending your request.', 'error');
      return;
    }

    saveContactRequest(request);
    displayContactSummary(request);
    showFormMessage('Your request is saved locally. We will contact you soon.', 'success');
    resetFormFields(form);
  });
}

function initPage() {
  setCurrentYear();
  setLastModified();
  initHomePreview();
  initServicesPage();
  initContactPage();
}

initPage();
