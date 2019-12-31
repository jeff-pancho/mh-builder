import React from "react";

// 46x46 original size
const WIDTH = 46;
const HEIGHT = 46;
const SQUARE_SIZE = 15;

class Grid extends React.Component {
    renderBuilding(building) {
        const {row, column} = building;
        return <Building key={`${row},${column}`} {...building}/>
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

        let buildingElements = this.props.buildings.map((building) => {
            return this.renderBuilding(building);
        });

        return (
            <div
                className="grid" 
                style={style}
                onClick={(e) => this.props.onClick(e)}
            >{buildingElements}</div>
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
            buildings: []
        };
    }

    createBuilding(row, column, width, height, colour) {
        return {
            row: row,
            column: column,
            width: width,
            height: height,
            colour: colour
        }
    }
    
    handleOnClick(e) {
        let {x, y} = relativeCoords(e);
        let row = Math.floor(y / SQUARE_SIZE);
        let column = Math.floor(x / SQUARE_SIZE);

        this.setState({
            buildings: this.state.buildings.concat([
                this.createBuilding(row, column, 1, 1, "#FF0000")
            ])
        });
    }

    render() {
        return (
            <div>
                <Grid 
                    buildings={this.state.buildings}
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

/*
const generateEmptyGrid = (width, height) => {
    let grid = Array(height).fill().map(() => {
        return Array(width).fill(null);
    });
    return grid;
}
*/

export default Builder;