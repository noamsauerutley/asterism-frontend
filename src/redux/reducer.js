import { LOGIN, LOGOUT, SET_CONTENT, SET_USERNAME, SET_STORY, UPDATE_STORY, DELETE_STORY, SET_CURRENT_STORY, SET_FRAGMENT, UPDATE_FRAGMENT, SET_CURRENT_FRAGMENT, DELETE_FRAGMENT, SET_PLOT, UPDATE_PLOT, DELETE_PLOT, SET_CURRENT_PLOTS} from './actionTypes'

const initialState = {
    token: "",
    user_id: "",
    stories: [],
    fragments: [],
    username: "",
    story: {},
    currentStory: {},
    plots: []
}

export const reducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN:
            return {...state, token: action.payload.token, user_id: action.payload.user_id }
        case LOAD: 
            return {...state, isLoaded: true}
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
        case UPDATE_FRAGMENT:
            const updatedFragment = action.payload;
            const otherFragments = state.fragments.filter(fragment => fragment.id !== updatedFragment.id)
            return {
                ...state, 
                fragments: [updatedFragment, ...otherFragments]
            }
        case SET_CURRENT_FRAGMENT:
            return {...state, currentFragment: action.payload}
        case DELETE_FRAGMENT:
            return{
                ...state,
            fragments: [...state.fragments.filter(fragment => fragment.id !== action.payload)]}
        case SET_PLOT:
            return {...state, plots:[action.payload, ...state.plots]}
        case UPDATE_PLOT:
            const updatedPlot = action.payload;
            const otherPlots = state.plots.filter(plot => plot.id !== updatedPlot.id)
            return {
                ...state, 
                plots: [updatedPlot, ...otherPlots]
            }
        case DELETE_PLOT:
            return{
                ...state,
                plots: [...state.plots.filter(plot => plot.id !== action.payload)]}
        case SET_CURRENT_PLOTS:
            return {...state, plots: state.currentStory.plots}
        default: 
            return state
    }
}