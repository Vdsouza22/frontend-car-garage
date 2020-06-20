import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import wrap from '@vue/web-component-wrapper'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-material-design-icons/styles.css'
import App from './App.vue'
import router from './router'
import CartIcon from 'vue-material-design-icons/CartOutline'
import SearchIcon from 'vue-material-design-icons/Magnify'
import Header from './views/Header'
import Home from './components/Home'
import CarDetail from './components/CarDetail'

Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.component('cart-icon', CartIcon);
Vue.component('search-icon', SearchIcon);
Vue.config.productionTip = false

const headerElement = wrap(Vue, Header);
const homeScreenElement = wrap(Vue, Home);
const detailedScreenElement = wrap(Vue, CarDetail);

window.customElements.define('my-header', headerElement);
window.customElements.define('home-screen', homeScreenElement);
window.customElements.define('detailed-screen', detailedScreenElement);


export const bus=new Vue();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
