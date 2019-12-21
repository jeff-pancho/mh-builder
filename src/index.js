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
    constructor(props) {
        super(props);

        let grid = [];
        const width = this.props.width;
        const height = this.props.height;
        for (let row = 0; row < height; row++) {
            grid.push(Array(width).fill(false));
        }

        this.state = {
            grid: grid
        }
    }

    handleClick(row, column) {
        const grid = this.state.grid.slice();
        grid[row][column] = !grid[row][column];
        this.setState({
            grid: grid
        });
    }

    renderSquare(row, column) {
        return (
            <Square 
                key={column}
                value={this.state.grid[row][column]} 
                onClick={() => this.handleClick(row, column)} 
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
    render() {
        return (
            <div>
                <Grid width={10} height={10} />
            </div>
        );
    }
}

ReactDOM.render(
    <Builder />,
    document.getElementById('root')
);