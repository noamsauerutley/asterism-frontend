import React from 'react'
import { StyledNavLink, StyledNoteCard, StyledCharacterNoteCard } from '../assets/StyledComponents'
import { connect } from 'react-redux'
import DeleteCharacterNote from './DeleteCharacterNote'
import { set_current_character_note, set_current_character } from '../redux/actions'

class CharacterNoteCard extends React.Component{
   setCurrentCharacterNote = () => {
      this.props.set_current_character_note(this.props.character_note)
  }
  setCurrentCharacter = () => {
   this.props.set_current_character(this.props.currentStory.characters.find(character => character.id === this.props.character_note.character_id))
}
   render(){
      return(
      <StyledNoteCard  onClick={this.setCurrentCharacter}>
         <p>{this.props.character_note.text}</p>
         <StyledNavLink activeClassName="active" to="/character_notes/edit" onClick={this.setCurrentCharacterNote}>✎   </StyledNavLink>
         < DeleteCharacterNote character_note={this.props.character_note}/>
      </StyledNoteCard>
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