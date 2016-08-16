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

const escKey = 27;

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
  mounted () {
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('keydown', this.onKeyPressed);
    window.addEventListener('keyup', e => {
      if (e.keyCode === escKey) {
        this.close(true);
      }
    });
  },

  beforeDestroy () {
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('keydown', this.onKeyPressed);
    window.addEventListener('keyup', this.close);
  },

  methods: {
    onKeyUp (e) {
      if (!this.isOpen) {
        return;
      }

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
      if (!this.isOpen) {
        return;
      }
      if (isNumberPressed(e.keyCode, numberKeyCodes)) {
        let numberPressed = getNumberPressed(e.keyCode, numberKeyCodes);
        if (activeNumbers(this.filteredDigits).indexOf(numberPressed) > -1) {
          this.digitPressed(numberPressed);
        }
      }

      if (isArrowPressed(e.keyCode, arrowKeyCodes)) {
        e.preventDefault();
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
