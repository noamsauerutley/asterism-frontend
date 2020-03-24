import React from 'react'
import { connect } from 'react-redux'
import { set_fragment } from '../redux/actions'
import { Redirect } from 'react-router'
import { StyledTextArea, StyledSubmit, StyledLabel, StyledTextInput, StyledHeader } from '../assets/StyledComponents'


class NewFragment extends React.Component {

    state = {
        title: "",
        summary: "",
        redirectBoolean: false,
        errors: []
    }
    
    newFragmentSubmitted = async (event) => {
        event.preventDefault()
        let rawFragment = await fetch ('https://asterism-api.herokuapp.com/fragments', 
        {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.token
            },
            body: JSON.stringify({fragment: {
                author_id: localStorage.user_id,
                title: this.state.title,
                text: this.state.text
            }})
          })
          let fragment = await rawFragment.json()
          if (fragment.errors) {
            this.setState({
              errors: fragment.errors
            })
          } else {
        console.log(fragment)
        this.props.set_fragment(fragment)
        this.setState({
          redirectBoolean: true
        })
        console.log(this.state)
          }
    }

    onChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      renderOrRedirect = () => {
        if(this.state.redirectBoolean === true){
          console.log(this.state)
           return <Redirect to="/fragments" />} 
           else {
             console.log(this.state)
           return <section style={{textAlign: "center"}}>
              <StyledHeader >New Fragment:</StyledHeader>
              <br></br>
              <form onSubmit={ this.newFragmentSubmitted }>
                  <br></br>
                  <StyledLabel  htmlFor="new_fragment_title">Title</StyledLabel>
                  <br></br>
                  <StyledTextInput 
                      style={{width: "80%"}} 
                      id="new_fragment_title" 
                      type="text" 
                      onChange={ this.onChange /* for controlled form input status */ } 
                      name="title" 
                      value={ this.state.title /* for controlled form input status */ } />
                      <br></br>
                      <br></br>
                  <StyledLabel  htmlFor="new_fragment_text">Text</StyledLabel>
                  <br></br>
                  <StyledTextArea  
                      style={{width: "80%", height: "300px"}}
                      id="new_fragment_text" 
                      onChange={ this.onChange } 
                      name="text" 
                      value={ this.state.text } />
                      <br></br><br></br>
                      <StyledSubmit 
                    type="submit" 
                    value="✓"
                    />              </form>
              </section>}
      }

    render(){
        return(
          <>
         {this.renderOrRedirect()}
         </>
        )}
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_fragment: (fragment) => {
            dispatch(set_fragment(fragment))
        }
    }
}

export default connect(null, mapDispatchToProps)(NewFragment)
