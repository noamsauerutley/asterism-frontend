import React from 'react'
import { StyledNavLink, StyledUl, StyledLabel, StyledFragmentLi, StyledFragmentDiv } from '../assets/StyledComponents'
import { connect } from "react-redux"
import { set_current_fragment } from '../redux/actions' 
import FragmentNoteCard from './FragmentNoteCard'
import DeleteFragment from './DeleteFragment'

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
            <StyledNavLink activeClassName="active" to={`/fragments/edit`} onClick={this.handleOnClick}>✎    </StyledNavLink>
            < DeleteFragment fragment={this.props.fragment}/>
            <p
            style={{whiteSpace: "pre-wrap"}}
            >{this.props.fragment.text}</p>
            <StyledLabel>NOTES</StyledLabel><br></br>
            <StyledNavLink activeClassName="active" to={`/fragment_notes/new`} style={{marginTop: "20px", fontSize: "18px", fontWeight: "bold"}} onClick={this.handleOnClick}>＋</StyledNavLink>
            <StyledUl>{!!this.props.fragment.fragment_notes ? this.props.fragment.fragment_notes.map(fragment_note => < FragmentNoteCard fragment_note={fragment_note} fragment={this.props.fragment}/>) : "You haven't added any notes to this fragment."}</StyledUl>
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