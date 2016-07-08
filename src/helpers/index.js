function contains (array, value) {
  return array.indexOf(value) >= 0;
}

function filterAvailableDigits (allDigits, availableDigits) {
  allDigits.forEach(item => {
    item.active = contains(availableDigits, item.value);
  });
  return allDigits;
}

export function getDigit (allDigits, number) {
  return allDigits
          .filter(digit => digit.value === number)
          .reduce((old, item) => {
            return item;
          }, {});
}

export function filteredDigits (index, digits, time) {
  if (index === 0) {
    if (time[1] > 3) {
      return filterAvailableDigits(digits, [0, 1]);
    }
    return filterAvailableDigits(digits, [0, 1, 2]);
  }
  if (index === 1) {
    if (time[0] === 2) {
      return filterAvailableDigits(digits, [0, 1, 2, 3]);
    }
    return filterAvailableDigits(digits, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  }
  if (index === 2) {
    return filterAvailableDigits(digits, [0, 1, 2, 3, 4, 5]);
  }
  if (index === 3) {
    return filterAvailableDigits(digits, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  }
}

export function activeNumbers (numbers) {
  return numbers
          .filter(digit => digit.active)
          .map(item => item.value);
}
