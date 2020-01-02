import React from "react";

const Building = ({row, column, width, height, colour}) => {
    let style = {
        backgroundColor: colour,
        gridColumn: column + 1 + " / span " + width,
        gridRow: row + 1 + " / span " + height
    }

    return (
        <div
            className="building"
            style={style}
        >
        </div>
    );
}


export default Building;