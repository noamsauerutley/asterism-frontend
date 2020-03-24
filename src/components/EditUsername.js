import React from 'react'
import { connect } from 'react-redux'
import { set_username } from '../redux/actions'
import { StyledSubmit, StyledLabel, StyledTextInput, StyledHeader} from '../assets/StyledComponents'

class EditUsername extends React.Component{

    state = {
        username: this.props.username
    }

    editUsername = async (newUsername) => {
        let rawData = await fetch(`https://asterism-api.herokuapp.com/authors/${localStorage.user_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            },
            body: JSON.stringify({author:{
              username: newUsername}
            })
        })
        let data = await rawData.json()
        this.props.set_username(data)
        console.log(data)
        alert("Your username has been updated.")
    }

    onChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      handleChangeUsername = event => {
        event.preventDefault()
        this.editUsername(this.state.username)
    }
  
    render(){
        return(
            <div>
                <form onSubmit={this.handleChangeUsername}>
                <StyledHeader >Change Username</StyledHeader>
                <br></br>
                <StyledTextInput
                    style={{width: "50%"}}
                    type="text"
                    autoComplete="new-username"
                    onChange={ this.onChange /* for controlled form input status */ } 
                    name="username" 
                    value={ this.state.username /* for controlled form input status */ } 
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
    username: state.username
}}


  const mapDispatchToProps = (dispatch) => {
    return {
        set_username: (username) => {
            dispatch(set_username(username))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUsername)