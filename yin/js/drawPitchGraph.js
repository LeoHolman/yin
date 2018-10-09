var mother;
var horse;

function setup(){
  createCanvas(700, 400);
  mother = createGraphics(700,400);
  horse = createGraphics(700,400);

}

function draw() {
  background(222);
  stroke(000);
  strokeWeight(5);
  line(0,5,width,5);
  line(0,100,width,100);
  line(0,200,width,200);
  line(0,300,width,300);
  line(0,394,width,394);

  //pitch mother`
  stroke('red');
  strokeWeight(4);
  line(100,80,width-80,80);

  //pitch horse
  stroke('blue');
  strokeWeight(4);
  line(100,250,300,380);
  line(300,380,width-100,50);
}
