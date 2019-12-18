import { LOGIN, LOGOUT, SET_CONTENT, SET_USERNAME, SET_STORY, SET_CURRENT_STORY} from './actionTypes'


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

export const set_story = (story) => {
    return {
        type: SET_STORY,
        payload: {story}
    }
}

export const set_current_story = (currentStory) => {
    return {
        type: SET_CURRENT_STORY,
        payload: {currentStory}
    }
}