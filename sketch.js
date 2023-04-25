const SIZE = 500;
ARC_SPACING = 3;
SPEED = 1 / 2000.0
function setup() {
  colorMode(HSB)
  createCanvas(SIZE, SIZE);
  background(0)
}
//draw pattern every frame
function draw() { drawArcs(); }

function drawArcs() {
  //starting at the edge of the screen, draw an arc then move inward
  for (radius = SIZE; radius > 1; radius -= ARC_SPACING) {
    //color gradient, faded edge, and the pattern slowly growing at the start
    let fadedEdge = min(millis() / 50, SIZE) - (pow(radius, 5) / pow(radius, 4));
    fill(color((radius * 100 / SIZE) + 250, 300, fadedEdge));
    //defines and draws arc from time and arc distance from center
    angle = (radius) * (millis() * PI * SPEED / SIZE) 
    arc(SIZE / 2, SIZE / 2, radius, radius, -angle, angle - PI);
  }
}