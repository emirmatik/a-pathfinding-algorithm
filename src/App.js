import React from 'react';
import Spot from "./components/Spot";
import Grid from "./components/Grid";
import './App.css';

function removeFromArray(arr, elt) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === elt) {
      arr.splice(i, 1)
    }
  }
}

function heuristic(a, b) {
  // better when there is just left and right choice
  // var d = Math.abs(b.i - a.i) + Math.abs(b.j - a.j)
  // better for diagonals
  var d = Math.sqrt(Math.pow(Math.abs(b.i - a.i), 2) + Math.pow(Math.abs(b.j - a.j), 2))
  return d;
}

function App() {
  let rows = 25;
  let cols = 25;
  let grid = new Array(rows);
  let FPS = 50;
  let start;
  let end;
  let openSet = [];
  let closedSet = [];
  let interval;
  let path = [];
  let current;
  let done = false;

  function colorizeSpot(i, j, color) {
    let spots = document.querySelectorAll(".spot");
    const willcolored = spots[i * rows + j]
    willcolored.style.backgroundColor = color
  }

  function Start() {
    // append x cols in each row 
    for (let i = 0; i < rows; i++) {
      grid[i] = new Array(cols);
    }
    // creating spots
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j] = new Spot(i, j);
      }
    }

    // defining each spot's neighbors
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j].addNeighbors(grid, rows, cols);
      }
    }

    // start = grid[0][0];  // top left corner
    // end = grid[rows - 1][cols - 1]  // right bottom corner

    let startAns = prompt(`START POINT ? (MIN,MAX) => (0,${rows - 1})`);
    let endAns = prompt(`END POINT ? (MIN,MAX) => (0,${rows - 1})`);

    let startRow = startAns.split(",")[0];
    let startCol = startAns.split(",")[1];
    start = grid[startRow][startCol]

    let endRow = endAns.split(",")[0];
    let endCol = endAns.split(",")[1];
    end = grid[endRow][endCol]

    start.wall = false;
    end.wall = false;

    start.color = "cyan"
    end.color = "#ae69ce"

    openSet.push(start);
  }

  function loop() {
    if (openSet.length > 0) {

      // check if one has less f than others
      let winner = 0;
      openSet.forEach((open, i) => {
        if (open.f < openSet[winner].f) {
          winner = i
        }
      })

      current = openSet[winner];

      // check if we're done
      if (current === end) {
        console.log("DONE !!");
        done = true;
        clearInterval(interval)
      }

      // removing current from openSet
      removeFromArray(openSet, current);
      // adding current to closedSet
      closedSet.push(current);

      let neighbors = current.neighbors;

      neighbors.forEach(neighbor => {
        if (!closedSet.includes(neighbor) && !neighbor.wall) {
          let tempG = current.g + 1;
          if (openSet.includes(neighbor)) {
            if (neighbor.g > current.g) {
              neighbor.g = tempG
            }
          } else {
            neighbor.g = tempG;
            openSet.push(neighbor);
            neighbor.previous = current;
          }
          neighbor.h = heuristic(neighbor, end)
          neighbor.f = neighbor.g + neighbor.h;
        }
      });

    } else {
      // no solution
      console.log("NO SOLUTION :/");
      done = true;
      return clearInterval(interval)
    }

    // colorize
    openSet.forEach(open => {
      open.color = "#99ff99"
      colorizeSpot(open.i, open.j, "#99ff99")
    })

    closedSet.forEach(closed => {
      closed.color = "#ce696b"
      colorizeSpot(closed.i, closed.j, "#ce696b")
    })

    path = [];
    let temp = current;
    path.push(temp);
    while (temp.previous) {
      path.push(temp.previous);
      temp = temp.previous
    }

    path.forEach(pathSpot => {
      pathSpot.color = "#4d94ff"
      colorizeSpot(pathSpot.i, pathSpot.j, "#4d94ff")
    })
  }

  // starting loop for button click
  function startLoop() {
    if (!done) {
      interval = setInterval(loop, 1000 / FPS)
    }
  }

  Start()

  return (
    <div className="App">
      <button onClick={startLoop} id="start">Start</button>
      <Grid grid={grid} />
    </div>
  );



}

export default App;
