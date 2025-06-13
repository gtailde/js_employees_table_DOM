export const sort = (container, elements, column, sortType, sortBy = 'asc') => {
  container.innerHTML = '';

  Array.from(elements)
    .sort((a, b) => {
      let [textA, textB] = [
        a.cells[column].innerText.trim(),
        b.cells[column].innerText.trim(),
      ];

      if (sortType === 'string') {
        return sortBy === 'asc'
          ? textA.localeCompare(textB)
          : textB.localeCompare(textA);
      } else {
        textA = textA.replace(/[$,]/g, '');
        textB = textB.replace(/[$,]/g, '');

        return sortBy === 'asc'
          ? parseFloat(textA) - parseFloat(textB)
          : parseFloat(textB) - parseFloat(textA);
      }
    })
    .forEach((el) => container.append(el));
};
