import React from 'react'
import { connect } from 'react-redux'
import { StyledNavLink} from '../assets/StyledComponents'
import { delete_story_note, update_story } from '../redux/actions'
import { colors } from '../assets/colors'

class DeleteStoryNote extends React.Component{

    currentId = this.props.story_note.id

    delete = async () => {
        await fetch(`https://asterism-api.herokuapp.com/story_notes/${this.currentId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            }
        })
        this.props.delete_story_note(this.currentId)
        this.props.update_story(this.props.currentStory)
        console.log(this.props.story_note, "deleted!")
    } 

    render(){
        return(
            <StyledNavLink activeClassName="active" to='/stories/' onClick={this.delete}>✕</StyledNavLink>
        )}
}

const mapStateToProps = (state) => {
    return {
      currentStory: state.currentStory
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        delete_story_note: currentId => {
            dispatch(delete_story_note(currentId))
        },
        update_story: (currentStory) => {
            dispatch(update_story(currentStory))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DeleteStoryNote)

