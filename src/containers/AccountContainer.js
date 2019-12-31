import React from 'react'
import { connect } from 'react-redux'
import DeleteAuthor from '../components/DeleteAuthor'
import EditUsername from '../components/EditUsername'
import EditEmail from '../components/EditEmail'
import EditBio from '../components/EditBio'
import EditPassword from '../components/EditPassword'
import styled from 'styled-components'
import { colors } from '../assets/colors'


const StyledAccountContainer = styled.div`
font-family: "Didot";
text-align: center;
justify: space-around;
`


class AccountContainer extends React.Component {


   render(){
      return ( 
         <StyledAccountContainer >
            <img src={`${this.props.image_url}`} style={{width: "250px", marginTop: "5%"}} alt="user profile picture"/><br></br>
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