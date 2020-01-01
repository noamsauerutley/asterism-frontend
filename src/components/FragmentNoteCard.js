import React from 'react'
import DeleteFragmentNote from './DeleteFragmentNote'
import { set_current_fragment_note, set_current_fragment } from '../redux/actions'
import { connect } from 'react-redux'
import { StyledNavLink} from '../assets/StyledComponents'
import styled from 'styled-components'
import { colors } from '../assets/colors'


const StyledFragmentNoteCard = styled.li`
    margin: 5px;
    width: 45%;
    height: 200px;
    overflow: hidden;
    overflow-y: scroll;
    list-style: none;
    white-space: pre-wrap;
    border: dotted;
    border-width: 1px;
    border-color: silver;
`

const StyledDiv = styled.div`
    width: 100%;
    height: 100%;
`

class FragmentNoteCard extends React.Component{

    setCurrentFragmentNote = () => {
        this.props.set_current_fragment_note(this.props.fragment_note)
        this.props.set_current_fragment(this.props.fragment)
    }

    render(){
        return <StyledFragmentNoteCard onClick={this.setCurrentFragmentNote}>
            {/* <StyledDiv> */}
            <p>{this.props.fragment_note.text}</p>
            <StyledNavLink activeClassName="active" to="/fragment_notes/edit" >✎   </StyledNavLink>
            < DeleteFragmentNote fragment_note={this.props.fragment_note} fragment={this.props.fragment}/>
            {/* </StyledDiv> */}
    </StyledFragmentNoteCard>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_current_fragment_note: currentFragmentNote => {
            dispatch(set_current_fragment_note(currentFragmentNote))
        },
        set_current_fragment: currentFragment => {
            dispatch(set_current_fragment(currentFragment))
        }
    }
}


  export default connect(null, mapDispatchToProps)(FragmentNoteCard)