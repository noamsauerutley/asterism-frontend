import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../redux/actions'
import styled from 'styled-components'
import logo from '../assets/logo32.png'

const StyledNav = styled.nav `
    background: white;
    width: 95%;
    margin: 0 auto;
    font-family: Didot;
    position: -webkit-sticky; 
    position: sticky;
    top: 0; 
    border-bottom: solid; 
    border-width: 1px;
    padding-bottom: 25px; 
    text-align: Center; 
    font-size: 20px; 
    margin-top: 3%; 
    display: flex; 
    justify-content: space-around;
`

const NavBar = (props) => {

      let handleLogOut = (e) => {
        localStorage.clear()
        props.logout()
      }

    let logoutButton = () => {
        return !localStorage.token ? <NavLink to="/login" style={{color: "black", textDecorationColor: "black"}}>LOG IN</NavLink> : <NavLink to="/login" onClick={handleLogOut} style={{color: "black", textDecorationColor: "black"}}>LOG OUT</NavLink>
        }

    return(
        <StyledNav>
                <NavLink to="/fragments" style={{color: "black", textDecorationColor: "black"}}>FRAGMENTS </NavLink>
                <NavLink to="/stories" style={{color: "black", textDecorationColor: "black"}}>STORIES</NavLink>
                <img src={logo}/>
                <NavLink to={`/account`} style={{color: "black", textDecorationColor: "black"}}>ACCOUNT</NavLink>
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