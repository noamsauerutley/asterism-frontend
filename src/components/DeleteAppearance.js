import React from 'react'
import { connect } from 'react-redux'
import { StyledNavLink} from '../assets/StyledComponents'
import { delete_appearance, update_scene, update_plot, update_story } from '../redux/actions'

class DeleteAppearance extends React.Component {

    appearance = this.props.appearances.find(appearance => (appearance.character_id === this.props.character_id && appearance.scene_id === this.props.scene_id))

    delete = async () => {
        await fetch(`https://asterism-api.herokuapp.com/appearances/${this.appearance.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            }
        })
        this.props.delete_appearance(this.appearance)
        this.props.update_scene(this.props.currentScene)
        this.props.update_plot(this.props.currentPlot) 
        this.props.update_story(this.props.currentStory)
    } 

    render(){
        return(
            <StyledNavLink activeClassName="" to={`/stories/${this.props.currentStory.id}`} onClick={this.delete} > ✕</StyledNavLink>
        )}
}


const mapStateToProps = (state) => {
    return {
        appearances: state.appearances,
        currentStory: state.currentStory,
        currentPlot: state.currentPlot,
        currentScene: state.currentScene
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        delete_appearance: currentId => {
            dispatch(delete_appearance(currentId))
        },
        update_scene: (currentScene) => {
            dispatch(update_scene(currentScene))
        },
        update_plot: (currentPlot) => {
            dispatch(update_plot(currentPlot))
        },
        update_story: (currentStory) => {
            dispatch(update_story(currentStory))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DeleteAppearance)

