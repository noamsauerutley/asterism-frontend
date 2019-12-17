
import React from 'react'
import { connect } from 'react-redux'
import { set_username } from '../redux/actions'

class EditUsername extends React.Component{

    state = {
        username: ""
    }

    editUsername = async (newUsername) => {
        let rawData = await fetch(`http://localhost:3000/authors/${localStorage.user_id}`, {
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
                <label style={{margin: "20px"}}>Edit Username:</label>
                <br></br>
                <input
                type="text"
                autoComplete="new-username"
                onChange={ this.onChange /* for controlled form input status */ } 
                name="username" 
                value={ this.props.username /* for controlled form input status */ } 
                />
                <br></br>
                <input type="submit" />
            </form> 
          </div> 
        )
    }
}


  const mapDispatchToProps = (dispatch) => {
    return {
        set_username: (username) => {
            dispatch(set_username(username))
        }
    }
}

export default connect(null, mapDispatchToProps)(EditUsername)