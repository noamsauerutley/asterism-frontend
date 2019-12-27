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
<<<<<<< HEAD
        return !props.token ? <NavLink to="/login" style={{color: "black", textDecorationColor: "black"}}>LOG IN</NavLink> : <NavLink to="/login" onClick={handleLogOut} style={{color: "black", textDecorationColor: "black"}}>LOG OUT</NavLink>
=======
        return !props.user_id ? <NavLink to="/login" style={{color: "black", textDecorationColor: "black"}}>LOG IN</NavLink> : <NavLink to="/login" onClick={handleLogOut} style={{color: "black", textDecorationColor: "black"}}>LOG OUT</NavLink>
>>>>>>> auth
        }

    return(
        <nav style={{ 
            position: "-webkit-sticky", 
            position: "sticky",
            backgroundColor: "white", 
            top: "0", 
            borderBottom: "solid", 
            borderWidth: "1px", 
            paddingBottom: "25px", 
            textAlign: "Center", 
            fontSize: "20px", 
            marginTop:"3%", 
            display: "flex", 
            justifyContent: "space-around"}}>
                <NavLink to="/fragments" style={{color: "black", textDecorationColor: "black"}}>FRAGMENTS </NavLink>
                <NavLink to="/stories" style={{color: "black", textDecorationColor: "black"}}>STORIES</NavLink>
                <NavLink to={`/account`} style={{color: "black", textDecorationColor: "black"}}>ACCOUNT</NavLink>
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