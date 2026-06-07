// Product data source (use `id` for option value, `name` for display)
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

function populateProductOptions() {
  const productSelect = document.getElementById('product');
  if (!productSelect) return;

  products.forEach((product) => {
    const option = document.createElement('option');
    option.value = product.id; // value is the product id
    option.textContent = product.name; // visible label is the product name
    productSelect.appendChild(option);
  });
}

window.addEventListener('DOMContentLoaded', populateProductOptions);

// Show the selected product's average rating below the select
function showSelectedProductAverage() {
  const select = document.getElementById('product');
  const avgEl = document.getElementById('productAverage');
  if (!select || !avgEl) return;

  const id = select.value;
  if (!id) {
    avgEl.textContent = 'Average rating: —';
    return;
  }

  const product = products.find(p => p.id === id);
  if (product) {
    avgEl.textContent = `Average rating: ${product.averagerating.toFixed(1)} / 5`;
  } else {
    avgEl.textContent = 'Average rating: —';
  }
}

window.addEventListener('DOMContentLoaded', function(){
  const select = document.getElementById('product');
  if (select) {
    select.addEventListener('change', showSelectedProductAverage);
  }
});
