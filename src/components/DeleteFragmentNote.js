import React from 'react'
import { connect } from 'react-redux'
import { NavLink} from 'react-router-dom'
import { delete_fragment_note, update_fragment } from '../redux/actions'

class DeleteFragmentNote extends React.Component{

    currentId = this.props.fragment_note.id

    delete = async () => {
        await fetch(`http://localhost:3000/fragment_notes/${this.currentId}`, {
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
            <NavLink to='/fragments' onClick={this.delete} style={{color: "black"}}>DELETE</NavLink>
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

