import React from "react";
import Grid from "./Grid";
import Picker from "./Picker";
import Buttons from "./Buttons";

import BuilderPanel from "./BuilderPanel";

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
            history: [{
                buildings: [],
                grid: generateEmptyGrid(WIDTH, HEIGHT),
            }],
            currentBuilding: BUILDINGS[0],
            mousePos: { row: 0, column: 0 },
            buildingGhost: BUILDINGS[0],
            stateNumber: 0
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

        const history = this.state.history.slice(0, this.state.stateNumber + 1);
        // deep-copy of object
        const current = JSON.parse(JSON.stringify(history[this.state.stateNumber]));
        const grid = current.grid.slice()
        
        if (checkForAvailableSpace(grid, row, column, width, height)) {
            let buildings = current.buildings.slice();

            for (let r = row; r < endRow; r++) {
                for (let c = column; c < endColumn; c++) {
                    grid[r][c] = buildings.length;
                }
            }
            
            buildings = buildings.concat([
                this.createBuilding(row, column, this.state.currentBuilding)
            ]);

            this.setState({
                history: history.concat([{
                    buildings: buildings,
                    grid: grid
                }]),
                stateNumber: this.state.stateNumber + 1,
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
        const history = this.state.history.slice(0, this.state.stateNumber + 1);
        const current = JSON.parse(JSON.stringify(history[this.state.stateNumber]));
        const grid = current.grid.slice();
        const {row: mouseRow, column: mouseColumn} = this.state.mousePos;
        const id = grid[mouseRow][mouseColumn];

        if (id !== null) {
            const buildings = current.buildings.slice();
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
                history: history.concat([{
                    buildings: buildings,
                    grid: grid
                }]),
                stateNumber: this.state.stateNumber + 1,
                buildingGhost: this.renderBuildingGhost(mouseRow, mouseColumn)
            });
        }
    }

    handlePicker(building) {
        this.setState({
            currentBuilding: building
        });
    }

    renderBuildingGhost(row, column) {
        const history = this.state.history.slice(0, this.state.stateNumber + 1);
        const current = history[this.state.stateNumber];
        const grid = current.grid.slice();
        const { width, height } = this.state.currentBuilding;
        const buildingGhost = this.createBuilding(row, column, this.state.currentBuilding);
        if (!checkForAvailableSpace(grid, row, column, width, height)) {
            buildingGhost.colour = "#8a0000";
        }
        
        return buildingGhost;
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


    handleClear() {
        const history = this.state.history.slice(0, this.state.stateNumber + 1);

        this.setState({
            history: history.concat([{
                buildings: [],
                grid: generateEmptyGrid(WIDTH, HEIGHT),
            }]),
            stateNumber: this.state.stateNumber + 1
        });
    }

    handleRotate() {
        let currentBuildingCopy = JSON.parse(
            JSON.stringify(this.state.currentBuilding)
        );
        let temp = currentBuildingCopy.width;
        currentBuildingCopy.width = currentBuildingCopy.height;
        currentBuildingCopy.height = temp;
        
        this.setState({
            currentBuilding: currentBuildingCopy
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stateNumber];

        return (
            <BuilderPanel>
                <Grid 
                    buildings={current.buildings}
                    buildingGhost={this.state.buildingGhost}
                    onClick={() => this.handleOnClick()}
                    onMouseMove={(e) => this.handleOnMouseMove(e)}
                    onContextMenu={(e) => this.handleRemoveBuilding(e)} 
                />
                <Picker onClick={(building) => this.handlePicker(building)} />
                <Buttons
                    handleRotate={() => this.handleRotate()}
                    handleUndo={() => this.handleUndo()}
                    handleRedo={() => this.handleRedo()}
                    handleClear={() => this.handleClear()}
                />
            </BuilderPanel>
        );
    }
}

export default Builder;