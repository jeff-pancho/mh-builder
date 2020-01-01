import React from "react";
import Grid from "./Grid";
import Picker from "./Picker";
import { SQUARE_SIZE, BUILDINGS } from "../utils/constants";
import { relativeCoords } from "../utils/utils";

class Builder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buildings: [],
            currentBuilding: BUILDINGS[0]
        };
    }

    createBuilding(row, column, building) {
        let obj1 = {
            row: row,
            column: column
        }
        return {...obj1, ...building};
    }
    
    handleOnClick(e) {
        let {x, y} = relativeCoords(e);
        let row = Math.floor(y / SQUARE_SIZE);
        let column = Math.floor(x / SQUARE_SIZE);

        this.setState({
            buildings: this.state.buildings.concat([
                this.createBuilding(row, column, this.state.currentBuilding)
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