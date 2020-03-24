import React from 'react'
import { connect } from 'react-redux'
import { StyledNavLink, StyledFragmentsContainer, StyledFragmentsUl } from '../assets/StyledComponents'
import FragmentCard from '../components/FragmentCard'

class FragmentsContainer extends React.Component{
    
    render(){
   return ( 
      <StyledFragmentsContainer >
        <h1>MY FRAGMENTS</h1>
        <StyledNavLink activeClassName="active" to="/fragments/new" style={{marginTop: "20px", fontWeight: "bold", fontSize: "24px"}}>＋</StyledNavLink>
         <div style={{textAlign: "center"}}>
        <StyledFragmentsUl>
        {!!this.props.fragments.length ? this.props.fragments.map(fragment => <FragmentCard fragment={fragment} />) : "You haven't added any fragments yet!"}
        </StyledFragmentsUl>
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