import { LOGIN, LOGOUT, SET_CONTENT, SET_USERNAME, SET_STORY, UPDATE_STORY, DELETE_STORY, SET_CURRENT_STORY, SET_FRAGMENT } from './actionTypes'

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
        return {...state, username: action.payload}
    case SET_STORY:
        return {...state, stories:[action.payload, ...state.stories]}
    case UPDATE_STORY:
        const updatedStory = action.payload;
        const otherStories = state.stories.filter(story => story.id !== updatedStory.id)
        return {
            ...state, 
            stories: [updatedStory, ...otherStories]
        }
    case DELETE_STORY:
       return {
           ...state,
        stories: [...state.stories.filter(story => story.id !== action.payload)]}
    case SET_CURRENT_STORY:
        return {...state, currentStory: action.payload}
    case SET_FRAGMENT:
        return {...state, fragments:[action.payload, ...state.fragments]}
    default: 
        return state
    }
}