import Vue from 'vue'
import VueRouter from 'vue-router'
import Category from '../components/Category.vue'

Vue.use(VueRouter)


export default new VueRouter({
  routes: [
    { 
      path: '/categories',
      name: 'Category',
      component: Category 
    },
  ]
})




