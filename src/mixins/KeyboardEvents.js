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

export default {
  ready () {
    this.$el.addEventListener('keyup', this.numbersClicked);
  },

  beforeDestroy () {
    this.$el.removeEventListener('keyup');
  },

  methods: {
    numbersClicked (e) {
      let numberCodes = Object.values(keyCodes);
      let numberKeys = Object.keys(keyCodes);
      let keyIndex = numberCodes.indexOf(e.keyCode);
      let numberPressed = numberKeys[keyIndex];
      let availableNumbers = this.filteredDigits
                                .filter(digit => digit.active)
                                .map(item => item.value);

      if (keyIndex > -1 && availableNumbers.indexOf(parseInt(numberPressed)) > -1) {
        this.digitSelected(numberPressed);
      }
    }
  }
};
