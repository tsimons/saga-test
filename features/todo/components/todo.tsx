import { FormEventHandler, MouseEventHandler, useState } from "react"
import { hooks } from '../store'

const { useUpdateTodoRequest, useDeleteTodoRequest, useCompleteTodoRequest } = hooks

interface TodoProps {
    todo: Todo
    updateTodo: FormEventHandler<HTMLInputElement> 
    deleteTodo: MouseEventHandler<HTMLButtonElement>
    completeTodo: MouseEventHandler<HTMLButtonElement>
}

export const Todo = ({ todo }: TodoProps) => {
    const [isEditing, edit] = useState(false)

    const updateTodo = useUpdateTodoRequest()
    const deleteTodo = useDeleteTodoRequest()
    const completeTodo = useCompleteTodoRequest()

    return <div>
        <button type="button" onClick={completeTodo}>✅</button>
        <input type="text" value={todo.name} readOnly={!isEditing} onInput={updateTodo} />
        <button type="button" onClick={() => edit(!isEditing)}>{isEditing ? 'done' : 'edit'}</button>
        <button type="button" onClick={deleteTodo}>delete</button>
    </div>
}
