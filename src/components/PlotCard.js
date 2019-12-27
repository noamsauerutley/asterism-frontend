import React from 'react'
import PlotNoteCard from './PlotNoteCard'
import { connect } from 'react-redux'
import { delete_plot } from '../redux/actions'
import { NavLink} from 'react-router-dom'

class PlotCard extends React.Component{
     plot = this.props.plot
     currentId = this.plot.id


     delete = async () => {
        this.props.delete_plot(this.currentId)
        await fetch(`http://localhost:3000/plots/${this.currentId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            }
        })
        console.log(this.currentId)
        console.log(this.plot, "deleted!")
    } 

    render(){
        return <li style={{listStyle: "none"}}>
    <div style={{border: "dashed", borderWidth: "1px", width: "350px", height: "500px", margin: "40px",  overflow: "hidden"}}>
    <h5>{this.plot.name}</h5>
    <p>{this.plot.summary}</p>
    <label>NOTES:</label>
    <ul>{!!this.plot.plot_notes ? this.plot.plot_notes.map(plot_note => <PlotNoteCard plot_note = {plot_note} />) : "You haven't added any notes to this plot arc."}</ul>
    <label>SCENES:</label>
    <ul>{!!this.plot.scenes ? this.plot.scenes.map(scene => <li style={{listStyle: "none"}}><h3>{scene.name}</h3><p>{scene.summary}</p></li>) : "You haven't added any scenes to this plot arc."}</ul>
    <NavLink to={`/stories/${this.plot.story_id}`} onClick={this.delete} style={{color: "black"}}>DELETE</NavLink>
    </div>
    </li>
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        delete_plot: currentId => {
            dispatch(delete_plot(currentId))
        }
    }
}

  export default connect(null, mapDispatchToProps)(PlotCard)