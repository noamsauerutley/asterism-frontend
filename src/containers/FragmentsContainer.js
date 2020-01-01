import React from 'react'
import { connect } from 'react-redux'
import { StyledNavLink } from '../assets/StyledComponents'
import FragmentCard from '../components/FragmentCard'
import styled from 'styled-components'
import { colors } from '../assets/colors'


const StyledFragmentsContainer = styled.div`
  width: 95%;
  font-family: "Didot";
  color: ${colors.black};
`

const StyledFragmentsUl = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  text-align: center;
  color: ${colors.black};
`


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