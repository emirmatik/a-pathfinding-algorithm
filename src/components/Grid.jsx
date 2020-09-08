import React from "react";

function Grid({ grid }) {

    const addWall = (i, j) => (e) => {
        if (e.buttons === 1) {
            grid[i][j].wall = true
            grid[i][j].color = "black"
            e.target.style.backgroundColor = "black"
        }
        if (e.buttons === 2) {
            grid[i][j].wall = false
            grid[i][j].color = "white"
            e.target.style.backgroundColor = "white"
        }
    }
    return (
        <>
            <div className="grid">
                {grid.map((col, i) => col.map((spot, j) => (
                    <div
                        className="spot"
                        style={{ backgroundColor: spot.color }}
                        key={j}
                        onMouseEnter={addWall(i, j)}
                        onMouseDown={addWall(i, j)}
                    >
                    </div>
                )))
                }
            </div >
        </>
    )
}

export default Grid;