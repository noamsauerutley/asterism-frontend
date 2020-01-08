import React from 'react'
import { connect } from 'react-redux'
import { update_story } from '../redux/actions'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from '../assets/colors'
import { StyledTextArea, StyledSubmit, StyledLabel, StyledTextInput, StyledHeader } from '../assets/StyledComponents'


class EditStory extends React.Component{

  story = this.props.currentStory

  state = {
    title: this.story.title,
    summary: this.story.summary,
    redirectBoolean: false,
    errors: []
}

editStorySubmitted = async (event) => {
    event.preventDefault()
    let rawEditedStory = await fetch (`https://asterism-api.herokuapp.com/stories/${this.story.id}`, 
      {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.token
          },
          body: JSON.stringify({story: {
              title: this.state.title,
              summary: this.state.summary
          }})
        })
    let editedStory = await rawEditedStory.json()
    
    if (editedStory.errors) {
      this.setState({
        errors: editedStory.errors
      })
    } else {
    this.props.update_story(editedStory)
    this.setState({
      redirectBoolean: true
    })
      }
}

onChange = event => {
  console.log(this.story)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  conditionalRender = () => {
    if(this.state.redirectBoolean===false){
      return <form onSubmit={ this.editStorySubmitted }>
        <StyledHeader>Edit Story:</StyledHeader>
      <br></br>
      <StyledLabel  htmlFor="new_story_title">Title</StyledLabel>
      <br></br>
      <StyledTextInput
          id="new_story_title" 
          type="text" 
          onChange={ this.onChange /* for controlled form input status */ } 
          name="title" 
          value={ this.state.title /* for controlled form input status */ } />
          <br></br>
          <br></br>
      <StyledLabel  htmlFor="new_story_summary">Summary</StyledLabel>
      <br></br>
      <StyledTextArea  
          style={{width: "80%", height: "300px"}}
          id="new_story_summary" 
          onChange={ this.onChange } 
          name="summary" 
          value={ this.state.summary } />
          <br></br><br></br>
          <StyledSubmit 
                    type="submit" 
                    value="✓"
                    />  </form>
    } else{
      return < Redirect to='/stories' />
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
    currentStory: state.currentStory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      update_story: (story) => {
          dispatch(update_story(story))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditStory)