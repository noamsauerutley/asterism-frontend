import React from 'react'
import { connect } from 'react-redux'
import DeleteAuthor from '../components/DeleteAuthor'
import EditProfilePicture from '../components/EditProfilePicture'
import EditUsername from '../components/EditUsername'
import EditEmail from '../components/EditEmail'
import EditBio from '../components/EditBio'
import EditPassword from '../components/EditPassword'
import styled from 'styled-components'
import { colors } from '../assets/colors'


const StyledAccountContainer = styled.div`
font-family: "Didot";
color: ${colors.black};
text-align: center;
justify: space-around;
`

const StyledProfilePicture = styled.img`
width: 100%;
margin-bottom: 10px;
opacity: .9;
`

const StyledProfilePictureContainer = styled.div`
margin: 0 auto;
text-align: center;
width: 250px;
height: 300px;
overflow: hidden;
margin-top: 5%;
border: double;
border-color: ${colors.black}
`

 
class AccountContainer extends React.Component {


   render(){
      return ( 
         <StyledAccountContainer >
            <StyledProfilePictureContainer>
               <StyledProfilePicture src={`${this.props.image_url}`}  alt="user profile picture"/>
            </StyledProfilePictureContainer>
            < EditProfilePicture />
            < EditBio />
            <EditEmail />
            <EditUsername />
            <EditPassword />
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