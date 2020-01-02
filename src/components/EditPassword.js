import React from 'react'
import styled from 'styled-components'
import { StyledSubmit, StyledLabel, StyledTextInput, StyledHeader } from '../assets/StyledComponents'
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
              <StyledHeader style={{fontFamily: "Didot", color: `${colors.black}`}}>Change Password</StyledHeader>
         <br></br>  
        <StyledTextInput
          style={{width: "50%"}}
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