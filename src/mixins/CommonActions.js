
import { getDigit, activeNumbers } from '../helpers';

export default {
  methods: {
    resetArrowsPressed () {
      this.arrowKeys.left.pressed = false;
      this.arrowKeys.right.pressed = false;
    },
    digitPressed (digit) {
      let pressedDigit = getDigit(this.digits, digit);
      pressedDigit.pressed = true;
    },
    arrowPressed (direction) {
      this.arrowKeys[direction].pressed = true;
    },
    digitSelected (digit, evt) {
      if (evt) {
        evt.preventDefault();
      }

      if (!getDigit(this.digits, digit).active) {
        getDigit(this.digits, digit).pressed = false;
        return;
      }

      getDigit(this.digits, digit).pressed = false;

      this.$set(this.time, this.activeIndex, digit);

      if (this.activeIndex === 3) {
        if (this.$parent.$parent === undefined) {
          this.$emit('close');
        } else {
          this.$parent.$parent.$emit('close');
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
        if (activeNumbers(this.filteredDigits).indexOf(nextValue) > -1) {
          this.$set(this.time, this.activeIndex, nextValue);
        }
      }
      if (direction === 'down') {
        let nextValue = parseInt(this.time[this.activeIndex]) - 1;
        if (activeNumbers(this.filteredDigits).indexOf(nextValue) > -1) {
          this.$set(this.time, this.activeIndex, nextValue);
        }
      }
    },
    goToNext (evt) {
      if (evt) {
        evt.preventDefault();
      }
      if (this.activeIndex < 3) {
        this.activeIndex++;
        this.arrowKeys['right'].pressed = false;
      }
    },
    goToPrevious (evt) {
      if (evt) {
        evt.preventDefault();
      }
      if (this.activeIndex > 0) {
        this.activeIndex--;
        this.arrowKeys['left'].pressed = false;
      }
    },
    blurEl (el) {
      el.blur();
    }
  }
};
