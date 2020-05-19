import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
import { config } from '../config';

const {
  socketEnv: {
    development,
    production,
  },
} = config;
const socketPath = (process.env.DEV && development) || production;
if (process.browser) {
  Vue.use(new VueSocketIO({
    debug: process.env.NODE_ENV === development,
    connection: socketPath,
  }));
}
