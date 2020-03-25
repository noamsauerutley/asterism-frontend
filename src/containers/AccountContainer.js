import React from 'react'
import { connect } from 'react-redux'
import DeleteAuthor from '../components/DeleteAuthor'
import EditProfilePicture from '../components/EditProfilePicture'
import EditUsername from '../components/EditUsername'
import EditEmail from '../components/EditEmail'
import EditBio from '../components/EditBio'
import EditPassword from '../components/EditPassword'
import DownloadStories from '../components/DownloadStories'
import { StyledAccountContainer, StyledProfilePicture, StyledProfilePictureContainer } from '../assets/StyledComponents'
 
class AccountContainer extends React.Component {

   render(){
      return ( 
         <StyledAccountContainer >
            <StyledProfilePictureContainer>
               <div style={{width:"100%", height: "100%", overflowX: "hidden", overflowY: "hidden", textAlign: "center", margin: "0 auto"}}>
               <StyledProfilePicture src={`${this.props.image_url}`}  alt="user profile picture"/>
               </div >
            </StyledProfilePictureContainer>
            < EditProfilePicture />
            < EditBio />
            <EditEmail />
            <EditUsername />
            <EditPassword />
            <DownloadStories />
            <DeleteAuthor />
         </StyledAccountContainer>
    )}
}

const mapStateToProps = (state) => {
   return {
     username: state.username,
     email: state.email,
     image_url: state.image_url,
     bio: state.bio
   }
 }

export default connect(mapStateToProps)(AccountContainer)