const products = [
  {
    id: "ss-10kva",
    name: "10kva solar package",
    averagerating: 4.9
  },
  {
    id: "ss-5kva",
    name: "5kva solar package",
    averagerating: 4.7
  },
  {
    id: "ss-3.2kva",
    name: "3.2kva solar package",
    averagerating: 4.4
  },
  {
    id: "ss-1.5kva",
    name: "1.5kva solar package",
    averagerating: 4.2
  },
  {
    id: "ss-1kva",
    name: "1kva solar package",
    averagerating: 4.0
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
