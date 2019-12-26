import React from "react";

function ClearButton(props) {
    return(
        <button onClick={props.onClick}>
            Clear
        </button>
    );
}

function UndoButton(props) {
    return (
        <button onClick={props.onClick}>
            Undo
        </button>
    );
}

function RedoButton(props) {
    return(
        <button onClick={props.onClick}>
            Redo
        </button>
    );
}

export {ClearButton, UndoButton, RedoButton};