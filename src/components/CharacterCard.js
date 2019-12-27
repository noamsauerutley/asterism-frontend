import React from 'react'
import CharacterNoteCard from './CharacterNoteCard'
import { connect } from 'react-redux'
import { delete_character } from '../redux/actions'
import { NavLink} from 'react-router-dom'

class CharacterCard extends React.Component{
     character = this.props.character
     currentId = this.character.id


     delete = async () => {
        this.props.delete_character(this.currentId)
        await fetch(`http://localhost:3000/characters/${this.currentId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            }
        })
        console.log(this.currentId)
        console.log(this.character, "deleted!")
    } 

    render(){
        return <li style={{listStyle: "none"}}>
            <h5>{this.character.name}</h5>
            <ul style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                fontWeight: "100", 
                textAlign: "center",
                justifyContent: "space-around"
            }}>
                {!!this.character.images ? this.character.images.map(image => <li style={{listStyle: "none"}}><img src={image.image_url} alt={`${this.character.name} image`} /></li>) : ""}</ul>
                <p>{this.character.description}</p>
                <label>NOTES:</label>
            <ul>{!!this.character.character_notes ? this.character.character_notes.map(character_note => < CharacterNoteCard character_note={character_note}/>) : "You haven't added any notes to this character."}</ul>
            <NavLink to={`/stories/${this.character.story_id}`} onClick={this.delete} style={{color: "black"}}>DELETE</NavLink>

        </li>
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        delete_character: currentId => {
            dispatch(delete_character(currentId))
        }
    }
}

  export default connect(null, mapDispatchToProps)(CharacterCard)