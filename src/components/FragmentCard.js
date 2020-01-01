import React from 'react'
import { StyledNavLink} from '../assets/StyledComponents'
import { connect } from "react-redux"
import { set_current_fragment } from '../redux/actions' 
import FragmentNoteCard from './FragmentNoteCard'
import DeleteFragment from './DeleteFragment'
import { colors } from '../assets/colors'
import styled from 'styled-components'

const StyledFragmentLi = styled.li`
    font-family: "Times New Roman";
    white-space: pre-wrap;
    list-style: none;
    border: dashed 1px;
    border-color: ${colors.black};
    margin: 5px;
    display: block;
    width: 325px;
    height: 325px;
    padding: 20px;
    outline: 2px solid;
    outline-color: ${colors.black};
    outline-offset: -10px;
`

const StyledFragmentDiv = styled.div`
    height: 300px;
    overflow: hidden;
    overflow-y: scroll;

`

class FragmentCard extends React.Component {


    handleOnClick = (event) => {
        console.log(this.props.fragment)
        this.setState({
            updated: true
        })
        this.props.set_current_fragment(this.props.fragment);
      }

    render(){
        return(
        <StyledFragmentLi >
            <StyledFragmentDiv>
            <h3>{this.props.fragment.title}</h3>
            <p
            style={{whiteSpace: "pre-wrap"}}
            >{this.props.fragment.text}</p>
            <StyledNavLink activeClassName="active" to={`/fragments/edit`} onClick={this.handleOnClick}>✎    </StyledNavLink>
            < DeleteFragment /><br></br><br></br>
            <label>NOTES</label><br></br>
            <StyledNavLink activeClassName="active" to={`/fragment_notes/new`} style={{marginTop: "20px", fontSize: "18px", fontWeight: "bold"}} onClick={this.handleOnClick}>＋</StyledNavLink>
            <ul>{!!this.props.fragment.fragment_notes ? this.props.fragment.fragment_notes.map(fragment_note => < FragmentNoteCard fragment_note={fragment_note} fragment={this.props.fragment}/>) : "You haven't added any notes to this fragment."}</ul>
            </StyledFragmentDiv>
        </StyledFragmentLi>
    )}
}
const mapDispatchToProps = (dispatch) => {
    return {
        set_current_fragment: currentFragment => {
            dispatch(set_current_fragment(currentFragment))
        }
    }
}


export default connect(null, mapDispatchToProps)(FragmentCard)