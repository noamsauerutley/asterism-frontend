  
import React from 'react';
import styled from 'styled-components'
import { colors } from '../assets/colors'

const StyledDeleteAuthor = styled.button`
    margin-top: 10px;
    background: Transparent;
    border: Transparent;
    font-family: Didot;
    font-size: 18px;
    color: black;
`

class DeleteAuthor extends React.Component{

    delete = async () => {
        await fetch(`http://localhost:3000/authors/${localStorage.user_id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            }
        })
    } 

    render(){
        return(
            <StyledDeleteAuthor aria-label="Delete Account" onClick={this.delete}>Delete</StyledDeleteAuthor>
        )
    }
}

export default DeleteAuthor