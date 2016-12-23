<template>
  <div class="numpad__digit" >
    <button
      :class="{ 'is-disabled': !number.active }"
      :disabled="isDisabled"
      @mousedown="digitPressed(number.value)"
      @mouseup="digitSelected(number.value, $event) && blurEl($refs.numButton)"
      @touchstart="digitPressed(number.value)"
      @touchend="digitSelected(number.value, $event)"
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
  },
  computed: {
    isDisabled () {
      !this.number.active || !this.isOpen;
    }
  }
};
</script>
