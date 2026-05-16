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
});


