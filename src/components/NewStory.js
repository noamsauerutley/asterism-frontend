import React from 'react'
import { connect } from 'react-redux'
import { set_story } from '../redux/actions'
import { Redirect } from 'react-router'

class NewStory extends React.Component {

    state = {
        title: "",
        summary: "",
        redirectBoolean: false,
        errors: []
    }
    
    newStorySubmitted = async (event) => {
        event.preventDefault()
        let rawStory = await fetch ('http://localhost:3000/stories', 
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
        console.log(story)
        this.props.set_story(story)
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
           return <Redirect to="/stories" />} 
           else {
             console.log(this.state)
           return <section style={{textAlign: "center"}}>
              <h2 >NEW STORY</h2>
              <br></br>
              <form onSubmit={ this.newStorySubmitted }>
                  <br></br>
                  <label  htmlFor="new_story_title">TITLE</label>
                  <br></br>
                  <input 
                      style={{width: "80%"}} 
                      id="new_story_title" 
                      type="text" 
                      onChange={ this.onChange /* for controlled form input status */ } 
                      name="title" 
                      value={ this.state.title /* for controlled form input status */ } />
                      <br></br>
                      <br></br>
                  <label  htmlFor="new_story_summary">SUMMARY</label>
                  <br></br>
                  <textarea  
                      style={{width: "80%", height: "300px"}}
                      id="new_story_summary" 
                      onChange={ this.onChange } 
                      name="summary" 
                      value={ this.state.summary } />
                      <br></br><br></br>
                  <input type="submit" />
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

const mapDispatchToProps = (dispatch) => {
    return {
        set_story: (story) => {
            dispatch(set_story(story))
        }
    }
}

export default connect(null, mapDispatchToProps)(NewStory)