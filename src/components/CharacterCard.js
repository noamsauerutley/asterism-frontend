import React from 'react'
import CharacterNoteCard from './CharacterNoteCard'
import ImageCard from './ImageCard'
import { connect } from 'react-redux'
import { set_current_character, delete_character } from '../redux/actions'
import { NavLink} from 'react-router-dom'

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
        return <li style={{listStyle: "none"}}>
            <NavLink to="/characters/edit" style={{color: "black", textDecoration: "none"}} onClick={this.setCurrentCharacter}>✎</NavLink><br></br>
            <NavLink to={`/stories/${this.props.character.story_id}`} onClick={this.delete} style={{color: "black"}}>DELETE</NavLink><br></br>
            <h5>{this.props.character.name}</h5>
            <p>{this.props.character.description}</p><br></br>
            <label>GALLERY</label><br></br>
            <NavLink to={`/images/new`} style={{marginTop: "20px", color: "black", textDecorationColor: "black"}} onClick={this.setCurrentCharacter}>ADD IMAGE</NavLink>
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
                <NavLink to={`/character_notes/new`} style={{marginTop: "20px", color: "black", textDecorationColor: "black"}} onClick={this.setCurrentCharacter}>ADD NOTE</NavLink>
            <ul>{!!this.props.character.character_notes ? this.props.character.character_notes.map(character_note => < CharacterNoteCard character_note={character_note}/>) : "You haven't added any notes to this character."}</ul>

        </li>
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