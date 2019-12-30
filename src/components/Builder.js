import React from "react";

// 46x46 original size
const WIDTH = 46;
const HEIGHT = 46;

class Grid extends React.Component {
    renderSquare = (row, column) => {
        return (
            <td
                key={`${row},${column}`}
                className="square"
                style={{backgroundColor: this.props.grid[row][column]}}
                onMouseDown={() => this.handleOnMouseDown(row, column)}
            >
            </td>
        );
    }

    handleOnMouseDown = (row, column) => {
        const grid = this.props.grid;
        grid[row][column] = "#404040";
        this.props.onChange(grid);
    }

    render() {
        let squareGrid = [];
        let {width, height} = this.props;
        for (let row = 0; row < height; row++) {
            let columns = []
            for (let column = 0; column < width; column++) {
                columns.push(this.renderSquare(row, column));
            }
            squareGrid.push(<tr key={row}>{columns}</tr>);
        }

        return (
            <table className="grid-row" cellSpacing="0" cellPadding="0">
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

    handleOnChange = (grid) => {
        this.setState({
            grid: grid
        });
    }

    render() {
        return (
            <div id="builder">
                <Grid 
                    width={WIDTH} 
                    height={HEIGHT} 
                    grid={this.state.grid}
                    onChange={this.handleOnChange}
                />
            </div>
        );
    }
}

const generateEmptyGrid = (width, height) => {
    let grid = Array(height).fill().map(() => {
        return Array(width).fill("#FFFFFF");
    });
    return grid;
}

export default Builder;