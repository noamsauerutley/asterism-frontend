import { SET_TOKEN } from './actionTypes';
import { SET_USER } from './actionTypes'
import { LOGIN } from './actionTypes'

export const setToken = (token) => {
    return {
        type: SET_TOKEN,
        payload: token 
    }
}

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}

export const login = ({token, user}) => {
    return {
        type: LOGIN,
        payload: {token, user}
    }
}