draw_func = orbFuncPreset;
const PatternFuncs = [orbFuncPreset, mazeFuncPreset, ballFuncPreset, conchFuncPreset, wheelFuncPreset]
const PatternNames = ['Orb', 'Maze', 'Ball', 'Conch', 'Wheel']
const SettingNames = ['Arcs', 'Color', 'Speed', 'Time', 'Alpha']
sliders = [0, 0, 0, 0];
var availableHeight = window.innerHeight - 16;
size = availableHeight;
var pageOffsetX;
var pageOffsetY;
function arcCount(p) {
  return p.pow(SLIDER_MAX, 0.7) - p.pow(sliders[0].value(), 0.7) + .4
}
function colorShift(p) {
  return sliders[1].value()
}
function getSpeed(p) {
  return p.sqrt(sliders[2].value()) / 500000
}
function getAlpha(p) {
  return sliders[4].value() / SLIDER_MAX
}
function getTime(p) {
  return p.millis() * getSpeed(p) + (p.max(sliders[3].value() / SLIDER_MAX * p.PI))
}
function calculatePageOffset() {
  var container = document.getElementById('interactiveSketchContainer');
  var rect = container.getBoundingClientRect();
  pageOffsetX = rect.left + window.pageXOffset + size + 10;
  pageOffsetY = rect.top + window.pageYOffset;
}
var interactiveArcs = function (p) {
  p.setup = function () {
    calculatePageOffset();
    makeButtons(p);
    makeSliders(p);
    p.colorMode(p.HSB)
    p.createCanvas(size, size);
  }
  //draw pattern every frame
  p.draw = function () {
    p.background(10)
    //starting at the edge of the screen, draw an arc then move inward
    for (radius = size; radius > 1; radius -= arcCount(p)) {
      draw_func(p, radius);
    }
  }
}


function orbFuncPreset(p, radius) {
  p.fill((radius * 100 / size) + colorShift(p), 75, 100, getAlpha(p));
  angle = radius * getTime(p) / (arcCount(p) / 2);
  p.arc(size / 2, size / 2, radius, radius, -angle, angle - p.PI);
};
function mazeFuncPreset(p, radius) {
  p.fill((radius * 50 / size) + colorShift(p), 90, 100, getAlpha(p));
  angle = (size - radius) * getTime(p) / (arcCount(p) / 2);
  p.arc(size / 2, size / 2, radius, radius, -angle, radius);
};
function ballFuncPreset(p, radius) {
  p.fill((radius * 70 / size) + colorShift(p), 100, 100, getAlpha(p));
  angle = (size - radius) * getTime(p) / (arcCount(p) / 2);
  p.arc(size / 2, size / 2, radius, size, -angle, angle - p.PI);
};
function wheelFuncPreset(p, radius) {
  p.fill((radius * 100 / size) + colorShift(p), 75, 100, getAlpha(p));
  angle = radius * getTime(p) / (arcCount(p) / 2);
  p.arc(size / 2, size / 2, radius, radius, angle, angle + p.PI);
}
function conchFuncPreset(p, radius) {
  p.fill((radius * 120 / size) + colorShift(p), 75, 100, getAlpha(p));
  angle = (size - radius) * getTime(p) / (arcCount(p) / 2);
  p.arc(size / 2, size / 2, radius, radius, -angle * 2, angle);
};
const BUTTON_HEIGHT = 40;
function makeButtons(p) {
  console.log(pageOffsetX)
  for (let i = 0; i < 5; i++) { // create 5 buttons
    p.createButton(PatternNames[i]) // label button with number
      .position(i * (size / 5) + pageOffsetX, size + pageOffsetY) // position button
      .size(size / 5, BUTTON_HEIGHT) // set button size
      .mousePressed(() => { // set callback for button click
        draw_func = PatternFuncs[i]; // set global state variable to button number
      });
  }
}
const ROOM_FOR_TEXT = 40;
const SLIDER_MAX = 300;
function makeSliders(p) {

  for (let i = 0; i < 5; i++) { // create 5 buttons
    sliders[i] = p.createSlider(0, SLIDER_MAX, 50).position(pageOffsetX + ROOM_FOR_TEXT, pageOffsetY + BUTTON_HEIGHT + i * 15).size(400);
    let h5 = p.createElement('h5', SettingNames[i]);
    h5.style('color', '#000000');
    h5.position(pageOffsetX, (BUTTON_HEIGHT / 2)  + pageOffsetY + (i * 15));
  }
}

var interactive = new p5(interactiveArcs, 'interactive');
