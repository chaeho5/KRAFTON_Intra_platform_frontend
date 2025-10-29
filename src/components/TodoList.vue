<script setup>
import TodoItem from './TodoItem.vue' // 개별 TODO 항목을 표시할 자식 컴포넌트 임포트

// Props 정의
// 부모 컴포넌트(App.vue)로부터 'todos' 배열을 전달받음
// 이 컴포넌트는 데이터를 소유하지 않고, 오직 받아서 표시만 함 (Dumb Component)
const props = defineProps({
  todos: {
    type: Array,
    required: true, // todos 배열은 필수
  },
})
</script>

<template>
  <ul class="todo-list">
    <TodoItem v-for="todo in props.todos" :key="todo.id" :todo="todo" />
  </ul>
</template>

<style scoped>
/* ul 태그의 브라우저 기본 스타일(점, 들여쓰기) 제거 */
.todo-list {
  list-style: none; /* 목록 앞의 점(bullet) 제거 */
  padding: 0; /* 브라우저 기본 안쪽 여백 제거 */
  margin: 0; /* 브라우저 기본 바깥 여백 제거 */
}
</style>