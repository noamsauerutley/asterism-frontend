import React from 'react';
import { connect } from 'react-redux'
// import { setToken } from '../redux/actions'
// import { setUser } from '../redux/actions'
import { login } from '../redux/actions'

class LogIn extends React.Component {
    
  state = {
    logIn: true,
    username: "",
    password: "",
    errors: []
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  logInSubmitted = async (event) => {
    event.preventDefault()
    let rawData = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    let data = await rawData.json()
        if (data.errors) {
            this.setState({
              errors: data.errors
            })
          } else {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", this.state.username)
        this.props.login(data)
          }
      }

  signUpSubmitted = async (event) => {
    event.preventDefault() 
    let rawData = await fetch("http://localhost:3000/authors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({user:
        {username: this.state.username,
        password: this.state.password}
      })
    })
    let data = await rawData.json()
    if (data.errors) {
        alert(data.errors)
      } else {
    localStorage.setItem("token", data.token)
    localStorage.setItem("user", this.state.username)
    this.props.login(data)
      }

        if (data.errors) {
          this.setState({
            errors: data.errors
          })
        } else {
            localStorage.setItem("token", data.token)
            localStorage.setItem("user", this.state.username)
            this.props.login(data)
        }
  }


  render(){
    return <div style={{textAlign: "Center", marginTop:"10%"}}>
      <ul>
        {
          this.state.errors.map(error => <li style={{listStyle: "none"}}>{ error }</li>)
        }
      </ul>
      {
        this.state.logIn 
        ? 
        <section>
          <h2 >Log In</h2>
          <button onClick={ () => this.setState({ logIn: false }) }>Switch to Sign Up</button>
          <br></br>
          <form onSubmit={ this.logInSubmitted }>
            <br></br>
            <label  htmlFor="log_in_username">Username</label>
            <br></br>
            <input  id="log_in_username" 
                    type="text" 
                    onChange={ this.onChange /* for controlled form input status */ } 
                    name="username" 
                    value={ this.state.username /* for controlled form input status */ } />
                    <br></br>
                    <br></br>
            <label  htmlFor="log_in_password">Password</label>
            <br></br>
            <input  id="log_in_password" 
                    type="password" 
                    onChange={ this.onChange } 
                    name="password" 
                    value={ this.state.password } />
                    <br></br><br></br>
            <input type="submit" />
          </form>
        </section>
        :
        <section>
          <h2>Sign Up</h2>
          <button onClick={ () => this.setState({ logIn: true }) }>Switch to Log In</button>
          <br></br>
          <form onSubmit={ this.signUpSubmitted }>
          <br></br>
            <label  htmlFor="sign_up_username">Username</label>
            <br></br>
            <input  id="sign_up_username" 
                    type="text" 
                    onChange={ this.onChange } 
                    name="username" 
                    value={ this.state.username } />
                    <br></br><br></br>
            <label  htmlFor="sign_up_password">Password</label>
            <br></br>
            <input  id="sign_up_password" 
                    type="password" 
                    onChange={ this.onChange } 
                    name="password" 
                    value={ this.state.password } />
                    <br></br><br></br>
            <input type="submit" />
          </form>
        </section>
      }
    </div>
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // setToken: (token) => {
        //     dispatch(setToken(token))
        // setUser: (user) => {
        //     dispatch(setUser(user))
        // }
        // }
        login: ({token, user}) => {
            dispatch(login({token, user}))
        }
    }
}


export default connect(null, mapDispatchToProps)(LogIn)