import React from 'react'
import { connect } from 'react-redux'
import StoryCard from '../components/StoryCard'


const StoriesContainer = (props) => {
   return ( <>
         <div style={{textAlign: "left", marginLeft: "30%", marginTop: "10%"}}>
            <h1>STORIES:</h1>
            <ul>
   {!!props.stories.length ? props.stories.map(story => <StoryCard story={story} />) : "You haven't added any stories yet!"}
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