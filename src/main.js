// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSweetAlert2 from 'vue-sweetalert2'
import VueHead from "vue-head";

import Empty from "./layouts/Empty"

Vue.component("empty-layout", Empty);

Vue.use(VueSweetAlert2);
Vue.use(VueHead);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	router,
	render: h => h(App),
}).$mount("#app");
