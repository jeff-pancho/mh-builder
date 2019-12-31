import React from "react";
import Building from "./Building";
import { WIDTH, HEIGHT, SQUARE_SIZE } from "../utils/constants";
import { cssGrid } from "../utils/utils";

class Grid extends React.Component {
    renderBuilding(building) {
        const {row, column} = building;
        return <Building key={`${row},${column}`} {...building}/>
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

        return (
            <div
                className="grid" 
                style={style}
                onClick={(e) => this.props.onClick(e)}
            >{buildingElements}</div>
        );
    }
}

export default Grid;