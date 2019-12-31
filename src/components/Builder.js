import React from "react";

// 46x46 original size
const WIDTH = 46;
const HEIGHT = 46;
const SQUARE_SIZE = 15;

class Grid extends React.Component {
    renderBuilding(row, column, colour) {
        return (
            <Building
                key={`${row},${column}`}
                row={row}
                column={column}
                colour={colour} 
            />
        );
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

        const grid = this.props.grid;
        let buildings = [];
        for (let row = 0; row < HEIGHT; row++) {
            for (let column = 0; column < WIDTH; column++) {
                if (grid[row][column] !== null) {
                    buildings.push(this.renderBuilding(row, column, grid[row][column]));
                }
            }
        }

        return (
            <div
                className="grid" 
                style={style}
                onClick={(e) => this.props.onClick(e)}
            >{buildings}</div>
        );
    }
}

const cssGrid = (size) => {
    let background = "linear-gradient(to right, ";
    background += "transparent " + (size - 1) + "px, ";
    background += "black " + (size - 1) + "px, ";
    background += "black " + size + "px), ";
    background += "linear-gradient(to bottom, ";
    background += "transparent " + (size - 1) + "px, ";
    background += "black " + (size - 1) + "px, ";
    background += "black " + size + "px)";
    return background;
}

class Builder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: generateEmptyGrid(WIDTH, HEIGHT)
        };
    }
    
    handleOnClick(e) {
        let {x, y} = relativeCoords(e);
        let row = Math.floor(y / SQUARE_SIZE);
        let column = Math.floor(x / SQUARE_SIZE);

        const grid = this.state.grid.slice();
        grid[row][column] = "#FF0000";
        
        this.setState({
            grid: grid
        });
        
        // console.log(`${row}, ${column}`);
    }

    render() {
        return (
            <div>
                <Grid 
                    grid={this.state.grid}
                    onClick={(e) => this.handleOnClick(e)}
                />
            </div>
        );
    }
}

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

const relativeCoords = (e) => {
    let rect = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    return {x, y};
}

const generateEmptyGrid = (width, height) => {
    let grid = Array(height).fill().map(() => {
        return Array(width).fill(null);
    });
    return grid;
}

export default Builder;