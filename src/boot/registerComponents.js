import Vue from 'vue';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

// we globally register our component with Vue
Vue.component('sidebar', Sidebar);
Vue.component('app-header', Header);
