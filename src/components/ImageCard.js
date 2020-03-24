import React from 'react'
import { connect } from 'react-redux'
import DeleteImage from './DeleteImage'
import { set_current_character, set_current_image } from '../redux/actions'
import { StyledNavLink, StyledImageCard } from '../assets/StyledComponents'

class ImageCard extends React.Component {
    setCurrentCharacter = () => {
        this.props.set_current_character(this.props.currentStory.characters.find(character => character.id === this.props.image.character_id))
    }
    setCurrentImage = () => {
        this.props.set_current_image(this.props.image)
    }
    render(){
    return(
    <StyledImageCard>
        <div style={{width:"100%", overflowX: "hidden", overflowY: "scroll", textAlign: "center", margin: "0 auto"}}>
        <img src={this.props.image.image_url} alt={`character #${this.props.image.character_id} image`} style={{height: "250px", width: "auto"}}/>
        </div>
        <p>{this.props.image.note}</p>
        <div  onClick={this.setCurrentCharacter}>
            <StyledNavLink activeClassName="active" to="/images/edit" onClick={this.setCurrentImage}>✎   </StyledNavLink>
            < DeleteImage image={this.props.image}/>
        </div>
    </StyledImageCard>
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