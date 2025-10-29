<script setup>
// 의존성 임포트
// Vue의 반응형 상태(ref) 기능 임포트
import { ref } from 'vue'
// Pinia 스토어(데이터 저장소) 임포트
import { useTodoStore } from '../stores/todoStore'

// Props 정의
// 부모 컴포넌트(TodoList)로부터 'todo' 객체를 전달받음
const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
})

// 스토어 초기화
const todoStore = useTodoStore()

// 정적 데이터 정의
// 우선순위 표시(뱃지) 및 선택(select)에 사용될 배열
const priorityOptions = [
  { value: 'high', text: '높음' },
  { value: 'medium', text: '중간' },
  { value: 'low', text: '낮음' },
]

// 컴포넌트 내부 상태 (Local State) 정의
// '수정 모드' 여부를 판별하는 반응형 변수 (boolean)
const isEditing = ref(false)
// '수정 모드'의 폼 입력값을 v-model로 바인딩하기 위한 ref 변수들
// (props.todo.* 값으로 초기화)
const editedTitle = ref(props.todo.title)
const editedContent = ref(props.todo.content)
const editedDueDate = ref(props.todo.dueDate)
const editedPriority = ref(props.todo.priority)

// 메서드 (Event Handlers) 정의
// '삭제' 버튼 클릭 시, 스토어의 deleteTodo 액션 호출
const onDeleteClick = () => {
  todoStore.deleteTodo(props.todo.id)
}

// '완료' 체크박스 변경 시, 스토어의 toggleComplete 액션 호출
const onToggleComplete = () => {
  todoStore.toggleComplete(props.todo.id)
}

// '수정' 버튼 클릭 시, '수정 모드'로 진입
const onEditClick = () => {
  isEditing.value = true // 수정 모드로 변경
  
  // 폼의 ref 변수들을 현재 props 값으로 다시 동기화
  // (이전에 수정하다 '취소'했을 경우를 대비해 폼을 리셋)
  editedTitle.value = props.todo.title
  editedContent.value = props.todo.content
  editedDueDate.value = props.todo.dueDate
  editedPriority.value = props.todo.priority
}

// '취소' 버튼 클릭 시, '조회 모드'로 복귀
const onCancelClick = () => {
  isEditing.value = false
}

// '저장' 버튼 클릭 (또는 폼 제출) 시
const onSaveClick = () => {
  // 유효성 검사 (제목 필수)
  if (editedTitle.value.trim() === '') {
    alert('제목은 필수입니다.') // (개선 제안: TodoForm처럼 인라인 오류 메시지로 변경 가능)
    return
  }

  // Pinia 스토어의 editTodo 액션 호출
  // (ID와 함께 수정된 데이터 객체를 전달)
  todoStore.editTodo(props.todo.id, {
    title: editedTitle.value,
    content: editedContent.value,
    dueDate: editedDueDate.value || null,
    priority: editedPriority.value,
  })

  // '조회 모드'로 복귀
  isEditing.value = false
}
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
              <option
                v-for="option in priorityOptions"
                :key="option.value"
                :value="option.value"
              >
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
/* 컴포넌트 전용 스타일 (Scoped CSS) */

/* .todo-item: 개별 항목(li)의 기본 레이아웃 */
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

/* 'completed' 클래스가 적용됐을 때 (완료 상태) */
.todo-item.completed .todo-title {
  text-decoration: line-through; /* 취소선 */
  color: #999;
}
.todo-item.completed {
  background-color: #f9f9f9;
  opacity: 0.7;
}

/* 완료 체크박스 */
.todo-checkbox {
  margin-right: 15px;
  transform: scale(1.3);
}

/* 제목, 내용, 메타데이터를 감싸는 영역 */
.todo-details {
  flex-grow: 1; /* 남는 공간을 모두 차지 */
  align-self: flex-start; /* 체크박스와 상단 정렬 */
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
  white-space: pre-wrap; /* \n (줄바꿈) 문자를 그대로 표시 */
  word-break: break-all; /* 긴 단어가 영역을 벗어나지 않게 */
}

/* 버튼(수정, 삭제 등)을 감싸는 영역 */
.todo-actions {
  display: flex;
  gap: 10px;
  margin-left: 15px;
}

/* 마감일, 우선순위를 감싸는 영역 */
.todo-meta {
  display: flex;
  gap: 15px;
  margin-top: 8px;
  align-items: center;
}

/* 마감일 텍스트 */
.todo-due-date {
  font-size: 0.85rem;
  color: #d9534f;
  font-weight: 600;
  margin: 5px 0 0 0;
}

/* 우선순위 뱃지 기본 스타일 */
.priority-badge {
  font-size: 0.8rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 12px;
  color: white;
}

/* 우선순위 뱃지 색상 */
.priority-high {
  background-color: #d9534f; /* 높음 (빨강) */
}
.priority-medium {
  background-color: #f0ad4e; /* 중간 (주황) */
}
.priority-low {
  background-color: #5cb85c; /* 낮음 (초록) */
}

/* .action-button: 모든 버튼(수정, 삭제, 저장, 취소)의 공통 스타일 */
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

/* 수정 모드 폼 레이아웃 */
.edit-form {
  display: flex;
  width: 100%;
  gap: 10px;
  align-items: flex-start;
}

/* 수정 모드 폼 입력창들을 감싸는 영역 */
.edit-inputs {
  display: flex;
  flex-direction: column; /* 입력창 세로 정렬 */
  flex-grow: 1;
  gap: 5px;
}

/* 수정 모드 입력창(제목, 내용) */
.edit-input,
.edit-textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box; /* 패딩이 너비를 초과하지 않도록 */
}

/* 수정 모드 (날짜, 우선순위) 가로 정렬 */
.edit-form-row {
  display: flex;
  gap: 10px;
  margin-top: 5px;
}

/* 수정 모드 입력창(날짜, 우선순위) */
.edit-date-input,
.edit-select {
  width: auto;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
  background-color: white;
}

/* 수정 모드 버튼(저장, 취소) */
.save-button {
  background-color: #5cb85c;
}
.cancel-button {
  background-color: #777;
}
</style>