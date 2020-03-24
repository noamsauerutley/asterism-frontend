import React from 'react'
import { connect } from 'react-redux'
import { set_character } from '../redux/actions'
import { Redirect } from 'react-router'
import { StyledTextArea, StyledSubmit, StyledLabel, StyledTextInput, StyledHeader } from '../assets/StyledComponents'


class NewCharacter extends React.Component {

    state = {
        name: "",
        description: "",
        redirectBoolean: false,
        errors: []
    }
    
    newCharacterSubmitted = async (event) => {
        event.preventDefault()
        let rawCharacter = await fetch ('https://asterism-api.herokuapp.com/characters', 
        {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.token
            },
            body: JSON.stringify({character: {
                story_id: this.props.currentStory.id,
                name: this.state.name,
                description: this.state.description
            }})
          })
          let character = await rawCharacter.json()
          if (character.errors) {
            this.setState({
              errors: character.errors
            })
          } else {
        this.props.set_character(character)
        this.setState({
          redirectBoolean: true
        })
          }
    }

    onChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      renderOrRedirect = () => {
        if(this.state.redirectBoolean === true){
           return <Redirect to={`/stories/${this.props.currentStory.id}`} />} 
           else {
           return <section style={{textAlign: "center"}}>
              <StyledHeader>Add Character</StyledHeader>
              <br></br>
              <form onSubmit={ this.newCharacterSubmitted }>
                  <br></br>
                  <StyledLabel  htmlFor="new_character_name">Name</StyledLabel>
                  <br></br>
                  <StyledTextInput 
                      style={{width: "80%"}} 
                      id="new_character_name" 
                      type="text" 
                      onChange={ this.onChange /* for controlled form input status */ } 
                      name="name" 
                      value={ this.state.name /* for controlled form input status */ } />
                      <br></br>
                      <br></br>
                  <StyledLabel  htmlFor="new_character_description">Description</StyledLabel>
                  <br></br>
                  <StyledTextArea  
                      style={{width: "80%", height: "300px"}}
                      id="new_character_description" 
                      onChange={ this.onChange } 
                      name="description" 
                      value={ this.state.description } />
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

const mapStateToProps = (state) => {
    return {
      currentStory: state.currentStory
    }
  }
const mapDispatchToProps = (dispatch) => {
    return {
        set_character: (character) => {
            dispatch(set_character(character))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCharacter)
