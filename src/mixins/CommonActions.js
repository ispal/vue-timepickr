import { getDigit, activeNumbers } from '../helpers';

export default {
  methods: {
    resetArrowsPressed () {
      this.arrowKeys.left.pressed = false;
      this.arrowKeys.right.pressed = false;
    },
    digitSelected (digit) {
      getDigit(this.digits, digit).pressed = false;
      this.time.$set(this.activeIndex, digit);

      if (this.activeIndex === 3) {
        if (typeof this.close === 'function') {
          this.close();
        }
        if (typeof this.onClose === 'function') {
          this.onClose();
        }
      }

      this.goToNext();
    },
    arrowSelected (direction) {
      if (direction === 'left') {
        this.goToPrevious();
      }
      if (direction === 'right') {
        this.goToNext();
      }

      if (direction === 'up') {
        let nextValue = parseInt(this.time[this.activeIndex]) + 1;
        console.log(activeNumbers(this.filteredDigits));
        if (activeNumbers(this.filteredDigits).indexOf(nextValue) > -1) {
          this.time.$set(this.activeIndex, nextValue);
        }
      }
      if (direction === 'down') {
        let nextValue = parseInt(this.time[this.activeIndex]) - 1;
        if (activeNumbers(this.filteredDigits).indexOf(nextValue) > -1) {
          this.time.$set(this.activeIndex, nextValue);
        }
      }
    },
    goToNext () {
      if (this.activeIndex < 3) {
        this.activeIndex++;
      }
    },
    goToPrevious () {
      if (this.activeIndex > 0) {
        this.activeIndex--;
      }
    }
  }
};
