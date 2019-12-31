import React from 'react'
import CharacterNoteCard from './CharacterNoteCard'
import ImageCard from './ImageCard'
import { connect } from 'react-redux'
import { set_current_character, delete_character } from '../redux/actions'
import { NavLink} from 'react-router-dom'
import { colors } from '../assets/colors'
import styled from 'styled-components'

const StyledCharacterCard = styled.li`
    list-style: none;
    white-space: pre-wrap;
    margin: 0 auto;
`

class CharacterCard extends React.Component{

     setCurrentCharacter = () => {
        this.props.set_current_character(this.props.character)
    }


     delete = async () => {
        this.props.delete_character(this.props.character.id)
        await fetch(`http://localhost:3000/characters/${this.props.character.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            }
        })
        console.log(this.props.character.id)
        console.log(this.props.character, "deleted!")
    } 

    render(){
        return <StyledCharacterCard>
            <h5>{this.props.character.name}</h5>
            <NavLink to="/characters/edit" style={{color: `${colors.black}`, textDecoration: "none"}} onClick={this.setCurrentCharacter}>✎   </NavLink>
            <NavLink to={`/stories/${this.props.character.story_id}`} onClick={this.delete} style={{color: `${colors.black}`, textDecoration: "none"}}>✕</NavLink><br></br>
            <p>{this.props.character.description}</p><br></br>
            <label>IMAGES</label><br></br>
            <NavLink to={`/images/new`} style={{marginTop: "20px", color: `${colors.black}`, textDecoration: "none", fontSize: "20px"}} onClick={this.setCurrentCharacter}>＋</NavLink>
            <ul style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                fontWeight: "100", 
                textAlign: "center",
                justifyContent: "space-around"
            }}>
                {!!this.props.character.images ? this.props.character.images.map(image => <ImageCard image={image} />) : ""}</ul>
                <label>NOTES:</label><br></br>
                <NavLink to={`/character_notes/new`} style={{marginTop: "20px", color: `${colors.black}`, textDecoration: "none", fontSize: "20px"}} onClick={this.setCurrentCharacter}>＋</NavLink>
            <ul>{!!this.props.character.character_notes ? this.props.character.character_notes.map(character_note => < CharacterNoteCard character_note={character_note}/>) : "You haven't added any notes to this character."}</ul>

        </StyledCharacterCard>
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        delete_character: currentId => {
            dispatch(delete_character(currentId))
        },
        set_current_character: currentCharacter => {
            dispatch(set_current_character(currentCharacter))
        }
    }
}

  export default connect(null, mapDispatchToProps)(CharacterCard)