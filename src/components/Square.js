import React from "react";

/*
class Square extends React.Component {
    render () {
        let style = {
            backgroundColor: this.props.value
        };
        return (
            <div className="square" style={style} onClick={this.props.onClick}></div>
        );
    }
}
*/

function Square(props) {
    let style = {
        backgroundColor: props.value
    };
    return (
        <td className="square" style={style} onClick={props.onClick}></td>
    );
}

export default Square;