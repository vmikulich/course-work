import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Test from './components/Test.vue'

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { path: '/test', component: Test }
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
}).$mount('#app')
