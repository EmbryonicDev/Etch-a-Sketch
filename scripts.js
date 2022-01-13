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

gridSize(size);

sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
// sizeSlider.onchange = (e) => changeSize(e.target.value)

function updateSizeValue(value) {
  sizeValue.innerText = `${value} x ${value}`
}






