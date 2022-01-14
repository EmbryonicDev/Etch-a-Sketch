let size = 24;
let brushColor = "#101010"
// let shaderOn = false;

const mainContr = document.querySelector('#mainContr');
const settings = document.querySelector('#settings');
const chooseColor = document.querySelector('#chooseColor');
const shader = document.querySelector('#shader');
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
    grid.append(cell);
  }
}

gridBuild(size);

function drawOn() {
  for(i = 0; i < size * size; ++i)  {
    // cell[i].classList.add('testing');
    cell[i].addEventListener('mouseover', function(e) {
    e.target.style.background = brushColor;
    console.log('hello')
    }, false);
  }
}
drawOn()

// shader.addEventListener('click', () => {
//   shaderOn = true
//   let opacity = cell.style.opacity;
//   brushColor = '#101010'
// })

chooseColor.addEventListener('input', () => {
  rainbowOff();
  brushColor = chooseColor.value;
});

rainbowBtn.addEventListener('click', () => {
  grid.addEventListener('mouseover', rainbowOn);
  });

function rainbowOn(e)  {
  brushColor = "#" + ((1<<24)*Math.random() | 0).toString(16);
}

function rainbowOff() {
  grid.removeEventListener('mouseover', rainbowOn);
}

eraserBtn.addEventListener('click', () => {
  rainbowOff()
  brushColor = "rgb(248, 247, 246)";
})

clearBtn.addEventListener('click', () => {
  gridBuild(size);
  drawOn()
})

function updateSizeValue(value) {
  sizeValue.innerText = `${value} x ${value}`
}

function changeSize(newSize) {
  size = newSize;
  gridBuild(size);
  drawOn();
}
