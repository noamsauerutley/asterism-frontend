  
import React from 'react';
import { StyledButton } from '../assets/StyledComponents'

class DeleteAuthor extends React.Component{

    delete = async () => {
        await fetch(`https://asterism-api.herokuapp.com/authors/${localStorage.user_id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            }
        })
    } 

    render(){
        return(
            <StyledButton aria-label="Delete Account" onClick={this.delete} style={{ marginTop: "10px", fontSize: "18px"}}>Delete Account</StyledButton>
        )
    }
}

export default DeleteAuthor