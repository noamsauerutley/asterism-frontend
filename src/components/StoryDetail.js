import React from 'react'
import { connect } from 'react-redux'
import { StyledNavLink} from '../assets/StyledComponents'
import PlotCard from './PlotCard'
import CharacterCard from './CharacterCard'
import StoryNoteCard from './StoryNoteCard'
import DeleteStory from './DeleteStory'
import styled from 'styled-components'
import { colors } from '../assets/colors'


const StyledStoryDetail = styled.div`
font-family: "Didot";
`

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
        <StyledStoryDetail style={{textAlign: "center"}}>
            <div style={{ width: "95%", borderBottom: "solid", borderWidth: "1px", padding: "25px"}}>
            <h2>{this.props.currentStory.title}</h2>
            <StyledNavLink activeClassName="active" to="/stories/edit" >✎   </StyledNavLink>
            < DeleteStory story={this.props.currentStory} />
            <p style={{whiteSpace: "pre-wrap"}}>{this.props.currentStory.summary}</p>
            </div>

            <StyledLabel>NOTES</StyledLabel><br></br>
            <StyledNavLink activeClassName="active" to={`/story_notes/new`} style={{marginTop: "20px", fontSize: "18px", fontWeight: "bold"}} onClick={this.handleOnClick}>＋</StyledNavLink>
            <StyledUl>{!!this.props.story.story_notes ? this.props.story.story_notes.map(story_note => < StoryNoteCard story_note={story_note} story={this.props.story}/>) : "You haven't added any notes to this story."}</StyledUl>

            <div style={{ width: "95%", borderBottom: "solid", borderWidth: "1px", padding: "25px"}}>
                <h4>PLOT ARCS:</h4>
                    <StyledNavLink activeClassName="active" to={`/plots/new`} style={{marginTop: "20px", fontSize:"20px"}}>＋</StyledNavLink><br></br>
                    {this.storyPlots()}<br></br>
            </div>
            <div>
            <h3>CHARACTERS:</h3>
                <StyledNavLink activeClassName="active" to={`/characters/new`} style={{marginTop: "20px", fontSize:"20px"}}>＋</StyledNavLink><br></br>
                {this.storyCharacters()} <br></br>
            </div>
        </StyledStoryDetail>
    )}
}
const mapStateToProps = (state) => {
    return {
      stories: state.stories,
      currentStory: state.currentStory
    }
  }



  export default connect(mapStateToProps)(StoryDetail)

