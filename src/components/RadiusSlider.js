import React from "react";

/*
class RadiusSlider extends React.Component {
    render () {
        return (
            <input
                type="range"
                min="1"
                max="5"
                defaultValue="1"
                onChange={this.props.onChange}
            >
            </input>
        );
    }
}
*/

const RadiusSlider = ({ onChange }) => {
    return (
        <input
            type="range"
            min="1"
            max="5"
            defaultValue="1"
            onChange={onChange}
        >
        </input>
    );
}


export default RadiusSlider;