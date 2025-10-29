<!-- 개별 TODO 항목(수정, 삭제, 완료) -->
<script setup>
import { ref } from 'vue';
import { useTodoStore } from '../stores/todoStore';

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
});

const todoStore = useTodoStore();

const priorityOptions = [
  { value: 'high', text: '높음' },
  { value: 'medium', text: '중간' },
  { value: 'low', text: '낮음' },
];

const isEditing = ref(false);
const editedTitle = ref(props.todo.title);
const editedContent = ref(props.todo.content);
const editedDueDate = ref(props.todo.dueDate);
const editedPriority = ref(props.todo.priority);

const onDeleteClick = () => {
  todoStore.deleteTodo(props.todo.id);
};

const onToggleComplete = () => {
  todoStore.toggleComplete(props.todo.id);
};

const onEditClick = () => {
  isEditing.value = true;
  editedTitle.value = props.todo.title;
  editedContent.value = props.todo.content;
  editedDueDate.value = props.todo.dueDate;
  editedPriority.value = props.todo.priority;
};

const onCancelClick = () => {
  isEditing.value = false;
};

const onSaveClick = () => {
  if (editedTitle.value.trim() === '') {
    alert('제목은 필수입니다.');
    return;
  }

  todoStore.editTodo(props.todo.id, {
    title: editedTitle.value,
    content: editedContent.value,
    dueDate: editedDueDate.value || null,
    priority: editedPriority.value,
  });

  isEditing.value = false;
};
</script>

<template>
  <li class="todo-item" :class="{ completed: props.todo.completed }">
    <template v-if="!isEditing">
      <input
        type="checkbox"
        class="todo-checkbox"
        :checked="props.todo.completed"
        @change="onToggleComplete"
      />

      <div class="todo-details">
        <h3 class="todo-title">{{ props.todo.title }}</h3>
        <p v-if="props.todo.content" class="todo-content">
          {{ props.todo.content }}
        </p>

        <div class="todo-meta">
          <span v-if="props.todo.dueDate" class="todo-due-date">
            마감: {{ props.todo.dueDate }}
          </span>
          <span
            v-if="props.todo.priority"
            :class="['priority-badge', `priority-${props.todo.priority}`]"
          >
            {{ priorityOptions.find((p) => p.value === props.todo.priority)?.text }}
          </span>
        </div>
      </div>

      <div class="todo-actions">
        <button class="action-button edit-button" @click="onEditClick">수정</button>
        <button class="action-button delete-button" @click="onDeleteClick">삭제</button>
      </div>
    </template>

    <template v-else>
      <form @submit.prevent="onSaveClick" class="edit-form">
        <div class="edit-inputs">
          <input type="text" v-model="editedTitle" class="edit-input" />
          <textarea
            v-model="editedContent"
            class="edit-textarea"
            placeholder="내용 (선택)"
          ></textarea>

          <div class="edit-form-row">
            <input type="date" v-model="editedDueDate" class="edit-date-input" />

            <select v-model="editedPriority" class="edit-select">
              <option v-for="option in priorityOptions" :key="option.value" :value="option.value">
                {{ option.text }}
              </option>
            </select>
          </div>
        </div>
        <div class="todo-actions">
          <button type="submit" class="action-button save-button">저장</button>
          <button type="button" class="action-button cancel-button" @click="onCancelClick">
            취소
          </button>
        </div>
      </form>
    </template>
  </li>
</template>

<style scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #ffffff;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease-out;
}

.todo-item.completed .todo-title {
  text-decoration: line-through; /* 취소선 */
  color: #999;
}

.todo-item.completed {
  background-color: #f9f9f9;
  opacity: 0.7;
}

.todo-checkbox {
  margin-right: 15px;
  transform: scale(1.3);
}

.todo-details {
  flex-grow: 1;
  align-self: flex-start;
}

.todo-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 5px 0;
}

.todo-content {
  font-size: 0.9rem;
  color: #555;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
}

.todo-actions {
  display: flex;
  gap: 10px;
  margin-left: 15px;
}

.todo-meta {
  display: flex;
  gap: 15px;
  margin-top: 8px;
  align-items: center;
}

.todo-due-date {
  font-size: 0.85rem;
  color: #d9534f;
  font-weight: 600;
  margin: 5px 0 0 0;
}

.priority-badge {
  font-size: 0.8rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 12px;
  color: white;
}

.priority-high {
  background-color: #d9534f;
}
.priority-medium {
  background-color: #f0ad4e;
}
.priority-low {
  background-color: #5cb85c;
}

.action-button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.edit-button {
  background-color: #f0ad4e;
}

.delete-button {
  background-color: #d9534f;
}

.edit-form {
  display: flex;
  width: 100%;
  gap: 10px;
  align-items: flex-start;
}

.edit-inputs {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 5px;
}

.edit-input,
.edit-textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

.edit-form-row {
  display: flex;
  gap: 10px;
  margin-top: 5px;
}

.edit-date-input,
.edit-select {
  width: auto;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
  background-color: white;
}

.save-button {
  background-color: #5cb85c;
}
.cancel-button {
  background-color: #777;
}
</style>
