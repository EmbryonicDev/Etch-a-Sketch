let size = 100;

const mainContr = document.querySelector('#mainContr');
const settings = document.querySelector('#settings');
const colorBtn = document.querySelector('#colorBtn');
const flashBtn = document.querySelector('#flashBtn');
const rainbowBtn = document.querySelector('#rainbowBtn');
const eraserBtn = document.querySelector('#eraserBtn');
const clearBtn = document.querySelector('#clearBtn');
const sizeValue = document.querySelector('#sizeValue');
const sizeSlider = document.querySelector('#sizeSlider');
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

sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
// sizeSlider.onchange = (e) => changeSize(e.target.value)

function updateSizeValue(value) {
  sizeValue.innerText = `${value} x ${value}`
}






