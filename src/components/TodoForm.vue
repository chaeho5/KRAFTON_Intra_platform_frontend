<!-- TODO 등록 -->
<script setup>
import { ref, watch } from 'vue' // Vue의 반응형(ref) 및 감시(watch) 기능 임포트
import { useTodoStore } from '../stores/todoStore' // Pinia 스토어(데이터 저장소) 임포트

// 스토어 초기화
// 스토어 훅을 호출하여 스토어 인스턴스에 접근
const todoStore = useTodoStore()

// 컴포넌트 내부 상태 (Local State) 정의
// v-model로 템플릿과 연결될 반응형 변수들 (ref 상자)
const title = ref('')
const content = ref('')
const dueDate = ref('')
const priority = ref('medium')
const errorMessage = ref('') // 폼 유효성 검사 메시지용

// 정적 데이터 정의
// 우선순위 <select>의 <option>을 렌더링하기 위한 배열
const priorityOptions = [
  { value: 'high', text: '높음' },
  { value: 'medium', text: '중간' },
  { value: 'low', text: '낮음' },
]

// 감시자 (Watcher) 설정
// 'title' ref를 감시하여, 사용자가 타이핑을 다시 시작하면
// 오류 메시지를 자동으로 지우는 UX 개선 로직
watch(title, (newTitle) => {
  if (newTitle.trim() !== '') {
    errorMessage.value = ''
  }
})

// 메서드 (Event Handlers) 정의
// 폼 제출(@submit) 시 호출될 메인 함수
const handleSubmit = () => {
  // 유효성 검사 (Validation)
  if (title.value.trim() === '') {
    errorMessage.value = '제목은 필수입니다.'
    return // 유효성 검사 실패 시 함수 종료
  }

  // Pinia 스토어 액션 호출 (데이터 생성)
  // Pinia 스토어의 addNewTodo 함수에 폼 데이터를 객체로 전달
  todoStore.addNewTodo({
    title: title.value,
    content: content.value,
    dueDate: dueDate.value || null, // 값이 없으면 null로 저장
    priority: priority.value,
  })

  // 폼 입력값 초기화 (Reset)
  // 제출 성공 후 폼을 깨끗하게 비움
  title.value = ''
  content.value = ''
  dueDate.value = ''
  priority.value = 'medium'
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="todo-form">
    <input
      type="text"
      v-model="title"
      placeholder="제목을 입력하세요"
      class="todo-input"
    />

    <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

    <textarea
      v-model="content"
      placeholder="내용을 입력하세요 (선택)"
      class="todo-textarea"
    ></textarea>

    <div class="form-row">
      <div class="form-group">
        <label for="due-date">마감 기한:</label>
        <input
          type="date"
          id="due-date"
          v-model="dueDate"
          class="todo-date-input"
        />
      </div>

      <div class="form-group">
        <label for="priority">우선 순위:</label>
        <select id="priority" v-model="priority" class="todo-select">
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

    <button type="submit" class="todo-submit-button">TODO 추가</button>
  </form>
</template>

<style scoped>
/* .todo-form: 폼 전체 컨테이너 */
.todo-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

/* .todo-input, .todo-textarea: 제목 및 내용 입력창 */
.todo-input,
.todo-textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

/* .todo-submit-button: 'TODO 추가' 버튼 */
.todo-submit-button {
  padding: 10px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s; /* 마우스 오버 시 부드러운 색상 변경 */
}

.todo-submit-button:hover {
  background-color: #36a473;
}

/* .form-row: 마감일과 우선순위를 감싸는 가로 정렬용 컨테이너 */
.form-row {
  display: flex;
  justify-content: flex-start; /* 왼쪽부터 정렬 */
  gap: 15px; /* 항목 사이 간격 */
  margin: 10px 0;
}

/* .form-group: 라벨과 입력창을 묶는 그룹 */
.form-group {
  display: flex; /* 라벨과 입력창을 가로로 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  gap: 10px;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 600;
}

/* 날짜 선택기 및 우선순위 선택기 */
.todo-date-input,
.todo-select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
  background-color: white;
}

/* .error-text: 유효성 검사 실패 시 보여줄 텍스트 스타일 */
.error-text {
  color: #d9534f;
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: -5px;
  margin-bottom: 10px;
}
</style>