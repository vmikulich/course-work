import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import Test from '../components/Test.vue'

Vue.use(VueRouter)


export default new VueRouter({
  routes: [
    { 
      path: '/',
      name: 'Hello',
      component: HelloWorld 
    },
    { 
      path: '/test',
      name: 'Test',
      component: Test 
    },
  ]
})




