import React from 'react'
import { connect } from 'react-redux'
import { update_plot, set_current_plot } from '../redux/actions'
import { Redirect } from 'react-router-dom'
import { StyledTextArea, StyledSubmit, StyledLabel, StyledTextInput, StyledHeader } from '../assets/StyledComponents'

class EditPlot extends React.Component{
  
  currentPlot = this.props.currentStory.plots.find( plot => plot.id === this.props.currentPlot.id)

  state = {
    name: this.currentPlot.name,
    summary: this.currentPlot.summary,
    redirectBoolean: false,
    errors: []
}

editPlotSubmitted = async (event) => {
    event.preventDefault()
    let rawEditedPlot = await fetch (`https://asterism-api.herokuapp.com/plots/${this.props.currentPlot.id}`, 
      {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.token
          },
          body: JSON.stringify({plot: {
              story_id: this.props.currentStory.id,
              name: this.state.name,
              summary: this.state.summary
          }})
        })
    let editedPlot = await rawEditedPlot.json()
    
    if (editedPlot.errors) {
      this.setState({
        errors: editedPlot.errors
      })
    } else {
      console.log(this.props.currentStory.plots.filter(plot => plot.id !== editedPlot.id))
      console.log(this.currentPlot)
      console.log(editedPlot)
    this.props.update_plot(editedPlot)
    this.props.set_current_plot(editedPlot)
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
      return <form onSubmit={ this.editPlotSubmitted }>
        <StyledHeader>Edit Plot Arc:</StyledHeader>
      <br></br>
      <StyledLabel  htmlFor="edit_plot_name">Name</StyledLabel>
      <br></br>
      <StyledTextInput
          id="edit_plot_name" 
          type="text" 
          onChange={ this.onChange /* for controlled form input status */ } 
          name="name" 
          value={ this.state.name /* for controlled form input status */ } />
          <br></br>
          <br></br>
      <StyledLabel  htmlFor="edit_plot_summary">Summary</StyledLabel>
      <br></br>
      <StyledTextArea  
          style={{width: "80%", height: "300px"}}
          id="edit_plot_summary" 
          onChange={ this.onChange } 
          name="summary" 
          value={ this.state.summary } />
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
        currentPlot: state.currentPlot
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      update_plot: (plot) => {
          dispatch(update_plot(plot))
      },
      set_current_plot: currentPlot => {
        dispatch(set_current_plot(currentPlot))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPlot)