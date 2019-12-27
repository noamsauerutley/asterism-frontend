import React from 'react'

const CharacterNoteCard = (props) => {
   return <li style={{listStyle: "none"}}>{props.character_note.text}</li>
}

export default CharacterNoteCard