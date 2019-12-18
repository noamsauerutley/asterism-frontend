import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../redux/actions'

const NavBar = (props) => {

      let handleLogOut = (e) => {
        localStorage.clear()
        props.logout()
      }

    let logoutButton = () => {
        return !localStorage.token ? <NavLink to="/login" style={{color: "#343a40", textDecorationColor: "#929ca7"}}>LOG IN</NavLink> : <NavLink to="/login" onClick={handleLogOut} style={{color: "#343a40", textDecorationColor: "#929ca7"}}>LOG OUT</NavLink>
        }

    return(
        <nav style={{ 
            position: "-webkit-sticky", 
            position: "sticky",
            top: "0", 
            borderBottom: "solid", 
            borderWidth: "1px", 
            borderColor: "#929ca7", 
            paddingBottom: "25px", 
            textAlign: "Center", 
            fontSize: "20px", 
            marginTop:"3%", 
            fontWeight: "100", 
            color: "#343a40", 
            display: "flex", 
            justifyContent: "space-around"}}>
                <NavLink to="/fragments" style={{color: "#343a40", textDecorationColor: "#929ca7"}}>FRAGMENTS </NavLink>
                <NavLink to="/stories" style={{color: "#343a40", textDecorationColor: "#929ca7"}}>STORIES</NavLink>
                <NavLink to={`/account`} style={{color: "#343a40", textDecorationColor: "#929ca7"}}>ACCOUNT</NavLink>
                {logoutButton()}
          </nav>
    )
}

const mapStateToProps = (state) => {
    return {
      user_id: state.user_id,
      token: state.token
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logout())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)