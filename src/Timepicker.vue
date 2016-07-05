<template>
  <div class="timepicker" tabindex="0" 
      @keyup.right="goToNext()"
      @keyup.left="goToPrevious()"
      @keyup.1="goToPrevious()"
      v-numpad
  >
    <div class="timepicker__header">
      Set time
    </div>
    <div class="timepicker__time">
      <div class="timepicker__unit">
        <input type="text" readonly="true" value="{{ timeParts[0] }}"
          @click="setActiveIndex(0)"
        >
      </div>
      <div class="timepicker__unit">
        <input type="text" readonly="true" class="timepicker__unit" value="{{ timeParts[1] }}"
          @click="setActiveIndex(1)"
        >
      </div>
      <div class="timepicker__separator">:</div>
      <div class="timepicker__unit">
        <input type="text" readonly="true" class="timepicker__unit" value="{{ timeParts[2] }}"
          @click="setActiveIndex(2)"
        >
      </div>
      <div class="timepicker__unit">
        <input type="text" readonly="true" class="timepicker__unit" value="{{ timeParts[3] }}"
          @click="setActiveIndex(3)"
        >
      </div>
      <active-background :active-index="activeIndex"></active-background>
    </div>
    <div class="timepicker__digits">
      <button 
        class="timepicker__digit" 
        v-for="digit in filteredDigits" 
        :class="{ 'is-disabled': !digit.active }"
        :disabled="!digit.active"
        @click="digitSelected(digit.value)"
        >
        {{ digit.value }}
      </button>
    </div>
    <div class="timepicker__arrows">
      <button 
        class="timepicker__digit"
        :class="{ 'is-disabled': activeIndex <= 0 }"
        :disabled="activeIndex <= 0"
        @click="goToPrevious()"
      >&#9664;</button>
      <button 
        class="timepicker__digit"
        :class="{ 'is-disabled': activeIndex > 2 }"
        :disabled="activeIndex > 2"
        @click="goToNext()"
      >&#9658;</button>
    </div>
  </div>
</template>

<script>
import ActiveBackground from 'components/ActiveBackground';

let digits = [
  { value: 1, active: true },
  { value: 2, active: true },
  { value: 3, active: true },
  { value: 4, active: true },
  { value: 5, active: true },
  { value: 6, active: true },
  { value: 7, active: true },
  { value: 8, active: true },
  { value: 9, active: true },
  { value: 0, active: true }
];

function contains (array, value) {
  return array.indexOf(value) >= 0;
}

function filterAvailableDigits (allDigits, availableDigits) {
  allDigits.forEach(item => {
    item.active = contains(availableDigits, item.value);
  });
  return allDigits;
}

export default {
  props: ['value'],
  components: {
    ActiveBackground
  },
  data () {
    return {
      activeIndex: 0,
      time: null,
      digits: digits
    };
  },
  created () {
    this.time = this.value.replace(':', '').split('');
  },
  computed: {
    timeParts () {
      return this.time;
    },
    filteredDigits () {
      if (this.activeIndex === 0) {
        return filterAvailableDigits(digits, [0, 1, 2]);
      }
      if (this.activeIndex === 1) {
        console.log(this.time[this.activeIndex]);
        if (this.time[0] === 2) {
          return filterAvailableDigits(digits, [0, 1, 2, 3]);
        }
        return filterAvailableDigits(digits, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      }
      if (this.activeIndex === 2) {
        return filterAvailableDigits(digits, [0, 1, 2, 3, 4, 5]);
      }
      if (this.activeIndex === 3) {
        return filterAvailableDigits(digits, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      }
    }
  },
  methods: {
    digitSelected (digit) {
      this.time.$set(this.activeIndex, digit);
      this.goToNext();
    },
    setActiveIndex (index) {
      this.activeIndex = index;
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
</script>

<style lang="scss">
$header-bg: #39A9DB;
$time-bg: lighten($header-bg, 10%);
$active-unit-bg: $header-bg;
$digit-color: #757575;
$border-radius: 3px;
$input-width: 30px;


.timepicker {
  position: relative;
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
    padding: 12px 10px;
  }

  input {
    z-index: 2;
    color: #fff;
    font-size: 50px;
    line-height: 50px;
    text-align: center;
    width: $input-width;
    height: 50px;
    position: relative;
    background: transparent;
    border: none;
    outline: none;

    &:focus,
    &:active {
      background: transparent;
    }
  }

  &__active-bg {
    position: absolute;
    top: 18px;
    left: 41px;
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

    .timepicker__digit:last-of-type {
      margin-left: auto;
      margin-right: auto;
    }
  }

  &__arrows {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    padding: 5px 20px;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: space-between;
  }

  &__digit {
    width: 33%;
    padding: 15px 0;
    text-align: center;
    color: $digit-color;
    background: none;
    border: none;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.3;
    cursor: pointer;
    transition: color .3s ease;

    &.is-disabled {
      color: rgba($digit-color, 0.3);
    }
  }
}
</style>
