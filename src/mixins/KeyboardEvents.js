const keyCodes = {
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

function availableNumbers (numbers) {
  return numbers
          .filter(digit => digit.active)
          .map(item => item.value);
}

export default {
  ready () {
    this.$el.addEventListener('keyup', this.numbersClicked);
    this.$el.addEventListener('keydown', this.numberPressed);
  },

  beforeDestroy () {
    this.$el.removeEventListener('keyup');
    this.$el.removeEventListener('keydown');
  },

  methods: {
    numbersClicked (e) {
      let numberCodes = Object.values(keyCodes);
      let numberKeys = Object.keys(keyCodes);
      let keyIndex = numberCodes.indexOf(e.keyCode);
      let numberPressed = parseInt(numberKeys[keyIndex]);

      if (availableNumbers(this.filteredDigits).indexOf(numberPressed) > -1) {
        this.digitSelected(numberPressed);
      }
    },
    numberPressed (e) {
      let numberCodes = Object.values(keyCodes);
      let numberKeys = Object.keys(keyCodes);
      let keyIndex = numberCodes.indexOf(e.keyCode);
      let numberPressed = parseInt(numberKeys[keyIndex]);
      availableNumbers(this.filteredDigits);

      if (availableNumbers(this.filteredDigits).indexOf(numberPressed) > -1) {
        this.digitPressed(numberPressed);
      }
    }
  }
};
