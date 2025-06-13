import { updateCell } from './updateCell';

export const setupCellEditing = (tbodyRows, selectedCellRef) => {
  tbodyRows.forEach((row) => {
    row.addEventListener('dblclick', (e) => {
      const selectedCell = e.target.closest('td');

      if (!selectedCell) {
        return;
      }

      selectedCellRef.current = selectedCell;

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
        updateCell(cellInput, initText, column, employerName, selectedCellRef);
      });
    });
  });
};
