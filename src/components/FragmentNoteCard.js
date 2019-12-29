import React from 'react'
import DeleteFragmentNote from './DeleteFragmentNote'
import { set_current_fragment_note, set_current_fragment } from '../redux/actions'
import { connect } from 'react-redux'
import { NavLink} from 'react-router-dom'

class FragmentNoteCard extends React.Component{

    setCurrentFragmentNote = () => {
        this.props.set_current_fragment_note(this.props.fragment_note)
        this.props.set_current_fragment(this.props.fragment)
    }

    render(){
        return <li style={{listStyle: "none"}} onClick={this.setCurrentFragmentNote}>
            <p>{this.props.fragment_note.text}</p>
            <NavLink to="/fragment_notes/edit" style={{color: "black", textDecoration: "none"}} >✎</NavLink><br></br>
            < DeleteFragmentNote fragment_note={this.props.fragment_note} fragment={this.props.fragment}/>
    </li>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_current_fragment_note: currentFragmentNote => {
            dispatch(set_current_fragment_note(currentFragmentNote))
        },
        set_current_fragment: currentFragment => {
            dispatch(set_current_fragment(currentFragment))
        }
    }
}


  export default connect(null, mapDispatchToProps)(FragmentNoteCard)