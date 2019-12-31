import React from 'react'
import { connect } from "react-redux"
import { delete_fragment } from '../redux/actions'
import styled from 'styled-components'
import { colors } from '../assets/colors'

const StyledDeleteFragmentButton = styled.button`
    background: Transparent;
    border: Transparent
`

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
            <StyledDeleteFragmentButton onClick={this.delete}>✕</StyledDeleteFragmentButton>
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