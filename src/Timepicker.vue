<template>
  <div class="timepicker-wrap">
    <input type="text" class="time" value="{{ value }}"
      @focus="isOpen = true"
    >
    <div class="timepicker" tabindex="0"
        @keyup.right="goToNext()"
        @keyup.left="goToPrevious()"
        @keyup.1="goToPrevious()"
        :class="{'is-open': isOpen}"
    > 
      <div class="timepicker__header">
        Set time
      </div>
      <div class="timepicker__time">
        <time-unit :value="timeParts[0]" index="0" :on-click="setActiveIndex"></time-unit>
        <time-unit :value="timeParts[1]" index="1" :on-click="setActiveIndex"></time-unit>
        <div class="timepicker__separator">:</div>
        <time-unit :value="timeParts[2]" index="2" :on-click="setActiveIndex"></time-unit>
        <time-unit :value="timeParts[3]" index="3" :on-click="setActiveIndex"></time-unit>
        <active-background :active-index="activeIndex"></active-background>
      </div>
      <div class="timepicker__digits">
        <div
          class="timepicker__digit" 
          v-for="digit in filteredDigits"
        >
          <div 
            class="timepicker__ripple"
            :class="{ 'is-pressed': digit.pressed }"
          ></div>
          <button 
            :class="{ 'is-disabled': !digit.active}"
            :disabled="!digit.active"
            @click="digitSelected(digit.value)"
            >
            {{ digit.value }}
          </button>
        </div>
      </div>
      <div class="timepicker__arrows">
        <div class="timepicker__digit">
          <button 
            :class="{ 'is-disabled': activeIndex <= 0 }"
            :disabled="activeIndex <= 0"
            @click="goToPrevious()"
          >&#9664;</button>
        </div>
        <div class="timepicker__digit">
          <button 
            class="timepicker__digit"
            :class="{ 'is-disabled': activeIndex > 2 }"
            :disabled="activeIndex > 2"
            @click="goToNext()"
          >&#9658;</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KeyboardEvents from './mixins/KeyboardEvents';

import ActiveBackground from 'components/ActiveBackground';
import TimeUnit from 'components/TimeUnit';

const digits = [
  { value: 1, active: true, pressed: false },
  { value: 2, active: true, pressed: false },
  { value: 3, active: true, pressed: false },
  { value: 4, active: true, pressed: false },
  { value: 5, active: true, pressed: false },
  { value: 6, active: true, pressed: false },
  { value: 7, active: true, pressed: false },
  { value: 8, active: true, pressed: false },
  { value: 9, active: true, pressed: false },
  { value: 0, active: true, pressed: false }
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

function getDigit (allDigits, number) {
  return allDigits
          .filter(digit => digit.value === number)
          .reduce((old, item) => {
            return item;
          }, {});
}

export default {
  props: ['value'],
  mixins: [KeyboardEvents],
  components: {
    ActiveBackground,
    TimeUnit
  },
  data () {
    return {
      activeIndex: 0,
      time: null,
      digits: digits,
      isOpen: false
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
      let pressedDigit = getDigit(digits, digit);
      pressedDigit.pressed = false;
      this.time.$set(this.activeIndex, digit);
      this.goToNext();
    },
    digitPressed (digit) {
      let pressedDigit = getDigit(digits, digit);
      pressedDigit.pressed = true;
    },
    setActiveIndex (index) {
      this.activeIndex = parseInt(index);
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

.timepicker-wrap {
  position: relative;
}

.timepicker {
  position: absolute;
  background: #FBFBFF;
  width: 250px;
  box-shadow: 0 3px 10px rgba(0,0,0,.3);
  border-radius: $border-radius;
  overflow: hidden;
  left: 50%;
  top: -155px;
  border-radius: 50%;
  transition: all .3s ease;
  transform: translate(-50%, 0) scale(0);
  pointer-events: none;

  &.is-open {
    transform: translate(-50%, 0) scale(1);
    border-radius: $border-radius;
    pointer-events: auto;
  }

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

  &__active-bg {
    position: absolute;
    top: 17px;
    left: 42px;
    width: $input-width;
    height: 42px;
    background: $active-unit-bg;
    transition: transform .4s ease;
  }

  &__separator {
    z-index: 2;
    position: relative;
    width: $input-width;
    padding: 0 2px;
    text-align: center;
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
    position: relative;
    width: 33%;

    button {
      position: relative;
      z-index: 2;
      display: block;
      width: 100%;
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

  &__ripple {
    z-index: 1;
    position: absolute;
    left: 50%;
    top: 50%;
    background: rgba($header-bg, .6);
    border-radius: 50%;
    width: 45px;
    height: 45px;
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.1);
    transition: .3s;

    &.is-pressed {
        opacity: .3;
        transform: translate(-50%, -50%) scale(1);
    }
  }
}
</style>
