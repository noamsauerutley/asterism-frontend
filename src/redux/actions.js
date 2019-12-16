// import { SET_TOKEN } from './actionTypes';
// import { SET_USER } from './actionTypes'
import { LOGIN } from './actionTypes'
import { LOGOUT } from './actionTypes'

// export const setToken = (token) => {
//     return {
//         type: SET_TOKEN,
//         payload: token 
//     }
// }

// export const setUser = (userID) => {
//     return {
//         type: SET_USER,
//         payload: userID
//     }
// }

export const login = ({token, user_id}) => {
    return {
        type: LOGIN,
        payload: {token, user_id}
    }
}

export const logout = () => {
    return {type: LOGOUT}
}