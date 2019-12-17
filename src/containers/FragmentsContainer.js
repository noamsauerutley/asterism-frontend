import React from 'react'
import { connect } from 'react-redux'
import FragmentCard from '../components/FragmentCard'


class FragmentsContainer extends React.Component{
    
    render(){
   return ( <>
         <div style={{textAlign: "center", marginTop: "30%"}}>
        <ul>
        {!!this.props.fragments.length ? this.props.fragments.map(fragment => <FragmentCard fragment={fragment} />) : "You haven't added any fragments yet!"}
        </ul>
        </div>
    </>
    )}
}

const mapStateToProps = (state) => {
    return {
      fragments: state.fragments
    }
  }


  export default connect(mapStateToProps)(FragmentsContainer)