// Pinia
import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

// 스토어 정의 ('todos'는 스토어의 고유 ID)
export const useTodoStore = defineStore('todos', () => {
  
  // State (상태)
  // LocalStorage 키 정의
  const STORAGE_KEY = 'krafton-todos-vue'
  // 'todos' 배열을 반응형(ref)으로 선언, LocalStorage에서 초기값 불러오기
  const todos = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))

  // Actions (액션: 상태를 변경하는 함수들)
  // (Create) 새 TODO 추가
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

  // (Delete) TODO 삭제
  const deleteTodo = (todoIdToDelete) => {
    todos.value = todos.value.filter(todo => todo.id !== todoIdToDelete)
  }

  // (Update) 완료 상태 토글
  const toggleComplete = (todoIdToToggle) => {
    todos.value = todos.value.map(todo => {
      if (todo.id === todoIdToToggle) {
        return { ...todo, completed: !todo.completed }
      }
      return todo
    })
  }

  // (Update) TODO 내용 수정
  const editTodo = (todoIdToEdit, updatedData) => {
    todos.value = todos.value.map(todo => {
      if (todo.id === todoIdToEdit) {
        return { ...todo, ...updatedData }
      }
      return todo
    })
  }

  // LocalStorage 영속성 (watch)
  // 'todos' 배열이 (내부까지) 변경될 때마다 LocalStorage에 자동 저장
  watch(todos, (newTodos) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos))
  }, {
    deep: true // 배열 내부 객체의 속성 변경까지 감지
  })

  // 스토어 반환
  // 컴포넌트에서 사용할 수 있도록 state와 action들을 반환
  return {
    todos,
    addNewTodo,
    deleteTodo,
    toggleComplete,
    editTodo,
  }
})