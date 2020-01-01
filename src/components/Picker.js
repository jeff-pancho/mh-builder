import React from "react";
import { BUILDINGS } from "../utils/constants";

const Picker = ({ onClick }) => {
    let picks = BUILDINGS.map((building) => {
        let { colour } = building;
        return (
            <div
                key={colour}
                className="square"
                style={{backgroundColor: colour}}
                onClick={() => onClick(building)}
            >
                
            </div>
        );
    });

    return (
        <div className="picket-container">
            {picks}
        </div>
    );
}

export default Picker;