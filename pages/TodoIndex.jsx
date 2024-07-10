import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
// import { loadTodos, remove, save } from "../store/todo.action.js"

// import { getUserActivities, updateBalance, updateUserActivities } from '../store/user.action.js'

import { SET_FILTER_BY } from "../store/reducers/todo.reducer.js"
import { loadTodos, remove, save } from "../store/actions/todo.action.js"
import { getUserActivities, updateBalance, updateUserActivities } from "../store/actions/user.action.js"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux
export function TodoIndex() {

    const dispatch = useDispatch()
    const todos = useSelector(state => state.todoModule.todos)
    const user = useSelector(state => state.userModule.user)
    const doneTodos = todos.filter(todo => todo.isDone)

    // console.log("🚀 ~ TodoIndex ~ user:", { ...user, activities: { ...user.activities, ...{ txt: 'yo', yo: 'yo' } } })

    // const [todos, setTodos] = useState(null)

    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()

    const defaultFilter = todoService.getFilterFromSearchParams(searchParams)

    // const [filterBy, setFilterBy] = useState(defaultFilter)
    const filterBy = useSelector(state => state.filterBy)

    useEffect(() => {
        dispatch({ type: SET_FILTER_BY, filterBy: defaultFilter })
    }, [])

    useEffect(() => {
        setSearchParams(filterBy)
        loadTodos(filterBy)
            .catch(err => {
                console.eror('err:', err)
                showErrorMsg('Cannot load todos')
            })
    }, [filterBy])

    function userActivities(todoId, action) {
        return todoService.get(todoId).then(gotUser => {
            // console.log("🚀 ~ userActivities ~ todo:", gotUser.txt)
            return { ...user, activities: [...user.activities, getUserActivities(gotUser.txt, action)] }
        }
        )
    }

    function onRemoveTodo(todoId) {
        userActivities(todoId, "Removed a Todo:").then(updatedUser => {
            // console.log("🚀 ~ userActivities ~ user:", updatedUser)

            updateUserActivities(updatedUser)
        })
        remove(todoId)
            .then((user) => {

                showSuccessMsg(`Todo removed`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove todo ' + todoId)
            })
    }

    function onToggleTodo(todo) {
        if (user && !todo.isDone) {
            updateBalance()
        }
        const todoToSave = { ...todo, isDone: !todo.isDone }
        save(todoToSave)
            .then((savedTodo) => {
                showSuccessMsg(`Todo is ${(savedTodo.isDone) ? 'done' : 'back on your list'}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot toggle todo ' + todo._id)
            })
    }
    function setFilterBy(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

    const bgc = user ? { backgroundColor: user.prefs.bgColor } : {}

    if (!todos) return <div>Loading...</div>
    return (
        <section className="todo-index" style={bgc}>
            <TodoFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            <h2>Todos List</h2>
            <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
            <progress max={todos.length} value={doneTodos.length} />
            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
            </div>
        </section>
    )
}