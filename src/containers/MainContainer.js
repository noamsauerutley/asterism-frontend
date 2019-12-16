import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import LoginContainer from './LoginContainer'
import FragmentsContainer from './FragmentsContainer'
import StoriesContainer from './StoriesContainer'
import AccountContainer from './AccountContainer'

const MainContainer = (props) => {
    return(
        <>
        <Router>
            <Switch>
                    <Route exact path="/fragments" >
                        < FragmentsContainer />
                    </Route>

                    <Route path="/stories" >
                        < StoriesContainer/>
                    </Route>

                    <Route path="/login" >
                        <LoginContainer />
                    </Route>

                    <Route exact path="/account">
                        <AccountContainer/>    
                    </Route> 

                    <Route exact path='/'> 
                        <Redirect to="/login"/>
                    </Route>
                </Switch>
            </Router>
        </>
    )
}

export default MainContainer