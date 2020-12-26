import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import { reducer, State } from './states/state'
import thunk from 'redux-thunk'

export type AppState = {
    state: State
}

const storeEnhancers =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    combineReducers<AppState>({
        state: reducer,
    }),
    storeEnhancers(applyMiddleware(thunk))
)

export default store
export type RootState = ReturnType<typeof store.getState>
