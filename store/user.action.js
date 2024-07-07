import { userService } from "../services/user.service.js";
import { SET_USER, store, SET_USER_SCORE } from "./store.js";

export function login(credentials) {
    userService.login(credentials)
        .then(user => store.dispatch({ type: SET_USER, user }))
}
export function signup(credentials) {
    userService.signup(credentials)
        .then(user => store.dispatch({ type: SET_USER, user }))
}
export function logout() {
    userService.logout()
        .then(() => store.dispatch({ type: SET_USER, user: null }))
}
export function userToSave(user) {
    userService.saveUser(user)
        .then((user) => store.dispatch({ type: SET_USER, user }))
}
export function updateBalance() {
    userService.updateScore(10)
        .then(() => store.dispatch({ type: SET_USER_SCORE }))
}

