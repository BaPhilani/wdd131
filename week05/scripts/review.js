function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value || 'Unknown';
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Same product array used by the form so we can map id -> name for display
const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

function renderReviewConfirmation() {
  const params = new URLSearchParams(window.location.search);
  const product = params.get('product');
  const rating = params.get('rating');
  const installDate = params.get('installDate');
  const reviewText = params.get('reviewText');
  const userName = params.get('userName') || 'Anonymous';
  const usefulFeatures = params.getAll('usefulFeatures');

  const message = document.getElementById('confirmationMessage');
  const summary = document.getElementById('reviewSummary');
  const count = document.getElementById('reviewCount');

  const starsEl = document.getElementById('ratingStars');
  const titleEl = document.getElementById('confirmationTitle');

  if (!product || !rating || !installDate) {
    message.textContent = 'It looks like your review details are missing. Please return to the form and submit again.';
    return;
  }

  const reviewCount = Number(localStorage.getItem('reviewCount') || '0') + 1;
  localStorage.setItem('reviewCount', reviewCount.toString());

  // map product id back to its display name when possible
  const productObj = products.find(p => p.id === product);
  const productName = productObj ? productObj.name : product;
  message.textContent = `Your review for ${productName} has been received.`;

  if (titleEl) titleEl.textContent = 'Thanks — your review is live';

  // Render stars visual (filled stars equal to rating)
  if (starsEl) {
    const starCount = Math.max(0, Math.min(5, Number(rating) || 0));
    starsEl.innerHTML = Array.from({ length: 5 }).map((_, i) => {
      return i < starCount ? '<span class="star-label">★</span>' : '<span class="star-label">☆</span>';
    }).join(' ');
  }

  const featuresList = usefulFeatures.length
    ? usefulFeatures.join(', ')
    : 'No useful features selected.';

  // escape content to avoid injection
  function escapeHtml(s){
    if (!s) return '';
    return String(s).replace(/[&<>"']/g, function (c) { return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;" }[c]; });
  }

  summary.innerHTML = `
    <dl>
      <dt>Product</dt>
      <dd>${escapeHtml(productName)}</dd>
      <dt>Product average</dt>
      <dd>${productObj && productObj.averagerating ? productObj.averagerating.toFixed(1) + ' / 5' : 'N/A'}</dd>
      <dt>Overall rating</dt>
      <dd>${escapeHtml(rating)} / 5</dd>
      <dt>Date of installation</dt>
      <dd>${escapeHtml(formatDate(installDate))}</dd>
      <dt>Useful features</dt>
      <dd>${escapeHtml(featuresList)}</dd>
      <dt>Written review</dt>
      <dd>${escapeHtml(reviewText) || 'No review text provided.'}</dd>
      <dt>User name</dt>
      <dd>${escapeHtml(userName)}</dd>
      <dt>Submitted</dt>
      <dd>${new Date().toLocaleString()}</dd>
    </dl>
  `;

  count.textContent = `Reviews submitted from this browser: ${reviewCount}`;
}

window.addEventListener('DOMContentLoaded', renderReviewConfirmation);
