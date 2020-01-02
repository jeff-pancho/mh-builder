import React from "react";

const Buttons = ({ handleUndo, handleRedo, handleClear }) => {
    return (
        <div className="buttons-container">
            <button onClick={() => handleUndo()}>Undo</button>
            <button onClick={() => handleRedo()}>Redo</button>
            <button onClick={() => handleClear()}>Clear</button>
        </div>
    );
}

export default Buttons;