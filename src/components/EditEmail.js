
import React from 'react'
import { connect } from 'react-redux'
import { update_email } from '../redux/actions'

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
                <br></br>
                <input
                style={{
                    width: "150px",
                    borderColor: "Transparent"
                }}
                type="text"
                autoComplete="new-email"
                onChange={ this.onChange /* for controlled form input status */ } 
                name="email" 
                value={ this.state.email /* for controlled form input status */ } 
                />
                <br></br>
                <input 
                type="submit" 
                value="Change Email"
                style={{
                    background: "Transparent",
                    borderColor: "Transparent",
                    width: "150px",
                    fontFamily: "Didot",
                    fontSize: "16px",
                    margin: "8px"
                }}
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