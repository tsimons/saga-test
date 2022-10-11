import { eventChannel } from 'redux-saga'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import * as todoApi from './todo.api'
import todoStore from './store'
import { Action } from '@reduxjs/toolkit'

function* fetchTodos (): Generator<any> {
    const todos = yield call(todoApi.getTodos)

    yield put(todoStore.actions.loadTodos__success(todos))
}

function* fetchTodosSaga() {
    yield takeLatest(todoStore.actions.loadTodos__request.type, fetchTodos)
}

function* addTodo (action: Action<{ payload: any }>): Generator<any> {
    // @ts-ignore
    const todo = yield call(todoApi.updateTodo, action.payload)
    
    yield put(todoStore.actions.addTodo__success(todo))
}

function windowFocusChannel () {
    return eventChannel(emitter => {
        function onFocus (e: Event) {
            emitter(e)
        }
        window.addEventListener('focus', onFocus)

        return () => {
            window.removeEventListener('focus', onFocus)
        }
    })
}

function* windowFocusSaga() {
    yield takeEvery(windowFocusChannel(), fetchTodos)
}

function* addTodoSaga() {
    yield takeEvery(todoStore.actions.addTodo__request.type, addTodo)
}

const todoSagas = [
    fetchTodosSaga,
    windowFocusSaga,
    addTodoSaga
]

export default todoSagas
