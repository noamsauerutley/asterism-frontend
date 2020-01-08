import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { colors } from '../assets/colors'
import { set_content, set_account_data } from '../redux/actions'
import NavBar from './NavBar'
import LoginContainer from './LoginContainer'
import FragmentsContainer from './FragmentsContainer'
import NewFragment from '../components/NewFragment'
import EditFragment from '../components/EditFragment'
import StoriesContainer from './StoriesContainer'
import NewStory from '../components/NewStory'
import EditStory from '../components/EditStory'
import StoryDetail from '../components/StoryDetail'
import AccountContainer from './AccountContainer'
import NewPlot from '../components/NewPlot'
import EditPlot from '../components/EditPlot'
import NewCharacter from '../components/NewCharacter'
import EditCharacter from '../components/EditCharacter'
import NewImage from '../components/NewImage'
import EditImage from '../components/EditImage'
import NewCharacterNote from '../components/NewCharacterNote'
import EditCharacterNote from '../components/EditCharacterNote'
import NewFragmentNote from '../components/NewFragmentNote'
import EditFragmentNote from '../components/EditFragmentNote'
import NewScene from '../components/NewScene'
import EditScene from '../components/EditScene'
import NewPlotNote from '../components/NewPlotNote'
import EditPlotNote from '../components/EditPlotNote'
import NewAppearance from '../components/NewAppearance'
import About from "../components/About"
import NoMatch from '../components/NoMatch'
import ErrorBoundary from './ErrorBoundary'

const StyledMainContainer = styled.div`
z-index: 2;
width: 92vw;
heigh: 100vh;
bottom: 0px;
border: 1px double;
border-color: ${colors.black};
outline: 2px solid;
outline-offset: -10px;
outline-color: ${colors.black};
text-align: center;
margin: 15px 15px 15px 15px;
padding: 20px;
`


class MainContainer extends React.Component{

    isUser = () => {
       return !!localStorage.user_id ? <Redirect to="/stories" /> : <Redirect to="/login"/>
    }

    componentDidMount = async () => {
        if (!!localStorage.user_id) {
        let rawData = await fetch(`https://asterism-api.herokuapp.com/authors/${localStorage.user_id}`, {
            method: "GET",
            headers: {
              "Authorization": localStorage.token,
              "Content-Type": "application/json"
                 }})
        let data = await rawData.json()
        this.props.set_account_data(data)
        this.props.set_content(data)
        console.log(data)}
    }

    render(){return(
        <ErrorBoundary>
        <StyledMainContainer>
        <Router>
        <NavBar />
            <Switch>
                    <Route exact path="/fragments" >
                        < FragmentsContainer />
                    </Route>

                    <Route exact path='/fragments/new' >
                        < NewFragment />
                    </Route>

                    <Route exact path='/fragments/edit' >
                        < EditFragment />
                    </Route>

                    <Route exact path="/stories" >
                        < StoriesContainer/>
                    </Route>

                    <Route exact path="/stories/new" >
                        < NewStory />                    
                    </Route>

                    <Route exact path="/stories/edit">
                        < EditStory />
                    </Route>

                    <Route exact path="/stories/:id" >
                        < StoryDetail />
                    </Route>

                    <Route exact path="/plots/new" >
                        < NewPlot />
                    </Route>

                    <Route exact path="/plots/edit">
                        < EditPlot />
                    </Route>

                    <Route exact path="/characters/new" >
                        < NewCharacter />
                    </Route>

                    <Route exact path="/characters/edit">
                        < EditCharacter />
                    </Route>

                    <Route exact path="/images/new">
                        < NewImage />
                    </Route>

                    <Route exact path="/images/edit">
                        < EditImage />
                    </Route>

                    <Route exact path="/character_notes/new">
                        < NewCharacterNote />
                    </Route>

                    <Route exact path="/character_notes/edit">
                        < EditCharacterNote />
                    </Route>

                    <Route exact path="/fragment_notes/new">
                        < NewFragmentNote />
                    </Route>

                    <Route exact path="/fragment_notes/edit">
                        < EditFragmentNote />
                    </Route>

                    <Route exact path="/scenes/new" >
                        < NewScene />
                    </Route>

                    <Route exact path="/scenes/edit" >
                        < EditScene />
                    </Route>

                    <Route exact path="/plot_notes/new" >
                        < NewPlotNote />
                    </Route>

                    <Route exact path="/plot_notes/edit" >
                        < EditPlotNote />
                    </Route>

                    <Route exact path="/appearances/new" >
                        <NewAppearance />
                    </Route>

                    <Route path="/login" >
                        {!!this.props.token ? <Redirect to="/stories"/> : <LoginContainer />}
                    </Route>

                    <Route exact path="/account">
                        < AccountContainer />    
                    </Route> 

                    <Route exact path="/about">
                        < About />
                    </Route>

                    <Route exact path='/'> 
                        {this.isUser()}
                    </Route>

                    <Route component={NoMatch} />

                </Switch>
            </Router>
        </StyledMainContainer>
        </ErrorBoundary>
    )}
}


const mapStateToProps = (state) => {
    return {
      token: state.token,
      user_id: state.user_id,
      load: state.load
    }
  }


  const mapDispatchToProps = (dispatch) => {
    return {
        set_content: ({stories, fragments, username}) => {
            dispatch(set_content({stories, fragments, username}))
        },
        set_account_data: ({email, image_url, bio}) => {
            dispatch(set_account_data({email, image_url, bio}))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)