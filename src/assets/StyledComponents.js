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