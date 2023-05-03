speed = 1 / 100000;



function updateCurrentTime(time) {
  var currentTimeElement = document.getElementById("current_time");
  currentTimeElement.innerHTML = parseFloat(time.toFixed(3));;
}
// updateCurrentTime(p.millis() * p.speed );


var arcs = function (p) { // p could be any variable name
  p.setup = function () {
    p.colorMode(p.HSB)
    p.createCanvas(p.size, p.size);
    p.background(0)
  }
  //draw pattern every frame
  p.draw = function () { p.clear(); p.drawArcs(); }

  p.drawArcs = function () {
    //starting at the edge of the screen, draw an arc then move inward
    for (radius = p.size; radius > 1; radius -= p.spacing) {
      p.arcFunc(p);
    }
  }
};
//4800 1620
var orbFunc = function (p) { // p could be any variable name
  p.fill((radius * 100 / p.size) + 120, 75, 100, p.alpha);
  angle = radius * p.millis() * speed / (p.spacing / 2);
  p.arc(p.size / 2, p.size / 2, radius, radius, -angle, angle - p.PI);
  updateCurrentTime(p.millis() * speed);
};
var mazeFunc = function (p) { // p could be any variable name
  p.fill((radius * 50 / p.size) -10, 90, 100, p.alpha);
  angle = (p.size - radius) * p.millis() * speed / (p.spacing / 2);
  p.arc(p.size / 2, p.size / 2, radius, radius, -angle, radius);
};
var ballFunc = function (p) { // p could be any variable name
  p.fill((radius * 70 / p.size) +240, 100, 100 , p.alpha);
  angle = (p.size - radius) * p.millis() * speed / (p.spacing / 2);
  p.arc(p.size / 2, p.size / 2, radius, p.size, -angle, angle - p.PI);
};
var pinwheelFunc = function (p) { // p could be any variable name
  p.fill((radius * 100 / p.size) + 180, 75, 100, p.alpha);
  angle = radius * p.millis() * speed / (p.spacing / 2);
  p.arc(p.size / 2, p.size / 2, radius, radius, angle, angle + p.PI);
};
var conchFunc = function (p) { // p could be any variable name
  p.fill((radius * 120 / p.size) +0 , 75, 100, p.alpha);
  angle = (p.size - radius) * p.millis() * speed / (p.spacing / 2);
  p.arc(p.size / 2, p.size / 2, radius, radius, -angle * 2, angle);
};

var main = new p5(arcs, 'main');
main.size = 1100;
main.spacing = 10;
main.alpha = .2;
main.arcFunc = ballFunc;

var ball = new p5(arcs, 'ball');
ball.size = 450;
ball.spacing = 10;
ball.alpha = .2;
ball.arcFunc = conchFunc;

var maze = new p5(arcs, 'maze');
maze.size = 450;
maze.spacing = 7;
maze.alpha = .2;
maze.arcFunc = mazeFunc;

var pinwheel = new p5(arcs, 'pinwheel');
pinwheel.size = 450;
pinwheel.spacing = 10;
pinwheel.alpha = .2;
pinwheel.arcFunc = pinwheelFunc;

var orb = new p5(arcs, 'orb');
orb.size = 450;
orb.spacing = 10;
orb.alpha = .2;
orb.arcFunc = orbFunc;