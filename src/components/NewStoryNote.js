import React from 'react'
import { connect } from 'react-redux'
import { set_story_note, update_story } from '../redux/actions'
import { Redirect } from 'react-router'
import { StyledTextArea, StyledSubmit, StyledLabel, StyledHeader } from '../assets/StyledComponents'
import styled from 'styled-components'
import { colors } from '../assets/colors'


class NewStoryNote extends React.Component {

    state = {
        text: "",
        redirectBoolean: false,
        errors: []
    }
    
    newStoryNoteSubmitted = async (event) => {
        event.preventDefault()
        let rawStoryNote = await fetch ('https://asterism-api.herokuapp.com/story_notes', 
        {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.token
            },
            body: JSON.stringify({story_note: {
                story_id: this.props.currentStory.id,
                text: this.state.text
            }})
          })
          let storyNote = await rawStoryNote.json()
          if (storyNote.errors) {
            this.setState({
              errors: storyNote.errors
            })
          } else {
        console.log(storyNote)
        this.props.set_story_note(storyNote)
        this.props.update_story(this.props.currentStory)
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
           return <Redirect to='/storys' />} 
           else {
             console.log(this.state)
           return <section style={{textAlign: "center"}}>
              <StyledHeader >New Note:</StyledHeader>
              <br></br>
              <form onSubmit={ this.newStoryNoteSubmitted }>
                  <br></br>
                  <StyledLabel  htmlFor="new_story_note">Text</StyledLabel>
                  <br></br>
                  <StyledTextArea  
                      style={{width: "80%", height: "300px"}}
                      id="new_story_note" 
                      onChange={ this.onChange } 
                      name="text" 
                      value={ this.state.text } />
                      <br></br><br></br>
                      <StyledSubmit 
                    type="submit" 
                    value="✓"
                    />              
                    </form>
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
        set_story_note: (story_note) => {
            dispatch(set_story_note(story_note))
        },
        update_story: (currentStory) => {
            dispatch(update_story(currentStory))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewStoryNote)
