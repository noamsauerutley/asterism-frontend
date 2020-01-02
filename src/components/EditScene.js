import React from 'react'
import { connect } from 'react-redux'
import { update_scene, set_current_scene, update_plot } from '../redux/actions'
import { Redirect } from 'react-router-dom'
import { StyledTextArea, StyledSubmit, StyledLabel, StyledTextInput, StyledHeader } from '../assets/StyledComponents'
import styled from 'styled-components'
import { colors } from '../assets/colors'


class EditScene extends React.Component{
  
  state = {
    name: this.props.currentScene.name,
    summary: this.props.currentScene.summary,
    redirectBoolean: false,
    errors: []
}

editSceneSubmitted = async (event) => {
    event.preventDefault()
    let rawEditedScene = await fetch (`http://localhost:3000/scenes/${this.props.currentScene.id}`, 
      {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.token
          },
          body: JSON.stringify({scene: {
              plot_id: this.props.currentPlot.id,
              name: this.state.name,
              summary: this.state.summary
          }})
        })
    let editedScene = await rawEditedScene.json()
    
    if (editedScene.errors) {
      this.setState({
        errors: editedScene.errors
      })
    } else {
    this.props.update_scene(editedScene)
    this.props.set_current_scene(editedScene)
    this.props.update_plot(this.props.currentPlot)
    this.setState({
      redirectBoolean: true
    })
      }
}

onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  conditionalRender = () => {
    if(this.state.redirectBoolean===false){
      return <form onSubmit={ this.editSceneSubmitted }>
        <StyledHeader>Edit Scene: </StyledHeader>
      <br></br>
      <StyledLabel  htmlFor="edit_scene_name">Name</StyledLabel>
      <br></br>
      <StyledTextInput
          id="edit_scene_name" 
          type="text" 
          onChange={ this.onChange /* for controlled form input status */ } 
          name="name" 
          value={ this.state.name /* for controlled form input status */ } />
          <br></br>
          <br></br>
      <StyledLabel  htmlFor="edit_scene_summary">Summary</StyledLabel>
      <br></br>
      <StyledTextArea  
          style={{width: "80%", height: "300px"}}
          id="edit_scene_summary" 
          onChange={ this.onChange } 
          name="summary" 
          value={ this.state.summary } />
          <br></br><br></br>
          <StyledSubmit 
                    type="submit" 
                    value="✓"
                    />  </form>
    } else{
      return < Redirect to={`/stories/${this.props.currentStory.id}`} />
    }
  }
    
    render(){
      return(
        <div style={{textAlign: "center"}}>
        {this.conditionalRender()}
        </div>
      )
    }
}
const mapStateToProps = (state) => {
  return {
        currentStory: state.currentStory,
        currentScene: state.currentScene,
        currentPlot: state.currentPlot,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      update_plot: (plot) => {
          dispatch(update_plot(plot))
      },
      update_scene: (scene) => {
          dispatch(update_scene(scene))
      },
      set_current_scene: currentScene => {
        dispatch(set_current_scene(currentScene))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditScene)