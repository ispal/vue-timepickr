const digits = [
  { value: 1, active: true, pressed: false },
  { value: 2, active: true, pressed: false },
  { value: 3, active: true, pressed: false },
  { value: 4, active: true, pressed: false },
  { value: 5, active: true, pressed: false },
  { value: 6, active: true, pressed: false },
  { value: 7, active: true, pressed: false },
  { value: 8, active: true, pressed: false },
  { value: 9, active: true, pressed: false },
  { value: 0, active: true, pressed: false }
];

/*
 * Data object share between components
 */
export default {
  activeIndex: 0,
  time: null,
  isOpen: false,
  digits: digits,
  arrowKeys: {
    left: {
      pressed: false
    },
    right: {
      pressed: false
    }
  }
};
