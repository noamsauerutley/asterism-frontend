import React from 'react'
import { connect } from 'react-redux'
import { update_image, set_current_image, update_character} from '../redux/actions'
import { Redirect } from 'react-router-dom'
import { StyledButton, StyledSubmit, StyledTextArea, StyledLabel, StyledHeader } from '../assets/StyledComponents'
import { colors } from '../assets/colors'


class EditImage extends React.Component{
  
  state = {
    image_url: this.props.currentImage.image_url,
    note: this.props.currentImage.note,
    redirectBoolean: false,
    errors: []
}

showWidget = (widget) => {
  widget.open()
}

editImageSubmitted = async (event) => {
    event.preventDefault()
    let rawEditedImage = await fetch (`https://asterism-api.herokuapp.com/images/${this.props.currentImage.id}`, 
      {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.token
          },
          body: JSON.stringify({image: {
              character_id: this.props.currentCharacter.id,
              image_url: this.state.image_url,
              note: this.state.note
          }})
        })
    let editedImage = await rawEditedImage.json()
    
    if (editedImage.errors) {
      this.setState({
        errors: editedImage.errors
      })
    } else {
      console.log(editedImage)
    this.props.update_image(editedImage)
    this.props.set_current_image(editedImage)
    this.props.update_character(this.props.currentCharacter)
    this.setState({
      redirectBoolean: true
    })
      }
}

onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  imageUpload = () => {
    if(!this.widget){
        this.widget = window.cloudinary.createUploadWidget({
            cloudName: "noamesu",
            uploadPreset: "storyboard",
            sources: ['local', 'url']
        }, (error, result) => {
            if(result.event ==="success"){
                this.setState({
                    image_url: result.info.secure_url
                })
                console.log(this.state)
            }   
        }) 
    }
  }

  conditionalRender = () => {
    if(this.state.redirectBoolean===false){
      return <form onSubmit={ this.editImageSubmitted }>
        <StyledHeader>Edit Character Image:</StyledHeader>
          {this.imageUpload()}
          < StyledButton 
            style={{fontSize: "18px", fontWeight: "bold", border: "1px", marginTop: "10px", borderColor: "lightGrey"}}
            onClick={(event) => {
              event.preventDefault() 
              this.showWidget(this.widget)}
            }>＋</ StyledButton>    
          <br></br>
      <StyledLabel  htmlFor="edit_image_note" style={{fontFamily: "Didot", color: `${colors.black}`}}>Image Note</StyledLabel>
      <br></br>
      <StyledTextArea  
          style={{fontFamily: "Didot", width: "80%", height: "300px", borderColor: "lightGrey", resize: "none"}}
          id="edit_image_note" 
          onChange={ this.onChange } 
          name="note" 
          value={ this.state.note } />
          <br></br><br></br>
      <StyledSubmit type="submit" value="✓"/>
  </form>
    } else{
      return < Redirect to={`/stories/${this.props.currentStory.id}`} />
    }
  }
    
    render(){
      return(
        <div style={{textAlign: "center"}}>
        {this.conditionalRender()}
        </div>
      )
    }
}
const mapStateToProps = (state) => {
  return {
        currentCharacter: state.currentCharacter,
        currentStory: state.currentStory,
        currentImage: state.currentImage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      update_image: (image) => {
          dispatch(update_image(image))
      },
      set_current_image: (image) => {
          dispatch(set_current_image(image))
      },
      update_character: (currentCharacter) => {
          dispatch(update_character(currentCharacter))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditImage)