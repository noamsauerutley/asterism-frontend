
import React from 'react'
import { connect } from 'react-redux'
import { set_username } from '../redux/actions'
import styled from 'styled-components'
import { colors } from '../assets/colors'


class EditUsername extends React.Component{

    state = {
        username: this.props.username
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
                <br></br>
                <input
                style={{
                    width: "150px",
                    borderColor: "Transparent"
                }}
                type="text"
                autoComplete="new-username"
                onChange={ this.onChange /* for controlled form input status */ } 
                name="username" 
                value={ this.state.username /* for controlled form input status */ } 
                />
                <br></br>
                <input 
                type="submit" 
                value="Change Username"
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