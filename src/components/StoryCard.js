import React from 'react'
import { connect } from "react-redux"
import { set_current_story } from '../redux/actions' 
import { NavLink } from 'react-router-dom'

class StoryCard extends React.Component{

    currentStory = this.props.story

    handleOnClick = (event) => {
        console.log(this.currentSTory)
        this.props.set_current_story(this.currentStory);
      }

    render(){
        return(
            <div style={{boxShadow: "5px 5px #D3D3D3", border: "solid", borderWidth: "1px", borderLeftWidth: "3px", width: "250px", height: "350px", margin: "40px",  overflow: "hidden"}}>
            <NavLink to={`/stories/${this.props.story.id}`} style={{color: "black", textDecoration: "none"}} onClick={this.handleOnClick}>
                 <li style={{listStyle: "none"}}>
                    
                        <h2>{this.props.story.title}</h2>
                        <p>{this.props.story.summary}</p>
                </li>
             </NavLink>
            </div>

        )}
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_current_story: currentStory => {
            dispatch(set_current_story(currentStory))
        }
    }
}


export default connect(null, mapDispatchToProps)(StoryCard)