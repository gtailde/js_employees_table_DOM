import { pushNotification } from '../pushNotification';
import { theadRow } from './constants';

export const updateCell = (
  cellInput,
  initText,
  column,
  employerName,
  selectedCellRef,
) => {
  if (!selectedCellRef.current) {
    return;
  }

  selectedCellRef.current.innerHTML = '';

  const changedProperty = theadRow.children[column].innerText;

  if (!cellInput.value) {
    selectedCellRef.current.innerText = initText;

    pushNotification(
      20,
      20,
      'Update cell error',
      `Cell cannot be empty, initial value set`,
    );
  } else {
    selectedCellRef.current.innerText = cellInput.value;

    pushNotification(
      20,
      20,
      'Cell successfully updated',
      `${changedProperty} for employee ${employerName} has been changed`,
    );
  }

  selectedCellRef.current = null;
};
