import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { actions } from '../actions/actions'

export interface State {
    videoSource: string
}

const initialState: State = {
    videoSource: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
}

export const reducer = reducerWithInitialState(initialState).case(actions.OpenVideoAction, (state, value) => {
    console.log(value)
    return Object.assign({}, state, { videoSource: value })
})
