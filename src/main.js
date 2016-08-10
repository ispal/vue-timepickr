import Vue from 'vue/dist/vue.js';
import Timepicker from './Timepicker';

/* eslint-disable no-new */
new Vue({
  el: 'body',
  data: {
    time: '13:20'
  },
  components: { Timepicker }
});
