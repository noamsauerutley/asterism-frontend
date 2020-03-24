import React from 'react'
import { connect } from 'react-redux'
import { StyledNavLink, StyledStoriesContainer } from '../assets/StyledComponents'
import StoryCard from '../components/StoryCard'

const StoriesContainer = (props) => {
  
   return ( 
 
         <StyledStoriesContainer style={{textAlign: "Center"}}>
            <h1 >MY LIBRARY:</h1>
            <StyledNavLink activeClassName="active" to="/stories/new" style={{marginTop: "20px", textDecoration: "none", fontWeight: "bold", fontSize: "24px"}}>＋</StyledNavLink>
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