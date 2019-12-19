import React from 'react'
import { NavLink} from 'react-router-dom'
import { connect } from "react-redux"
import { set_current_fragment } from '../redux/actions' 
import { delete_fragment } from '../redux/actions'

class FragmentCard extends React.Component {
    state = {
        updated: false
    }

    currentFragment = this.props.fragment
    currentId = this.currentFragment.id


    delete = async () => {
        this.props.delete_fragment(this.currentFragment.id)
        await fetch(`http://localhost:3000/fragments/${this.currentFragment.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            }
        })
        console.log("deleted!")
    } 

    handleOnClick = (event) => {
        console.log(this.currentFragment)
        this.setState({
            updated: true
        })
        this.props.set_current_fragment(this.currentFragment);
      }

    render(){
        return(
        <li style={{listStyle: "none"}}>
            <NavLink to={`/fragments/edit`} style={{color: "black", textDecoration: "none"}} onClick={this.handleOnClick}> ✎ </NavLink>
            <h3>{this.props.fragment.title}</h3>
            <p>{this.props.fragment.text}</p>
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