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
`

const StyledProfilePictureContainer = styled.div`
margin: 0 auto;
text-align: center;
width: 250px;
height: 300px;
overflow-x: hidden;
overflow-y: hidden;
margin-top: 5%;
border: 1px double;
outline: 2px solid;
outline-offset: -10px;
text-align: center;
padding: 20px;
opacity: .9;

`

 
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