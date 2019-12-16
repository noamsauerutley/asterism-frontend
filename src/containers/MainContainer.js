import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import NavBar from './NavBar'
import LoginContainer from './LoginContainer'
import FragmentsContainer from './FragmentsContainer'
import StoriesContainer from './StoriesContainer'
import AccountContainer from './AccountContainer'

class MainContainer extends React.Component{
    isUser = () => {
        // console.log(this.props)
       return !!localStorage.user_id? <Redirect to="/account" /> : <Redirect to="/login"/>
    }


    componentDidMount = async () => {
        // let rawData = await fetch(http://localhost:3000/authors/${localStorage.userId})
    }

    render(){return(
        <>
        <Router>
        <NavBar />
            <Switch>
                    <Route exact path="/fragments" >
                        < FragmentsContainer />
                    </Route>

                    <Route path="/stories" >
                        < StoriesContainer/>
                    </Route>

                    <Route path="/login" >
                        {!!this.props.token ? <Redirect to="/account"/> : <LoginContainer />}

                    </Route>

                    <Route exact path="/account">
                        <AccountContainer/>    
                    </Route> 

                    <Route exact path='/'> 
                        {this.isUser()}
                    </Route>
                </Switch>
            </Router>
        </>
    )}
}


const mapStateToProps = (state) => {
    return {
      token: state.token,
      user_id: state.user_id
    }
  }

export default connect(mapStateToProps)(MainContainer)