import React from "react";
import Building from "./Building";
import { WIDTH, HEIGHT, SQUARE_SIZE } from "../utils/constants";
import { cssGrid } from "../utils/utils";

class Grid extends React.Component {
    renderBuilding(building, isGhost) {
        const { row, column } = building;
        const key = isGhost ? "ghost" : `${row},${column}`;
        
        return <Building key={key} { ...building }/>
    }

    render() {
        let style = {
            width: SQUARE_SIZE * WIDTH,
            height: SQUARE_SIZE * HEIGHT,
            background: cssGrid(SQUARE_SIZE),
            backgroundSize: SQUARE_SIZE + "px " + SQUARE_SIZE + "px",
            gridTemplateColumns: "repeat(" + WIDTH + ", " + SQUARE_SIZE + "px)",
            gridTemplateRows: "repeat(" + HEIGHT + ", " + SQUARE_SIZE + "px)"
        };

        let buildingElements = this.props.buildings.map((building) => {
            return this.renderBuilding(building);
        });
        buildingElements.push(
            this.renderBuilding(this.props.buildingGhost, true)
        );

        return (
            <div
                className="grid" 
                style={style}
                onClick={() => this.props.onClick()}
                onMouseMove={(e) => this.props.onMouseMove(e)}
                onContextMenu={(e) => e.preventDefault()}
            >{buildingElements}</div>
        );
    }
}

export default Grid;