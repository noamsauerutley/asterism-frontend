import React from 'react'
import { connect } from 'react-redux'
import { StyledNavLink} from '../assets/StyledComponents'
import { delete_story } from '../redux/actions'

class DeleteStory extends React.Component{

    story = this.props.story
    currentId = this.story.id

    delete = async () => {
        this.props.delete_story(this.currentId)
        await fetch(`https://asterism-api.herokuapp.com/stories/${this.story.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            }
        })
        console.log(`story number ${this.currentId} deleted`)
    } 

    render(){
        return(
            <StyledNavLink activeClassName="active" to='/stories' onClick={this.delete}>✕</StyledNavLink>
    )}
}

  const mapDispatchToProps = (dispatch) => {
    return {
        delete_story: currentId => {
            dispatch(delete_story(currentId))
        }
    }
}

  export default connect(null, mapDispatchToProps)(DeleteStory)

