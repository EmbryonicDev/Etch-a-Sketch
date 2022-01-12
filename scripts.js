let size = 9;

const mainContr = document.querySelector('#mainContr');
const settings = document.querySelector('#settings');
const colorBtn = document.querySelector('#colorBtn');
const flashBtn = document.querySelector('#flashBtn');
const rainbowBtn = document.querySelector('#rainbowBtn');
const eraserBtn = document.querySelector('#eraserBtn');
const clearBtn = document.querySelector('#clearBtn');
const slideBtn = document.querySelector('#slideBtn');
const grid = document.querySelector('#grid');

function gridSize(size) {
  grid.style.setProperty('--grid-rows', size);
  grid.style.setProperty('--grid-cols', size);
  for (c = 0; c < (size * size); c++) {
    let cell = document.createElement("div");
    // cell.innerText = (c + 1);
    grid.appendChild(cell).className = "gridItem";
  };
};

gridSize(size);






