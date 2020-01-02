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
            mousePos: { row: 0, column: 0 },
            buildingGhost: BUILDINGS[0]
        };
    }

    createBuilding(row, column, building) {
        return {
            row: row,
            column: column,
            ...building
        };
    }
    
    handleOnClick() {
        const { width, height } = this.state.currentBuilding;
        const { row, column } = this.state.mousePos;
        const endRow = row + height;
        const endColumn = column + width;
        const grid = this.state.grid.slice()
        
        if (checkForAvailableSpace(grid, row, column, width, height)) {
            for (let r = row; r < endRow; r++) {
                for (let c = column; c < endColumn; c++) {
                    grid[r][c] = this.state.buildings.length;
                }
            }
            this.setState({
                buildings: this.state.buildings.concat([
                    this.createBuilding(row, column, this.state.currentBuilding)
                ]),
                grid: grid,
                buildingGhost: this.renderBuildingGhost(row, column)
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
                mousePos: {row: row, column: column},
                buildingGhost: this.renderBuildingGhost(row, column)
            });
            
            // console.log({row: row, column: column});
        }
    }

    handleRemoveBuilding(e) {
        e.preventDefault();
        const grid = this.state.grid.slice();
        const {row: mouseRow, column: mouseColumn} = this.state.mousePos;
        const id = grid[mouseRow][mouseColumn];

        if (id !== null) {
            const buildings = this.state.buildings.slice();
            const { row, column, width, height } = buildings[id];
            const endRow = row + height;
            const endColumn = column + width;

            for (let r = row; r < endRow; r++) {
                for (let c = column; c < endColumn; c++) {
                    grid[r][c] = null;
                }
            }
            buildings[id] = null;

            this.setState({
                buildings: buildings,
                grid: grid,
                buildingGhost: this.renderBuildingGhost(row, column)
            });
        }
    }

    handlePicker(building) {
        this.setState({
            currentBuilding: building
        });
    }

    renderBuildingGhost(row, column) {
        const grid = this.state.grid.slice();
        const { width, height } = this.state.currentBuilding;
        const buildingGhost = this.createBuilding(row, column, this.state.currentBuilding);
        if (!checkForAvailableSpace(grid, row, column, width, height)) {
            buildingGhost.colour = "#8a0000";
        }
        
        return buildingGhost;
    }

    render() {
        return (
            <div>
                <Grid 
                    buildings={this.state.buildings}
                    buildingGhost={this.state.buildingGhost}
                    onClick={() => this.handleOnClick()}
                    onMouseMove={(e) => this.handleOnMouseMove(e)}
                    onContextMenu={(e) => this.handleRemoveBuilding(e)} 
                />
                <Picker onClick={(building) => this.handlePicker(building)} />
            </div>
        );
    }
}

export default Builder;