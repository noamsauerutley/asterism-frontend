import React from 'react'
import { connect } from 'react-redux'
import { StyledNavLink, StyledNoteCard, StyledLabel, StyledUl } from '../assets/StyledComponents'
import {set_current_scene, set_current_plot } from '../redux/actions'  
import DeleteScene from './DeleteScene'
import DeleteAppearance from './DeleteAppearance'

class SceneCard extends React.Component{

    setCurrentScene = () => {
       this.props.set_current_scene(this.props.scene)
       this.props.set_current_plot(this.props.currentStory.plots.find(plot => plot.id === this.props.scene.plot_id))
   }
    render(){
        return(
            <StyledNoteCard onClick={this.setCurrentScene}>
                <h5>{this.props.scene.name}</h5>
                <StyledNavLink activeClassName="active" to="/scenes/edit" >✎   </StyledNavLink>
                < DeleteScene scene={this.props.scene}/>
                <p>{this.props.scene.summary}</p>
                <StyledLabel>Appearances</StyledLabel><br></br>
                <StyledNavLink activeClassName="active" to={`/appearances/new`} style={{marginTop: "20px", fontSize: "20px"}} >＋</StyledNavLink><br></br>
                {(!!this.props.scene.characters && !!this.props.scene.characters.length) ? <StyledUl>{this.props.scene.characters.map(character => 
                    <li style={{listStyle: "none"}}>
                        {character.name}
                        < DeleteAppearance character_id={character.id} scene_id={this.props.scene.id}/>
                        </li>)}
                </StyledUl> : "None"}
            </StyledNoteCard>
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