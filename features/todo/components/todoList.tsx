import { ReactNode, useEffect } from "react";
import { hooks } from '../store'


const { useLoadTodosRequest } = hooks

interface TodoListProps {
    children: ReactNode
}
export const TodoList = ({ children }: TodoListProps) => {
    const loadTodos = useLoadTodosRequest()

    useEffect(() => {
        loadTodos()
    }, [])
    
    return children
}
