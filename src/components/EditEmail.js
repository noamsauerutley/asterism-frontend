
import React from 'react'
import { connect } from 'react-redux'
import { update_email } from '../redux/actions'
import { StyledSubmit, StyledLabel, StyledTextInput } from '../assets/StyledComponents'
import styled from 'styled-components'
import { colors } from '../assets/colors'


class EditEmail extends React.Component{

    state = {
        email: this.props.email
    }

    editEmail = async (newEmail) => {
        let rawData = await fetch(`http://localhost:3000/authors/${localStorage.user_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            },
            body: JSON.stringify({author:{
              email: newEmail}
            })
        })
        let data = await rawData.json()
        this.props.update_email(data)
        alert("Your email has been updated.")
    }

    onChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      handleChangeEmail = event => {
        event.preventDefault()
        this.editEmail(this.state.email)
    }
  
    render(){
        return(
            <div>
                <form onSubmit={this.handleChangeEmail}>
                <StyledLabel style={{fontFamily: "Didot", color: `${colors.black}`}}>Change Email</StyledLabel>
                <br></br>
                <StyledTextInput
                style={{width: "50%"}}
                type="text"
                autoComplete="new-email"
                onChange={ this.onChange /* for controlled form input status */ } 
                name="email" 
                value={ this.state.email /* for controlled form input status */ } 
                />
                <br></br>
                <StyledSubmit 
                type="submit" 
                value="✓"
                />
            </form> 
          </div> 
        )
    }
}

    const mapStateToProps = (state) => {
        return{
        email: state.email
    }}


  const mapDispatchToProps = (dispatch) => {
    return {
        update_email: (email) => {
            dispatch(update_email(email))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEmail)