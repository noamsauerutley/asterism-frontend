import React from 'react'
import { connect } from "react-redux"
import { delete_fragment } from '../redux/actions'

class DeleteFragment extends React.Component {

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

    render(){
        return(
            <button onClick={this.delete}>DELETE</button>
    )}
}
const mapDispatchToProps = (dispatch) => {
    return {
        delete_fragment: currentId => {
            dispatch(delete_fragment(currentId))
        }
    }
}


export default connect(null, mapDispatchToProps)(DeleteFragment)