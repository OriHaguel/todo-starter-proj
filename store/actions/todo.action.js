import { todoService } from '../../services/todo.service.js'
import { REMOVE_TODO, SET_CARS, SET_LOADING, ADD_TODO, UPDATE_TODO } from '../reducers/todo.reducer.js'
// import { todoService } from '../services/todo.service.js'

import { store } from '../store.js'
// import { store, SET_CARS, REMOVE_TODO, SET_LOADING, ADD_TODO, UPDATE_TODO } from './store.js'

export function loadTodos(filterBy = {}) {
    return todoService.query(filterBy)
        .then(todos => store.dispatch({ type: SET_CARS, todos }))
}

export function remove(todoId) {
    return todoService.remove(todoId)
        .then(() => store.dispatch({ type: REMOVE_TODO, todoId }))
}


export function loading(filterBy = {}) {
    return todoService.query(filterBy)
        .then(todos => store.dispatch({ type: SET_LOADING, todos }))
}
export function save(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO
    return todoService.save(todo)
        .then(savedTodo => store.dispatch({ type, todo: savedTodo }))
}