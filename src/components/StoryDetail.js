import React from 'react'
import { connect } from 'react-redux'
import { NavLink} from 'react-router-dom'
import { set_current_plots, set_current_characters } from '../redux/actions'
import PlotCard from './PlotCard'
import CharacterCard from './CharacterCard'
import DeleteStory from './DeleteStory'


class StoryDetail extends React.Component{

    story = this.props.currentStory

    componentDidMount = () => {
        return this.props.set_current_plots(), this.props.set_current_characters()
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
                {this.story.characters.map(character => <CharacterCard character={character} />)}
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
            < DeleteStory story={this.story} />
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
        set_current_plots: () => {
            dispatch(set_current_plots())
        },
        set_current_characters: () => {
            dispatch(set_current_characters())
        }
    }
}

  export default connect(mapStateToProps, mapDispatchToProps)(StoryDetail)

