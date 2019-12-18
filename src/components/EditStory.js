import React from 'react'
import { connect } from 'react-redux'

class EditStory extends React.Component{

  story = this.props.currentStory

  state = {
    title: "this.story.title",
    summary: "this.story.summary",
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
    this.props.set_story(story)
      }
}

onChange = event => {
  console.log(this.story)
    this.setState({
      [event.target.name]: event.target.value
    })
  }
    
    render(){
      return(
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
  </form>)
    }
}
const mapStateToProps = (state) => {
  return {
    stories: state.stories,
    currentStoryId: state.currentStoryId
  }
}

export default connect(mapStateToProps)(EditStory)