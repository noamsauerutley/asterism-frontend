import React from 'react'
import LogIn from '../components/LogIn'
import styled from 'styled-components'
import { colors } from '../assets/colors'


const StyledLogin = styled.section`
font-family: "Didot";
`

const LoginContainer = (props) => {
    return(
        <StyledLogin>
            <LogIn />
        </StyledLogin>
    )
}

export default LoginContainer