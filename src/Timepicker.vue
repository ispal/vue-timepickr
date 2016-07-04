<template>
  <div class="timepicker">
    <div class="timepicker__header">
      Set time
    </div>
    <div class="timepicker__time">
       <div class="timepicker__unit">1</div>
       <div class="timepicker__unit">2</div>
       <div class="timepicker__separator">:</div>
       <div class="timepicker__unit">3</div>
       <div class="timepicker__unit">4</div>
       <div class="timepicker__active-bg" style="transform:translate({{ activeIndex * 30 }}px, 0)"></div>
    </div>
    <div class="timepicker__digits">
      <div 
        class="timepicker__digit" 
        v-for="digit in digits" 
        :class="{ 'is-disabled': digit == 2}"
        @click="activeIndex = $index"
        >
        {{ digit }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      digits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      activeIndex: 0
    };
  }
};
</script>

<style lang="scss">
$header-bg: #39A9DB;
$time-bg: lighten($header-bg, 10%);
$active-unit-bg: $header-bg;
$digit-color: #757575;
$border-radius: 3px;


.timepicker {
  background: #FBFBFF;
  width: 250px;
  box-shadow: 0 3px 10px rgba(0,0,0,.3);
  border-radius: $border-radius;
  overflow: hidden;

  &__header {
    padding: 5px 15px;
    font-size: 14px;
    color: #fff;
    background: $header-bg;
  }
  &__time {
    position: relative;
    background: $time-bg;
    display: flex;
    justify-content: center;
    font-size: 50px;
    color: #fff;
    line-height: 1;
    padding: 15px 10px;
  }

  &__unit {
    z-index: 2;
    position: relative;
    padding: 0 2px;
  }

  &__active-bg {
    position: absolute;
    top: 20px;
    left: 40px;
    width: 30px;
    height: 42px;
    background: $active-unit-bg;
    transition: transform .3s ease;
  }

  &__separator {
    z-index: 2;
    position: relative;
    padding: 0 15px;
    font-size: 90%;
  }

  &__digits {
    display: flex;
    flex-wrap: wrap;
    padding: 5px 20px;
  }

  &__digit {
    width: 33%;
    padding: 15px 0;
    text-align: center;
    color: $digit-color;
    font-weight: 600;
    cursor: pointer;

    &.is-disabled {
      color: rgba($digit-color, 0.6);
    }
  }
}
</style>
