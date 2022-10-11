import { createSlice } from '@reduxjs/toolkit'
import { type } from 'os'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

interface State {
    loading: boolean
    draft: string
    entities: Todo[]
}

const initialState: State = {
    loading: false,
    draft: '',
    entities: [],
}

const slice = createSlice({
    name: 'slice',
    initialState,
    reducers: {
        loadTodos__request (state) {
            state.loading = true
        },
        loadTodos__success (state, { payload }) {
            state.loading = false
            state.entities = payload
        },
        loadTodos__error (state, { payload }) {
            state.loading = false
            state.entities = payload
        },
        addTodo__request (state, { payload }) {
            state.loading = true
        },
        addTodo__success (state, { payload: todo }) {
            state.loading = false
            state.draft = ''
            state.entities.push(todo)
        }
    }
})

const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const processTypeName = (type: string): string => 
    type.replace(/__(\s)/, (match, p1, offest, string) => {
        const fixedUp = capitalize(p1.replace('__', ''))
        return string.replace(p1, fixedUp)
    })


export default slice

interface GeneratedHooks {
    [key: string]: () => (data?: any) => void
}

export const hooks = Object.entries(slice.actions).reduce((hooks, [type, action]) => ({
    ...hooks,
    [`use${processTypeName(type)}`]: () => {
        const dispatch = useDispatch()

        const callAction = useCallback((data: any) => {
            dispatch(action(data))
        }, [dispatch])

        return callAction
    }
}), {} as GeneratedHooks)
