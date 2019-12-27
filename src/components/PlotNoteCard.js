import React from 'react'

const PlotNoteCard = (props) => {
   return <li style={{listStyle: "none"}}>{props.plot_note.text}</li>
}

export default PlotNoteCard