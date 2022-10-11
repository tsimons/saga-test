export const getTodos = async () => {
    const response = await fetch('/api/todos')
    return await response.json() as Todo[]
}
export const updateTodo = async (id: string, todo: Todo) => {
    const response = await fetch('/api/todo/' + id, {
        method: 'PUT',
        body: JSON.stringify(todo)
    })

    return await response.json() as Todo
}
