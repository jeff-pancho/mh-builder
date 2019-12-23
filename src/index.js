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
            history: [{
                grid: generateEmptyGrid(width, height)
            }],
            stateNumber: 0
        }
    }

    handleClick(row, column) {
        const history = this.state.history.slice(0, this.state.stateNumber + 1);
        const current = history[this.state.stateNumber];
        const grid = current.grid.slice();
        grid[row][column] = !grid[row][column];

        this.setState({
            history: history.concat([{
                grid: grid
            }]),
            stateNumber: this.state.stateNumber + 1
        });


        // const grid = this.state.grid.slice();
        // grid[row][column] = !grid[row][column];
        // this.setState({
        //     grid: grid
        // });
    }

    handleClear() {
        const width = this.props.width;
        const height = this.props.height;

        const history = this.state.history.slice(0, this.state.stateNumber + 1);

        this.setState({
            history: history.concat([{
                grid: generateEmptyGrid(width, height)
            }]),
            stateNumber: this.state.stateNumber + 1
        });
    }

    render() {
        const history = this.state.history.slice(0, this.state.stateNumber + 1);
        console.log(history);
        const current = history[this.state.stateNumber];

        return (
            <div>
                <Grid 
                    grid={current.grid}
                    width={this.props.width}
                    height={this.props.height}
                    onClick={(row, column) => this.handleClick(row, column)}
                />
                <div className="buttons-container">
                    <UndoButton />
                    <RedoButton />
                    <ClearButton onClick={() => this.handleClear()}/>
                </div>
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

function UndoButton(props) {
    return (
        <button>
            Undo
        </button>
    );
}

function RedoButton(props) {
    return(
        <button>
            Redo
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

/*
 * width:   46
 * height:  46
 */

ReactDOM.render(
    <Builder width={20} height={20} />,
    document.getElementById('root')
);