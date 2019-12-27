import React from "react";
import Square from "./Square.js"

class Grid extends React.Component {
    renderSquare(row, column, colour) {
        return (
            <Square 
                key={`${row},${column}`}
                value={this.props.grid[row][column]} 
                onClick={() => this.props.onClick(row, column)} 
            />
        )
    }

    render() {
        let squares = [];
        const width = this.props.width;
        const height = this.props.height;

        // generate grid of squares
        for (let row = 0; row < height; row++) {
            let squaresColumn = [];
            for (let column = 0; column < width; column++) {
                squaresColumn.push(this.renderSquare(row, column));
            }
            squares.push(<div key={row} className="grid-row">{squaresColumn}</div>);
        }

        return (
            <div>{squares}</div>
        );
    }
}

export default Grid;