const defualtBrushColor = "#101010";
let size = 36;
let brushColor = defualtBrushColor;
let selectedPen = ""
let penDown = false;

const body = document.querySelector('body');
const chooseColor = document.querySelector('#chooseColor');
const greyscale = document.querySelector('#greyscale');
const rainbowBtn = document.querySelector('#rainbowBtn');
const eraserBtn = document.querySelector('#eraserBtn');
const clearBtn = document.querySelector('#clearBtn');
const gridBtn = document.querySelector('#gridBtn');
const sizeValue = document.querySelector('#sizeValue');
const sizeSlider = document.querySelector('#sizeSlider');
const gridContr = document.querySelector('#gridContr');
const grid = document.querySelector('#grid');
const cell = document.getElementsByClassName('cell');

function gridBuild(size) {
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  while(grid.firstChild) {
    grid.removeChild(grid.lastChild);
  }
  for(i = 0; i < size * size; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    if(gridBtn.textContent === "Turn Grid On")  {
      cell.style.border = 0;
    } else {
      cell.style.border = "0.1px dashed rgba(85, 83, 83, 0.1)";
    }
    grid.append(cell);
  }
}
gridBuild(size);

function toggleGrid() {
  if(gridBtn.textContent === "Turn Grid Off") {
    gridBtn.innerText = "Turn Grid On"
    for(i = 0; i < size * size; i++) {
      cell[i].style.border = 0;
    }
  } else {
    gridBtn.innerText = "Turn Grid Off"
    for(i = 0; i < size * size; i++) {
      cell[i].style.border = "0.1px dashed rgba(85, 83, 83, 0.1)";
    }
  }
}

// Draw when mousedown
gridContr.addEventListener('mousedown', function(e) {
  event.preventDefault();
  penDown = true;
})

body.addEventListener('mouseup', function(e) {
  penDown = false;
})

// Add eventListener to each cell & select pen
function drawOn() {
  for(i = 0; i < size * size; ++i)  {
    cell[i].addEventListener('mouseover', function(e) {
      if(penDown)  {
        e.target.style.background = brushColor;

        // Remove .shade after using greyscale pen
        if((selectedPen != "greyscalePen") && e.target.classList.contains('shade')) {
          e.target.classList.remove('shade');
        }

        // Select pen color
        if(selectedPen === "rainbowPen")  {
          brushColor = "#" + ((1<<24)*Math.random() | 0).toString(16);
          e.target.style.opacity = "1";
        } else if(selectedPen === "eraserPen")  {
          brushColor = "rgb(248, 247, 246)"
          e.target.style.opacity = "1";
        } else if(selectedPen === "colorPickerPen") {
          brushColor = chooseColor.value;
          e.target.style.opacity = "1";
        } else if(selectedPen === "greyscalePen")  {
            brushColor = defualtBrushColor
            if(e.target.classList.contains('shade'))  {
              e.target.style.opacity = parseFloat(e.target.style.opacity) + (1/8);
            } else {
              e.target.style.opacity = "0.125";
              e.target.classList.add('shade');
            }
        } 
      } 
    });
  }
}
drawOn()

// Button eventListeners
greyscale.addEventListener('click', () => {
  selectedPen = "greyscalePen";
})

chooseColor.addEventListener('input', () => {
  selectedPen = "colorPickerPen"
});

rainbowBtn.addEventListener('click', () => {
  selectedPen = "rainbowPen";
  drawOn();
  });

eraserBtn.addEventListener('click', () => {
  selectedPen = "eraserPen"
})

clearBtn.addEventListener('click', () => {
  gridBuild(size);
  drawOn();
})

gridBtn.addEventListener('click', () => {
  toggleGrid();
});

// Slider update & buildGrid with new size
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);

function updateSizeValue(value) {
  sizeValue.innerText = `Grid Size: ${value} x ${value}`
}

sizeSlider.onchange = (e) => changeSize(e.target.value);

function changeSize(newSize) {
  size = newSize;
  gridBuild(size);
  drawOn();
}