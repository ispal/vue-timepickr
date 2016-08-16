<template>
  <div class="timepicker__active-bg" :style="transform"></div>
</template>

<script>
import store from '../store';

export default {
  data () {
    return store;
  },
  computed: {
    transform () {
      let singleDigitWidth = 34;
      let offset = this.activeIndex < 2
                    ? this.activeIndex * singleDigitWidth
                    : this.activeIndex * singleDigitWidth + singleDigitWidth;

      return {
        transform: `translate3d(${offset}px, 0, 0)`
      };
    }
  }
};
</script>