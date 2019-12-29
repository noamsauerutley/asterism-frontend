import React from 'react'
import { NavLink} from 'react-router-dom'
import { connect } from "react-redux"
import { set_current_fragment } from '../redux/actions' 
import { delete_fragment } from '../redux/actions'
import FragmentNoteCard from './FragmentNoteCard'

class FragmentCard extends React.Component {

    delete = async () => {
        this.props.delete_fragment(this.props.fragment.id)
        await fetch(`http://localhost:3000/fragments/${this.props.fragment.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            }
        })
        console.log("deleted!")
    } 

    handleOnClick = (event) => {
        console.log(this.props.fragment)
        this.setState({
            updated: true
        })
        this.props.set_current_fragment(this.props.fragment);
      }

    render(){
        return(
        <li style={{listStyle: "none"}}>
            <NavLink to={`/fragments/edit`} style={{color: "black", textDecoration: "none"}} onClick={this.handleOnClick}> ✎ </NavLink>
            <h3>{this.props.fragment.title}</h3>
            <p>{this.props.fragment.text}</p>
            <NavLink to={`/fragment_notes/new`} style={{marginTop: "20px", color: "black", textDecorationColor: "black"}} onClick={this.handleOnClick}>ADD NOTE</NavLink>
            <ul>{!!this.props.fragment.fragment_notes ? this.props.fragment.fragment_notes.map(fragment_note => < FragmentNoteCard fragment_note={fragment_note} fragment={this.props.fragment}/>) : "You haven't added any notes to this fragment."}</ul>
            <button onClick={this.delete}>DELETE</button>

        </li>
    )}
}
const mapDispatchToProps = (dispatch) => {
    return {
        set_current_fragment: currentFragment => {
            dispatch(set_current_fragment(currentFragment))
        },
        delete_fragment: currentId => {
            dispatch(delete_fragment(currentId))
        }
    }
}


export default connect(null, mapDispatchToProps)(FragmentCard)