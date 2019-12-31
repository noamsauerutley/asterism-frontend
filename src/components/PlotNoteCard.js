import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {set_current_plot_note, set_current_plot} from '../redux/actions'  
import DeletePlotNote from './DeletePlotNote'
import styled from 'styled-components'
import { colors } from '../assets/colors'


class PlotNoteCard extends React.Component {

   setCurrentPlotNote = () => {
      this.props.set_current_plot_note(this.props.plot_note)
      this.props.set_current_plot(this.props.currentStory.plots.find(plot => plot.id === this.props.plot_note.plot_id))
  }
   render(){

      return <li style={{listStyle: "none"}} onClick={this.setCurrentPlotNote}>
         {this.props.plot_note.text}<br></br>
         <NavLink to="/plot_notes/edit" style={{color: "black", textDecoration: "none"}} >✎   </NavLink>
         < DeletePlotNote plot_note={this.props.plot_note}/><br></br>
         </li>
   }
}

const mapStateToProps = (state) => {
   return {
       currentStory: state.currentStory,
   }
 }

const mapDispatchToProps = (dispatch) => {
   return {
       set_current_plot: currentPlot => {
           dispatch(set_current_plot(currentPlot))
       },
       set_current_plot_note: currentPlotNote => {
           dispatch(set_current_plot_note(currentPlotNote))
       }
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlotNoteCard)