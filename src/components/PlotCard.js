import React from 'react'
import PlotNoteCard from './PlotNoteCard'
import DeletePlot from './DeletePlot'
import { set_current_plot } from '../redux/actions'
import { connect } from 'react-redux'
import { NavLink} from 'react-router-dom'

class PlotCard extends React.Component{
     plot = this.props.plot
     currentId = this.plot.id

    setCurrentPlot = () => {
        this.props.set_current_plot(this.props.plot)
    }

    render(){
        return <li style={{listStyle: "none"}}>
    <div style={{border: "dashed", borderWidth: "1px", width: "350px", height: "500px", margin: "40px",  overflow: "hidden"}}>
        <h5>{this.plot.name}</h5>
        <p>{this.plot.summary}</p>
        <NavLink to="/plots/edit" style={{color: "black", textDecoration: "none"}} onClick={this.setCurrentPlot}>✎</NavLink><br></br>
        <label>NOTES:</label>
        <ul>{!!this.plot.plot_notes ? this.plot.plot_notes.map(plot_note => <PlotNoteCard plot_note = {plot_note} />) : "You haven't added any notes to this plot arc."}</ul>
        <label>SCENES:</label>
        <ul>{!!this.plot.scenes ? this.plot.scenes.map(scene => <li style={{listStyle: "none"}}><h3>{scene.name}</h3><p>{scene.summary}</p></li>) : "You haven't added any scenes to this plot arc."}</ul>
        < DeletePlot plot={this.plot}/>
    </div>
    </li>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_current_plot: currentPlot => {
            dispatch(set_current_plot(currentPlot))
        }
    }
}


  export default connect(null, mapDispatchToProps)(PlotCard)