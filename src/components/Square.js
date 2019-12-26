import React from "react";

class Square extends React.Component {
    render () {
        let style = this.props.value ?
            {backgroundColor: "#FF0000"} :
            {backgroundColor: "#FFFFFF"};
        return (
            <div className="square" style={style} onClick={this.props.onClick}></div>
        );
    }
}

export default Square;