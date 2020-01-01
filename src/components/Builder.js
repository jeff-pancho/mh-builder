import React from "react";
import Grid from "./Grid";
import Picker from "./Picker";
import { SQUARE_SIZE } from "../utils/constants";
import { relativeCoords } from "../utils/utils";

class Builder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buildings: [],
            currentBuilding: {}
        };
    }

    createBuilding(row, column, width, height, colour) {
        return {
            row: row,
            column: column,
            width: width,
            height: height,
            colour: colour
        }
    }
    
    handleOnClick(e) {
        let {x, y} = relativeCoords(e);
        let row = Math.floor(y / SQUARE_SIZE);
        let column = Math.floor(x / SQUARE_SIZE);

        this.setState({
            buildings: this.state.buildings.concat([
                this.createBuilding(row, column, 1, 1, "#FF0000")
            ])
        });
    }

    handlePicker(building) {
        this.setState({
            currentBuilding: building
        });
    }

    render() {
        return (
            <div>
                <Grid 
                    buildings={this.state.buildings}
                    onClick={(e) => this.handleOnClick(e)}
                />
                <Picker onClick={(building) => this.handlePicker(building)} />
            </div>
        );
    }
}

export default Builder;