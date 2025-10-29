<!-- App.vue 만든 컴포넌트들을 감싸는 파일 -->
<script setup>
import { useTodoStore } from './stores/todoStore'
import { storeToRefs } from 'pinia'
import TodoForm from './components/TodoForm.vue'
import TodoList from './components/TodoList.vue'

const todoStore = useTodoStore()
const { todos } = storeToRefs(todoStore)
</script>

<template>
  <div id="app-container">
    <header>
      <h1>My KRAFTON TODO List</h1>
    </header>

    <main>
      <TodoForm @add-todo="addNewTodo" />

      <TodoList
        :todos="todos"
        @delete-todo="deleteTodo"
        @toggle-complete="toggleComplete"
        @edit-todo="editTodo"
      />
    </main>
  </div>
</template>

<style scoped>
#app-container{
  max-width: 1080px;
  margin: 0 auto;
  padding: 2rem;
}

header h1 {
  color: #42b983;
  text-align: center;
  margin-bottom: 2rem;
}
</style>
