import { userService } from "../services/user.service.js"

const { createStore } = Redux
userService
const initialState = {
    todos: [],
    isLoading: false,
    user: userService.getLoggedinUser()
}

export const SET_CARS = 'SET_CARS'
export const SET_USER = 'SET_USER'
export const SET_LOADING = 'SET_LOADING'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

function appReducer(state = initialState, action = {}) {
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

        case SET_USER:
            return { ...state, user: action.user }

        default:
            return state
    }
}

export const store = createStore(appReducer)
window.gStore = store