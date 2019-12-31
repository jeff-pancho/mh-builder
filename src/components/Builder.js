import React from "react";

// 46x46 original size
const WIDTH = 46;
const HEIGHT = 46;
const SQUARE_SIZE = 15;

class Grid extends React.Component {
    render() {
        let style = {
            width: SQUARE_SIZE * WIDTH,
            height: SQUARE_SIZE * HEIGHT,
            background: cssGrid(SQUARE_SIZE),
            backgroundSize: SQUARE_SIZE + "px " + SQUARE_SIZE + "px",
            gridTemplateColumns: "repeat(" + WIDTH + ", " + SQUARE_SIZE + "px)",
            gridTemplateRows: "repeat(" + HEIGHT + ", " + SQUARE_SIZE + "px)"
        };

        return (
            <div
                className="grid" 
                style={style}
                onClick={(e) => this.props.onClick(e)}
            ></div>
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
        
        console.log(`${row}, ${column}`);
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