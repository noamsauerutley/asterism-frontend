import React from 'react'
import { connect } from 'react-redux'
import { StyledNavLink, StyledNoteCard } from '../assets/StyledComponents'
import {set_current_story_note, set_current_story} from '../redux/actions'  
import DeleteStoryNote from './DeleteStoryNote'

class StoryNoteCard extends React.Component {

   setCurrentStoryNote = () => {
      this.props.set_current_story_note(this.props.story_note)
      this.props.set_current_story(this.props.currentStory)
  }
   render(){

      return <StyledNoteCard onClick={this.setCurrentStoryNote}>
         <p>{this.props.story_note.text}</p>
         <StyledNavLink activeClassName="active" to="/story_notes/edit" >✎   </StyledNavLink>
         < DeleteStoryNote story_note={this.props.story_note}/><br></br>
         </StyledNoteCard>
   }
}

const mapStateToProps = (state) => {
   return {
       currentStory: state.currentStory,
   }
 }

const mapDispatchToProps = (dispatch) => {
   return {
       set_current_story: currentStory => {
           dispatch(set_current_story(currentStory))
       },
       set_current_story_note: currentStoryNote => {
           dispatch(set_current_story_note(currentStoryNote))
       }
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(StoryNoteCard)