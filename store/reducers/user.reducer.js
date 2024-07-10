import { userService } from "../../services/user.service.js"




const initialState = {
    user: userService.getLoggedinUser(),
}

export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user }
        case SET_USER_SCORE:
            const user = { ...state.user, balance: state.user.balance + 10 }
            return { ...state, user }
        default:
            return state
    }
}