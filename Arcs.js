
// save this file as sketch.js
// Sketch One

function updateCurrentTime(time) {
  var currentTimeElement = document.getElementById("current_time");
  currentTimeElement.innerHTML = parseFloat(time.toFixed(3));;
}

var orb = function (p) { // p could be any variable name
  var SPEED =  1/100.0

  p.setup = function() {
    p.colorMode(p.HSB)
    p.createCanvas(p.size, p.size);
    p.background(0)
  }
  //draw pattern every frame
  p.draw = function() { p.clear(); p.drawArcs(); }

  p.drawArcs = function() {
    //starting at the edge of the screen, draw an arc then move inward
    for (radius = p.size; radius > 1; radius -= p.arc_spacing) {
      //gradient, faded edge, and the pattern slowly growing at the start
      p.fill((radius * 100 / p.size) + 250, 75, 300, p.alpha);
      //defines and draws arc from time and arc distance from center
      updateCurrentTime(p.millis() * SPEED / p.size);
      angle = radius * (p.millis() * SPEED / p.size)
      p.arc(p.size / 2, p.size / 2, radius, radius, -angle, angle - p.PI);
    }
  }
};
var snail = function (p) { // p could be any variable name
  var SPEED =  1/100.0
  p.setup = function() {
    p.colorMode(p.HSB)
    p.createCanvas(p.size, p.size);
    p.background(0)
  }
  //draw pattern every frame
  p.draw = function() { p.clear(); p.drawArcs(); }

  p.drawArcs = function() {
    //starting at the edge of the screen, draw an arc then move inward
    for (radius = p.size; radius > 1; radius -= p.arc_spacing) {
      //gradient, faded edge, and the pattern slowly growing at the start
      p.fill((radius * 100 / p.size) + 250, 75, 300, p.alpha);
      //defines and draws arc from time and arc distance from center
      angle = radius * (p.millis() * SPEED / p.size)
      p.arc(p.size / 2, p.size / 2, radius, radius, 0, angle - p.PI);
    }
  }
};
var pinwheel = function (p) { // p could be any variable name
  var SPEED =  1/100.0
  p.setup = function() {
    p.colorMode(p.HSB)
    p.createCanvas(p.size, p.size);
    p.background(0)
  }
  //draw pattern every frame
  p.draw = function() { p.clear(); p.drawArcs(); }

  p.drawArcs = function() {
    //starting at the edge of the screen, draw an arc then move inward
    for (radius = p.size; radius > 1; radius -= p.arc_spacing) {
      //gradient, faded edge, and the pattern slowly growing at the start
      p.fill((radius * 100 / p.size) + 250, 75, 300, p.alpha);
      //defines and draws arc from time and arc distance from center
      angle = radius * (p.millis() * SPEED / p.size)
      p.arc(p.size / 2, p.size / 2, radius, radius, angle, angle + p.PI);
    }
  }
};


var main = new p5(orb, 'main');
main.size = 800;
main.arc_spacing = 3;
main.alpha = 1;

// var sd = new p5(arcs, 'sd');
// sd.size = 800;
// sd.arc_spacing = 5;

// var bs = new p5(arcs, 'bs');
// bs.size = 800;
// bs.arc_spacing = 50;

// var bd = new p5(arcs, 'sd');
// bd.size = 800;
// bd.arc_spacing = 5;
