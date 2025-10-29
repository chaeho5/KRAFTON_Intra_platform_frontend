import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTodoStore } from './todoStore'

describe('Todo Store (Pinia)', () => {
  
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('should add a new todo', () => {
    const todoStore = useTodoStore()

    expect(todoStore.todos.length).toBe(0)
    
    const newTodoData = { title: 'Test Todo', content: '', dueDate: null, priority: 'medium' }
    todoStore.addNewTodo(newTodoData)

    expect(todoStore.todos.length).toBe(1)
    expect(todoStore.todos[0].title).toBe('Test Todo')
    expect(todoStore.todos[0].completed).toBe(false)
  })

  it('should delete a todo', () => {
    const todoStore = useTodoStore()
    const todoData = { title: 'Todo to delete', content: '', dueDate: null, priority: 'medium' }
    todoStore.addNewTodo(todoData)
    
    expect(todoStore.todos.length).toBe(1)
    const todoId = todoStore.todos[0].id

    todoStore.deleteTodo(todoId)

    expect(todoStore.todos.length).toBe(0)
  })

  it('should toggle a todo completion state', () => {
    const todoStore = useTodoStore()
    todoStore.addNewTodo({ title: 'Toggle Me', content: '', dueDate: null, priority: 'medium' })
    const todoId = todoStore.todos[0].id
    
    todoStore.toggleComplete(todoId)

    expect(todoStore.todos[0].completed).toBe(true)

    todoStore.toggleComplete(todoId)

    expect(todoStore.todos[0].completed).toBe(false)
  })

  it('should edit a todo', () => {
    const todoStore = useTodoStore()
    todoStore.addNewTodo({ title: 'Original Title', content: '', dueDate: null, priority: 'medium' })
    const todoId = todoStore.todos[0].id

    const updatedData = { title: 'Edited Title', content: 'Edited Content' }
    todoStore.editTodo(todoId, updatedData)

    const editedTodo = todoStore.todos[0]
    expect(editedTodo.title).toBe('Edited Title')
    expect(editedTodo.content).toBe('Edited Content')
  })
})