import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import parse from './plugins/parse'
import helpers from './plugins/helpers'

Vue.config.productionTip = false;

Vue.use(parse);
Vue.use(helpers);


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
