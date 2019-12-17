  
import React from 'react';

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
            <button  onClick={this.delete}>Delete</button>
        )
    }
}

export default DeleteAuthor