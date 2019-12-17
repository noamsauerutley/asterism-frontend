import { LOGIN } from './actionTypes'
import { LOGOUT } from './actionTypes'
import { SET_CONTENT } from './actionTypes'
import { SET_USERNAME } from './actionTypes'

const initialState = {
    token: "",
    user_id: "",
    stories: [],
    fragments: [],
    username: ""
}

export const reducer = (state = initialState, action) => {
    switch(action.type){
    case LOGIN:
        return {...state, token: action.payload.token, user_id: action.payload.user_id }
    case LOGOUT:
        return initialState
    case SET_CONTENT:
        return {...state, stories: action.payload.stories, fragments: action.payload.fragments, username: action.payload.username}
    case SET_USERNAME:
        return {...state, username: action.payload.username}
    default: 
        return state
    }
}