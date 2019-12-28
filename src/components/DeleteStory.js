import React from 'react'
import { connect } from 'react-redux'
import { NavLink} from 'react-router-dom'
import { delete_story } from '../redux/actions'

class DeleteStory extends React.Component{

    story = this.props.story
    currentId = this.story.id

    delete = async () => {
        this.props.delete_story(this.currentId)
        await fetch(`http://localhost:3000/stories/${this.story.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            }
        })
        console.log("deleted!")
    } 

    render(){
        return(
            <NavLink to='/stories' onClick={this.delete} style={{color: "black"}}>DELETE STORY</NavLink>
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

