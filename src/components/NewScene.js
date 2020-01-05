import React from 'react'
import { connect } from 'react-redux'
import { set_scene, set_current_scene, update_plot } from '../redux/actions'
import { Redirect } from 'react-router-dom'
import { StyledTextArea, StyledSubmit, StyledLabel, StyledTextInput, StyledHeader } from '../assets/StyledComponents'
import styled from 'styled-components'
import { colors } from '../assets/colors'


class NewScene extends React.Component{
  
  state = {
    name: "",
    summary: "",
    redirectBoolean: false,
    errors: []
}

newSceneSubmitted = async (event) => {
    event.preventDefault()
    let rawScene = await fetch (`https://asterism-api.herokuapp.com/scenes`, 
      {
          method: "POST",
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
    let scene = await rawScene.json()
    
    if (scene.errors) {
      this.setState({
        errors: scene.errors
      })
    } else {
    this.props.set_scene(scene)
    this.props.set_current_scene(scene)
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
      return <form onSubmit={ this.newSceneSubmitted }>
        <StyledHeader>New Scene:</StyledHeader>
      <br></br>
      <StyledLabel  htmlFor="new_scene_name">Name</StyledLabel>
      <br></br>
      <StyledTextInput 
          id="new_scene_name" 
          type="text" 
          onChange={ this.onChange /* for controlled form input status */ } 
          name="name" 
          value={ this.state.name /* for controlled form input status */ } />
          <br></br>
          <br></br>
      <StyledLabel  htmlFor="new_scene_summary">Summary</StyledLabel>
      <br></br>
      <StyledTextArea  
          style={{width: "80%", height: "300px"}}
          id="new_scene_summary" 
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
      set_scene: (scene) => {
          dispatch(set_scene(scene))
      },
      set_current_scene: currentScene => {
        dispatch(set_current_scene(currentScene))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewScene)