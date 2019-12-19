import React from 'react'
import { connect } from 'react-redux'
import { NavLink} from 'react-router-dom'
import { delete_story } from '../redux/actions'


class StoryDetail extends React.Component{

    story = this.props.currentStory
    currentId = this.story.id

    delete = async () => {
        this.props.delete_story(this.currentId)
        await fetch(`http://localhost:3000/stories/${this.story.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            }
        })
        console.log("deleted!")
    } 

    storyPlots = () => {
        if(this.story.plots){
            return <ul style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                fontWeight: "100", 
                textAlign: "center",
                justifyContent: "space-around"
              }}>
                {this.story.plots.map(plot => {
                return <li style={{listStyle: "none"}}>
                    <div style={{border: "dashed", borderWidth: "1px", width: "250px", height: "350px", margin: "40px",  overflow: "hidden"}}>
                    <h3>{plot.name}</h3>
                    <p>{plot.summary}</p>
                    <label>SCENES:</label>
                <ul>{!!plot.scenes ? plot.scenes.map(scene => <li style={{listStyle: "none"}}><h5>{scene.name}</h5><p>{scene.summary}</p></li>) : "You haven't added any scenes to this plot arc."}</ul>
                    <label>NOTES:</label>
                <ul>{!!plot.plot_notes ? plot.plot_notes.map(plot_note => <li style={{listStyle: "none"}}>{plot_note.text}</li>) : "You haven't added any notes to this plot arc."}</ul>
                </div>
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
                    <h3>{character.name}</h3>
                    <ul style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          fontWeight: "100", 
          textAlign: "center",
          justifyContent: "space-around"
        }}>{!!character.images ? character.images.map(image => <li style={{listStyle: "none"}}><img src={image.image_url} alt={`${character.name} image`} /></li>) : ""}</ul>
                    <p>{character.description}</p>
                    <label>NOTES:</label>
                <ul>{!!character.character_notes ? character.character_notes.map(character_note => <li style={{listStyle: "none"}}>{character_note.text}</li>) : "You haven't added any notes to this character."}</ul>
                </li>})}
            </ul>
            } else {
            return "You haven't added any characters for this story yet"}
    }
    
    render(){
        return(
        <div style={{textAlign: "center", marginTop: "10%"}}>
            <NavLink to="/stories/edit" style={{color: "black", textDecoration: "none"}}>✎</NavLink>
            <div style={{ borderBottom: "solid", borderWidth: "1px", padding: "25px"}}>
            {/* <label style={{fontWeight: "bold"}}>TITLE: </label> */}
            <h2>{this.story.title}</h2>
            {/* <label style={{fontWeight: "bold"}}>SUMMARY:</label> */}
            <p >{this.story.summary}</p>
            <NavLink to='/stories' onClick={this.delete} style={{color: "black"}}>DELETE STORY</NavLink>
            </div>
            <div style={{ borderBottom: "solid", borderWidth: "1px", padding: "25px"}}>

                <h4>PLOT ARCS:</h4>
                    {this.storyPlots()}
            </div>
            <div>
            <h3>CHARACTERS:</h3>
                {this.storyCharacters()} 
            </div>
        </div>
    )}
}
const mapStateToProps = (state) => {
    return {
      stories: state.stories,
      currentStory: state.currentStory
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
        delete_story: currentId => {
            dispatch(delete_story(currentId))
        }
    }
}

  export default connect(mapStateToProps, mapDispatchToProps)(StoryDetail)

