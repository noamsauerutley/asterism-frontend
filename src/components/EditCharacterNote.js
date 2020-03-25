import React from 'react'
import { connect } from 'react-redux'
import { update_character_note, set_current_character_note, update_character} from '../redux/actions'
import { Redirect } from 'react-router-dom'
import { StyledSubmit, StyledTextArea, StyledLabel, StyledHeader } from '../assets/StyledComponents'

class EditCharacterNote extends React.Component{
  
  state = {
    text: this.props.currentCharacterNote.text,
    redirectBoolean: false,
    errors: []
}

editCharacterNoteSubmitted = async (event) => {
    event.preventDefault()
    let rawEditedCharacterNote = await fetch (`https://asterism-api.herokuapp.com/character_notes/${this.props.currentCharacterNote.id}`, 
      {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.token
          },
          body: JSON.stringify({character_note: {
              character_id: this.props.currentCharacter.id,
              text: this.state.text
          }})
        })
    let editedCharacterNote = await rawEditedCharacterNote.json()
    
    if (editedCharacterNote.errors) {
      this.setState({
        errors: editedCharacterNote.errors
      })
    } else {
    this.props.update_character_note(editedCharacterNote)
    this.props.set_current_character_note(editedCharacterNote)
    this.props.update_character(this.props.currentCharacter)
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
      return <form onSubmit={ this.editCharacterNoteSubmitted }>
        <StyledHeader>Edit Character Note:</StyledHeader>
          <br></br>
      <StyledLabel  htmlFor="edit_character_note">Text</StyledLabel>
      <br></br>
      <StyledTextArea  
          id="edit_character_note" 
          onChange={ this.onChange } 
          name="text" 
          value={ this.state.text } />
          <br></br><br></br>
      <StyledSubmit type="submit" value="✓" />
  </form>
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
        currentCharacter: state.currentCharacter,
        currentStory: state.currentStory,
        currentCharacterNote: state.currentCharacterNote
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      update_character_note: (character_note) => {
          dispatch(update_character_note(character_note))
      },
      set_current_character_note: (character_note) => {
          dispatch(set_current_character_note(character_note))
      },
      update_character: (currentCharacter) => {
          dispatch(update_character(currentCharacter))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCharacterNote)