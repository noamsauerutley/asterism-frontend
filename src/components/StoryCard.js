import React from 'react'
import { connect } from "react-redux"
import { set_current_story } from '../redux/actions' 
import { StyledNavLink, StyledStoryCard, StyledStoryCardContent } from '../assets/StyledComponents'
import { colors } from '../assets/colors'

class StoryCard extends React.Component{

    currentStory = this.props.story

    handleOnClick = (event) => {
        this.props.set_current_story(this.currentStory);
      }

    render(){
        return(
            <StyledStoryCard>
                    <StyledNavLink activeClassName="active" to={`/stories/${this.props.story.id}`} onClick={this.handleOnClick}>                            
                        <h2 style={{color: `${colors.black}`}}>{this.props.story.title}</h2>
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