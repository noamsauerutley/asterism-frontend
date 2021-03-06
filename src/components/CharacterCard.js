import React from 'react'
import CharacterNoteCard from './CharacterNoteCard'
import ImageCard from './ImageCard'
import { connect } from 'react-redux'
import { set_current_character, delete_character, delete_appearance, update_story, update_plot, update_scene } from '../redux/actions'
import { StyledNavLink, StyledLabel, StyledUl, StyledCharacterCard} from '../assets/StyledComponents'

class CharacterCard extends React.Component{

     setCurrentCharacter = () => {
        this.props.set_current_character(this.props.character)
    }


     delete = async () => {
         await fetch(`https://asterism-api.herokuapp.com/characters/${this.props.character.id}`, {
             method: 'DELETE',
             headers: {
                 "Content-Type": "application/json",
                 "Authorization": localStorage.token
                }
            })
            this.props.delete_character(this.props.character.id) 
            this.props.update_story(this.props.currentStory)
    } 

    render(){
        return <StyledCharacterCard onClick={this.setCurrentCharacter}>
            <h3>{this.props.character.name}</h3>
            <StyledNavLink activeClassName="active" to="/characters/edit" >✎   </StyledNavLink>
            <StyledNavLink activeClassName="active" to={`/stories/${this.props.character.story_id}`} onClick={this.delete}>✕</StyledNavLink><br></br>
            <p>{this.props.character.description}</p><br></br>
            <StyledLabel>IMAGES</StyledLabel><br></br>
            <StyledNavLink activeClassName="active" to={`/images/new`} style={{marginTop: "20px", fontSize: "16px"}} onClick={this.setCurrentCharacter}>＋</StyledNavLink>
            <StyledUl>
                {!!this.props.character.images ? this.props.character.images.map(image => <ImageCard image={image} />) : ""}</StyledUl>
                <StyledLabel>NOTES:</StyledLabel><br></br>
                <StyledNavLink activeClassName="active" to={`/character_notes/new`} style={{marginTop: "20px", fontSize: "20px"}} onClick={this.setCurrentCharacter}>＋</StyledNavLink>
            <StyledUl>{!!this.props.character.character_notes ? this.props.character.character_notes.map(character_note => < CharacterNoteCard character_note={character_note}/>) : "You haven't added any notes to this character."}</StyledUl>

        </StyledCharacterCard>
    }
}

const mapStateToProps = (state) => {
    return {
        appearances: state.appearances,
        currentScene: state.currentScene,
        currentPlot: state.currentPlot,
        currentStory: state.currentStory
    }
  }
const mapDispatchToProps = (dispatch) => {
    return {
        delete_character: currentId => {
            dispatch(delete_character(currentId))
        },
        delete_appearance: currentId => {
            dispatch(delete_appearance(currentId))
        },
        set_current_character: currentCharacter => {
            dispatch(set_current_character(currentCharacter))
        },
        update_scene: currentScene => {
            dispatch(update_scene(currentScene))
        },
        update_plot: currentPlot => {
            dispatch(update_plot(currentPlot))
        },
        update_story: currentStory => {
            dispatch(update_story(currentStory))
        }
    }
}

  export default connect(mapStateToProps, mapDispatchToProps)(CharacterCard)