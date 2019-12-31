import React from "react";

const Building = (props) => {
    let style = {
        backgroundColor: props.colour,
        gridColumn: props.column + 1,
        gridRow: props.row + 1
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