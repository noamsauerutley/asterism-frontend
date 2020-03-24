import React from 'react'
import { connect } from 'react-redux'
import { set_image, update_character } from '../redux/actions'
import { Redirect } from 'react-router'
import { StyledButton, StyledSubmit, StyledLabel, StyledHeader } from '../assets/StyledComponents'
import { StyledTextArea } from '../assets/StyledComponents'

class NewImage extends React.Component {
    constructor(props){
        super(props)
        this.widget = null
    }

    state = {
        image_url: "",
        note: "",
        redirectBoolean: false,
        errors: []
    }
    
    newImageSubmitted = async (event) => {
        console.log('submitting form...');
        event.preventDefault()
        let rawImage = await fetch ('https://asterism-api.herokuapp.com/images', 
            {
                method: "POST",
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
        let image = await rawImage.json()
        if (image.errors) {
            this.setState({
                errors: image.errors
            })
        } else {
            console.log(image)
            this.props.set_image(image)
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
        console.log(this.state)
    }
    
          showWidget = (widget) => {
              widget.open()
          }

      renderOrRedirect = () => {
        if(!this.widget){
            this.widget = window.cloudinary.createUploadWidget({
                cloudName: "noamesu",
                uploadPreset: "storyboard"
            }, (error, result) => {
                if(result.event ==="success"){
                    this.setState({
                        image_url: result.info.secure_url
                    })
                    console.log(this.state)
                }   
            }) 
        }

        if(this.state.redirectBoolean === true){
           return <Redirect to={`/stories/${this.props.currentStory.id}`} />} 
           else {
           return <section style={{textAlign: "center"}}>
              <StyledHeader >New Image:</StyledHeader>
              <br></br>
              <form onSubmit={ this.newImageSubmitted }>
                  <br></br>
                      <StyledButton 
                        style={{fontWeight: "bold"}}
                        onClick={(event) => {
                          event.preventDefault() 
                          this.showWidget(this.widget)}
                          }>＋</StyledButton>
                      <br></br>
                      <br></br>
                  <StyledLabel  htmlFor="new_image_note">Note</StyledLabel>
                  <br></br>
                  <StyledTextArea  
                      style={{width: "80%", height: "300px"}}
                      id="new_image_note" 
                      onChange={ this.onChange } 
                      name="note" 
                      value={ this.state.note } />
                      <br></br><br></br>
                  <StyledSubmit type="submit" value="✓"/>
              </form>
              </section>}
      }

    render(){

     
        return(
          <div id='photo-form-container'>
              
         {this.renderOrRedirect()}
         </div>
        )}
}

const mapStateToProps = (state) => {
    return {
        currentStory: state.currentStory,
        currentCharacter: state.currentCharacter
    }
  }
const mapDispatchToProps = (dispatch) => {
    return {
        set_image: (image) => {
            dispatch(set_image(image))
        },
        update_character: (currentCharacter) => {
            dispatch(update_character(currentCharacter))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewImage)

