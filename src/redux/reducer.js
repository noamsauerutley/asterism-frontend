import { SET_TOKEN } from './actionTypes';
import { SET_USER } from './actionTypes'
import { LOGIN } from './actionTypes'

const initialState = {
    token: "",
    author: {username: ""}
}

export const reducer = (state = initialState, action) => {
    switch(action.type){
    case SET_TOKEN:
        return {...state, token: action.payload}
    case SET_USER:
        return {...state, user: action.payload}
    case LOGIN:
        return {...state, user: action.payload.user, token: action.payload.token}
    default: 
        return state
    }
}