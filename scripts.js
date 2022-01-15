const defualtBrushColor = "#101010";
let size = 24;
let brushColor = defualtBrushColor;
let selectedPen = ""

// const mainContr = document.querySelector('#mainContr');
// const settings = document.querySelector('#settings');
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
      if(selectedPen === "rainbowPen")  {
        brushColor = "#" + ((1<<24)*Math.random() | 0).toString(16);
        console.log('Rainbow pen selected' );
      } else if(selectedPen === "eraserPen")  {
        brushColor = "rgb(248, 247, 246)"
        console.log("Eraser pen selected")
      } else if(selectedPen === "colorPickerPen") {
        brushColor = chooseColor.value;
        console.log("Color Picker Pen Selected");
      } else if(selectedPen === "shaderPen")  {
        
        if(e.target.classList.contains('shade'))  {
          e.target.style.opacity = parseFloat(e.target.style.opacity) + (1/8);
          console.log(".shade Class added to this cell");
        } else {
          e.target.style.opacity = "0.125"
          e.target.classList.add('shade');
        }
        brushColor = defualtBrushColor;
      }
    }, false);
  }
}
drawOn()

shader.addEventListener('click', () => {
  selectedPen = "shaderPen";
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

function updateSizeValue(value) {
  sizeValue.innerText = `${value} x ${value}`
}

function changeSize(newSize) {
  size = newSize;
  gridBuild(size);
  drawOn();
}
