<script setup>
// 의존성 임포트
import { useTodoStore } from './stores/todoStore' // Pinia 스토어
import { storeToRefs } from 'pinia' // Pinia state를 반응형 ref로 변환
import TodoForm from './components/TodoForm.vue' // 자식 컴포넌트: 등록 폼
import TodoList from './components/TodoList.vue' // 자식 컴포넌트: 목록

// 스토어 초기화
const todoStore = useTodoStore()

// State 구독 (Destructuring)
// storeToRefs: 스토어의 'todos' state를 반응형 ref로 가져옴
// (이걸 써야 props로 전달해도 'todos'의 반응성이 유지됨)
const { todos } = storeToRefs(todoStore)

// (참고) Pinia 리팩토링 후, App.vue에는
// addNewTodo, deleteTodo 등의 '함수(Actions)'가 더 이상 필요 없습니다.
// 모든 로직은 스토어가, 실행은 자식 컴포넌트가 직접 처리합니다.
</script>

<template>
  <div id="app-container">
    <header>
      <h1>My KRAFTON TODO List</h1>
    </header>

    <main>
      <TodoForm />

      <TodoList :todos="todos" />
    </main>
  </div>
</template>

<style scoped>
/* #app-container: 앱 전체의 레이아웃(너비, 중앙 정렬)을 제어 */
#app-container {
  max-width: 1080px; /* 앱의 최대 너비 (1080px로 수정하신 값) */
  margin: 0 auto; /* 좌우 마진 'auto'로 중앙 정렬 */
  padding: 2rem; /* 앱 내부 여백 */
}

/* header h1: 앱 타이틀 스타일 */
header h1 {
  color: #42b983;
  text-align: center;
  margin-bottom: 2rem;
}
</style>