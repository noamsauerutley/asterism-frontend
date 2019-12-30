import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import DeleteCharacterNote from './DeleteCharacterNote'
import { set_current_character_note, set_current_character } from '../redux/actions'
import styled from 'styled-components'

const StyledCharacterNoteCard = styled.div`
white-space: pre-wrap;
`

class CharacterNoteCard extends React.Component{
   setCurrentCharacterNote = () => {
      this.props.set_current_character_note(this.props.character_note)
  }
  setCurrentCharacter = () => {
   this.props.set_current_character(this.props.currentStory.characters.find(character => character.id === this.props.character_note.character_id))
}
   render(){
      return(
      <StyledCharacterNoteCard  onClick={this.setCurrentCharacter}>
         <li style={{listStyle: "none"}}>{this.props.character_note.text}</li>
         <NavLink to="/character_notes/edit" style={{color: "black", textDecoration: "none"}} onClick={this.setCurrentCharacterNote}>✎   </NavLink>
         < DeleteCharacterNote character_note={this.props.character_note}/>
      </StyledCharacterNoteCard>
   )
}}

const mapStateToProps = (state) => {
   return {
       currentStory: state.currentStory,
   }
 }

const mapDispatchToProps = (dispatch) => {
   return {
       set_current_character_note: currentCharacterNote => {
           dispatch(set_current_character_note(currentCharacterNote))
       },
       set_current_character: currentCharacter => {
         dispatch(set_current_character(currentCharacter))
     }
   }
}

 export default connect(mapStateToProps, mapDispatchToProps)(CharacterNoteCard)