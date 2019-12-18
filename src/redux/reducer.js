import { LOGIN, LOGOUT, SET_CONTENT, SET_USERNAME, SET_STORY, SET_CURRENT_STORY } from './actionTypes'

const initialState = {
    token: "",
    user_id: "",
    stories: [],
    fragments: [],
    username: "",
    story: {},
    currentStory: {}
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
    case SET_STORY:
        return {...state, story: action.payload.story}
    case SET_CURRENT_STORY:
        return {...state, currentStory: action.payload.currentStory}
    default: 
        return state
    }
}