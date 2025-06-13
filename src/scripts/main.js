'use strict';

import { handleFormSubmission } from './handleFormSubmission';
import { pushNotification } from './pushNotification';
import { renderForm } from './renderForm';
import { sort } from './sort';

renderForm();

const table = document.querySelector('table');
const tbody = table.querySelector('tbody');
const thead = table.querySelector('thead');
const theadRow = thead.querySelector('tr');
const tbodyRows = tbody.querySelectorAll('tr');

let currentSortColumn;
let activeRow;
let selectedCell;

table.addEventListener('click', (e) => {
  const target = e.target;

  if (target.tagName === 'TH') {
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
  selectedCell.innerHTML = '';

  const changedProperty = theadRow.children[column].innerText;

  if (!cellInput.value) {
    selectedCell.innerText = initText;

    pushNotification(
      20,
      20,
      'Update cell error',
      'Cell cannot be empty, initial value set',
    );
  } else {
    pushNotification(
      20,
      20,
      'Cell successfully updated',
      `${changedProperty} for employee ${employerName} has been changed`,
    );
    selectedCell.innerText = cellInput.value;
  }

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

tbodyRows.forEach((row) => {
  row.addEventListener('dblclick', (e) => {
    selectedCell = e.target.closest('td');

    if (!selectedCell) {
      return;
    }

    const employerName = row.children[0].innerText;

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
});
