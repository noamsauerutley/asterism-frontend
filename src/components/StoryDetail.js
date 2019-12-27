import React from 'react'
import { connect } from 'react-redux'
import { NavLink} from 'react-router-dom'
import { delete_story, set_current_plots, set_current_characters } from '../redux/actions'
import PlotCard from './PlotCard'
import CharacterCard from './CharacterCard'


class StoryDetail extends React.Component{

    story = this.props.currentStory
    currentId = this.story.id

    componentDidMount = () => {
        return this.props.set_current_plots(), this.props.set_current_characters()
    }
    

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
        if(this.props.plots){
            return <ul style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                fontWeight: "100", 
                textAlign: "center",
                justifyContent: "space-around"
              }}>
                {this.props.plots.map(plot => < PlotCard plot={plot}/>)}
            </ul>
            } else {
            return "You haven't added any plot arcs for this story yet"}
    }

    storyCharacters = () => {
        if(this.story.characters){
            return <ul>
<<<<<<< HEAD
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
                    <label style={{fontWeight: "bold"}}>NOTES:</label>
                    <ul>{!!character.character_notes ? character.character_notes.map(character_note => <li style={{listStyle: "none"}}>{character_note.text}</li>) : "You haven't added any notes to this character."}</ul>
                    <br></br>
                    <label style={{fontWeight: "bold"}}>SCENES:</label>
                    <ul>{!!character.scenes ? character.scenes.map(scene => <li style={{listStyle: "none"}}>{scene.name}</li>) : "This character is not in any scenes yet."}</ul>
                </li>})}
=======
                {this.story.characters.map(character => <CharacterCard character={character} />)}
>>>>>>> staging
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
      plots: state.plots,
      currentStory: state.currentStory
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
        delete_story: currentId => {
            dispatch(delete_story(currentId))
        },
        set_current_plots: () => {
            dispatch(set_current_plots())
        },
        set_current_characters: () => {
            dispatch(set_current_characters())
        }
    }
}

  export default connect(mapStateToProps, mapDispatchToProps)(StoryDetail)

