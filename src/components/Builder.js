import React from "react";
import Grid from "./Grid";
import Picker from "./Picker";
import { WIDTH, HEIGHT, SQUARE_SIZE, BUILDINGS } from "../utils/constants";
import { 
    relativeCoords,
    generateEmptyGrid,
    checkForAvailableSpace
} from "../utils/utils";

class Builder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buildings: [],
            currentBuilding: BUILDINGS[0],
            grid: generateEmptyGrid(WIDTH, HEIGHT),
            mousePos: { row: 0, column: 0 }
        };
    }

    createBuilding(row, column, building) {
        return {
            row: row,
            column: column,
            ...building
        };
    }
    
    handleOnClick(e) {
        const { x, y } = relativeCoords(e);
        const { width, height } = this.state.currentBuilding;
        const row = Math.floor(y / SQUARE_SIZE);
        const column = Math.floor(x / SQUARE_SIZE);
        const endRow = row + height;
        const endColumn = column + width;
        const grid = this.state.grid.slice()

        if (checkForAvailableSpace(grid, row, column, width, height)) {
            for (let r = row; r < endRow; r++) {
                for (let c = column; c < endColumn; c++) {
                    grid[r][c] = `${row},${column};`
                }
            }
            this.setState({
                buildings: this.state.buildings.concat([
                    this.createBuilding(row, column, this.state.currentBuilding)
                ]),
                grid: grid
            });
        }
    }

    handleOnMouseMove(e) {
        const { x, y } = relativeCoords(e);
        const row = Math.floor(y / SQUARE_SIZE);
        const column = Math.floor(x / SQUARE_SIZE);
        const {row: prevRow, column: prevColumn} = this.state.mousePos;
        
        if (row !== prevRow || column !== prevColumn) {
            // update to new row/column pos
            this.setState({
                mousePos: {row: row, column: column}
            })
            console.log({row: row, column: column});
        }
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
                    onMouseMove={(e) => this.handleOnMouseMove(e)}
                />
                <Picker onClick={(building) => this.handlePicker(building)} />
            </div>
        );
    }
}

export default Builder;