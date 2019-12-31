import React from 'react'
import styled from 'styled-components'
import { colors } from '../assets/colors'


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
         <br></br>  
        <input
          style={{
            width: "150px",
            borderColor: "Transparent"
        }}
          type="password"
          value={this.state.password}
          onChange={this.onChange}
          name="password"
          autoComplete="new-password"
        />
        <br></br>
        <input 
        type="submit"  
        value="Change Password"
        style={{
          background: "Transparent",
          borderColor: "Transparent",
          width: "150px",
          fontFamily: "Didot",
          fontSize: "16px",
          margin: "8px"
      }}/>
      </form>
        )
    }
}

export default EditPassword