import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"

export const userService = {
    getLoggedinUser,
    login,
    logout,
    signup,
    getById,
    query,
    getEmptyCredentials,
    updateScore,
    saveUser
}
const STORAGE_KEY_LOGGEDIN = 'user'
const STORAGE_KEY = 'userDB'

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}


function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname }
    user.createdAt = user.updatedAt = Date.now()
    user.balance = utilService.getRandomIntInclusive(1000, 10000)
    user.prefs = { color: 'black', bgColor: 'white' }
    user.activities = []
    return storageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function saveUser(user) {
    return userService.getById(user._id)
        .then(gotUser => ({ ...gotUser, ...user }))
        .then(user => {
            return storageService.put(STORAGE_KEY, user)
                .then((user) => {
                    console.log('user', user)
                    _setLoggedinUser(user)
                    return user
                })
        })
}

function updateScore(diff) {
    return userService.getById(getLoggedinUser()._id)
        .then(user => {
            if (user.balance + diff < 0) return Promise.reject('No credit')
            user.balance += diff
            return storageService.put(STORAGE_KEY, user)
                .then((user) => {
                    _setLoggedinUser(user)
                    return user.balance
                })
        })
}

function getLoggedinUser() {

    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, balance: user.balance, prefs: { color: user.prefs.color, bgColor: user.prefs.bgColor }, activities: user.activities }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        fullname: '',
        username: 'muki',
        password: 'muki1',
    }
}

// signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// login({username: 'muki', password: 'muki1'})

// Data Model:
// const user = {
//     _id: "KAtTl",
//     username: "muki",
//     password: "muki1",
//     fullname: "Muki Ja",
//     createdAt: 1711490430252,
//     updatedAt: 1711490430999
// }