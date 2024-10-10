<template>
  <section class="todoapp">
    <!-- 头部 -->
    <Header v-model:todos="todos" />
    <!-- 待办列表 -->
    <List v-model:todos="todos" v-model:filteredTodos="filteredTodos"/>
    <!-- 底部 -->
    <Footer 
      v-model:todos="todos" 
      v-model:remaining="remaining"
      @removeAll="removeAllCompleted"
      />
  </section>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import Header from './components/Header.vue'
import List from './components/List.vue'
import Footer from './components/Footer.vue'

// 每一项代办事项的结构如下
/** {
//   id: 1,
//   title: 'xxx',
//   completed: false
  }
**/
const STORE_KEY = 'todo-list';
// 从localStorage中获取todos，如果没有，则返回空数组
const todos = ref(JSON.parse(localStorage.getItem(STORE_KEY)) || '[]');

const visibility = ref('all'); // 默认显示所有代办事项

// 接下来需要一个过滤器，根据不同的状态，过滤出不同的代办事项
const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter(todo => !todo.completed), // 未完成
  completed: (todos) => todos.filter(todo => todo.completed), // 已完成
};

// 接下来根据当前状态，（all,active,completed）去调用对应的过滤器
const filteredTodos = computed(() => filters[visibility.value](todos.value)); // 根据当前状态，过滤出不同的代办事项

const remaining = computed(() => filters.active(todos.value).length); // 未完成

// 清除已完成
function removeAllCompleted() {
  window.confirm('确定清除所有已完成代办事项吗？') && (todos.value = todos.value.filter(todo => !todo.completed));
}

// 监听todos的变化，当todos变化时，将todos存储到localStorage
watchEffect(() => {
  localStorage.setItem(STORE_KEY, JSON.stringify(todos.value));
})
//监听 hash 的变化
window.addEventListener('hashchange', () => {
  const route = window.location.hash.replace(/#\/?/, '');
  if (filters[route]) {
    visibility.value = route;
  } else {
    window.location.hash = '';
    visibility.value = 'all';
  }
});

</script>

<style scoped>
@import './assets/todo.css';

.todoapp {
  background: #fff;
  margin: 130px auto;
  position: relative;
  box-shadow:
    0 2px 4px 0 rgba(0, 0, 0, 0.2),
    0 25px 50px 0 rgba(0, 0, 0, 0.1);
  width: 800px;
}
</style>