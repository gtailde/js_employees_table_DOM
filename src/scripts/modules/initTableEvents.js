import { sort } from './sortTable';
import { handleFormSubmission } from '../handleFormSubmission';
import { table, tbody } from './constants';

export const initTableEvents = (selectedCellRef) => {
  let currentSortColumn = null;
  let activeRow = null;

  table.addEventListener('click', (e) => {
    const target = e.target;

    if (target.tagName === 'TH') {
      const bodyRows = tbody.querySelectorAll('tr');
      const th = target;
      const siblings = Array.from(th.parentNode.children);
      const index = siblings.indexOf(th);
      const sortBy = currentSortColumn === index ? 'desc' : 'asc';

      currentSortColumn = sortBy === 'asc' ? index : -1;

      if (index <= 2) {
        sort(tbody, bodyRows, index, 'string', sortBy);
      } else if (index === 3 || index === 4) {
        sort(tbody, bodyRows, index, 'number', sortBy);
      }
    }

    if (target.tagName === 'TD') {
      const tr = target.closest('tr');

      if (activeRow) {
        activeRow.classList.remove('active');
      }
      activeRow = tr;
      tr.classList.add('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      if (selectedCellRef.current) {
        const input = document.querySelector('.cell-input');

        if (input) {
          input.blur();
        }
      } else {
        handleFormSubmission();
      }
    }
  });
};
