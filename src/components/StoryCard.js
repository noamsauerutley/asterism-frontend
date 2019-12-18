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
            <NavLink to={`/stories/${this.props.story.id}`} style={{color: "#343a40", textDecorationColor: "#929ca7"}} onClick={this.handleOnClick}>
                 <li style={{listStyle: "none"}}>
                 <h2>{this.props.story.title}</h2>
             <p>{this.props.story.summary}</p>
            </li>
             </NavLink>
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