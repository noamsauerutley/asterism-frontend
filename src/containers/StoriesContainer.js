import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import StoryCard from '../components/StoryCard'
import styled from 'styled-components'

const StyledStoriesContainer = styled.div`
font-family: "Didot";
`

const StoriesContainer = (props) => {
  
   return ( 
 
         <StyledStoriesContainer style={{textAlign: "Center"}}>
            <h1 >MY LIBRARY:</h1>
            <NavLink to="/stories/new" style={{marginTop: "20px", color: "black", textDecorationColor: "black", fontSize: "24px"}}>NEW STORY</NavLink>
            <ul style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          fontWeight: "100", 
          textAlign: "center",
          justifyContent: "space-around"
        }}>
   {(!!props.stories && !!props.stories.length) ? props.stories.map(story => <StoryCard story={story} />) : "You haven't added any stories yet!"}
            </ul>        
        </StyledStoriesContainer>
  )
}

const mapStateToProps = (state) => {
    return {
      stories: state.stories
    }
  }


  export default connect(mapStateToProps)(StoriesContainer)