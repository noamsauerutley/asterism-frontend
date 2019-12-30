import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {set_current_scene, set_current_plot } from '../redux/actions'  
import DeleteScene from './DeleteScene'

class SceneCard extends React.Component{

    setCurrentScene = () => {
       this.props.set_current_scene(this.props.scene)
       this.props.set_current_plot(this.props.currentStory.plots.find(plot => plot.id === this.props.scene.plot_id))
   }
    render(){
        return(
            <li style={{listStyle: "none"}} onClick={this.setCurrentScene}>
                <h5>{this.props.scene.name}</h5>
                <p>{this.props.scene.summary}</p>
                <NavLink to="/scenes/edit" style={{color: "black", textDecoration: "none"}} >✎   </NavLink>
                < DeleteScene scene={this.props.scene}/>
            </li>
        )
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
        set_current_scene: currentScene => {
            dispatch(set_current_scene(currentScene))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SceneCard)