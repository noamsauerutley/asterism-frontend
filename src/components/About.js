import React from 'react'
import styled from 'styled-components'
import { colors } from '../assets/colors'
const StyledParagraph = styled.p`
font-family: "Didot";
text-align: center;
justify: space-around;
white-space: pre-wrap;
margin-top: 10%
height: 60vh
`

const About = (props) => {
    return(
    <StyledParagraph>

        "In typography, an asterism ("group of stars") is the typographic symbol consisting of three asterisks placed in a triangle: ⁂.
        <br></br><br></br>
    Its purpose is to "indicate minor breaks in text", call attention to a passage, or to separate sub-chapters in a book."
<br></br><br></br>
    Asterism is an app for writers.
<br></br><br></br>
    Here, you can organize your thoughts, develop characters and plot ideas, and develop concepts organically.
<br></br><br></br>
    Happy writing!
    </StyledParagraph>)
    }

export default About