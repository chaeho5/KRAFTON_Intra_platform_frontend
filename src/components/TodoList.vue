<!-- TODO 목록 전체를 감싸는 리스트(조회) -->
<script setup>
import TodoItem from './TodoItem.vue';

const props = defineProps({
  todos: {
    type: Array,
    required: true,
  },
});

</script>

<template>
  <ul class="todo-list">
    <TodoItem
      v-for="todo in props.todos"
      :key="todo.id"
      :todo="todo" 
    />
  </ul>
</template>

<style scoped>
.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>