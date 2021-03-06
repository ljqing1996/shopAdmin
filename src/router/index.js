import Vue from 'vue'
import Router from 'vue-router'

// import Login from '@/components/Login'
// import Home from '@/components/Home'
// import Users from '@/components/users/Users'
// import Rights from '@/components/rights/Rights'
// import Roles from '@/components/rights/Roles'
// import Categories from '@/components/product/Categories'
// import Goods from '@/components/product/Goods'
// import Add from '@/components/product/Add'

const Login = () => import('@/components/Login')
const Home = () => import('@/components/Home')
const Users = () => import(/* webpackChunkName: 'users' */ '@/components/users/Users')
const Rights = () => import(/* webpackChunkName: 'rights' */ '@/components/rights/Rights')
const Roles = () => import(/* webpackChunkName: 'rights' */ '@/components/rights/Roles')
const Categories = () => import(/* webpackChunkName: 'product' */ '@/components/product/Categories')
const Goods = () => import(/* webpackChunkName: 'product' */ '@/components/product/Goods')
const Add = () => import(/* webpackChunkName: 'product' */ '@/components/product/Add')

// 使用组件的插件
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/users',
          name: 'users',
          component: Users
        },
        {
          path: '/rights',
          name: 'rights',
          component: Rights
        },
        {
          path: '/roles',
          name: 'roles',
          component: Roles
        },
        {
          path: '/categories',
          name: 'categories',
          component: Categories
        },
        {
          path: '/goods',
          name: 'goods',
          component: Goods
        },
        {
          path: '/goods-add',
          name: 'add',
          component: Add
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 获取token值
  let token = localStorage.getItem('myToken')
  if (to.path === '/login') {
    next()
    return
  }
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
