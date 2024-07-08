import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { save } from "../store/todo.action.js"
import { getUserActivities, updateBalance, updateUserActivities } from '../store/user.action.js'

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux
export function TodoEdit() {

    const [todoToEdit, setTodoToEdit] = useState(todoService.getEmptyTodo())
    const navigate = useNavigate()
    const params = useParams()
    const user = useSelector(state => state.user)
    console.log("🚀 ~ TodoEdit ~ user:", user)
    useEffect(() => {
        if (params.todoId) loadTodo()
    }, [])

    function loadTodo() {
        todoService.get(params.todoId)
            .then(setTodoToEdit)
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setTodoToEdit(prevTodoToEdit => ({ ...prevTodoToEdit, [field]: value }))
    }

    function userActivities(todoId, action) {
        return todoService.get(todoId).then(gotUser => {
            // console.log("🚀 ~ userActivities ~ todo:", gotUser.txt)
            return { ...user, activities: [...user.activities, getUserActivities(gotUser.txt, action)] }
        }
        )
    }

    function onSaveTodo(ev) {
        ev.preventDefault()
        save(todoToEdit)
            .then((savedTodo) => {
                userActivities(savedTodo.todo._id, 'Added a Todo:').then(updatedUser => {
                    // console.log("🚀 ~ userActivities ~ user:", updatedUser)

                    updateUserActivities(updatedUser)
                })
                console.log("🚀 ~ .then ~ savedTodo:", savedTodo)
                navigate('/todo')
                showSuccessMsg(`Todo Saved (id: ${savedTodo._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot save todo')
                console.log('err:', err)
            })
    }

    const { txt, importance, isDone, color } = todoToEdit

    return (
        <section className="todo-edit">
            <form onSubmit={onSaveTodo} >
                <label htmlFor="txt">Text:</label>
                <input onChange={handleChange} value={txt} type="text" name="txt" id="txt" />

                <label htmlFor="importance">Importance:</label>
                <input onChange={handleChange} value={importance} type="number" name="importance" id="importance" />

                <label htmlFor="isDone">isDone:</label>
                <input onChange={handleChange} value={isDone} type="checkbox" name="isDone" id="isDone" />

                <label htmlFor="color">isDone:</label>
                <input onChange={handleChange} type="color" name="color" id="color" />


                <button>Save</button>
            </form>
        </section>
    )
}