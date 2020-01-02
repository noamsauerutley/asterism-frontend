import React from 'react'
import CharacterNoteCard from './CharacterNoteCard'
import ImageCard from './ImageCard'
import { connect } from 'react-redux'
import { set_current_character, delete_character, delete_appearance, update_story, update_plot, update_scene } from '../redux/actions'
import { StyledNavLink, StyledLabel, StyledUl} from '../assets/StyledComponents'
import { colors } from '../assets/colors'
import styled from 'styled-components'

const StyledCharacterCard = styled.li`
    list-style: none;
    white-space: pre-wrap;
    margin: 0 auto;
    color: ${colors.black};
    text-decoration: none;
`

class CharacterCard extends React.Component{

     setCurrentCharacter = () => {
        this.props.set_current_character(this.props.character)
    }


     delete = async () => {
         await fetch(`http://localhost:3000/characters/${this.props.character.id}`, {
             method: 'DELETE',
             headers: {
                 "Content-Type": "application/json",
                 "Authorization": localStorage.token
                }
            })
            this.props.delete_character(this.props.character.id)
            console.log(this.props.appearances.find(appearance => appearance.character_id === this.props.character.id))
            this.props.delete_appearance(this.props.appearances.find(appearance => appearance.character_id === this.props.character.id))
            // // this.props.currentStory.plots.map(plot => plot.scenes.map(scene => scene.characters.map(character => console.log(this.props.appearances.find(appearance => appearance.character_id === character.id).id))))
            // // this.props.currentStory.plots.map(plot => plot.scenes.map(scene => scene.characters.map(character => this.props.delete_appearance(this.props.appearances.find(appearance => appearance.character_id === character.id)))))
            // this.props.currentStory.plots.map(plot => this.props.update_scene(plot.scenes.find(scene => scene.id === this.props.currentScene.id)))
            // // this.props.currentStory.plots.map(plot => this.props.update_plot(plot))
            // this.props.update_story(this.props.currentStory)
            // this.props.currentPlot.scenes.map(scene => scene.characters.map(character => this.props.delete_appearance(this.props.appearances.find(appearance => appearance.character_id === character.id))))
            // this.props.currentPlot.scenes.map(scene => this.props.update_scene(scene))
            // this.props.update_plot(this.props.currentPlot)
            this.props.update_scene(this.props.currentScene)
            this.props.update_plot(this.props.currentPlot) 
            this.props.update_story(this.props.currentStory)
        console.log(this.props.character.id)
        console.log(this.props.character, "deleted!")
    } 

    render(){
        return <StyledCharacterCard onClick={this.setCurrentCharacter}>
            <h5>{this.props.character.name}</h5>
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