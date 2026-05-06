const yearElement = document.getElementById('year');
const modifiedElement = document.getElementById('lastModified');

if (yearElement) {
  yearElement.innerHTML = new Date().getFullYear();
}

if (modifiedElement) {
  modifiedElement.innerHTML = `Last Modified: ${document.lastModified}`;
}
