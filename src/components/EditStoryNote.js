import React from 'react'
import { connect } from 'react-redux'
import { update_story_note, set_current_story_note, update_story} from '../redux/actions'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from '../assets/colors'
import { StyledTextArea, StyledSubmit, StyledLabel, StyledHeader } from '../assets/StyledComponents'


class EditStoryNote extends React.Component{
  
  state = {
    text: this.props.currentStoryNote.text,
    redirectBoolean: false,
    errors: []
}

editStoryNoteSubmitted = async (event) => {
    event.preventDefault()
    let rawEditedStoryNote = await fetch (`https://asterism-api.herokuapp.com/story_notes/${this.props.currentStoryNote.id}`, 
      {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.token
          },
          body: JSON.stringify({story_note: {
              story_id: this.props.currentStory.id,
              text: this.state.text
          }})
        })
    let editedStoryNote = await rawEditedStoryNote.json()
    
    if (editedStoryNote.errors) {
      this.setState({
        errors: editedStoryNote.errors
      })
    } else {
      console.log(this.props.currentStory)
      console.log(editedStoryNote)
    this.props.update_story_note(editedStoryNote)
    this.props.set_current_story_note(editedStoryNote)
    this.props.update_story(this.props.currentStory)
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
      return <form onSubmit={ this.editStoryNoteSubmitted }>
        <StyledHeader>Edit Story Note:</StyledHeader>
          <br></br>
      <StyledLabel  htmlFor="edit_story_note">Text</StyledLabel>
      <br></br>
      <StyledTextArea  
          style={{width: "80%", height: "300px"}}
          id="edit_story_note" 
          onChange={ this.onChange } 
          name="text" 
          value={ this.state.text } />
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
        currentStory: state.currentStory,
        currentStoryNote: state.currentStoryNote
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      update_story_note: (story_note) => {
          dispatch(update_story_note(story_note))
      },
      set_current_story_note: (currentStoryNote) => {
        dispatch(set_current_story_note(currentStoryNote))
      },
      update_story: (currentStory) => {
          dispatch(update_story(currentStory))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditFragmentNote)