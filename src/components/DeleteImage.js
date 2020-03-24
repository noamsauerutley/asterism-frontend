import React from 'react'
import { connect } from 'react-redux'
import { StyledNavLink} from '../assets/StyledComponents'
import { delete_image, update_character } from '../redux/actions'

class DeleteImage extends React.Component {

    currentId = !!this.props.image.id ? this.props.image.id : 0

    delete = async () => {
        await fetch(`https://asterism-api.herokuapp.com/images/${this.currentId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            }
        })
        this.props.delete_image(this.currentId)
        this.props.update_character(this.props.currentCharacter)
        console.log(this.props.currentCharacter)
        console.log(this.props.image, "deleted!")
    } 

    render(){
        return(
            <StyledNavLink activeClassName="active" to={`/stories/${this.props.currentStory.id}`} onClick={this.delete} >✕</StyledNavLink>
        )}
}


const mapStateToProps = (state) => {
    return {
        currentStory: state.currentStory,
        currentCharacter: state.currentCharacter,
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        delete_image: currentId => {
            dispatch(delete_image(currentId))
        },
        update_character: (currentCharacter) => {
            dispatch(update_character(currentCharacter))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DeleteImage)

