import React from 'react'
import { NavLink } from 'react-router-dom'
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
      <div  onClick={this.setCurrentCharacter}>
         <NavLink to="/character_notes/edit" style={{color: "black", textDecoration: "none"}} onClick={this.setCurrentCharacterNote}>✎</NavLink><br></br>
         <li style={{listStyle: "none"}}>{this.props.character_note.text}</li>
         < DeleteCharacterNote character_note={this.props.character_note}/>
      </div>
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