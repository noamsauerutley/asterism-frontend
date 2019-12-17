import React from 'react'

class EditPassword extends React.Component{

    state = {
        password: "",
        }
    

    editPassword = async (newPassword) => {
        await fetch(`http://localhost:3000/users/${localStorage.user_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            },
            body: JSON.stringify({user:{
            password: newPassword}
            })
            })
            this.setState({
                password: ""
            })
            alert("Your password has been updated.")
    }

    onChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

    handleChangePassword = event => {
        event.preventDefault()
        this.editPassword(this.state.password)
    }
    render(){
        return(
            <form onSubmit={this.handleChangePassword}>
         <label style={{margin: "20px"}}>Password:</label>    
         <br></br>  
        <input
          type="password"
          value={this.state.password}
          onChange={this.onChange}
          name="password"
          autoComplete="new-password"
        />
        <br></br>
        <input type="submit"  />
      </form>
        )
    }
}

export default EditPassword