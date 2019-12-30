import React from "react";
import Grid from "./Grid.js";
import Picker from "./Picker.js";
import RadiusSlider from "./RadiusSlider.js";
import { ClearButton, UndoButton, RedoButton } from "./Buttons.js";
import { generateEmptyGrid } from "../utils/utils.js";

class Builder extends React.Component {
    constructor(props) {
        super(props);

        const width = this.props.width;
        const height = this.props.height;
        this.state = {
            history: [{
                grid: generateEmptyGrid(width, height)
            }],
            stateNumber: 0,
            currentColour: "#FF0000",
            currentRadius: 1
        }
        console.log(this.state);
    }

    handleClick(row, column) {
        const history = this.state.history.slice(0, this.state.stateNumber + 1);
        // deep-copy of object
        const current = JSON.parse(JSON.stringify(history[this.state.stateNumber]));
        const grid = current.grid.slice();

        // check for no redundant placement
        if (grid[row][column] !== this.state.currentColour) {
            grid[row][column] = this.state.currentColour;
            this.setState({
                history: history.concat([{
                    grid: grid
                }]),
                stateNumber: this.state.stateNumber + 1
            });
        }
    }

    handleClear() {
        const width = this.props.width;
        const height = this.props.height;

        const history = this.state.history.slice(0, this.state.stateNumber + 1);

        this.setState({
            history: history.concat([{
                grid: generateEmptyGrid(width, height)
            }]),
            stateNumber: this.state.stateNumber + 1
        });
    }

    handleUndo() {
        if (this.state.stateNumber > 0) {
            this.setState({
                stateNumber: this.state.stateNumber - 1
            });
        }
    }

    handleRedo() {
        if (this.state.stateNumber < this.state.history.length - 1) {
            this.setState({
                stateNumber: this.state.stateNumber + 1
            });
        }
    }

    handleColourPick(colour) {
        this.setState({
            currentColour: colour
        });
    } 

    handleChange(e) {
        console.log(e.target.value);
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stateNumber];

        return (
            <div>
                <Grid 
                    grid={current.grid}
                    width={this.props.width}
                    height={this.props.height}
                    onClick={(row, column) => this.handleClick(row, column)}
                />
                <div className="buttons-container">
                    <UndoButton onClick={() => this.handleUndo()}/>
                    <RedoButton onClick={() => this.handleRedo()}/>
                    <ClearButton onClick={() => this.handleClear()}/>
                </div>
                <Picker
                    onClick={(colour) => this.handleColourPick(colour)} 
                />
                <RadiusSlider onChange={(e) => this.handleChange(e)}/>
            </div>
        );
    }
}

export default Builder;