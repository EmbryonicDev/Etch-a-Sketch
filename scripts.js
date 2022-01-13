let size = 16;
let brushColor = "#000000"

const mainContr = document.querySelector('#mainContr');
const settings = document.querySelector('#settings');
const chooseColor = document.querySelector('#chooseColor');
const flashBtn = document.querySelector('#flashBtn');
const rainbowBtn = document.querySelector('#rainbowBtn');
const eraserBtn = document.querySelector('#eraserBtn');
const clearBtn = document.querySelector('#clearBtn');
const sizeValue = document.querySelector('#sizeValue');
const sizeSlider = document.querySelector('#sizeSlider');
const grid = document.querySelector('#grid');
const cell = document.getElementsByClassName('cell');

sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

function gridBuild(size) {
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  while(grid.firstChild) {
    grid.removeChild(grid.lastChild);
  }
  for(i = 0; i < size * size; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('mouseover', function(e)  {
      e.target.style.background = brushColor;
    });
    grid.append(cell);
  }
}

gridBuild(size);

chooseColor.addEventListener('input', () => {
  brushColor = chooseColor.value;
});

rainbowBtn.addEventListener('click', () => {
  grid.addEventListener('mouseover', (e) =>  {
    console.log(e.type);
    brushColor = "#" + ((1<<24)*Math.random() | 0).toString(16);
  });
});

eraserBtn.addEventListener('click', () => {
  brushColor = "white"
})

clearBtn.addEventListener('click', () => {
  gridBuild(size);
})

function updateSizeValue(value) {
  sizeValue.innerText = `${value} x ${value}`
}

function changeSize(newSize) {
  size = newSize;
  gridBuild(size);
}
