import React from 'react'
import { connect } from 'react-redux'
import { update_character, set_current_character } from '../redux/actions'
import { Redirect } from 'react-router-dom'
import { StyledTextArea, StyledSubmit, StyledLabel, StyledTextInput, StyledHeader } from '../assets/StyledComponents'

class EditCharacter extends React.Component{
  
  currentCharacter = this.props.currentStory.characters.find( character => character.id === this.props.currentCharacter.id)

  state = {
    name: this.currentCharacter.name,
    description: this.currentCharacter.description,
    redirectBoolean: false,
    errors: []
}

editCharacterSubmitted = async (event) => {
    event.preventDefault()
    let rawEditedCharacter = await fetch (`https://asterism-api.herokuapp.com/characters/${this.props.currentCharacter.id}`, 
      {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.token
          },
          body: JSON.stringify({character: {
              story_id: this.props.currentStory.id,
              name: this.state.name,
              description: this.state.description
          }})
        })
    let editedCharacter = await rawEditedCharacter.json()
    
    if (editedCharacter.errors) {
      this.setState({
        errors: editedCharacter.errors
      })
    } else {
    this.props.update_character(editedCharacter)
    this.props.set_current_character(editedCharacter)
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
      return <form onSubmit={ this.editCharacterSubmitted }>
        <StyledHeader>Edit Character</StyledHeader>
      <br></br>
      <StyledLabel  htmlFor="edit_character_name">Name</StyledLabel>
      <br></br>
      <StyledTextInput 
          id="edit_character_name" 
          type="text" 
          onChange={ this.onChange /* for controlled form input status */ } 
          name="name" 
          value={ this.state.name /* for controlled form input status */ } />
          <br></br>
          <br></br>
      <StyledLabel  htmlFor="edit_character_description">Description</StyledLabel>
      <br></br>
      <StyledTextArea  
          id="edit_character_description" 
          onChange={ this.onChange } 
          name="description" 
          value={ this.state.description } />
          <br></br><br></br>
          <StyledSubmit 
                    type="submit" 
                    value="✓"
                    />
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
        currentStory: state.currentStory,
        currentCharacter: state.currentCharacter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      update_character: (character) => {
          dispatch(update_character(character))
      },
      set_current_character: currentCharacter => {
        dispatch(set_current_character(currentCharacter))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCharacter)