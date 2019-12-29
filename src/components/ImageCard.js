import React from 'react'
import { connect } from 'react-redux'
import DeleteImage from './DeleteImage'
import { set_current_character, set_current_image } from '../redux/actions'
import { NavLink } from 'react-router-dom'


class ImageCard extends React.Component {
    setCurrentCharacter = () => {
        this.props.set_current_character(this.props.currentStory.characters.find(character => character.id === this.props.image.character_id))
    }
    setCurrentImage = () => {
        this.props.set_current_image(this.props.image)
    }
    render(){
    return(
    <li style={{listStyle: "none"}}>
        <img src={this.props.image.image_url} alt={`character #${this.props.image.character_id} image`} />
        <p>{this.props.image.note}</p>
        <div  onClick={this.setCurrentCharacter}>
            <NavLink to="/images/edit" style={{color: "black", textDecoration: "none"}} onClick={this.setCurrentImage}>✎</NavLink><br></br>
            < DeleteImage image={this.props.image}/>
        </div>
    </li>
)}}


const mapStateToProps = (state) => {
    return {
        currentStory: state.currentStory,
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        set_current_character: currentCharacter => {
            dispatch(set_current_character(currentCharacter))
        },
        set_current_image: currentImage => {
            dispatch(set_current_image(currentImage))
        }
    }
}

  export default connect(mapStateToProps, mapDispatchToProps)(ImageCard)