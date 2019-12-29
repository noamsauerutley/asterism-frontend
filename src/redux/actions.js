import { LOGIN, LOGOUT, SET_CONTENT, SET_USERNAME, SET_STORY, UPDATE_STORY, DELETE_STORY, SET_CURRENT_STORY, SET_FRAGMENT, UPDATE_FRAGMENT, SET_CURRENT_FRAGMENT, DELETE_FRAGMENT, SET_PLOT, UPDATE_PLOT, DELETE_PLOT, SET_CURRENT_PLOT, SET_CHARACTER, SET_CURRENT_CHARACTER, UPDATE_CHARACTER, DELETE_CHARACTER, SET_IMAGE, UPDATE_IMAGE, DELETE_IMAGE, SET_CURRENT_IMAGE} from './actionTypes'


export const login = ({token, user_id}) => {
    return {
        type: LOGIN,
        payload: {token, user_id}
    }
}

export const load = (isLoaded) => {
    return {
        type: LOAD,
        payload: isLoaded
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
        payload: username
    }
}

export const set_story = (story) => {
    return {
        type: SET_STORY,
        payload: story
    }
}

export const update_story = (story) => {
    return {
        type: UPDATE_STORY,
        payload: story
    }
}

export const delete_story = (id) => {
    return {
        type: DELETE_STORY,
        payload: id
    }
}

export const set_current_story = (currentStory) => {
    return {
        type: SET_CURRENT_STORY,
        payload: currentStory
    }
}

export const set_fragment = (fragment) => {
    return {
        type: SET_FRAGMENT,
        payload: fragment
    }
}

export const update_fragment = (fragment) => {
    return {
        type: UPDATE_FRAGMENT,
        payload: fragment
    }
}

export const set_current_fragment = (currentFragment) => {
    return {
        type: SET_CURRENT_FRAGMENT,
        payload: currentFragment
    }
}

export const delete_fragment = (id) => {
    return {
        type: DELETE_FRAGMENT,
        payload: id
    }
}

export const set_plot = (plot) => {
    return {
        type: SET_PLOT,
        payload: plot
    }
}

export const update_plot = (plot) => {
    return {
        type: UPDATE_PLOT,
        payload: plot
    }
}

export const delete_plot = (id) => {
    return {
        type: DELETE_PLOT,
        payload: id
    }
}

export const set_current_plot = (currentPlot) => {
    return {
        type: SET_CURRENT_PLOT,
        payload: currentPlot
    }
}

export const set_character = (character) => {
    return {
        type: SET_CHARACTER,
        payload: character
    }
}

export const set_current_character = (currentCharacter) => {
    return {
        type: SET_CURRENT_CHARACTER,
        payload: currentCharacter
    }
}

export const update_character = (character) => {
    return {
        type: UPDATE_CHARACTER,
        payload: character
    }
}
export const delete_character = (id) => {
    return {
        type: DELETE_CHARACTER,
        payload: id
    }
}
export const set_image = (image) => {
    return {
        type: SET_IMAGE,
        payload: image
    }
}
export const update_image = (image) => {
    return {
        type: UPDATE_IMAGE,
        payload: image
    }
}
export const delete_image = (id) => {
    return {
        type: DELETE_IMAGE,
        payload: id
    }
}

export const set_current_image = (currentImage) => {
    return {
        type: SET_CURRENT_IMAGE,
        payload: currentImage
    }
}