let form = document.getElementById('form');
let sortByNameBtn = document.getElementById('btn-sort-name');
let sortByValueBtn = document.getElementById('btn-sort-value');
let deleteBtn = document.getElementById('btn-delete');
let inputField = document.getElementById('input-field');
let selectField = document.getElementById('select-field');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let value = inputField.value.trim();

    // Regex validates "name=value" string, allows optional spaces before and/or after the equal-sign
    // Name/value are alphanumeric, case-insensitive
    if(/^[a-z0-9]+\s*=\s*[a-z0-9]+$/i.test(value)) {
        // Clean up spaces around words of user input
        value = value.split('=').map(str => str.trim()).join('=');

        // Create and add an option to a select with user's input
        let option = document.createElement('option');
        option.innerText = value;
        selectField.appendChild(option);

        inputField.value = '';
    } else {
        // Add a class with error message if a name/value is invalid
        form.classList.add('invalid');
    }
})

// Reset invalid state on user input
inputField.addEventListener('input', function () {
    form.classList.remove('invalid');
})

// Sort options by Name ascending
sortByNameBtn.addEventListener('click', function () {
    const sortedOptions = [...selectField.children].sort((a, b) => {
        // Retrieve names from option text
        const [nameA] = a.innerText.split('=');
        const [nameB] = b.innerText.split('=');

        return nameA.localeCompare(nameB);
    })

    sortedOptions.forEach((option) => selectField.appendChild(option));
})

// Sort options by Value ascending
sortByValueBtn.addEventListener('click', function () {
    const sortedOptions = [...selectField.children].sort((a, b) => {
        // Retrieve values from option text
        const [, valueA] = a.innerText.split('=');
        const [, valueB] = b.innerText.split('=');

        return valueA.localeCompare(valueB);
    })

    sortedOptions.forEach((option) => selectField.appendChild(option));
})

// Delete all selected options
deleteBtn.addEventListener('click', function () {
    let selectedOptions = [...selectField.selectedOptions];

    selectedOptions.forEach((option) => option.remove());
})

