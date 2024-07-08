import { userService } from "../services/user.service.js"
import { userToSave } from "../store/user.action.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM




export function UserDetails() {

    const [user, setUser] = useState(userService.getLoggedinUser())
    console.log("🚀 ~ UserDetails ~ user:", user)
    const navigate = useNavigate()


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

        setUser(prevTodoToEdit => ({ ...prevTodoToEdit, [field]: value }))
    }
    function handleColorChange({ target }) {
        const field = target.name
        let value = target.value


        setUser(prevTodoToEdit => ({ ...prevTodoToEdit, prefs: { ...prevTodoToEdit.prefs, [field]: value } }))
    }
    function onUserTodo(ev) {
        ev.preventDefault()
        userToSave(user)
        navigate('/todo')
        // .then((user) => {

        //     showSuccessMsg(`Todo Saved (id: ${user._id})`)
        // })
        // .catch(err => {
        //     showErrorMsg('Cannot save todo')
        //     console.log('err:', err)
        // })
    }

    function convertTimestamp(timestamp) {
        // Convert the timestamp to a JavaScript Date object
        const date = new Date(parseInt(timestamp));

        // Format the date and time
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();

        // Return the formatted date and time
        return `${formattedDate} ${formattedTime}`;
    }

    return (

        <section>
            <section>
                <ul>

                    {user.activities.map(activitie =>
                        <li key={activitie.txt}>{convertTimestamp(activitie.at)}{activitie.action} '{activitie.txt}'</li>
                    )}
                </ul>
            </section>
            <section className="todo-edit">
                <form onSubmit={onUserTodo} >
                    <label htmlFor="fullname">Text:</label>
                    <input onChange={handleChange} value={user.fullname} type="text" name="fullname" id="fullname" />

                    <label htmlFor="color">change color:</label>
                    <input onChange={handleColorChange} type="color" name="color" id="color" />

                    <label htmlFor="bgColor">change background color:</label>
                    <input onChange={handleColorChange} type="color" name="bgColor" id="bgColor" />


                    <button>Save</button>
                </form>
            </section>
        </section>
    )
}