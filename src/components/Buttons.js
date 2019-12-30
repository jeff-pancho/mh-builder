import React from "react";

const ClearButton = ({onClick}) => {
    return(
        <button onClick={onClick}>
            Clear
        </button>
    );
}

const UndoButton = ({onClick}) => {
    return (
        <button onClick={onClick}>
            Undo
        </button>
    );
}

const RedoButton = ({onClick}) => {
    return(
        <button onClick={onClick}>
            Redo
        </button>
    );
}

export {ClearButton, UndoButton, RedoButton};