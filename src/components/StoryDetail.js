import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'


class StoryDetail extends React.Component{

    story = this.props.currentStory

    delete = async () => {
        await fetch(`http://localhost:3000/stories/${this.props.story.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            }
        })
    } 
    storyPlots = () => {
        console.log(this.story.title)
        if(this.story.plots){
            return <ul>
                {this.story.plots.map(plot => {
                return <li style={{listStyle: "none"}}>
                    <h5>{plot.name}</h5>
                    <p>{plot.summary}</p>
                </li>})}
            </ul>
            } else {
            return "You haven't added any plot arcs for this story yet"}
    }

    storyCharacters = () => {
        if(this.story.characters){
            return <ul>
                {this.story.characters.map(character => {
                return <li style={{listStyle: "none"}}>
                    <h5>{character.name}</h5>
                    <p>{character.summary}</p>
                </li>})}
            </ul>
            } else {
            return "You haven't added any characters for this story yet"}
    }
    
    render(){
        return(
        <div style={{textAlign: "center", marginTop: "10%"}}>
            <h2>{this.story.title}</h2>
            <NavLink to="/stories/edit">✎</NavLink>
            <p>{this.story.summary}</p>
            
                <h4>Plot Arcs:</h4>
                    {this.storyPlots()}
            
            <h3>Characters:</h3>
                {this.storyCharacters()} 
            <button  onClick={this.delete}>DELETE STORY</button>

        </div>
    )}
}
const mapStateToProps = (state) => {
    return {
      stories: state.stories,
      currentStory: state.currentStory
    }
  }

  export default connect(mapStateToProps)(StoryDetail)

