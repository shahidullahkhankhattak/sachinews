import Vue from 'vue';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/Admin/Header';
import AdminSidebar from '../components/Admin/Sidebar';

// we globally register our component with Vue
// user components
Vue.component('sidebar', Sidebar);
Vue.component('app-header', Header);

// admin components
Vue.component('admin-sidebar', AdminSidebar);
Vue.component('admin-header', AdminHeader);
