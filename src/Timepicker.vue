<template>
  <div class="timepicker">
    <div class="timepicker__header">
      Set time
    </div>
    <div class="timepicker__time">
       <div class="timepicker__unit">0</div>
       <div class="timepicker__unit">0</div>
       <div class="timepicker__separator">:</div>
       <div class="timepicker__unit">0</div>
       <div class="timepicker__unit">0</div>
    </div>
    <div class="timepicker__digits">
      <div class="timepicker__digit" v-for="digit in digits">
        {{ digit }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      digits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    };
  }
};
</script>

<style lang="scss">
$header-bg: #07BEB8;
$time-bg: #3DCCC7;

.timepicker {
  background: #fff;
  width: 200px;
  box-shadow: 0 3px 10px rgba(0,0,0,.3);

  &__header {
    padding: 5px 15px;
    font-size: 14px;
    color: #fff;
    background: $header-bg;
  }
  &__time {
    background: $time-bg;
    display: flex;
    justify-content: center;
    font-size: 40px;
    color: #fff;
    line-height: 1;
    padding: 10px;
  }

  &__unit {
    padding: 0 2px;
  }

  &__separator {
    padding: 0 10px;
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
  }
}
</style>
