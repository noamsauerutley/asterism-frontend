import React from 'react'
import { connect } from 'react-redux'
import { set_appearance, update_scene, update_plot, update_story} from '../redux/actions'
import { Redirect } from 'react-router'
import styled from 'styled-components'
import { colors } from '../assets/colors'
import { StyledTextArea, StyledSubmit, StyledLabel, StyledTextInput, StyledHeader } from '../assets/StyledComponents'

const StyledSelect = styled.select`
  margin: 0 auto;
  width: 40%;
  height: 40px;
  font-family: Didot;
  display: block;
  font-size: 18px;
  color: ${colors.black};
  background: Transparent;
  border: 1px solid;
  border-color: silver;
  box-sizing: border-box;
	border-radius: 0;
  transition: color .7s ease-in-out, border-color .7s ease-in-out;

  &:hover{
    border-color: ${colors.lightGreen}
  }

  &:focus{
    color: ${colors.lightGreen};
  }
  `

class NewAppearance extends React.Component{

    state = {
        character_name: "",
        redirectBoolean: false,
        errors: []
    }
    
    newCharacterSubmitted = async (event) => {
        event.preventDefault()
        let rawAppearance = await fetch ('http://localhost:3000/appearances', 
        {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.token
            },
            body: JSON.stringify({appearance: {
                scene_id: this.props.currentScene.id,
                character_id: this.props.currentStory.characters.find(character => character.name === this.state.character_name).id
            }})
          })
          let appearance = await rawAppearance.json()
          if (appearance.errors) {
            this.setState({
              errors: appearance.errors
            })
          } else {
        this.props.set_appearance(appearance)
        console.log(appearance)
        this.props.update_scene(this.props.currentScene)
        this.props.update_plot(this.props.currentPlot)
        this.props.update_story(this.props.currentStory)
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

      renderOrRedirect = () => {
        if(this.state.redirectBoolean === true){
           return <Redirect to={`/stories/${this.props.currentStory.id}`} />} 
           else {
           return <section style={{textAlign: "center", marginTop: "5%", height: "65vh"}} >
              <StyledHeader style={{marginTop:"25px", fontSize: "18px"}}>Add Character</StyledHeader>
              <br></br>
              <form onSubmit={ this.newCharacterSubmitted } style={{margin: "50px"}}>
                <StyledSelect 
                activeClassName="active"
                onChange={ this.onChange /* for controlled form input status */ } 
                name="character_name"
                value={ this.state.character_name  /* for controlled form input status */ }
                >
                  <option>Select Character:</option>
                {this.props.currentStory.characters.map (character => <option>{character.name}</option>)}
                </StyledSelect>
                      <StyledSubmit 
                    type="submit" 
                    value="✓"
                    />              </form>
              </section>}
      }

    render(){
        return(
          <>
         {this.renderOrRedirect()}
         </>
        )}
}

const mapDispatchToProps = (dispatch) => {
    return {
        update_scene: (scene) => {
          dispatch(update_scene(scene))
      },
      update_plot: (plot) => {
        dispatch(update_plot(plot))
    }, 
      update_story: (story) => {
        dispatch(update_story(story))
    },
        set_appearance: (appearance) => {
            dispatch(set_appearance(appearance))
        }
    }
  }


const mapStateToProps = (state) => {
    return {
        currentStory: state.currentStory,
        currentScene: state.currentScene,
        currentPlot: state.currentPlot
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(NewAppearance)
