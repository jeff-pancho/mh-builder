import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render () {
        let style = this.props.value ?
            {background: "#FF0000"} :
            {background: "#FFFFFF"};
        return (
            <div className="square" style={style} onClick={this.props.onClick}></div>
        );
    }
}

class Grid extends React.Component {
    renderSquare(row, column) {
        return (
            <Square 
                key={column}
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

class Builder extends React.Component {
    constructor(props) {
        super(props);

        const width = this.props.width;
        const height = this.props.height;
        this.state = {
            grid: generateEmptyGrid(width, height)
        }
    }

    handleClick(row, column) {
        const grid = this.state.grid.slice();
        grid[row][column] = !grid[row][column];
        this.setState({
            grid: grid
        });
    }

    handleClear() {
        const width = this.props.width;
        const height = this.props.height;
        this.setState({
            grid: generateEmptyGrid(width, height)
        });
    }

    render() {
        return (
            <div>
                <Grid 
                    grid={this.state.grid}
                    width={this.props.width}
                    height={this.props.height}
                    onClick={(row, column) => this.handleClick(row, column)}
                />
                <ClearButton onClick={() => this.handleClear()}/>
            </div>
        );
    }
}

function ClearButton(props) {
    return(
        <button onClick={props.onClick}>
            Clear
        </button>
    );
}

function generateEmptyGrid(width, height) {
    let grid = [];
    for (let row = 0; row < height; row++) {
        grid.push(Array(width).fill(false));
    }
    return grid;
}

ReactDOM.render(
    <Builder width={15} height={15} />,
    document.getElementById('root')
);