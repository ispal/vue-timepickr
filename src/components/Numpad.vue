<template>
  <div class="numpad">
    <div class="numpad__digits">
      <number v-for="digit in numbers" :number="digit"></number>
    </div>
    <div class="numpad__arrows">
      <div class="numpad__digit">
        <button 
          :class="{ 'is-disabled': activeIndex <= 0 }"
          :disabled="activeIndex <= 0 || !this.isOpen"
          @click="goToPrevious()"
          @mouseup="blurEl($refs.previousButton)"
          ref="previousButton"
        >&#9664;</button>
        <div 
          class="numpad__ripple"
          :class="{ 'is-pressed': arrowKeys.left.pressed }"
        ></div>
      </div>
      <div class="numpad__digit">
        <button 
          class="numpad__digit"
          :class="{ 'is-disabled': activeIndex > 2 }"
          :disabled="activeIndex > 2 || !this.isOpen"
          @click="goToNext()"
          @mouseup="blurEl($refs.nextButton)"
          ref="nextButton"
        >&#9658;</button>
        <div 
          class="numpad__ripple"
          :class="{ 'is-pressed': arrowKeys.right.pressed }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store';
import { filteredDigits } from '../helpers';
import CommonActions from '../mixins/CommonActions';

import Number from './Number';

export default {
  name: 'Numpad',
  components: {
    Number
  },
  mixins: [CommonActions],
  data () {
    return store;
  },
  computed: {
    numbers () {
      return filteredDigits(this.activeIndex, this.digits, this.time);
    }
  }
};
</script>

<style lang="scss">
  $header-bg: #F25F5C;
  $digit-color: #757575;

  .numpad {

    &__digits {
      display: flex;
      flex-wrap: wrap;
      padding: 5px 20px;

      .numpad__digit:last-of-type {
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
        outline: none;
        -webkit-user-select: none;
        -webkit-tap-highlight-color: rgba(0,0,0,0);

        &.is-disabled {
          color: rgba($digit-color, 0.3);
        }

        &:focus + .numpad__ripple {
          opacity: .3;
          transform: translate(-50%, -50%) scale(1);
        }

      }
      
    }

    &__ripple {
      z-index: 1;
      position: absolute;
      left: 50%;
      top: 50%;
      background: rgba(#000, .2);
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