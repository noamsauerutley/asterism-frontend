import React from 'react'
import { connect } from 'react-redux'
import { update_profile_picture } from '../redux/actions'
import { StyledButton, StyledSubmit } from '../assets/StyledComponents'
import styled from 'styled-components'
import { colors } from '../assets/colors'

class EditProfilePicture extends React.Component{

    state = {
        image_url: this.props.image_url
    }

    showWidget = (widget) => {
        widget.open()
      }

    editProfilePicture = async (newProfilePicture) => {
        let rawData = await fetch(`http://localhost:3000/authors/${localStorage.user_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            },
            body: JSON.stringify({author:{
              image_url: newProfilePicture}
            })
        })
        let data = await rawData.json()
        this.props.update_profile_picture(data.image_url)
        console.log(data)
        alert("Your profile picture has been updated.")
    }

    onChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      handleChangeProfilePicture = event => {
        event.preventDefault()
        this.editProfilePicture(this.state.image_url)
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
  
    render(){
        return(
            <div>
                <form style={{marginTop:"10px"}} onSubmit={this.handleChangeProfilePicture}>
                {this.imageUpload()}
                < StyledButton onClick={(event) => {
                          event.preventDefault() 
                          this.showWidget(this.widget)}
                          }>✎</ StyledButton>         
                <StyledSubmit 
                type="submit" 
                value="✓"
                />
            </form> 
          </div> 
        )
    }
}

const mapStateToProps = (state) => {
    return{
    image_url: state.image_url
}}


  const mapDispatchToProps = (dispatch) => {
    return {
        update_profile_picture: (image_url) => {
            dispatch(update_profile_picture(image_url))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePicture)