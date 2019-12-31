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
            border: "1px black",
            borderStyle: "solid none none solid",
            background: cssGrid(SQUARE_SIZE),
            backgroundSize: "15px 15px"
        };

        return (
            <div className="grid" style={style}></div>
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
    console.log(background);
    return background;
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
            <div>
                <Grid grid={this.state.grid}/>
            </div>
        );
    }
}

const generateEmptyGrid = (width, height) => {
    let grid = Array(height).fill().map(() => {
        return Array(width).fill(null);
    });
    return grid;
}

export default Builder;