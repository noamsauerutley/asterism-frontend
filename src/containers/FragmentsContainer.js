import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import FragmentCard from '../components/FragmentCard'
import styled from 'styled-components'

const StyledFragmentsContainer = styled.div`
  font-family: "Didot";
`


class FragmentsContainer extends React.Component{
    
    render(){
   return ( 
      <StyledFragmentsContainer style={{textAlign: "Center"}}>
        <h1>MY FRAGMENTS</h1>
        <NavLink to="/fragments/new" style={{marginTop: "20px", color: "black", textDecorationColor: "black", fontSize: "24px"}}>NEW FRAGMENT</NavLink>
         <div style={{textAlign: "center"}}>
        <ul>
        {!!this.props.fragments.length ? this.props.fragments.map(fragment => <FragmentCard fragment={fragment} />) : "You haven't added any fragments yet!"}
        </ul>
        </div>
    </StyledFragmentsContainer>
    )}
}

const mapStateToProps = (state) => {
    return {
      fragments: state.fragments
    }
  }


  export default connect(mapStateToProps)(FragmentsContainer)