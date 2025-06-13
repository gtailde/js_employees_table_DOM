'use strict';

import { renderForm } from './renderForm';
import { setupCellEditing } from './modules/cellEditor';
import { initTableEvents } from './modules/initTableEvents';
import { tbody } from './modules/constants';

renderForm();

const tbodyRows = tbody.querySelectorAll('tr');
const selectedCellRef = { current: null };

setupCellEditing(tbodyRows, selectedCellRef);
initTableEvents(selectedCellRef);
