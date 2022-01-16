const defualtBrushColor = "#101010";
let size = 24;
let brushColor = defualtBrushColor;
let selectedPen = ""
let draw = false;

const body = document.querySelector('body');
const chooseColor = document.querySelector('#chooseColor');
const greyscale = document.querySelector('#greyscale');
const rainbowBtn = document.querySelector('#rainbowBtn');
const eraserBtn = document.querySelector('#eraserBtn');
const clearBtn = document.querySelector('#clearBtn');
const gridBtn = document.querySelector('#gridBtn');
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


function toggleGrid() {
  if(gridBtn.textContent === "Grid Off") {
    gridBtn.innerText = "Grid On"
    for(i = 0; i < size * size; i++) {
      cell[i].style.border = 0;
    }
  } else if(gridBtn.textContent === "Grid On") {
    gridBtn.innerText = "Grid Off"
    for(i = 0; i < size * size; i++) {
      cell[i].style.border = "0.1px dashed rgba(85, 83, 83, 0.1)";
    }
  }
}

body.addEventListener('mousedown', function(e) {
  console.log("You are Drawing");
  event.preventDefault();
  draw = true;
})

body.addEventListener('mouseup', function(e) {
  console.log("You Stopped Drawing");
  draw = false;
})

function drawOn() {
  for(i = 0; i < size * size; ++i)  {
    cell[i].addEventListener('mouseover', function(e) {
      if(draw)  {
        e.target.style.background = brushColor;
      }
      // Restore opacity & remove .shade after using greyscale pen
      if((selectedPen != "greyscalePen") && e.target.classList.contains('shade')) {
        e.target.classList.remove('shade');
        e.target.style.backgroundColor = brushColor;
        e.target.style.opacity = "1";
      }

      // Select pen color
      if(selectedPen === "rainbowPen")  {
        brushColor = "#" + ((1<<24)*Math.random() | 0).toString(16);
        console.log('Rainbow pen selected' );
      } else if(selectedPen === "eraserPen")  {
        brushColor = "rgb(248, 247, 246)"
        console.log("Eraser pen selected")
      } else if(selectedPen === "colorPickerPen") {
        brushColor = chooseColor.value;
        console.log("Color Picker Pen Selected");
      } else if(selectedPen === "greyscalePen")  {
          if(e.target.classList.contains('shade'))  {
            e.target.style.opacity = parseFloat(e.target.style.opacity) + (1/8);
            console.log(".shade Class added to a cell");
          } else {
            e.target.style.opacity = "0.125"
            e.target.classList.add('shade');
          }
        brushColor = defualtBrushColor;
      }
    });
  }
}
drawOn()

greyscale.addEventListener('click', () => {
  selectedPen = "greyscalePen";
})

chooseColor.addEventListener('input', () => {
  selectedPen = "colorPickerPen"
});

rainbowBtn.addEventListener('click', () => {
  selectedPen = "rainbowPen";
  });

eraserBtn.addEventListener('click', () => {
  selectedPen = "eraserPen"
})

clearBtn.addEventListener('click', () => {
  gridBuild(size);
  drawOn()
  console.log("Grid Cleared")
})

gridBtn.addEventListener('click', () => {
  toggleGrid()
});

function updateSizeValue(value) {
  sizeValue.innerText = `Grid Size: ${value} x ${value}`
}

function changeSize(newSize) {
  size = newSize;
  gridBuild(size);
  drawOn();
}
