import React from 'react'
import { connect } from "react-redux"
import { set_current_story } from '../redux/actions' 
import { StyledNavLink } from '../assets/StyledComponents'
import styled from 'styled-components'
import { colors } from '../assets/colors'

const StyledStoryCard = styled.li`
list-style: none;
color: ${colors.black}; 
box-shadow: 5px 5px ${colors.lightGreen}; 
border: solid; 
border-width: 1px; 
border-left-width: 3px; 
border-color: ${colors.black}; 
width: 250px; 
height: 350px; 
margin: 40px; 
white-space: pre-wrap;
padding: 20px;
transition: height .75s, width .75s;

&:hover{
    width: 275px;
    height: 375px;
}


`
const StyledStoryCardContent = styled.div`
color: ${colors.black}; 
height: 242px;
width: 250px;
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
                    <StyledNavLink activeClassName="active" to={`/stories/${this.props.story.id}`} onClick={this.handleOnClick}>                            
                        <h2>{this.props.story.title}</h2>
                        <StyledStoryCardContent>{this.props.story.summary}</StyledStoryCardContent>
                    </StyledNavLink>
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