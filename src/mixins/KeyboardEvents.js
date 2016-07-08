import { activeNumbers } from '../helpers';

const numberKeyCodes = {
  0: 48,
  1: 49,
  2: 50,
  3: 51,
  4: 52,
  5: 53,
  6: 54,
  7: 55,
  8: 56,
  9: 57
};

const arrowKeyCodes = {
  'left': 37,
  'right': 39,
  'up': 38,
  'down': 40
};

function isNumberPressed (keyCode, numberKeyCodes) {
  return Object.values(numberKeyCodes).indexOf(keyCode) > -1;
}

function getNumberPressed (keyCode, numberKeyCodes) {
  let keyIndex = Object.values(numberKeyCodes).indexOf(keyCode);
  return parseInt(Object.keys(numberKeyCodes)[keyIndex]);
}

function getArrowPressed (keyCode, numberKeyCodes) {
  let keyIndex = Object.values(numberKeyCodes).indexOf(keyCode);
  return Object.keys(numberKeyCodes)[keyIndex];
}

function isArrowPressed (keyCode, arrowKeyCodes) {
  return Object.values(arrowKeyCodes).indexOf(keyCode) > -1;
}

export default {
  ready () {
    this.$el.addEventListener('keyup', this.onKeyUp);
    this.$el.addEventListener('keydown', this.onKeyPressed);
  },

  beforeDestroy () {
    this.$el.removeEventListener('keyup');
    this.$el.removeEventListener('keydown');
  },

  methods: {
    onKeyUp (e) {
      if (isNumberPressed(e.keyCode, numberKeyCodes)) {
        let numberPressed = getNumberPressed(e.keyCode, numberKeyCodes);
        if (activeNumbers(this.filteredDigits).indexOf(numberPressed) > -1) {
          this.digitSelected(numberPressed);
        }
      }
      if (isArrowPressed(e.keyCode, arrowKeyCodes)) {
        let arrowPressed = getArrowPressed(e.keyCode, arrowKeyCodes);

        this.arrowSelected(arrowPressed);
      }

      if (e.keyCode === 13 && e.target.classList.contains('timepicker')) {
        this.close();
      }

      this.resetArrowsPressed();
    },
    onKeyPressed (e) {
      if (isNumberPressed(e.keyCode, numberKeyCodes)) {
        let numberPressed = getNumberPressed(e.keyCode, numberKeyCodes);
        if (activeNumbers(this.filteredDigits).indexOf(numberPressed) > -1) {
          this.digitPressed(numberPressed);
        }
      }

      if (isArrowPressed(e.keyCode, arrowKeyCodes)) {
        let arrowPressed = getArrowPressed(e.keyCode, arrowKeyCodes);
        if (arrowPressed === 'left' && this.activeIndex > 0 ||
            arrowPressed === 'right' && this.activeIndex < 3
          ) {
          this.arrowPressed(arrowPressed);
        }
      }
    }
  }
};
