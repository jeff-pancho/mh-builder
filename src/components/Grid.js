import React from "react";
// import Square from "./Square.js"

const Grid = ({ width, height, grid, onClick }) => {
    const renderSquare = (row, column) => {
        return (
            <td  
                key={`${row},${column}`}
                style={{backgroundColor: grid[row][column]}}
                className="square"
                onClick={() => onClick(row, column)}
            ></td>
        )
    }
    let squares = [];
    // generate grid of squares
    for (let row = 0; row < height; row++) {
        let squaresColumn = [];
        for (let column = 0; column < width; column++) {
            squaresColumn.push(renderSquare(row, column));
        }
        squares.push(<tr key={row} className="grid-row">{squaresColumn}</tr>);
    }

    return (
        <table cellSpacing="0" cellPadding="0">
            <tbody>{squares}</tbody>
        </table>
    );
}

// class Grid extends React.Component {
//     renderSquare(row, column) {
//         return (
//             /*
//             <Square 
//                 key={`${row},${column}`}
//                 value={this.props.grid[row][column]} 
//                 onClick={() => this.props.onClick(row, column)} 
//             />
//             */
//            <td  
//                 key={`${row},${column}`}
//                 style={{backgroundColor: this.props.grid[row][column]}}
//                 className="square"
//                 onClick={() => this.props.onClick(row, column)}
//            ></td>
//         )
//     }

//     render() {
//         let squares = [];
//         const width = this.props.width;
//         const height = this.props.height;

//         // generate grid of squares
//         for (let row = 0; row < height; row++) {
//             let squaresColumn = [];
//             for (let column = 0; column < width; column++) {
//                 squaresColumn.push(this.renderSquare(row, column));
//             }
//             squares.push(<tr key={row} className="grid-row">{squaresColumn}</tr>);
//         }

//         return (
//             <table cellSpacing="0" cellPadding="0">
//                 <tbody>{squares}</tbody>
//             </table>
//         );
//     }
// }

export default Grid;