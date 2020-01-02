import React from "react";
import Building from "./Building";
import { WIDTH, HEIGHT, SQUARE_SIZE } from "../utils/constants";
import { cssGrid } from "../utils/utils";

class Grid extends React.Component {
    renderBuilding(building, isGhost, id) {
        const { row, column } = building;
        const key = isGhost ? "ghost" : `${row},${column}`;
        
        return (
            <Building 
                key={key} 
                buildingId={id}
                onClick={() => this.props.removeBuilding(id)}
                { ...building }
            />
        );
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

        let buildingElements = this.props.buildings.filter(
            (building) => {
                return building !== null;
            }
        ).map((building, id) => {
            return this.renderBuilding(building, false, id);
        });
        buildingElements.push(
            this.renderBuilding(this.props.buildingGhost, true)
        );

        return (
            <div
                className="grid" 
                style={style}
                onClick={(e) => this.props.onClick(e)}
                onMouseMove={(e) => this.props.onMouseMove(e)}
                onContextMenu={(e) => this.props.onContextMenu(e)}
            >
                {buildingElements}
            </div>
        );
    }
}

export default Grid;