import React from 'react'
import { connect } from 'react-redux'
import { update_fragment } from '../redux/actions'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from '../assets/colors'
import { StyledTextArea, StyledSubmit, StyledLabel, StyledTextInput } from '../assets/StyledComponents'


class EditFragment extends React.Component{

  fragment = this.props.currentFragment

  state = {
    title: this.fragment.title,
    text: this.fragment.text,
    redirectBoolean: false,
    errors: []
}

editFragmentSubmitted = async (event) => {
    event.preventDefault()
    let rawEditedFragment = await fetch (`http://localhost:3000/fragments/${this.fragment.id}`, 
      {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.token
          },
          body: JSON.stringify({fragment: {
              title: this.state.title,
              text: this.state.text
          }})
        })
    let editedFragment = await rawEditedFragment.json()
    
    if (editedFragment.errors) {
      this.setState({
        errors: editedFragment.errors
      })
    } else {
    this.props.update_fragment(editedFragment)
    this.setState({
      redirectBoolean: true
    })
      }
}

onChange = event => {
  console.log(this.fragment)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  conditionalRender = () => {
    if(this.state.redirectBoolean===false){
      return <form onSubmit={ this.editFragmentSubmitted }>
      <br></br>
      <StyledLabel  htmlFor="edit_fragment_title">TITLE</StyledLabel>
      <br></br>
      <StyledTextInput
          id="edit_fragment_title" 
          type="text" 
          onChange={ this.onChange /* for controlled form input status */ } 
          name="title" 
          value={ this.state.title /* for controlled form input status */ } />
          <br></br>
          <br></br>
      <StyledLabel  htmlFor="edit_fragment_text">TEXT</StyledLabel>
      <br></br>
      <StyledTextArea  
          style={{width: "80%", height: "300px"}}
          id="edit_fragment_text" 
          onChange={ this.onChange } 
          name="text" 
          value={ this.state.text } />
          <br></br><br></br>
          <StyledSubmit 
                    type="submit" 
                    value="✓"
                    />  </form>
    } else{
      return < Redirect to='/fragments' />
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
    currentFragment: state.currentFragment
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      update_fragment: (fragment) => {
          dispatch(update_fragment(fragment))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditFragment)