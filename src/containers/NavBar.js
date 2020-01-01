import React from 'react'
import { StyledNavLink } from '../assets/StyledComponents'
import { connect } from 'react-redux'
import { logout } from '../redux/actions'
import styled from 'styled-components'
import { colors } from '../assets/colors'
import logo from '../assets/logo32.png'

const StyledNav = styled.nav `
    z-index: 1;
    background: white;
    width: 95%;
    margin: 0 auto;
    font-family: Didot;
    color: ${colors.black};
    position: -webkit-sticky; 
    position: sticky;
    top: 0; 
    border-bottom: solid; 
    border-width: 1px;
    border-color: ${colors.border};
    padding-bottom: 25px; 
    text-align: Center; 
    font-size: 20px; 
    margin-top: 3%; 
    display: flex; 
    justify-content: space-around;
    text-decoration: none;
`

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