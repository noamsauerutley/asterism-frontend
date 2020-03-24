import React from 'react'
import { StyledNav, StyledNavLink } from '../assets/StyledComponents'
import { connect } from 'react-redux'
import { logout } from '../redux/actions'

const NavBar = (props) => {

      let handleLogOut = (e) => {
        localStorage.clear()
        props.logout()
      }

    let logoutButton = () => {
        return !localStorage.token ? <StyledNavLink activeClassName="active" to="/login" >LOG IN</StyledNavLink> : <StyledNavLink activeClassName="active" to="/login" onClick={handleLogOut} >LOG OUT</StyledNavLink>
        }

    return(
        <StyledNav>
                <StyledNavLink activeClassName="active" to="/fragments" >FRAGMENTS </StyledNavLink>
                <StyledNavLink activeClassName="active" to="/stories" >STORIES</StyledNavLink>
                <StyledNavLink activeClassName="active" to="/about" style={{fontSize: "30px"}}>⁂</StyledNavLink>
                <StyledNavLink activeClassName="active" to={`/account`} >ACCOUNT</StyledNavLink>
                {logoutButton()}
          </StyledNav>
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