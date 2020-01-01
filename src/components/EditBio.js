
import React from 'react'
import { connect } from 'react-redux'
import { update_bio } from '../redux/actions'
import { StyledSubmit } from '../assets/StyledComponents'
import styled from 'styled-components'
import { colors } from '../assets/colors'


const StyledEditBioTextarea = styled.textarea`
    text-align: center;
    font-family: Didot;
    width: 150px;
    border-style: solid;
    border-width: 1px;
    border-color: lightGrey;
    resize: none;
    overflow-y: scroll;
    white-space: pre-wrap;
    color: ${colors.black}
`

class EditBio extends React.Component{

    state = {
        bio: this.props.bio
    }

    editBio = async (newBio) => {
        let rawData = await fetch(`http://localhost:3000/authors/${localStorage.user_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            },
            body: JSON.stringify({author:{
              bio: newBio}
            })
        })
        let data = await rawData.json()
        this.props.update_bio(data)
        alert("Your bio has been updated.")
    }

    onChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      handleChangeBio = event => {
        event.preventDefault()
        this.editBio(this.state.bio)
    }
  
    render(){
        return(
                <form onSubmit={this.handleChangeBio}>
                    <label style={{fontFamily: "Didot", color: `${colors.black}`}}>Change Bio</label>
                    <br></br>
                    <StyledEditBioTextarea
                    autoComplete="new-bio"
                    onChange={ this.onChange /* for controlled form input status */ } 
                    name="bio" 
                    value={ this.state.bio /* for controlled form input status */ } 
                    />
                    <br></br>
                    <StyledSubmit 
                    type="submit" 
                    value="✓"
                    />
            </form> 
        )
    }
}

    const mapStateToProps = (state) => {
        return{
        bio: state.bio
    }}


  const mapDispatchToProps = (dispatch) => {
    return {
        update_bio: (bio) => {
            dispatch(update_bio(bio))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBio)