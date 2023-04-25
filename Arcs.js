
// save this file as sketch.js
// Sketch One
var arcs = function (p) { // p could be any variable name
  var SPEED = 1 / 2000.0
  p.setup = function() {
    p.colorMode(p.HSB)
    p.createCanvas(p.size, p.size);
    p.background(0)
  }
  //draw pattern every frame
  p.draw = function() { p.drawArcs(); }

  p.drawArcs = function() {
    //starting at the edge of the screen, draw an arc then move inward
    for (radius = p.size; radius > 1; radius -= p.arc_spacing) {
      //color gradient, faded edge, and the pattern slowly growing at the start
      let fadedEdge = p.min(p.millis() / 50, p.size) - (p.pow(radius, 5) / p.pow(radius, 4));
      p.fill(p.color((radius * 100 / p.size) + 250, 300, fadedEdge));
      //defines and draws arc from time and arc distance from center
      angle = (radius) * (p.millis() * p.PI * SPEED / p.size)
      p.arc(p.size / 2, p.size / 2, radius, radius, -angle, angle - p.PI);
    }
  }
};
var ss = new p5(arcs, 'ss');
ss.size = 200;
ss.arc_spacing = 50;

var sd = new p5(arcs, 'sd');
sd.size = 400;
sd.arc_spacing = 5;

var bs = new p5(arcs, 'bs');
bs.size = 1200;
bs.arc_spacing = 50;

var bd = new p5(arcs, 'sd');
bd.size = 600;
bd.arc_spacing = 5;
