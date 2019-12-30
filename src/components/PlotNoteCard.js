import React from 'react'

class PlotNoteCard extends React.Component {
   render(){

      return <li style={{listStyle: "none"}}>{this.props.plot_note.text}</li>
   }
}

export default PlotNoteCard