const { useState } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter
const { useSelector, useDispatch } = ReactRedux

import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { logout } from "../store/actions/user.action.js"
// import { logout } from '../store/user.action.js'




export function AppHeader() {
    const navigate = useNavigate()

    const user = useSelector(state => state.userModule.user)
    const todos = useSelector(state => state.todoModule.todos)
    const doneTodos = todos.filter(todo => todo.isDone)

    function onLogout() {
        logout()
    }



    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>

                {user ? (
                    < section style={user.prefs.color && { color: user.prefs.color }}>

                        <Link to={`/user/${user._id}`}>Hello {user.fullname} balance:{user.balance}</Link>
                        <button onClick={onLogout}>Logout</button>
                        <progress max={todos.length} value={doneTodos.length} />
                    </ section >
                ) : (
                    <section>
                        <LoginSignup />
                    </section>
                )}
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                </nav>
            </section>
            <UserMsg />
        </header>
    )
}
