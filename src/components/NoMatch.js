import React from 'react'
import {StyledLabel } from '../assets/StyledComponents'

const NoMatch = (props) => {
    return(
    <div style={{height: "45vh", margin: "0 auto", marginTop: "15%",  textAlign: "center"}}>
        <StyledLabel style={{fontSize: "20px"}}>You have taken a wrong turn.</StyledLabel>
    </div>)
}

export default NoMatch