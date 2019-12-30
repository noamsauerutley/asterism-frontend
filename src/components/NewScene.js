import React from 'react'
import { connect } from 'react-redux'
import { set_scene, set_current_scene, update_plot } from '../redux/actions'
import { Redirect } from 'react-router-dom'

class NewScene extends React.Component{
  
  state = {
    name: "",
    summary: "",
    redirectBoolean: false,
    errors: []
}

newSceneSubmitted = async (event) => {
    event.preventDefault()
    let rawScene = await fetch (`http://localhost:3000/scenes`, 
      {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.token
          },
          body: JSON.stringify({scene: {
              plot_id: this.props.currentPlot.id,
              name: this.state.name,
              summary: this.state.summary
          }})
        })
    let scene = await rawScene.json()
    
    if (scene.errors) {
      this.setState({
        errors: scene.errors
      })
    } else {
    this.props.set_scene(scene)
    this.props.set_current_scene(scene)
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
      return <form onSubmit={ this.newSceneSubmitted }>
      <br></br>
      <label  htmlFor="new_scene_name">NAME</label>
      <br></br>
      <input 
          style={{width: "80%"}} 
          id="new_scene_name" 
          type="text" 
          onChange={ this.onChange /* for controlled form input status */ } 
          name="name" 
          value={ this.state.name /* for controlled form input status */ } />
          <br></br>
          <br></br>
      <label  htmlFor="new_scene_summary">SUMMARY</label>
      <br></br>
      <textarea  
          style={{width: "80%", height: "300px"}}
          id="new_scene_summary" 
          onChange={ this.onChange } 
          name="summary" 
          value={ this.state.summary } />
          <br></br><br></br>
      <input type="submit" />
  </form>
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
        currentScene: state.currentScene,
        currentPlot: state.currentPlot,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      update_plot: (plot) => {
          dispatch(update_plot(plot))
      },
      set_scene: (scene) => {
          dispatch(set_scene(scene))
      },
      set_current_scene: currentScene => {
        dispatch(set_current_scene(currentScene))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewScene)