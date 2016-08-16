<template>
  <div class="numpad__digit" >
    <button 
      :class="{ 'is-disabled': !number.active }"
      :disabled="!number.active || !this.isOpen"
      @click="digitSelected(number.value)"
      @mousedown="digitPressed(number.value)"
      @mouseup="blurEl($refs.numButton)"
      @touchstart="digitPressed(number.value)"
      @touchend="digitSelected(number.value)"
      ref="numButton"
      >
      {{ number.value }}
    </button>
    <div 
      class="numpad__ripple"
      :class="{ 'is-pressed': number.pressed }"
    ></div>
  </div>
</template>

<script>
import store from '../store';
import CommonActions from '../mixins/CommonActions';

export default {
  name: 'Number',
  props: {
    number: {
      type: Object,
      required: true
    }
  },
  mixins: [CommonActions],
  data () {
    return store;
  }
};
</script>