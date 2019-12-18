import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import StoryCard from '../components/StoryCard'

const StoriesContainer = (props) => {
  
   return ( 
 
         <div style={{textAlign: "Center"}}>
            <h1 >MY LIBRARY:</h1>
            <NavLink to="/stories/new" style={{marginTop: "20px", color: "black", textDecorationColor: "black", fontSize: "24px"}}>AD LIBRIS</NavLink>
            <ul style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          fontWeight: "100", 
          textAlign: "center",
          justifyContent: "space-around"
        }}>
   {!!props.stories.length ? props.stories.map(story => <StoryCard story={story} />) : "You haven't added any stories yet!"}
            </ul>        
        </div>
  )
}

const mapStateToProps = (state) => {
    return {
      stories: state.stories
    }
  }


  export default connect(mapStateToProps)(StoriesContainer)