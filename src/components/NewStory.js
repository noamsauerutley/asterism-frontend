import React from 'react'
import { connect } from 'react-redux'
import { set_story } from '../redux/actions'
import { Redirect } from 'react-router'
import { StyledTextArea, StyledSubmit, StyledLabel, StyledTextInput, StyledHeader } from '../assets/StyledComponents'

class NewStory extends React.Component {

    state = {
        title: "",
        summary: "",
        redirectBoolean: false,
        errors: []
    }
    
    newStorySubmitted = async (event) => {
        event.preventDefault()
        let rawStory = await fetch ('https://asterism-api.herokuapp.com/stories', 
        {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.token
            },
            body: JSON.stringify({story: {
                author_id: localStorage.user_id,
                title: this.state.title,
                summary: this.state.summary
            }})
          })
          let story = await rawStory.json()
          if (story.errors) {
            this.setState({
              errors: story.errors
            })
          } else {
        this.props.set_story(story)
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
           return <Redirect to="/stories" />} 
           else {
           return <section style={{textAlign: "center"}}>
              <StyledHeader >New Story:</StyledHeader>
              <br></br>
              <form onSubmit={ this.newStorySubmitted }>
                  <br></br>
                  <StyledLabel  htmlFor="new_story_title">Title</StyledLabel>
                  <br></br>
                  <StyledTextInput 
                      id="new_story_title" 
                      type="text" 
                      onChange={ this.onChange /* for controlled form input status */ } 
                      name="title" 
                      value={ this.state.title /* for controlled form input status */ } />
                      <br></br>
                      <br></br>
                  <StyledLabel  htmlFor="new_story_summary">Summary</StyledLabel>
                  <br></br>
                  <StyledTextArea  
                      style={{width: "80%", height: "300px"}}
                      id="new_story_summary" 
                      onChange={ this.onChange } 
                      name="summary" 
                      value={ this.state.summary } />
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
        set_story: (story) => {
            dispatch(set_story(story))
        }
    }
}

export default connect(null, mapDispatchToProps)(NewStory)