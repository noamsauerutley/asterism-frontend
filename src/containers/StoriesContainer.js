import React from 'react'
import { connect } from 'react-redux'
import StoryCard from '../components/StoryCard'


const StoriesContainer = (props) => {
   return ( <>
         <div style={{textAlign: "left", marginLeft: "30%", marginTop: "10%"}}>
            <h1 style={{textAlign: "Center"}}>MY LIBRARY:</h1>
            <a href="/stories/new">AD LIBRIS</a>
            <ul>
   {!!props.stories.length ? props.stories.map(story => <StoryCard story={story} set_current_user={props.set_current_user} />) : "You haven't added any stories yet!"}
            </ul>        
        </div>
    </>)
}

const mapStateToProps = (state) => {
    return {
      stories: state.stories
    }
  }


  export default connect(mapStateToProps)(StoriesContainer)