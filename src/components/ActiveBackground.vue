<template>
  <div class="timepicker__active-bg" :style="'transform:translate(' + fromLeft + 'px, 0)'"></div>
</template>

<script>
export default {
  props: ['activeIndex'],
  computed: {
    fromLeft () {
      let singleDigitWidth = 32;
      return this.activeIndex < 2
              ? this.activeIndex * singleDigitWidth
              : this.activeIndex * singleDigitWidth + 42;
    }
  }
};
</script>