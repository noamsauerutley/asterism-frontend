import React from 'react'
import PlotNoteCard from './PlotNoteCard'
import DeletePlot from './DeletePlot'
import SceneCard from './SceneCard'
import { set_current_plot } from '../redux/actions'
import { connect } from 'react-redux'
import { NavLink} from 'react-router-dom'

class PlotCard extends React.Component{

    setCurrentPlot = () => {
        this.props.set_current_plot(this.props.plot)
    }

    render(){
        return <li style={{listStyle: "none"}}>
    <div style={{border: "dashed", borderWidth: "1px", width: "350px", height: "500px", margin: "40px",  overflow: "hidden"}}>
        <NavLink to="/plots/edit" style={{color: "black", textDecoration: "none"}} onClick={this.setCurrentPlot}>✎</NavLink><br></br>
        < DeletePlot plot={this.props.plot}/>
        <h5>{this.props.plot.name}</h5>
        <p>{this.props.plot.summary}</p>
        <label>SCENES:</label><br></br>
        <NavLink to={`/scenes/new`} style={{marginTop: "20px", color: "black", textDecorationColor: "black"}} onClick={this.setCurrentPlot}>ADD SCENE</NavLink><br></br>
        {(!!this.props.plot.scenes && !!this.props.plot.scenes.length) ? <ul>{this.props.plot.scenes.map(scene => < SceneCard scene={scene}/>)}</ul> : "You haven't added any scenes to this plot arc."}<br></br>
        <label>NOTES:</label><br></br>
        <NavLink to={`/plot_notes/new`} style={{marginTop: "20px", color: "black", textDecorationColor: "black"}} onClick={this.setCurrentPlot}>ADD NOTE</NavLink>
        <ul>{(!!this.props.plot.plot_notes && !!this.props.plot.plot_notes.length) ? this.props.plot.plot_notes.map(plot_note => <PlotNoteCard plot_note = {plot_note} />) : "You haven't added any notes to this plot arc."}</ul>
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