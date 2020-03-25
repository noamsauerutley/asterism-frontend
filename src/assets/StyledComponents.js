import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from './colors'

export const StyledParagraph = styled.p`
font-family: "Didot";
text-align: center;
justify: space-around;
white-space: pre-wrap;
margin-top: 10%;
height: 60vh;
color: ${colors.black}
`

export const StyledDiv = styled.div`
    width: 100%;
    height: 100%;
`

export const StyledNavLink = styled(NavLink)`
text-decoration: none;
background: Transparent;
color: ${colors.black};
transition: color .7s, box-shadow .7s ease-in-out;

&:hover{
  color: ${colors.lightGreen};
}

&.active{
  box-shadow: 0 8px  2px -6px ${colors.lightGreen};
  -moz-box-shadow:  0 8px 2px -6px ${colors.lightGreen};
  -webkit-box-shadow:  0 8px 2px -6px ${colors.lightGreen};
}
`

export const StyledInput = styled.input`
  background: transparent;
  font-family: Didot;
  color: ${colors.black};
  font-size: 16px;
  width: 40%;
`


export const StyledButton = styled.button`
background: Transparent;
border: Transparent;
font-family: Didot;
color: ${colors.black};
font-size: 16px;
transition: color.7s;

&:hover{
  color: ${colors.lightGreen}
}

&.active{
  box-shadow: 0 8px  2px -6px ${colors.lightGreen};
  -moz-box-shadow:  0 8px 2px -6px ${colors.lightGreen};
  -webkit-box-shadow:  0 8px 2px -6px ${colors.lightGreen};
}
`

export const StyledSubmit = styled.input`
    background: Transparent
    border-color: Transparent;
    background: Transparent;
    font-size: 16px;
    font-family: Didot;
    margin: 40px;
    color: ${colors.black};

    transition: color .7s ease-in-out;


    &:hover{
      color: ${colors.lightGreen};
    }
    
    &.active{
      box-shadow: 0 8px  2px -6px ${colors.lightGreen};
      -moz-box-shadow:  0 8px 2px -6px ${colors.lightGreen};
      -webkit-box-shadow:  0 8px 2px -6px ${colors.lightGreen};
    }
`

export const StyledSelect = styled.select`
  margin: 0 auto;
  width: 40%;
  height: 40px;
  font-family: Didot;
  display: block;
  font-size: 18px;
  color: ${colors.black};
  background: Transparent;
  border: 1px solid;
  border-color: silver;
  box-sizing: border-box;
	border-radius: 0;
  transition: color .7s ease-in-out, border-color .7s ease-in-out;

  &:hover{
    border-color: ${colors.lightGreen}
  }

  &:focus{
    color: ${colors.lightGreen};
  }
  `

export const StyledNoteCard = styled.li`
margin: 5px;
width: 35%;
height: 200px;
white-space: pre-wrap;
padding: 15px;
overflow: hidden;
overflow-y: scroll;
list-style: none;
border: dotted;
border-width: 1px;
border-color: silver;
text-align: center;
`

export const StyledUl =  styled.ul`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
`

export const StyledTextInput = styled.input`
text-align: center;
font-family: Didot;
font-size: 14px;
width: 80%;
border-style: dotted;
border-width: 1px;
border-color: lightGrey;
color: ${colors.black}
`

export const StyledTextArea = styled.textarea`
    text-align: center;
    font-family: Didot;
    font-size: 14px;
    width: 80%;
    height: 300px;
    border-style: dotted;
    border-width: 1px;
    border-color: lightGrey;
    resize: none;
    overflow-y: scroll;
    white-space: pre-wrap;
    color: ${colors.black}
`

export const StyledLabel = styled.label`
    font-family: Didot;
    font-color: ${colors.black}
`

export const StyledHeader = styled.h3`
  font-family: Didot;
  color: ${colors.black};
  margin-top: 5%;
`

export const StyledCharacterCard = styled.li`
    list-style: none;
    white-space: pre-wrap;
    margin: 0 auto;
    color: ${colors.black};
    text-decoration: none;
`

export const StyledCharacterNoteCard = styled.div`
white-space: pre-wrap;
`

export const StyledFragmentLi = styled.li`
    font-family: "Times New Roman";
    white-space: pre-wrap;
    list-style: none;
    border: dotted 1px;
    border-color: ${colors.black};
    margin: 5px;
    display: block;
    width: 500px;
    height: auto;
    padding: 20px;
    outline: 2px solid;
    outline-color: ${colors.black};
    outline-offset: -10px;
`


export const StyledFragmentDiv = styled.div`
    height: 95%;
    overflow: hidden;
    overflow-y: scroll;

`

export const StyledImageCard = styled.li`
text-align: center;
height: 325px;
width: 300px;
overflow-x: hidden;
overflow-y: hidden;
list-style: none;
border: 1px double;
outline: 2px solid;
outline-offset: -10px;
text-align: center;
margin: 15px 15px 15px 15px;
padding: 20px;
opacity: .9;
}
`

export const StyledStoryCard = styled.li`
list-style: none;
color: ${colors.black}; 
box-shadow: 5px 5px ${colors.lightGreen}; 
border: solid; 
border-width: 1px; 
border-left-width: 3px; 
border-color: ${colors.black}; 
width: 250px; 
height: 350px; 
margin: 40px; 
white-space: pre-wrap;
padding: 20px;
transition: height .75s, width .75s;

&:hover{
    width: 275px;
    height: 375px;
}
`

export const StyledStoryCardContent = styled.div`
color: ${colors.black}; 
height: 242px;
width: 250px;
overflow: hidden;
overflow-y: scroll;
`

export const StyledStoryDetail = styled.div`
font-family: "Didot";
`

// account

export const StyledAccountContainer = styled.div`
font-family: "Didot";
color: ${colors.black};
text-align: center;
justify: space-around;
`

export const StyledProfilePicture = styled.img`
width: 100%;
margin-bottom: 10px;
`

export const StyledProfilePictureContainer = styled.div`
margin: 0 auto;
text-align: center;
width: 250px;
height: 300px;
overflow-x: hidden;
overflow-y: hidden;
margin-top: 5%;
border: 1px double;
outline: 2px solid;
outline-offset: -10px;
text-align: center;
padding: 20px;
opacity: .9;
`


export const StyledFragmentsContainer = styled.div`
  width: 95%;
  font-family: "Didot";
  color: ${colors.black};
`

export const StyledFragmentsUl = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  text-align: center;
  color: ${colors.black};
`
export const StyledLogin = styled.section`
font-family: "Didot";
color: ${colors.black};
`
export const StyledMainContainer = styled.div`
z-index: 2;
width: 92vw;
heigh: 100vh;
bottom: 0px;
border: 1px double;
border-color: ${colors.black};
outline: 2px solid;
outline-offset: -10px;
outline-color: ${colors.black};
text-align: center;
margin: 15px 15px 15px 15px;
padding: 20px;
`
export const StyledNav = styled.nav `
z-index: 1;
background: white;
width: 100%;
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

export const StyledStoriesContainer = styled.div`
font-family: "Didot";
color: ${colors.black};
`