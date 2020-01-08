import React from 'react'
import { connect } from 'react-redux'
import { set_plot_note, set_current_plot_note, update_plot } from '../redux/actions'
import { Redirect } from 'react-router-dom'
import { StyledTextArea, StyledSubmit, StyledLabel, StyledHeader } from '../assets/StyledComponents'

import styled from 'styled-components'
import { colors } from '../assets/colors'


class NewPlotNote extends React.Component{
  
  state = {
    text: "",
    redirectBoolean: false,
    errors: []
}

newPlotNoteSubmitted = async (event) => {
    event.preventDefault()
    let rawPlotNote = await fetch (`https://asterism-api.herokuapp.com/plot_notes`, 
      {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.token
          },
          body: JSON.stringify({plot_note: {
              plot_id: this.props.currentPlot.id,
              text: this.state.text
          }})
        })
    let plotNote = await rawPlotNote.json()
    
    if (plotNote.errors) {
      this.setState({
        errors: plotNote.errors
      })
    } else {
    this.props.set_plot_note(plotNote)
    this.props.set_current_plot_note(plotNote)
    this.props.update_plot(this.props.currentPlot)
    this.setState({
      redirectBoolean: true
    })
      }
}

onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  conditionalRender = () => {
    if(this.state.redirectBoolean===false){
      return <form onSubmit={ this.newPlotNoteSubmitted }>
        <StyledHeader>New Plot Note:</StyledHeader>
          <br></br>
      <StyledLabel  htmlFor="new_plot_note">Text</StyledLabel>
      <br></br>
      <StyledTextArea  
          style={{width: "80%", height: "300px"}}
          id="new_plot_note" 
          onChange={ this.onChange } 
          name="text" 
          value={ this.state.text } />
          <br></br><br></br>
          <StyledSubmit 
                    type="submit" 
                    value="✓"
                    />  </form>
    } else{
      return < Redirect to={`/stories/${this.props.currentStory.id}`} />
    }
  }
    
    render(){
      return(
        <div style={{textAlign: "center"}}>
        {this.conditionalRender()}
        </div>
      )
    }
}
const mapStateToProps = (state) => {
  return {
        currentStory: state.currentStory,
        currentPlotNote: state.currentPlotNote,
        currentPlot: state.currentPlot,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      update_plot: (plot) => {
          dispatch(update_plot(plot))
      },
      set_plot_note: (plotNote) => {
          dispatch(set_plot_note(plotNote))
      },
      set_current_plot_note: currentPlotNote => {
        dispatch(set_current_plot_note(currentPlotNote))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPlotNote)