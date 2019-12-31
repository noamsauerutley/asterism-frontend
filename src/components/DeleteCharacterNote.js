import React from 'react'
import { connect } from 'react-redux'
import { NavLink} from 'react-router-dom'
import { delete_character_note, update_character } from '../redux/actions'
import styled from 'styled-components'
import { colors } from '../assets/colors'

const StyledDeleteCharacterNote = styled(NavLink)`
    background-color: Transparent;
    color: black;
    style: none;
    font-family: Didot;
    font-size; 18px;
    text-decoration: none;
    margin-top: 10px;

`

class DeleteCharacterNote extends React.Component{

    currentId = !!this.props.character_note.id ? this.props.character_note.id : 0

    delete = async () => {
        await fetch(`http://localhost:3000/character_notes/${this.currentId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            }
        })
        this.props.delete_character_note(this.currentId)
        this.props.update_character(this.props.currentCharacter)
        console.log(this.props.currentCharacter)
        console.log(this.props.image, "deleted!")
    } 

    render(){
        return(
            <StyledDeleteCharacterNote to={`/stories/${this.props.currentStory.id}`} onClick={this.delete} >✕</StyledDeleteCharacterNote>
        )}
}


const mapStateToProps = (state) => {
    return {
        currentStory: state.currentStory,
        currentCharacter: state.currentCharacter,
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        delete_character_note: currentId => {
            dispatch(delete_character_note(currentId))
        },
        update_character: (currentCharacter) => {
            dispatch(update_character(currentCharacter))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DeleteCharacterNote)

