import React from 'react';
import { connect } from 'react-redux'
import { login } from '../redux/actions'
import { set_content, set_account_data } from '../redux/actions'
import { StyledButton, StyledInput, StyledLabel, StyledTextInput } from '../assets/StyledComponents'

class LogIn extends React.Component {

  constructor(props){
    super(props)
    this.widget = null
}
    
  state = {
    logIn: false,
    username: "",
    password: "",
    email: "",
    image_url: "",
    bio: "",
    errors: []
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  showWidget = (widget) => {
    widget.open()
  }
  
  getUserData = async () => {
    let rawData = await fetch(`https://asterism-api.herokuapp.com/authors/${localStorage.user_id}`, {
      method: "GET",
      headers: {
        "Authorization": localStorage.token,
        "Content-Type": "application/json"
      }})
    let data = await rawData.json()
    this.props.set_account_data(data)
    this.props.set_content(data)
    console.log(data)
  }
  
  logInSubmitted = async (event) => {
    event.preventDefault()
    let rawData = await fetch("https://asterism-api.herokuapp.com/login", {
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
      localStorage.setItem("user_id", data.user_id)
      this.props.login(data)
      this.getUserData()
    }
  }
  
  signUpSubmitted = async (event) => {
    event.preventDefault() 
    
    let rawData = await fetch("https://asterism-api.herokuapp.com/authors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({author:
        {username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          image_url: this.state.image_url,
          bio: this.state.bio
        }
      })
    })
    let data = await rawData.json()
    if (data.errors) {
      alert(data.errors)
    } else {
      localStorage.setItem("token", data.token)
      localStorage.setItem("user_id", data.user_id)
      this.props.login(data)
      this.getUserData()
    }
  }
  
  
  imageUpload = () => {
    if(!this.widget){
        this.widget = window.cloudinary.createUploadWidget({
            cloudName: "noamesu",
            uploadPreset: "storyboard",
            sources: ['local', 'url']
        }, (error, result) => {
            if(result.event ==="success"){
                this.setState({
                    image_url: result.info.secure_url
                })
                console.log(this.state)
            }   
        }) 
    }
  }

render(){
  
  
    return <div style={{textAlign: "Center", marginTop:"10%"}}>

      {this.imageUpload()}
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
          <StyledButton onClick={ () => this.setState({ logIn: false }) }>Sign Up</StyledButton>
          <br></br>
          <form onSubmit={ this.logInSubmitted }>
            <br></br>
            <StyledLabel htmlFor="log_in_username">Username</StyledLabel>
            <br></br>
            <StyledTextInput  
              id="log_in_username" 
              type="text" 
              onChange={ this.onChange /* for controlled form input status */ } 
              name="username" 
              value={ this.state.username /* for controlled form input status */ } />
            <br></br>
            <br></br>
            <StyledLabel htmlFor="log_in_password">Password</StyledLabel>
            <br></br>
            <StyledTextInput
              id="log_in_password" 
                    type="password" 
                    onChange={ this.onChange } 
                    name="password" 
                    value={ this.state.password } />
                    <br></br><br></br>
            <StyledTextInput
             type="submit" />
          </form>
        </section>
        :
        <section>
          <h2>Sign Up</h2>
          <StyledButton onClick={ () => this.setState({ logIn: true }) }>Log In</StyledButton>
          <br></br>
          <form onSubmit={ this.signUpSubmitted }>
          <br></br>
            <StyledLabel  htmlFor="sign_up_username">Username</StyledLabel>
            <br></br>
            <StyledTextInput
              id="sign_up_username" 
                    type="text" 
                    onChange={ this.onChange } 
                    name="username" 
                    value={ this.state.username } />
                    <br></br><br></br>
            <StyledLabel  htmlFor="sign_up_password">Password</StyledLabel>
            <br></br>
            <StyledTextInput
              id="sign_up_password" 
                    type="password" 
                    onChange={ this.onChange } 
                    name="password" 
                    value={ this.state.password } />
                    <br></br><br></br>
            <StyledLabel  htmlFor="sign_up_email">Email</StyledLabel>
            <br></br>
            <StyledTextInput
              id="sign_up_email" 
                    type="text" 
                    onChange={ this.onChange } 
                    name="email" 
                    value={ this.state.email } />
                    <br></br> <br></br>
            {/* <StyledLabel  htmlFor="sign_up_image_url">Image URL</StyledLabel> */}
            {/* <br></br> */}
            {/* <StyledTextInput
              id="sign_up_image_url" 
                    type="text" 
                    onChange={ this.onChange } 
                    name="image_url" 
                    value={ this.state.image_url } /> */}
<StyledButton onClick={(event) => {
                          event.preventDefault() 
                          this.showWidget(this.widget)}
                          }>Profile Picture</StyledButton>                    <br></br><br></br>
                    <StyledLabel  htmlFor="sign_up_bio">About Me</StyledLabel>
            <br></br>
            <StyledTextInput
              id="sign_up_bio" 
                    type="text" 
                    onChange={ this.onChange } 
                    name="bio" 
                    value={ this.state.bio } />
                    <br></br><br></br>
                    <StyledInput type="submit" />
          </form>
        </section>
      }
    </div>
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: ({token, user_id}) => {
            dispatch(login({token, user_id}))
        },
        set_content: ({stories, fragments, username}) => {
          dispatch(set_content({stories, fragments, username}))
      },
      set_account_data: ({email, image_url, bio}) => {
        dispatch(set_account_data({email, image_url, bio}))
      }
    }
}


export default connect(null, mapDispatchToProps)(LogIn)