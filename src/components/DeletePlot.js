import React from 'react'
import { connect } from 'react-redux'
import { NavLink} from 'react-router-dom'
import { delete_plot } from '../redux/actions'

class DeletePlot extends React.Component{

    currentId = this.props.plot.id

    delete = async () => {
        await fetch(`http://localhost:3000/plots/${this.currentId}`, {
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
            <NavLink to={`/stories/${this.props.plot.story_id}`} onClick={this.delete} style={{color: "black"}}>DELETE</NavLink>
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

