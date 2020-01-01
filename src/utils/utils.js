const cssGrid = (size) => {
    let background = "linear-gradient(to right, ";
    background += "transparent " + (size - 1) + "px, ";
    background += "black " + (size - 1) + "px, ";
    background += "black " + size + "px), ";
    background += "linear-gradient(to bottom, ";
    background += "transparent " + (size - 1) + "px, ";
    background += "black " + (size - 1) + "px, ";
    background += "black " + size + "px)";
    return background;
}

const relativeCoords = (e) => {
    let rect = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    return {x, y};
}

const generateEmptyGrid = (width, height) => {
    let grid = Array(height).fill().map(() => {
        return Array(width).fill(null);
    });
    return grid;
}

const checkForAvailableSpace = (grid, row, column, width, height) => {
    let endRow = row + height;
    let endColumn = column + width;
    for (let r = row; r <= endRow; r++) {
        for (let c = column; c <= endColumn; c++) {
            if (r > grid.length - 1 || c > grid[r].length - 1
                || grid[r][c] === null) {
                return false;
            }
        }
    }
    return true;
}

export { 
    cssGrid,
    relativeCoords,
    generateEmptyGrid,
    checkForAvailableSpace
};