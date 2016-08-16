<template>
  <div class="time-unit">
    <transition-group :name="transitionName" tag="div">
      <div class="time-unit__value" 
        @click="setActiveIndex(index)"
        v-for="number in numbers" :key="number">
          {{ number }}
        </div>
    </transition-group>
  </div>
</template>

<script>
import store from '../store';

export default {
  props: ['value', 'index'],
  data () {
    return {
      store,
      numbers: [],
      transitionName: 'time-unit__value'
    };
  },
  created () {
    this.isInitialized = true;
    this.numbers.push(this.value);
  },
  methods: {
    setActiveIndex (index) {
      this.store.activeIndex = parseInt(index);
    }
  },
  watch: {
    'value': function (val, oldVal) {
      if (val === oldVal) {
        return;
      }
      this.transitionName = val > oldVal ? 'time-unit__value' : 'time-unit__value--reverse';

      this.numbers.splice(0, 1);
      this.numbers.push(val);
    }
  }
};
</script>

<style lang="scss">
$input-width: 34px;

.time-unit {
  z-index: 4;
  position: relative;
  transition: transform .2s ease;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);

  &:hover {
    transform: scale(1.1);
  }
  
  &__value {
    position: relative;
    display: inline-block;
    z-index: 2;
    color: #fff;
    font-size: 50px;
    line-height: 50px;
    padding: 0 2px;
    text-align: center;
    width: $input-width;
    height: 50px;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all .3s ease;

    &:focus,
    &:active {
      background: transparent;
    }

    &-enter {
      opacity: 0;
      transform: translate(0, 2rem) scale(.7);
    }

    &-leave-active {
      position: absolute;
      opacity: 0;
      transform: translate(0, -2rem) scale(.7);
    }

    &--reverse {
      &-enter {
        opacity: 0;
        transform: translate(0, -2rem) scale(.7);
      }

      &-leave-active {
        position: absolute;
        opacity: 0;
        transform: translate(0, 2rem) scale(.7);
      }
    }
  }

}
</style>