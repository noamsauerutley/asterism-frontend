import React from 'react'
import { connect } from 'react-redux'
import { NavLink} from 'react-router-dom'
import { delete_plot_note, update_plot } from '../redux/actions'
import styled from 'styled-components'
import { colors } from '../assets/colors'


class DeletePlotNote extends React.Component {

    delete = async () => {
        await fetch(`http://localhost:3000/plot_notes/${this.props.plot_note.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            }
        })
        this.props.delete_plot_note(this.props.plot_note.id)
        this.props.update_plot(this.props.currentPlot) 
    } 

    render(){
        return(
            <NavLink to={`/stories/${this.props.currentStory.id}`} onClick={this.delete} style={{color: "black", textDecoration: "none"}}>✕</NavLink>
        )}
}


const mapStateToProps = (state) => {
    return {
        currentStory: state.currentStory,
        currentPlot: state.currentPlot,
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        delete_plot_note: currentId => {
            dispatch(delete_plot_note(currentId))
        },
        update_plot: (currentPlot) => {
            dispatch(update_plot(currentPlot))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DeletePlotNote)

