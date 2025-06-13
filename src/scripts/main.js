'use strict';

import { formatCurrency } from './formatCurrency';
import { handleFormSubmission } from './handleFormSubmission';
import { pushNotification } from './pushNotification';
import { renderForm } from './renderForm';
import { sort } from './sort';

renderForm();

const table = document.querySelector('table');
const tbody = table.querySelector('tbody');
const thead = table.querySelector('thead');
const theadRow = thead.querySelector('tr');

let currentSortColumn;
let activeRow;
let selectedCell;

table.addEventListener('click', (e) => {
  const target = e.target;

  if (target.closest('thead') && target.tagName === 'TH') {
    const bodyRows = tbody.querySelectorAll('tr');
    const th = target;
    const siblings = Array.from(th.parentNode.children);
    const index = siblings.indexOf(th);

    const sortBy = currentSortColumn === index ? 'desc' : 'asc';

    currentSortColumn = sortBy === 'asc' ? index : -1;

    if (index === 0 || index === 1 || index === 2) {
      sort(tbody, bodyRows, index, 'string', sortBy);
    } else if (index === 3 || index === 4) {
      sort(tbody, bodyRows, index, 'number', sortBy);
    }
  }

  if (target.tagName === 'TD') {
    const td = target;
    const tr = td.closest('tr');

    if (activeRow) {
      activeRow.classList.remove('active');
    }

    activeRow = tr;
    tr.classList.add('active');
  }
});

const updateCell = (cellInput, initText, column, employerName) => {
  const changedProperty = theadRow.children[column].innerText;
  const inputValue = cellInput.value?.trim();

  cellInput.remove();

  if (!inputValue) {
    selectedCell.innerText = initText;

    return pushNotification(
      20,
      20,
      'Update cell error',
      'Cell cannot be empty, initial value set',
      'error',
    );
  }

  let newValue;

  switch (column) {
    case 0:
    case 1:
    case 2:
      if (inputValue.length < 4) {
        selectedCell.innerText = initText;

        return pushNotification(
          20,
          20,
          'Update cell error',
          `Cell ${changedProperty} must contain more than 4 characters`,
          'error',
        );
      }
      newValue = inputValue;
      break;
    case 3:
      const age = Number(inputValue);

      if (isNaN(age) || age < 18 || age > 90) {
        selectedCell.innerText = initText;

        return pushNotification(
          20,
          20,
          'Update cell error',
          `Cell ${changedProperty} must be from 18 to 90`,
          'error',
        );
      }
      newValue = String(age);
      break;
    case 4:
      newValue = formatCurrency(inputValue);

      if (typeof newValue !== 'string' || !newValue.trim()) {
        selectedCell.innerText = initText;

        return pushNotification(
          20,
          20,
          'Update cell error',
          `Invalid ${changedProperty}, initial value set`,
          'error',
        );
      }
      break;
  }

  selectedCell.innerText = newValue;

  pushNotification(
    20,
    20,
    'Cell successfully updated',
    `${changedProperty} for employee ${employerName} has been changed`,
  );

  selectedCell = null;
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if (selectedCell) {
      const input = document.querySelector('.cell-input');

      input.blur();
    } else {
      handleFormSubmission();
    }
  }
});

tbody.addEventListener('dblclick', (e) => {
  selectedCell = e.target;

  if (!selectedCell) {
    return;
  }

  const tbodyRow = selectedCell.closest('tr');
  const employerName = tbodyRow.children[0].innerText;

  const siblings = Array.from(selectedCell.parentNode.children);
  const column = siblings.indexOf(selectedCell);

  const initText = selectedCell.innerText;
  const cellInput = document.createElement('input');

  cellInput.classList.add('cell-input');
  cellInput.value = initText;

  selectedCell.innerHTML = '';
  selectedCell.append(cellInput);

  cellInput.focus();

  cellInput.addEventListener('blur', () => {
    updateCell(cellInput, initText, column, employerName);
  });
});
