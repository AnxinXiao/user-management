// 使用Vue的createApp函数创建一个新的Vue应用实例
// 这是Vue 3中推荐的创建应用的方式，相比于之前的vue实例化方式，这种方式更加简洁高效
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'

// 引入路由实例
import router from './router'

// 创建Vue应用，并将其挂载到页面的特定元素上
// 这里的'#app'是页面中定义的容器ID，通常在index.html中定义
createApp(App).use(router).mount('#app')
