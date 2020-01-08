import React from 'react'
import { connect } from 'react-redux'
import { StyledNavLink} from '../assets/StyledComponents'
import { delete_plot } from '../redux/actions'
import styled from 'styled-components'
import { colors } from '../assets/colors'


class DeletePlot extends React.Component{

    currentId = this.props.plot.id

    delete = async () => {
        await fetch(`https://asterism-api.herokuapp.com/plots/${this.currentId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            }
        })
        this.props.delete_plot(this.currentId)
        console.log(this.props.plot, "deleted!")
    } 

    render(){
        return(
            <StyledNavLink activeClassName="active" to={`/stories/${this.props.plot.story_id}`} onClick={this.delete} >✕</StyledNavLink>
        )}
}

const mapDispatchToProps = (dispatch) => {
    return {
        delete_plot: currentId => {
            dispatch(delete_plot(currentId))
        }
    }
}


export default connect(null, mapDispatchToProps)(DeletePlot)

