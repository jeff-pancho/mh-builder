export function generateEmptyGrid(width, height) {
    let grid = [];
    for (let row = 0; row < height; row++) {
        grid.push(Array(width).fill(false));
    }
    return grid;
}