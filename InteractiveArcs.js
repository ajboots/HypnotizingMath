draw_func = orbFuncPreset;
const PatternFuncs = [orbFuncPreset, mazeFuncPreset, ballFuncPreset, conchFuncPreset, wheelFuncPreset]
const PatternNames = ['Orb', 'Maze', 'Ball', 'Conch', 'Wheel']
const SettingNames = ['Arcs', 'Color', 'Speed', 'Time', 'Alpha']
sliders = [0, 0, 0, 0];
var availableHeight = window.innerHeight - 16;
size = availableHeight;
var pageOffsetX;
var pageOffsetY;
var uiSize;
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
  pageOffsetY = (window.innerWidth - size) / 8;
  uiSize = (window.innerHeight - pageOffsetY ) / 28;
}
var interactiveArcs = function (p) {
  p.setup = function () {
    calculatePageOffset();
    makeSliders(p);
    printCode(p);
    p.colorMode(p.HSB)
    p.createCanvas(size, size);
  }
  //draw pattern every frame
  p.draw = function () {
    p.background(10)
    //starting at the edge of the screen, draw an arc then move inward
    for (radius = size - 1; radius > 0; radius -= arcCount(p)) {
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
  p.arc(size / 2, size / 2, radius, radius, -angle, radius / 150);
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
function makeButtons(p, startingY) {
  let h1 = p.createElement('h2', 'Arc Forumlas');
  h1.style('color', '#ffffff');
  h1.style('font-size', 15+uiSize/2 + 'px');
  h1.position(pageOffsetX, startingY + uiSize*2);
  console.log(pageOffsetX)
  for (let i = 0; i < 5; i++) { // create 5 buttons
    p.createButton(PatternNames[i]) // label button with number
      .position(i * ((window.innerWidth - size - 70) / 5) + pageOffsetX, uiSize*5 + startingY) // position button
      .size((window.innerWidth - size - 70) / 5, uiSize*2) // set button size
      .mousePressed(() => { // set callback for button click
        draw_func = PatternFuncs[i]; // set global state variable to button number
      });
  }
}
const ROOM_FOR_TEXT = 70;
const SLIDER_MAX = 300;

function makeSliders(p) {
  let h1 = p.createElement('h2', 'Simulation Setting');
  h1.style('color', '#ffffff');
  h1.style('font-size', 15+uiSize/2 + 'px');
  h1.position(pageOffsetX,  pageOffsetY );
  for (let i = 0; i < 5; i++) { // create 5 buttons
    sliders[i] = p.createSlider(0, SLIDER_MAX, 250 - i * 40)
      .position(pageOffsetX + ROOM_FOR_TEXT, uiSize+pageOffsetY + i * uiSize + 32)
      .size(Math.min((window.innerWidth - size - (ROOM_FOR_TEXT * 2))));
    let h2 = p.createElement('h3', SettingNames[i]);
    h2.style('color', '#ffffff');
    h2.position(pageOffsetX,  uiSize+pageOffsetY + i * uiSize + 10);
  }
  makeButtons(p, uiSize+pageOffsetY + 4 * uiSize + 10);
}

function printCode(p) {
  // let h1 = p.createElement('h2', '');
  // h1.style('color', '#ffffff');
  // h1.position(pageOffsetX, window.innerHeight -430);
}
var interactive = new p5(interactiveArcs, 'interactive');
