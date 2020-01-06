import React from "react";
import { BUILDINGS } from "../utils/constants";

const Picker = ({ onClick }) => {
    let picks = BUILDINGS.map((building, i) => {
        let { colour } = building;
        return (
            <div
                key={i}
                className="square"
                style={{backgroundColor: colour}}
                onClick={() => onClick(building)}
            >
            </div>
        );
    });

    return (
        <div className="picker-container">
            {picks}
        </div>
    );
}

export default Picker;