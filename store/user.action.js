import { userService } from "../services/user.service.js";
import { SET_USER, store } from "./store.js";

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
