import React from 'react'
import styled from 'styled-components'
import { StyledSubmit } from '../assets/StyledComponents'
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
              <label style={{fontFamily: "Didot", color: `${colors.black}`}}>Change Password</label>
         <br></br>  
        <input
          style={{
            width: "150px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "lightGrey",
            fontFamily: "Didot",
            color: `${colors.black}`,
            textAlign: "center"
        }}
          type="password"
          value={this.state.password}
          onChange={this.onChange}
          name="password"
          autoComplete="new-password"
        />
        <br></br>
        <StyledSubmit 
        type="submit"  
        value="✓"
        />
      </form>
        )
    }
}

export default EditPassword