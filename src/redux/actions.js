import { LOGIN, SET_CONTENT, SET_USERNAME} from './actionTypes'
import { LOGOUT } from './actionTypes'

export const login = ({token, user_id}) => {
    return {
        type: LOGIN,
        payload: {token, user_id}
    }
}

export const logout = () => {
    return {type: LOGOUT}
}

export const set_content = ({stories, fragments, username}) => {
    return {
        type: SET_CONTENT,
        payload: {stories, fragments, username}
    }
}

export const set_username = (username) => {
    return {
        type: SET_USERNAME,
        payload: {username}
    }
}