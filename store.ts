import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from 'redux-saga'
import todoSagas from './features/todo/sagas'

import todoSlice from './features/todo/store'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        todo: todoSlice.reducer
    },
    middleware: [
        sagaMiddleware
    ]
})

for (let saga of todoSagas) {
    sagaMiddleware.run(saga)
}

export default store
