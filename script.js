const listContainer = document.querySelector('.js-list-items');

const inputField = document.getElementById('js-input');
const addButton = document.getElementById('js-button');

const errorMsg = document.querySelector('.js-error-msg');
const msg = 'Field is empty';

function checkForAnySpace(value) {
  return /\s+/.test(value);
}

inputField.addEventListener('input', function () {
  const curInput = inputField.value;

  if (curInput.length > 0) {
    errorMsg.innerText = '';
  }

  const isAnySpace = checkForAnySpace(curInput);

  if (isAnySpace) {
    inputField.setAttribute('maxLength', 100);
  } else {
    inputField.setAttribute('maxLength', 20);
  }
});

function createNewElement(value) {
  const newItem = document.createElement('li');

  newItem.innerHTML = `
    <div class="icon-start">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
        <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
      </svg>
    </div>
    <p>${value}</p>
    <div class="icon-end">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
      </svg>
    </div>
  `;

  listContainer.appendChild(newItem);
}

function checkStartForSpace(value) {
  return /^\s+/.test(value);
}

addButton.addEventListener('click', function () {
  const curValue = inputField.value;

  if (curValue === '') {
    errorMsg.innerText = msg;

    inputField.focus();
  } else {
    const isSpaceAtStart = checkStartForSpace(curValue);

    if (!isSpaceAtStart) {
      createNewElement(curValue);
    }
  }

  inputField.value = '';
});

inputField.addEventListener('keydown', function (e) {
  const curValue = inputField.value;

  if (curValue === '') {
    errorMsg.innerText = msg;
  } else {
    const isSpaceAtStart = checkStartForSpace(curValue);

    if (!isSpaceAtStart) {
      const key = e.key;

      if (key === 'Enter') {
        createNewElement(curValue);
    
        inputField.value = '';

        inputField.blur();
      }
    } else {
      inputField.value = '';
    }
  }
});