// import { SET_TOKEN } from './actionTypes';
// import { SET_USER } from './actionTypes'
import { LOGIN } from './actionTypes'
import { LOGOUT } from './actionTypes'

const initialState = {
    token: "",
    user_id: ""
}

export const reducer = (state = initialState, action) => {
    switch(action.type){
    // case SET_TOKEN:
    //     return {...state, token: action.payload}
    // case SET_USER:
    //     return {...state, userID: action.payload}
    case LOGIN:
        return {...state, token: action.payload.token, user_id: action.payload.user_id }
    case LOGOUT:
        return initialState
    default: 
        return state
    }
}