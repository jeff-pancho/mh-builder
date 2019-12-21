import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render () {
        return (
            <div className="square">
                1
            </div>
        );
    }
}

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            butt: "ass"
        }
    }

    renderSquare(i) {
        return (
            <Square 
                key={i}
            />
        )
    }

    render() {
        let squares = [];
        const width = this.props.width;
        const height = this.props.height;

        for (let y = 0; y < height; y++) {
            let column = [];
            for (let x = 0; x < width; x++) {
                column.push(this.renderSquare(x));
            }
            squares.push(
                <div 
                    key={y}
                    className="grid-row"
                >
                    {column}
                </div>
            );
        }

        return (
            <div>
                {squares}
            </div>
        );
    }
}

class Builder extends React.Component {
    render() {
        return (
            <div>
                <Grid 
                    width={10}
                    height={10}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <Builder />,
    document.getElementById('root')
);