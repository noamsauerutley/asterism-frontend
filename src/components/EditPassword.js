import React from 'react'

class EditPassword extends React.Component{

    state = {
        password: "",
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