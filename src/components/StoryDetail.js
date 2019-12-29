import React from 'react'
import { connect } from 'react-redux'
import { NavLink} from 'react-router-dom'
import PlotCard from './PlotCard'
import CharacterCard from './CharacterCard'
import DeleteStory from './DeleteStory'

class StoryDetail extends React.Component{

    storyPlots = () => {
        if(!!this.props.currentStory.plots && !!this.props.currentStory.plots.length){
            return <ul style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                fontWeight: "100", 
                textAlign: "center",
                justifyContent: "space-around"
              }}>
                {this.props.currentStory.plots.map(plot => < PlotCard plot={plot}/>)}
            </ul>
            } else {
            return "You haven't added any plot arcs for this story yet"}
    }

    storyCharacters = () => {
        if(this.props.currentStory.characters){
            return <ul>
                {this.props.currentStory.characters.map(character => <CharacterCard character={character} />)}
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
            <h2>{this.props.currentStory.title}</h2>
            {/* <label style={{fontWeight: "bold"}}>SUMMARY:</label> */}
            <p >{this.props.currentStory.summary}</p>
            < DeleteStory story={this.props.currentStory} />
            </div>
            <div style={{ borderBottom: "solid", borderWidth: "1px", padding: "25px"}}>
                <h4>PLOT ARCS:</h4>
                    {this.storyPlots()}<br></br>
                    <NavLink to={`/plots/new`} style={{marginTop: "20px", color: "black", textDecorationColor: "black"}}>ADD PLOT ARC</NavLink>
            </div>
            <div>
            <h3>CHARACTERS:</h3>
                {this.storyCharacters()} <br></br>
                <NavLink to={`/characters/new`} style={{marginTop: "20px", color: "black", textDecorationColor: "black"}}>ADD CHARACTER</NavLink>
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



  export default connect(mapStateToProps)(StoryDetail)

