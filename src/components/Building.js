import React from "react";

class Building extends React.Component {
    shouldComponentUpdate(nextProps) {
        let { row, column } = this.props;
        return nextProps.row !== row || nextProps.column !== column;
    }

    render() {
        let { row, column, width, height, colour } = this.props;
        let style = {
            backgroundColor: colour,
            gridColumn: column + 1 + " / span " + width,
            gridRow: row + 1 + " / span " + height
        };

        return (
            <div
                className="building"
                style={style}
            >
            </div>
        );
    }
}

/*
const Building = ({ row, column, width, height, colour }) => {
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
*/

export default Building;