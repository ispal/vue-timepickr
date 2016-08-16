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
          @touchstart="arrowPressed('left')"
          @touchend="goToPrevious()"
          ref="previousButton"
        >
          <svg viewBox="0 0 32 32" class="triangle">
            <path class="path1" d="M22.4 8v16l-14.4-8 14.4-8z"></path>
          </svg>
        </button>
        <div 
          class="numpad__ripple"
          :class="{ 'is-pressed': arrowKeys.left.pressed }"
        ></div>
      </div>
      <div class="numpad__digit">
        <button 
          :class="{ 'is-disabled': activeIndex > 2 }"
          :disabled="activeIndex > 2 || !this.isOpen"
          @click="goToNext()"
          @mouseup="blurEl($refs.nextButton)"
          @touchstart="arrowPressed('right')"
          @touchend="goToNext()"
          ref="nextButton"
        >
          <svg viewBox="0 0 32 32" class="triangle">
            <path class="path1" d="M24 16l-14.4 8v-16l14.4 8z"></path>
          </svg>
        </button>
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
  $mobile-breakpoint:   480px;

  .triangle {
    display: inline-block;
    width: 1em;
    height: 1em;
    stroke-width: 0;
    stroke: currentColor;
    fill: currentColor;
  }

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

    &__digit {
      position: relative;
      width: 33%;

      button {
        position: relative;
        z-index: 2;
        display: block;
        width: 100%;
        padding: 20px 0;
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

        @media (min-width: $mobile-breakpoint) { 
          padding: 15px 0;
        }

        &.is-disabled {
          color: rgba($digit-color, 0.3);
        }

        &:focus + .numpad__ripple {
          opacity: .3;
          transform: translate(-50%, -50%) scale(1);
        }

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

      button {
        font-size: 25px;
        padding: 17px 0 13px 0;
        line-height: 1;

        @media (min-width: $mobile-breakpoint) { 
          padding: 13px 0 8px 0;
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
      width: 55px;
      height: 55px;
      opacity: 0;
      transform: translate(-50%, -50%) scale(1.1);
      transition: .3s;

      @media (min-width: $mobile-breakpoint) { 
        width: 45px;
        height: 45px;
      }

      &.is-pressed {
          opacity: .3;
          transform: translate(-50%, -50%) scale(1);
      }
    }
  }
</style>