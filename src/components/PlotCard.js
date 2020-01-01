import React from 'react'
import PlotNoteCard from './PlotNoteCard'
import DeletePlot from './DeletePlot'
import SceneCard from './SceneCard'
import { set_current_plot } from '../redux/actions'
import { connect } from 'react-redux'
import { StyledNavLink} from '../assets/StyledComponents'
import styled from 'styled-components'
import { colors } from '../assets/colors'


class PlotCard extends React.Component{

    setCurrentPlot = () => {
        this.props.set_current_plot(this.props.plot)
    }

    render(){
        return <li style={{listStyle: "none"}}>
    <div style={{border: "dashed", borderWidth: "1px", width: "350px", height: "500px", margin: "40px",  overflow: "hidden", overflowY: "scroll"}}>
        <h5>{this.props.plot.name}</h5>
        <StyledNavLink activeClassName="active" to="/plots/edit" onClick={this.setCurrentPlot}>✎   </StyledNavLink>
        < DeletePlot plot={this.props.plot}/>
        <p>{this.props.plot.summary}</p>
        <label>SCENES:</label><br></br>
        <StyledNavLink activeClassName="active" to={`/scenes/new`} style={{marginTop: "20px", fontSize: "20px"}} onClick={this.setCurrentPlot}>＋</StyledNavLink><br></br>
        {(!!this.props.plot.scenes && !!this.props.plot.scenes.length) ? <ul>{this.props.plot.scenes.map(scene => < SceneCard scene={scene}/>)}</ul> : "You haven't added any scenes to this plot arc."}<br></br>
        <label>NOTES:</label><br></br>
        <StyledNavLink activeClassName="active" to={`/plot_notes/new`} style={{marginTop: "20px", fontSize: "20px"}} onClick={this.setCurrentPlot}>＋</StyledNavLink>
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