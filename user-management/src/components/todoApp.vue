<template>
  <!-- 最外层容器 -->
  <div class="todoapp">
    <!-- 头部 -->
    <header class="header">
      <h1>代办事项</h1>
      <input type="text" class="new-todo" placeholder="添加新的代办事件" @keyup.ctrl.enter="addTodo" />
    </header>
    <!-- 代办列表 -->
    <section class="main">
      <!-- 全选 -->
      <input type="checkbox" class="toggle-all" id="toggle-all" />
      <label for="toggle-all">全部完成</label>
      <!-- 代办列表 -->
      <ul class="todo-list">
        <li class="todo" v-for="todo in filteredTodos" :key="todo.id"
          :class="{ completed: todo.completed, editing: todo === editingTodo }">
          <div class="view">
            <input type="checkbox" class="toggle" v-model="todo.completed" />
            <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
            <button class="destroy" @click="removeTodo(todo.id)"></button>
          </div>
          <!-- 编辑框 -->
          <input type="text" class="edit" v-if="todo === editingTodo" v-model="todo.title" @blur="doneEdit(todo)"
            @keyup.ctrl.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)" @vue:mounted="({ el }) => el.focus()" />

        </li>
      </ul>
      <!-- 底部 -->
      <footer class="footer">
        <span class="todo-count">
          剩余 <strong>{{ remaining }}</strong> 条未完成
        </span>
        <ul class="filters">
          <li>
            <a href="#/all" :class="{ selected: visibility === 'all' }">全部</a>
          </li>
          <li>
            <a href="#/active" :class="{ selected: visibility === 'active' }">未完成</a>
          </li>
          <li>
            <a href="#/completed" :class="{ selected: visibility === 'completed' }">已完成</a>
          </li>
        </ul>
        <button v-show="todos.length > remaining" class="clear-completed" @click="clearCompleted">清除已完成</button>
      </footer>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue';
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

// 编辑状态
const editingTodo = ref(null); // 当前正在编辑的代办事项

// 接下来需要一个过滤器，根据不同的状态，过滤出不同的代办事项
const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter(todo => !todo.completed), // 未完成
  completed: (todos) => todos.filter(todo => todo.completed), // 已完成
};

// 接下来根据当前状态，（all,active,completed）去调用对应的过滤器
const filteredTodos = computed(() => filters[visibility.value](todos.value)); // 根据当前状态，过滤出不同的代办事项

const remaining = computed(() => filters.active(todos.value).length); // 未完成

// 添加代办事项
function addTodo(e) {
  const value = e.target.value.trim();
  if (value) {
    todos.value.push({
      id: Date.now(),
      title: value,
      completed: false,
    })
  }
  e.target.value = ''; // 清空输入框
}

// 删除代办事项
function removeTodo(todoId) {
  if (window.confirm('确定删除此待办事项吗？')) {
    todos.value = todos.value.filter(todo => todo.id !== todoId);
  } else {
    if (beforeEditCache && editingTodo.value) {
      editingTodo.value.title = beforeEditCache;
      beforeEditCache = '';
    }
  }
}

// 清除已完成
function clearCompleted() {
  window.confirm('确定清除所有已完成代办事项吗？') && (todos.value = todos.value.filter(todo => !todo.completed));
}

// 监听todos的变化，当todos变化时，将todos存储到localStorage
watchEffect(() => {
  localStorage.setItem(STORE_KEY, JSON.stringify(todos.value));
})

// 编辑代办事项
let beforeEditCache = ''; // 编辑前的内容
function editTodo(todo) {
  editingTodo.value = todo;
  beforeEditCache = todo.title;
}

// 完成编辑
function doneEdit(todo) {
  todo.title = todo.title.trim();
  if (todo.title === '') {
    removeTodo(todo.id); // 删除
  } else {
    editingTodo.value = null; // 退出编辑状态
  }
  beforeEditCache = ''; // 清空缓存
}

// 取消编辑
function cancelEdit(todo) {
  todo.title = beforeEditCache; // 恢复原来的内容
  editingTodo.value = null; // 退出编辑状态
}

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
</style>
