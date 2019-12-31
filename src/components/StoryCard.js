import React from 'react'
import { connect } from "react-redux"
import { set_current_story } from '../redux/actions' 
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from '../assets/colors'

const StyledStoryCard = styled.li`
list-style: none;
box-shadow: 5px 5px ${colors.lightGreen}; 
border: solid; 
border-width: 1px; 
border-left-width: 5px; 
border-color: ${colors.black}; 
width: 250px; 
height: 350px; 
margin: 40px; 
white-space: pre-wrap;
padding: 20px;
`
const StyledStoryCardContent = styled.div`
height: 242px;
overflow: hidden;
overflow-y: scroll;
`



class StoryCard extends React.Component{

    currentStory = this.props.story

    handleOnClick = (event) => {
        console.log(this.currentStory)
        this.props.set_current_story(this.currentStory);
      }

    render(){
        return(
            <StyledStoryCard>
                    <NavLink to={`/stories/${this.props.story.id}`} style={{color: "black", textDecoration: "none"}} onClick={this.handleOnClick}>                            
                                <h2>{this.props.story.title}</h2>
                                <StyledStoryCardContent>{this.props.story.summary}</StyledStoryCardContent>
                    </NavLink>
            </StyledStoryCard>

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