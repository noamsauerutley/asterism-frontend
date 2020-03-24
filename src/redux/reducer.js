import { LOGIN, LOGOUT, LOAD, SET_CONTENT, SET_ACCOUNT_DATA, SET_USERNAME, UPDATE_PROFILE_PICTURE, UPDATE_EMAIL, UPDATE_BIO, SET_STORY, UPDATE_STORY, DELETE_STORY, SET_CURRENT_STORY, SET_FRAGMENT, UPDATE_FRAGMENT, SET_CURRENT_FRAGMENT, DELETE_FRAGMENT, SET_PLOT, UPDATE_PLOT, DELETE_PLOT, SET_CURRENT_PLOT, SET_CHARACTER, SET_CURRENT_CHARACTER, UPDATE_CHARACTER, DELETE_CHARACTER, SET_IMAGE, UPDATE_IMAGE, DELETE_IMAGE, SET_CURRENT_IMAGE, SET_CHARACTER_NOTE, UPDATE_CHARACTER_NOTE, DELETE_CHARACTER_NOTE, SET_CURRENT_CHARACTER_NOTE, SET_FRAGMENT_NOTE, UPDATE_FRAGMENT_NOTE, DELETE_FRAGMENT_NOTE, SET_CURRENT_FRAGMENT_NOTE, SET_SCENE, UPDATE_SCENE, DELETE_SCENE, SET_CURRENT_SCENE, SET_PLOT_NOTE, UPDATE_PLOT_NOTE, DELETE_PLOT_NOTE, SET_CURRENT_PLOT_NOTE, SET_APPEARANCE, DELETE_APPEARANCE, SET_STORY_NOTE, UPDATE_STORY_NOTE, DELETE_STORY_NOTE, SET_CURRENT_STORY_NOTE} from './actionTypes'

const initialState = {
    token: "",
    user_id: "",
    stories: [],
    fragments: [],
    appearances: [],
    username: "",
    email: "",
    image_url: "",
    bio: "",
    story: {},
    currentStory: {},
    currentFragment: {},
    currentPlot: {},
    currentCharacter: {},
    currentImage: {},
    currentCharacterNote: {},
    currentFragmentNote: {},
    currentScene: {},
    currentPlotNote: {},
    currentStoryNote: {}
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
        case SET_ACCOUNT_DATA:
            return {...state, email: action.payload.email, image_url: action.payload.image_url, bio: action.payload.bio}
        case SET_USERNAME:
            return {...state, username: action.payload}
        case UPDATE_EMAIL: 
            return {...state, email: action.payload}
        case UPDATE_PROFILE_PICTURE: 
            return {...state, image_url: action.payload}
        case UPDATE_BIO:
            return {...state, bio: action.payload}
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
            return {
                ...state, 
                currentStory: {
                    ...state.currentStory,
                    plots:[action.payload, ...state.currentStory.plots]
                }
            }
        case UPDATE_PLOT:
            const updatedPlot = action.payload;
            const otherPlots = state.currentStory.plots.filter(plot => plot.id !== updatedPlot.id)
            return {
                ...state, 
                currentStory: {
                    ...state.currentStory,
                    plots: [updatedPlot, ...otherPlots]
                }
            }
        case DELETE_PLOT:
            return{
                ...state,
                currentStory: {
                    ...state.currentStory,
                    plots: [...state.currentStory.plots.filter(plot => plot.id !== action.payload)]}
                }
        case SET_CURRENT_PLOT:
            return {...state, currentPlot: action.payload}
        case SET_CHARACTER:
            return {
                ...state, 
                currentStory: {
                    ...state.currentStory,
                    characters:[action.payload, ...state.currentStory.characters]
                }
            }
        case SET_CURRENT_CHARACTER:
            return {...state, currentCharacter: action.payload}  
        case UPDATE_CHARACTER:
            const updatedCharacter = action.payload;
            const otherCharacters = state.currentStory.characters.filter(character => character.id !== updatedCharacter.id)
            return {
                ...state, 
                currentStory: {
                    ...state.currentStory,
                    characters: [updatedCharacter, ...otherCharacters]
            }
        } 
        case DELETE_CHARACTER: 
            return{
                ...state,
                currentStory: {
                    ...state.currentStory,
                    characters: [...state.currentStory.characters.filter(character => character.id !== action.payload)]}
                }
        case SET_IMAGE:
            return {
                ...state, 
                currentCharacter: {
                    ...state.currentCharacter,
                    images: [action.payload, ...state.currentCharacter.images]
                }
            }
        case UPDATE_IMAGE:
            const updatedImage = action.payload;
            const otherImages = state.currentCharacter.images.filter(image => image.id !== updatedImage.id)
            return {
                ...state, 
                currentCharacter: {
                    ...state.currentCharacter,
                    images: [updatedImage, ...otherImages]
            }
        } 
        case DELETE_IMAGE:
            return{
                ...state,
                currentCharacter: {
                    ...state.currentCharacter,
                    images: [...state.currentCharacter.images.filter(image => image.id !== action.payload)]}
                }
        case SET_CURRENT_IMAGE:
            return {...state, currentImage: action.payload}  
        case SET_CHARACTER_NOTE:
            return {
                ...state, 
                currentCharacter: {
                    ...state.currentCharacter,
                    character_notes: [action.payload, ...state.currentCharacter.character_notes]
                }
            }
        case UPDATE_CHARACTER_NOTE:
            const updatedCharacterNote = action.payload;
            const otherCharacterNotes = state.currentCharacter.character_notes.filter(character_note => character_note.id !== updatedCharacterNote.id)
            return {
                ...state, 
                currentCharacter: {
                    ...state.currentCharacter,
                    character_notes: [updatedCharacterNote, ...otherCharacterNotes]
            }
        } 
        case DELETE_CHARACTER_NOTE:
            return{
                ...state,
                currentCharacter: {
                    ...state.currentCharacter,
                    character_notes: [...state.currentCharacter.character_notes.filter(character_note => character_note.id !== action.payload)]}
                }
        case SET_CURRENT_CHARACTER_NOTE:
            return {...state, currentCharacterNote: action.payload} 
        case SET_FRAGMENT_NOTE:
            return {
                ...state, 
                currentFragment: {
                    ...state.currentFragment,
                    fragment_notes:[action.payload, ...state.currentFragment.fragment_notes]
                }
            }
        case UPDATE_FRAGMENT_NOTE:
            const updatedFragmentNote = action.payload;
            const otherFragmentNotes = state.currentFragment.fragment_notes.filter(fragment_note => fragment_note.id !== updatedFragmentNote.id)
            return {
                ...state, 
                currentFragment: {
                    ...state.currentFragment,
                    fragment_notes: [updatedFragmentNote, ...otherFragmentNotes]
                }
            }
        case DELETE_FRAGMENT_NOTE:
            return{
                ...state,
                currentFragment: {
                    ...state.currentFragment,
                    fragment_notes: [...state.currentFragment.fragment_notes.filter(fragment_note => fragment_note.id !== action.payload)]}
                }
        case SET_CURRENT_FRAGMENT_NOTE:
            return {...state, currentFragmentNote: action.payload}
        case SET_SCENE:
            return {
                ...state, 
                currentPlot: {
                    ...state.currentPlot,
                    scenes: [action.payload, ...state.currentPlot.scenes]
                }
            }
        case UPDATE_SCENE:
            const updatedScene = action.payload;
            const otherScenes = state.currentPlot.scenes.filter(scene => scene.id !== updatedScene.id)
            return {
                ...state, 
                currentPlot: {
                    ...state.currentPlot,
                    scenes: [updatedScene, ...otherScenes]
            }
        } 
        case DELETE_SCENE:
            return{
                ...state,
                currentPlot: {
                    ...state.currentPlot,
                    scenes: [...state.currentPlot.scenes.filter(scene => scene.id !== action.payload)]}
                }
        case SET_CURRENT_SCENE:
            return {...state, currentScene: action.payload}  
        case SET_PLOT_NOTE:
            return {
                ...state, 
                currentPlot: {
                    ...state.currentPlot,
                    plot_notes:[action.payload, ...state.currentPlot.plot_notes]
                }
            }
        case UPDATE_PLOT_NOTE:
            const updatedPlotNote = action.payload;
            const otherPlotNotes = state.currentPlot.plot_notes.filter(plot_note => plot_note.id !== updatedPlotNote.id)
            return {
                ...state, 
                currentPlot: {
                    ...state.currentPlot,
                    plot_notes: [updatedPlotNote, ...otherPlotNotes]
                }
            }
        case DELETE_PLOT_NOTE:
            return{
                ...state,
                currentPlot: {
                    ...state.currentPlot,
                    plot_notes: [...state.currentPlot.plot_notes.filter(plot_note => plot_note.id !== action.payload)]}
                }
        case SET_CURRENT_PLOT_NOTE:
            return {...state, currentPlotNote: action.payload} 
        case SET_APPEARANCE:
            const newAppearanceCharacter = state.currentStory.characters.find(character => character.id === action.payload.character_id)
            return {
                ...state, 
                currentScene: {
                    ...state.currentScene,
                    characters:[...state.currentScene.characters, newAppearanceCharacter]
                },
                appearances: [...state.appearances, action.payload]
            }
        case DELETE_APPEARANCE:
            return{
                ...state,
                currentScene: {
                    ...state.currentScene,
                    characters: [...state.currentScene.characters.filter(character => character.id !== action.payload.character_id)]
                },
                appearances: [...state.appearances.filter(appearance => appearance.id !== action.payload.id)]
                }
        case SET_STORY_NOTE:
            return {
                ...state, 
                currentStory: {
                    ...state.currentStory,
                    story_notes:[action.payload, ...state.currentStory.story_notes]
                }
            }
        case UPDATE_STORY_NOTE:
            const updatedStoryNote = action.payload;
            const otherStoryNotes = state.currentStory.story_notes.filter(story_note => story_note.id !== updatedStoryNote.id)
            return {
                ...state, 
                currentStory: {
                    ...state.currentStory,
                    story_notes: [updatedStoryNote, ...otherStoryNotes]
                }
            }
        case DELETE_STORY_NOTE:
            return{
                ...state,
                currentStory: {
                    ...state.currentStory,
                    story_notes: [...state.currentStory.story_notes.filter(story_note => story_note.id !== action.payload)]}
                }
        case SET_CURRENT_STORY_NOTE:
            return {...state, currentStoryNote: action.payload}
        default: 
            return state
    }
}
