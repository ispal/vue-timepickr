<template>
  <div class="timepicker__active-bg" :style="transform"></div>
</template>

<script>
export default {
  props: ['activeIndex'],
  computed: {
    transform () {
      let singleDigitWidth = 34;
      let offset = this.activeIndex < 2
                    ? this.activeIndex * singleDigitWidth
                    : this.activeIndex * singleDigitWidth + singleDigitWidth;

      return {
        transform: `translate(${offset}px, 0)`
      };
    }
  }
};
</script>