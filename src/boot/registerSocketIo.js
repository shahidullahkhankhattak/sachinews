import Vue from 'vue';
import io from 'socket.io-client';


if (process.browser) {
  Vue.prototype.socket = io.connect('/', {
    secure: true,
    rejectUnauthorized: false,
  });
}
