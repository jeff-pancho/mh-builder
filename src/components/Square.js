import React from "react";

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

export default Square;