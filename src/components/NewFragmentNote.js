import React from 'react'
import { connect } from 'react-redux'
import { set_fragment_note, update_fragment } from '../redux/actions'
import { Redirect } from 'react-router'

class NewFragmentNote extends React.Component {

    state = {
        text: "",
        redirectBoolean: false,
        errors: []
    }
    
    newFragmentNoteSubmitted = async (event) => {
        event.preventDefault()
        let rawFragmentNote = await fetch ('http://localhost:3000/fragment_notes', 
        {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.token
            },
            body: JSON.stringify({fragment_note: {
                fragment_id: this.props.currentFragment.id,
                text: this.state.text
            }})
          })
          let fragmentNote = await rawFragmentNote.json()
          if (fragmentNote.errors) {
            this.setState({
              errors: fragmentNote.errors
            })
          } else {
        console.log(fragmentNote)
        this.props.set_fragment_note(fragmentNote)
        this.props.update_fragment(this.props.currentFragment)
        this.setState({
          redirectBoolean: true
        })
        console.log(this.state)
          }
    }

    onChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      renderOrRedirect = () => {
        if(this.state.redirectBoolean === true){
          console.log(this.state)
           return <Redirect to='/fragments' />} 
           else {
             console.log(this.state)
           return <section style={{textAlign: "center"}}>
              <h2 >NEW NOTE</h2>
              <br></br>
              <form onSubmit={ this.newFragmentNoteSubmitted }>
                  <br></br>
                  <label  htmlFor="new_fragment_note">NOTE</label>
                  <br></br>
                  <textarea  
                      style={{width: "80%", height: "300px"}}
                      id="new_fragment_note" 
                      onChange={ this.onChange } 
                      name="text" 
                      value={ this.state.text } />
                      <br></br><br></br>
                  <input type="submit" />
              </form>
              </section>}
      }

    render(){
        return(
          <>
         {this.renderOrRedirect()}
         </>
        )}
}

const mapStateToProps = (state) => {
    return {
      currentFragment: state.currentFragment
    }
  }
const mapDispatchToProps = (dispatch) => {
    return {
        set_fragment_note: (fragment_note) => {
            dispatch(set_fragment_note(fragment_note))
        },
        update_fragment: (currentFragment) => {
            dispatch(update_fragment(currentFragment))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewFragmentNote)
