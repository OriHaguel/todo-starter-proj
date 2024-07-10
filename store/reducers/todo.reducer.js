import { todoService } from "../../services/todo.service.js"





const initialState = {
    todos: [],
    isLoading: false,
    filterBy: todoService.getDefaultFilter()
}

export const SET_CARS = 'SET_CARS'
export const SET_LOADING = 'SET_LOADING'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const SET_FILTER_BY = 'SET_FILTER_BY'


export function todoReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_CARS:
            return { ...state, todos: action.todos }
        case REMOVE_TODO:
            var todos = state.todos.filter(todo => todo._id !== action.todoId)
            return { ...state, todos }
        case ADD_TODO:
            return { ...state, todos: [...state.todos, action.todo] }
        case UPDATE_TODO:
            var todos = state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo)
            return { ...state, todos }

        case SET_LOADING:
            return { ...state, isLoading: !isLoading }

        case SET_FILTER_BY:
            return { ...state, filterBy: action.filterBy }

        default:
            return state
    }
}