import Vue from 'vue'
import VueRouter from 'vue-router'
import Category from '../components/Category.vue'
import CategoryForm from '../components/CategoryForm.vue'

Vue.use(VueRouter)


export default new VueRouter({
  routes: [
    { 
      path: '/categories',
      name: 'Category',
      component: Category 
    },
    { 
      path: '/categories/new',
      name: 'NewCategoryForm',
      component: CategoryForm
    },
    { 
      path: '/categories/:id',
      name: 'CategoryForm',
      component: CategoryForm,
      props: true
    },
  ],
  mode: 'history'
})




