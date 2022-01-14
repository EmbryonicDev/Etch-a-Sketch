let size = 16;
let brushColor = "#101010"

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
      console.log(e.type);
    });
    grid.append(cell);
  }
}

gridBuild(size);

let cells = document.querySelectorAll('div.cell');
// cells.forEach(cell => {
//   addEventListener('mouseover', function(e) {
//     cell.style.opacity = 1;
//   })
// })

chooseColor.addEventListener('input', () => {
  rainbowOff();
  brushColor = chooseColor.value;
});

// shader.addEventListener('click', () => {
//   brushColor = "#101010"
//   cells.forEach(cell => {
//     addEventListener('mouseout', function(e) {
//       let opacity = cell.style.opacity;
//       if(cell.classList.contains('shade'))  {
//         cell.style.opacity = (Number(opacity) + 0.1);
//         console.log('increasing opacity')
//       } else  {
//           cell.classList.add('shade');
//           cell.setAttribute('style', 'opacity:0.1');
//           console.log('shade class added :-)')
//       }
//     })
//   })
// })

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
})

function updateSizeValue(value) {
  sizeValue.innerText = `${value} x ${value}`
}

function changeSize(newSize) {
  size = newSize;
  gridBuild(size);
}
