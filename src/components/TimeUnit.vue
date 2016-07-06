<template>
  <div class="time-unit" :class="transitionClasses">
    <div value="{{ value }}"
      class="time-unit__value time-unit__value--input"
      @click="onClick(index)"
    ></div>
    <div class="time-unit__value time-unit__value--current">{{ oldValue }}</div>
    <div class="time-unit__value time-unit__value--next">{{ nextValue }}</div>
  </div>
</template>

<script>
export default {
  props: ['value', 'index', 'onClick'],
  data () {
    return {
      isTransition: false,
      isTransitionUp: true,
      isInitialized: false,
      nextValue: this.value,
      oldValue: this.value,
      transitionClasses: {
        'transition-up': this.isTransition && this.transitionUp,
        'transition-down': this.isTransition && !this.transitionUp
      }
    };
  },
  created () {
    this.isInitialized = true;
  },
  methods: {
    resetState () {
      this.$set('transitionClasses', {
        'transition-up': false,
        'transition-down': false
      });
    },
    setClasses () {
      this.transitionClasses = {
        'transition-up': this.isTransition && this.transitionUp,
        'transition-down': this.isTransition && !this.transitionUp
      };
    }
  },
  watch: {
    'value': function (val, oldVal) {
      if (this.isInitialized) {
        this.resetState();
        this.oldValue = oldVal;
        setTimeout(() => {
          this.nextValue = val;
          this.isTransition = parseInt(val) !== parseInt(oldVal);
          this.transitionUp = parseInt(val) > parseInt(oldVal);
          this.$nextTick(() => {
            this.setClasses();
          });
        }, 30);
      }
    }
  }
};
</script>

<style lang="scss">
$input-width: 30px;

.time-unit {
  position: relative;
  
  &__value {
    z-index: 2;
    color: #fff;
    font-size: 50px;
    line-height: 50px;
    padding: 0 2px;
    text-align: center;
    width: $input-width;
    height: 50px;
    position: relative;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    transition: transform .2s ease;

    &:hover {
      transform: scale(1.05);
    }

    &:focus,
    &:active {
      background: transparent;
    }
  }

  &__value--next {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    animation: none;
  }

  &__value--current {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    animation: none;
  }

  &.transition-up {
  
    .time-unit__value--input {
      opacity: 0;
    }

    .time-unit__value--next {
      animation: fadeInUp .3s ease;
      animation-fill-mode: forwards;
    }
    .time-unit__value--current {
      animation: fadeOutUp .3s ease;
      animation-fill-mode: forwards;
    }
  }

  &.transition-down {
  
    .time-unit__value--input {
      opacity: 0;
    }

    .time-unit__value--next {
      animation: fadeInDown .3s ease;
      animation-fill-mode: forwards;
    }
    .time-unit__value--current {
      animation: fadeOutDown .3s ease;
      animation-fill-mode: forwards;
    }
  }

}

@keyframes fadeOutUp {
  from { opacity: 1; transform: translate(0, 0); }
  to { opacity: 0; transform: translate(0, -2rem); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translate(0, 2rem); }
  to { opacity: 1; transform: translate(0, 0); }
}
@keyframes fadeOutDown {
  from { opacity: 1; transform: translate(0, 0); }
  to { opacity: 0; transform: translate(0, 2rem); }
}
@keyframes fadeInDown {
  from { opacity: 0; transform: translate(0, -2rem); }
  to { opacity: 1; transform: translate(0, 0); }
}
</style>