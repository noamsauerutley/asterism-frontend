import React from 'react'
import { connect } from 'react-redux'
import { StyledNavLink} from '../assets/StyledComponents'
import { delete_scene, update_plot, update_story } from '../redux/actions'
import styled from 'styled-components'
import { colors } from '../assets/colors'


class DeleteScene extends React.Component {

    delete = async () => {
        await fetch(`https://asterism-api.herokuapp.com/scenes/${this.props.scene.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            }
        })
        this.props.delete_scene(this.props.scene.id)
        this.props.update_plot(this.props.currentPlot) 
        this.props.update_story(this.props.currentStory)
    } 

    render(){
        return(
            <StyledNavLink activeClassName="active" to={`/stories/${this.props.currentStory.id}`} onClick={this.delete} >✕</StyledNavLink>
        )}
}


const mapStateToProps = (state) => {
    return {
        currentStory: state.currentStory,
        currentPlot: state.currentPlot,
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        delete_scene: currentId => {
            dispatch(delete_scene(currentId))
        },
        update_plot: (currentPlot) => {
            dispatch(update_plot(currentPlot))
        },
        update_story: (currentStory) => {
            dispatch(update_story(currentStory))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DeleteScene)

