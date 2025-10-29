<!-- 새 TODO를 입력받는 폼(등록) -->
<script setup>
import { ref, watch } from 'vue'
import { useTodoStore } from '../stores/todoStore'

const todoStore = useTodoStore()

const title = ref('')
const content = ref('')
const dueDate = ref('')
const priority = ref('medium')

const errorMessage = ref('')

const priorityOptions = [
  { value: 'high', text: '높음' },
  { value: 'medium', text: '중간' },
  { value: 'low', text: '낮음' },
]

const handleSubmit = () => {
  if (title.value.trim() === '') {
    errorMessage.value = '제목은 필수입니다.'
    return
  }

  todoStore.addNewTodo({
    title: title.value,
    content: content.value,
    dueDate: dueDate.value || null,
    priority: priority.value,
  })

  title.value = ''
  content.value = ''
  dueDate.value = ''
  priority.value = 'medium'

  watch(title, (newTitle) => {
    if (newTitle.trim() !== '') {
      errorMessage.value = ''
    }
  })
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="todo-form">
    <input type="text" v-model="title" placeholder="제목을 입력하세요" class="todo-input" />

    <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

    <textarea
      v-model="content"
      placeholder="내용을 입력하세요 (선택)"
      class="todo-textarea"
    ></textarea>
    
    <div class="form-row">
      <div class="form-group">
        <label for="due-date">마감 기한:</label>
        <input type="date" id="due-date" v-model="dueDate" class="todo-date-input" />
      </div>

      <div class="form-group">
        <label for="priority">우선 순위:</label>
        <select id="priority" v-model="priority" class="todo-select">
          <option v-for="option in priorityOptions" :key="option.value" :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
    </div>

    <button type="submit" class="todo-submit-button">TODO 추가</button>
  </form>
</template>

<style scoped>
.todo-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-input,
.todo-textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.todo-submit-button {
  padding: 10px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.todo-submit-button:hover {
  background-color: #36a473;
}

.form-row {
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  margin: 10px 0;
}

.form-group {
  display: flex-between;
  align-items: center;
  gap: 10px;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 600;
}

.todo-date-input,
.todo-select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
  background-color: white;
}

.error-text {
  color: #d9534f;
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: -5px;
  margin-bottom: 10px;
}
</style>
