import React from 'react'

const StoryCard = (props) => {
    return(
        <li style={{listStyle: "none"}}>
            <h2>{props.story.title}</h2>
            <p>{props.story.summary}</p>
            <ul>
                <h4>Plot Arcs:</h4>
                {props.story.plots.map(plot=><li style={{listStyle: "none"}}><h5>{plot.name}</h5><p>{plot.summary}</p></li>)}
            </ul>
            <h3>Characters:</h3>
            <ul>
                {props.story.characters.map(character => <li style={{listStyle: "none"}}><h5>{character.name}</h5><p>{character.description}</p></li>)}
            </ul>
        </li>
    )
}

export default StoryCard