import React from 'react'
import { connect } from "react-redux"
import { delete_fragment } from '../redux/actions'
import { StyledButton } from '../assets/StyledComponents'
import styled from 'styled-components'
import { colors } from '../assets/colors'

class DeleteFragment extends React.Component {

    delete = async () => {
        this.props.delete_fragment(this.props.fragment.id)
        await fetch(`https://asterism-api.herokuapp.com/fragments/${this.props.fragment.id}`, {
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
            <StyledButton onClick={this.delete}>✕</StyledButton>
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