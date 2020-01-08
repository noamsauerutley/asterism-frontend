import React from 'react'
import { connect } from 'react-redux'
import { StyledNavLink} from '../assets/StyledComponents'
import { delete_fragment_note, update_fragment } from '../redux/actions'
import { colors } from '../assets/colors'

class DeleteFragmentNote extends React.Component{

    currentId = this.props.fragment_note.id

    delete = async () => {
        await fetch(`https://asterism-api.herokuapp.com/fragment_notes/${this.currentId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            }
        })
        this.props.delete_fragment_note(this.currentId)
        this.props.update_fragment(this.props.currentFragment)
        console.log(this.props.fragment_note, "deleted!")
    } 

    render(){
        return(
            <StyledNavLink activeClassName="active" to='/fragments' onClick={this.delete}>✕</StyledNavLink>
        )}
}

const mapStateToProps = (state) => {
    return {
      currentFragment: state.currentFragment
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        delete_fragment_note: currentId => {
            dispatch(delete_fragment_note(currentId))
        },
        update_fragment: (currentFragment) => {
            dispatch(update_fragment(currentFragment))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DeleteFragmentNote)

