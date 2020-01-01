import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from './colors'


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

    transition: color.7s;


    &:hover{
      color: ${colors.lightGreen};
    }
    
    &.active{
      box-shadow: 0 8px  2px -6px ${colors.lightGreen};
      -moz-box-shadow:  0 8px 2px -6px ${colors.lightGreen};
      -webkit-box-shadow:  0 8px 2px -6px ${colors.lightGreen};
    }
`

export const StyledNoteCard = styled.li`
margin: 5px;
width: 45%;
height: 200px;
word-break: break-all;
white-space: pre-wrap;
overflow: hidden;
overflow-y: scroll;
list-style: none;
border: dotted;
border-width: 1px;
border-color: silver;
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