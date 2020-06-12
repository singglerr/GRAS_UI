// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueSweetAlert2 from 'vue-sweetalert2'
import VueHead from "vue-head";

import App from './App'
import router from './router'
import store from "./store";
import vuetify from './plugins/vuetify';

import Empty from "./layouts/Empty"
import Module from "./layouts/Module";

// Vue.component("empty-layout", Empty);
// Vue.component("module-layout", Module)

Vue.use(VueSweetAlert2);
Vue.use(VueHead);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    router,
    vuetify,
    store,
    render: h => h(App)
}).$mount("#app");
