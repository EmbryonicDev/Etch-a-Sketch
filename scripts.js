let size = 16;

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

sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value)

function gridSize(size) {
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  for(i = 0; i < size * size; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    grid.append(cell);
  }
}

gridSize(size);

function updateSizeValue(value) {
  sizeValue.innerText = `${value} x ${value}`
}

function changeSize(newSize) {
  size = newSize;
  gridSize(size);
}






