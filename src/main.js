import Vue from 'vue';
import Timepicker from './Timepicker';

/* eslint-disable no-new */
new Vue({
  el: 'body',
  data: {
    time: '13:20'
  },
  components: { Timepicker }
});
