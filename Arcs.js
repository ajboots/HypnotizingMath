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
    for (radius = p.size; radius > 1; radius -= p.arc_spacing) {
      p.arcFunc(p);
    }
  }
};

var orbFunc = function (p) { // p could be any variable name
  p.fill((radius * 100 / p.size) + 120, 75, 300, p.alpha);
  angle = radius * p.millis() * speed / (p.arc_spacing / 2);
  p.arc(p.size / 2, p.size / 2, radius, radius, -angle, angle - p.PI);
  updateCurrentTime(p.millis() * speed);
};
var snailFunc = function (p) { // p could be any variable name
  p.fill((radius * 100 / p.size) + 250, 75, 300, p.alpha);
  angle = (p.size - radius) * p.millis() * speed / (p.arc_spacing / 2);
  p.arc(p.size / 2, p.size / 2, radius, radius, -angle * 2, (angle / 2) + p.PI);
};
var ballFunc = function (p) { // p could be any variable name
  p.fill((radius * 120 / p.size) -29, 75, 300, p.alpha);
  angle = (p.size - radius) * p.millis() * speed / (p.arc_spacing / 2);
  p.arc(p.size / 2, p.size / 2, radius, p.size, -angle, angle - p.PI);
};
var pinwheelFunc = function (p) { // p could be any variable name
  p.fill((radius * 100 / p.size) + 180, 75, 300, p.alpha);
  angle = radius * p.millis() * speed / (p.arc_spacing / 2);
  p.arc(p.size / 2, p.size / 2, radius, radius, angle, angle + p.PI);
};
var mixedFunc = function (p) { // p could be any variable name
  p.fill(((radius * 80 / p.size) + 320) %360, 85, 300, p.alpha);
  angle = radius * p.millis() * speed / (p.arc_spacing / 2);
  p.arc(p.size / 2, p.size / 2, radius, radius, -angle * 2, (angle / 4) + p.PI);
};

var main = new p5(arcs, 'main');
main.size = 1600;
main.arc_spacing = 10;
main.alpha = .25;
main.arcFunc = snailFunc;

var ball = new p5(arcs, 'ball');
ball.size = 700;
ball.arc_spacing = 10;
ball.alpha = .1;
ball.arcFunc = ballFunc;

var conch = new p5(arcs, 'conch');
conch.size = 700;
conch.arc_spacing = 10;
conch.alpha = .3;
conch.arcFunc = mixedFunc;

var pinwheel = new p5(arcs, 'pinwheel');
pinwheel.size = 700;
pinwheel.arc_spacing = 10;
pinwheel.alpha = .4;
pinwheel.arcFunc = pinwheelFunc;

var orb = new p5(arcs, 'orb');
orb.size = 700;
orb.arc_spacing = 10;
orb.alpha = .5;
orb.arcFunc = orbFunc;