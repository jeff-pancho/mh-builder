import React from "react";

// 46x46 original size
const WIDTH = 20;
const HEIGHT = 20;

class Grid extends React.Component {
    renderSquare(row, column) {
        return (
            <td
                key={`${row},${column}`}
                className="square"
            >
            </td>
        );
    }

    render() {
        let squareGrid = [];
        let {width, height} = this.props;
        for (let row = 0; row < height; row++) {
            let columns = []
            for (let column = 0; column < width; column++) {
                columns.push(this.renderSquare(row, column));
            }
            squareGrid.push(<tr>{columns}</tr>);
        }

        return (
            <table cellSpacing="0" cellPading="0">
                <thead>{squareGrid}</thead>
            </table>
        );
    }
}

class Builder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            grid: generateEmptyGrid(WIDTH, HEIGHT)
        };
    }

    render() {
        return (
            <div id="builder">
                <Grid width={WIDTH} height={HEIGHT}/>
            </div>
        );
    }
}

const generateEmptyGrid = (width, height) => {
    let grid = Array(height).fill().map(() => {
        Array(width).fill("#FFFFFF");
    });
}

export default Builder;