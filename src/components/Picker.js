import React from "react";
import { COLOURS } from "../utils/constants.js"

/*
class Picker extends React.Component {
    render() {
        const picks = COLOURS.map((colour) => {
            let style = {
                backgroundColor: colour
            }

            return (
                <div
                    key={colour}
                    className="square" 
                    onClick={() => this.props.onClick(colour)}
                    style={style}>
                </div>
            );
        });

        return (
            <div className="picker-container">
                {picks}
            </div>
        );
    }
}
*/

const Picker = ({ onClick }) => {
    const picks = COLOURS.map((colour) => {
        let style = {
            backgroundColor: colour
        }

        return (
            <div
                key={colour}
                className="square" 
                onClick={() => onClick(colour)}
                style={style}>
            </div>
        );
    });

    return (
        <div className="picker-container">
            {picks}
        </div>
    );
}

export default Picker;