function Spot(i, j) {
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.previous = undefined;
    this.wall = false;
    this.color = "white";

    this.addNeighbors = function (grid, rows, cols) {
        let i = this.i;
        let j = this.j;

        if (j < cols - 1) {
            this.neighbors.push(grid[i][j + 1])
        }
        if (j > 0) {
            this.neighbors.push(grid[i][j - 1])
        }
        if (i < rows - 1) {
            this.neighbors.push(grid[i + 1][j])
        }
        if (i > 0) {
            this.neighbors.push(grid[i - 1][j])
        }
        if (i > 0 && j > cols - 1) {
            this.neighbors.push(grid[i - 1][j + 1])
        }
        if (i > 0 && j > 0) {
            this.neighbors.push(grid[i - 1][j - 1])
        }
        if (j > 0 && i < rows - 1) {
            this.neighbors.push(grid[i + 1][j - 1])
        }
        if (i < rows - 1 && j < cols - 1) {
            this.neighbors.push(grid[i + 1][j + 1])
        }
    }
}

export default Spot;