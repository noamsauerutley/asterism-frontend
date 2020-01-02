import React from 'react'
import { connect } from 'react-redux'
import { update_fragment_note, set_current_fragment_note, update_fragment} from '../redux/actions'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from '../assets/colors'
import { StyledTextArea, StyledSubmit, StyledLabel, StyledHeader } from '../assets/StyledComponents'


class EditFragmentNote extends React.Component{
  
  state = {
    text: this.props.currentFragmentNote.text,
    redirectBoolean: false,
    errors: []
}

editFragmentNoteSubmitted = async (event) => {
    event.preventDefault()
    let rawEditedFragmentNote = await fetch (`http://localhost:3000/fragment_notes/${this.props.currentFragmentNote.id}`, 
      {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.token
          },
          body: JSON.stringify({fragment_note: {
              fragment_id: this.props.currentFragment.id,
              text: this.state.text
          }})
        })
    let editedFragmentNote = await rawEditedFragmentNote.json()
    
    if (editedFragmentNote.errors) {
      this.setState({
        errors: editedFragmentNote.errors
      })
    } else {
      console.log(this.props.currentFragment)
      console.log(editedFragmentNote)
    this.props.update_fragment_note(editedFragmentNote)
    this.props.set_current_fragment_note(editedFragmentNote)
    this.props.update_fragment(this.props.currentFragment)
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
      return <form onSubmit={ this.editFragmentNoteSubmitted }>
        <StyledHeader>Edit Fragment Note:</StyledHeader>
          <br></br>
      <StyledLabel  htmlFor="edit_fragment_note">Text</StyledLabel>
      <br></br>
      <StyledTextArea  
          style={{width: "80%", height: "300px"}}
          id="edit_fragment_note" 
          onChange={ this.onChange } 
          name="text" 
          value={ this.state.text } />
          <br></br><br></br>
          <StyledSubmit 
                    type="submit" 
                    value="✓"
                    />  </form>
    } else{
      return < Redirect to='/fragments' />
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
        currentFragment: state.currentFragment,
        currentFragmentNote: state.currentFragmentNote
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      update_fragment_note: (fragment_note) => {
          dispatch(update_fragment_note(fragment_note))
      },
      set_current_fragment_note: (currentFragmentNote) => {
        dispatch(set_current_fragment_note(currentFragmentNote))
      },
      update_fragment: (currentFragment) => {
          dispatch(update_fragment(currentFragment))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditFragmentNote)