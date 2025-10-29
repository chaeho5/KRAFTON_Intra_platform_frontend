import { describe, it, expect, beforeEach } from 'vitest' // Vitest (테스트 프레임워크)에서 테스트 도구 임포트
import { setActivePinia, createPinia } from 'pinia' // Pinia 테스트를 위한 헬퍼 함수 임포트
import { useTodoStore } from './todoStore' // 테스트 대상인 Pinia 스토어 임포트

// 'describe': 연관된 테스트들을 묶는 '테스트 스위트(Test Suite)'
describe('Todo Store (Pinia)', () => {
  
  // 'beforeEach': 이 스위트 안의 *각각의 'it' 테스트*가 실행되기 직전에 매번 실행됨
  beforeEach(() => {
    // 새 Pinia 인스턴스를 생성하여 테스트 환경을 초기화 (테스트 간 격리)
    setActivePinia(createPinia())
    // localStorage를 비워서 이전 테스트의 상태가 다음 테스트에 영향을 주지 않도록 함
    localStorage.clear()
  })

  // 'it': 개별 '테스트 케이스'
  it('should add a new todo', () => {
    // [Arrange] 테스트 준비
    const todoStore = useTodoStore()
    expect(todoStore.todos.length).toBe(0) // 초기 상태 검증
    const newTodoData = { title: 'Test Todo', content: '', dueDate: null, priority: 'medium' }

    // [Act] 테스트 실행
    todoStore.addNewTodo(newTodoData)

    // [Assert] 결과 검증
    expect(todoStore.todos.length).toBe(1) // 길이가 1이 되었는지
    expect(todoStore.todos[0].title).toBe('Test Todo') // 내용이 맞는지
    expect(todoStore.todos[0].completed).toBe(false) // 기본값이 맞는지
  })

  it('should delete a todo', () => {
    // [Arrange] 테스트 준비 (데이터 1개 추가)
    const todoStore = useTodoStore()
    const todoData = { title: 'Todo to delete', content: '', dueDate: null, priority: 'medium' }
    todoStore.addNewTodo(todoData)
    expect(todoStore.todos.length).toBe(1) // 준비 상태 검증
    const todoId = todoStore.todos[0].id

    // [Act] 테스트 실행
    todoStore.deleteTodo(todoId)

    // [Assert] 결과 검증
    expect(todoStore.todos.length).toBe(0) // 길이가 0이 되었는지
  })

  it('should toggle a todo completion state', () => {
    // [Arrange] 테스트 준비
    const todoStore = useTodoStore()
    todoStore.addNewTodo({ title: 'Toggle Me', content: '', dueDate: null, priority: 'medium' })
    const todoId = todoStore.todos[0].id
    
    // [Act 1] 첫 번째 토글 실행
    todoStore.toggleComplete(todoId)
    // [Assert 1]
    expect(todoStore.todos[0].completed).toBe(true) // true로 변경되었는지

    // [Act 2] 두 번째 토글 실행
    todoStore.toggleComplete(todoId)
    // [Assert 2]
    expect(todoStore.todos[0].completed).toBe(false) // 다시 false로 변경되었는지
  })

  it('should edit a todo', () => {
    // [Arrange] 테스트 준비
    const todoStore = useTodoStore()
    todoStore.addNewTodo({ title: 'Original Title', content: '', dueDate: null, priority: 'medium' })
    const todoId = todoStore.todos[0].id

    // [Act] 테스트 실행
    const updatedData = { title: 'Edited Title', content: 'Edited Content' }
    todoStore.editTodo(todoId, updatedData)

    // [Assert] 결과 검증
    const editedTodo = todoStore.todos[0]
    expect(editedTodo.title).toBe('Edited Title') // 제목이 변경되었는지
    expect(editedTodo.content).toBe('Edited Content') // 내용이 변경되었는지
  })
})