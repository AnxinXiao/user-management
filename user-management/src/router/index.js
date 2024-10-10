// 前端路由配置文件
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import AddOrEdit from '@/views/AddOrEdit.vue'
import Detail from '@/views/Detail.vue'
import Email from '@/views/Email.vue'
import Tel from '@/views/Tel.vue'

// 创建路由实例
// 在创建路由实例的时候，可以传入一个配置对象
// const router = createRouter({
//   history: createWebHistory(), // history模式
//   // 路由规则
//   routes: [
//     {
//       path: '/home', // 默认路由
//       name: 'Home',
//       component: Home // 默认路由对应的组件
//     },
//     {
//       path: '/about',
//       name: 'About',
//       component: About,
//       // 嵌套路由
//       children: [
//         {
//           path: 'email',
//           name: 'Email',
//           component: Email
//         },
//         {
//           path: 'tel',
//           name: 'Tel',
//           component: Tel
//         },
//         {
//           path: '',
//           redirect: '/detail/email'
//         }
//       ]
//     },
//     {
//       path: '/add',
//       name: 'AddOrEdit',
//       component: AddOrEdit
//     },
//     {
//       // 动态路由
//       path: '/detail/:id',
//       name: 'Detail',
//       component: Detail
//     }
//   ]
// })
const router = createRouter({
  history: createWebHistory(), // 指定前端路由的模式，常见的有 hash 和 history 两种模式
  // 路由和组件的映射
  routes: [
    {
      path: '/home', // 路由的路径
      name: 'Home',
      component: Home // 路由对应的组件
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      // 创建嵌套的路由
      children: [
        {
          path: 'email',
          component: Email
        },
        {
          path: 'tel',
          component: Tel
        },
        {
          path: '*',
          redirect: '/about/email'
        }
      ]
    },
    {
      path: '/add',
      name: 'AddOrEdit',
      component: AddOrEdit
    },
    {
      // 这里的详情就应该是一个动态路由
      path: '/detail/:id',
      component: Detail
    },
    {
      path: '/edit/:id',
      component: AddOrEdit
    }
  ]
})
export default router
