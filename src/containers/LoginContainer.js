import React from 'react'
import LogIn from '../components/LogIn'
import { StyledLogin } from '../assets/StyledComponents'

const LoginContainer = (props) => {
    return(
        <StyledLogin>
            <LogIn />
        </StyledLogin>
    )
}

export default LoginContainer