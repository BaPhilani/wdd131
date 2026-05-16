const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('ul'); //fill in the blank to reference the unordered list element.
const li = document.createElement('li');
const deleteButton = document.createElement('button');
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('ul');

button.addEventListener('click', function () {
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');

    li.textContent = input.value;
    deleteButton.textContent = '❌';

    li.append(deleteButton);
    list.append(li);

    input.value = '';
    input.focus();
});

const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('ul');

button.addEventListener('click', function () {

    const li = document.createElement('li');
    const deleteButton = document.createElement('button');

    li.textContent = input.value;

    deleteButton.textContent = '❌';

    // Accessibility improvement
    deleteButton.setAttribute('aria-label', `Remove ${input.value}`);

    li.append(deleteButton);

    list.append(li);

    input.value = '';
    input.focus();

    const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

button.addEventListener('click', function () {

  // Check if input is not blank
  if (input.value.trim() !== '') {

    // Create list item
    const li = document.createElement('li');

    // Create delete button
    const deleteButton = document.createElement('button');

    // Populate the elements
    li.textContent = input.value;
    deleteButton.textContent = '❌';

    // Append elements
    li.append(deleteButton);
    list.append(li);

    // Delete functionality
    deleteButton.addEventListener('click', function () {
      list.removeChild(li);
      input.focus();
    });

    // Clear input field
    input.value = '';

    // Return focus to input
    input.focus();
  }
  else {
    // If blank, focus back to input
    input.focus();
  }

});





