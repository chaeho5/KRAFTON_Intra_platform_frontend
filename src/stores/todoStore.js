import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todos', () => {
  const STORAGE_KEY = 'krafton-todos-vue'
  const todos = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
  const addNewTodo = (newTodoData) => {
    const todoToAdd = {
      id: Date.now(),
      title: newTodoData.title,
      content: newTodoData.content,
      completed: false,
      priority: newTodoData.priority,
      dueDate: newTodoData.dueDate,
    }
    todos.value.unshift(todoToAdd)
  }

  const deleteTodo = (todoIdToDelete) => {
    todos.value = todos.value.filter(todo => todo.id !== todoIdToDelete)
  }

  const toggleComplete = (todoIdToToggle) => {
    todos.value = todos.value.map(todo => {
      if (todo.id === todoIdToToggle) {
        return { ...todo, completed: !todo.completed }
      }
      return todo
    })
  }

  const editTodo = (todoIdToEdit, updatedData) => {
    todos.value = todos.value.map(todo => {
      if (todo.id === todoIdToEdit) {
        return { ...todo, ...updatedData }
      }
      return todo
    })
  }

  watch(todos, (newTodos) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos))
  }, {
    deep: true
  })

  return {
    todos,
    addNewTodo,
    deleteTodo,
    toggleComplete,
    editTodo,
  }
})