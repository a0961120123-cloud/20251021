let t = 0.0;
let vel = 0.02;
let num;
let paletteSelected;
let paletteSelected1;
let paletteSelected2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2)
  angleMode(DEGREES);
  num = random(100000);
  paletteSelected = random(palettes);
  paletteSelected1 = random(palettes);
  paletteSelected2 = random(palettes);
}

function draw() {
  randomSeed(num);
  // background("#355070");
  background(bgCol())
  stroke("#355070");
  circlePacking() 
}

function circlePacking() {
  push();

  translate(width / 2, height / 2)
  let points = [];
  let count = 2000;
  for (let i = 0; i < count; i++) {
    let a = random(360);
    let d = random(width * 0.35);
    let s = random(200);
    let x = cos(a) * (d - s / 2);
    let y = sin(a) * (d - s / 2);
    let add = true;
    for (let j = 0; j < points.length; j++) {
      let p = points[j];
      if (dist(x, y, p.x, p.y) < (s + p.z) * 0.6) {
        add = false;
        break;
      }
    }
    if (add) points.push(createVector(x, y, s));
  }
  for (let i = 0; i < points.length; i++) {

    let p = points[i];
    let rot = random(360);
    push();
    translate(p.x, p.y);
    rotate(rot);
    blendMode(OVERLAY)
    let r = p.z - 5;
    gradient(r)
    shape(0, 0, r)
    pop();
  }
  pop();
 }

function shape(x, y, r) {
  push();
noStroke();
//fill(randomCol())
  translate(x, y);
  let radius = r; //半徑
  let nums = 8
  for (let i = 0; i < 360; i += 360 / nums) {
    let ex = radius * sin(i);
    let ey = radius * cos(i);
    push();
    translate(ex,ey)
    rotate(atan2(ey, ex))
    distortedCircle(0,0,r);
	
    pop();
    stroke(randomCol())
    strokeWeight(0.5)
    line(0,0,ex,ey)
    ellipse(ex,ey,2)
  }


  pop();
}

function distortedCircle(x, y, r) {
  push();
  translate(x, y)
  //points
  let p1 = createVector(0, -r / 2);
  let p2 = createVector(r / 2, 0);
  let p3 = createVector(0, r / 2);
  let p4 = createVector(-r / 2, 0)
  //anker
  let val = 0.3;
  let random_a8_1 = random(-r * val, r * val)
  let random_a2_3 = random(-r * val, r * val)
  let random_a4_5 = random(-r * val, r * val)
  let random_a6_7 = random(-r * val, r * val)
  let ran_anker_lenA = r * random(0.2, 0.5)
  let ran_anker_lenB = r * random(0.2, 0.5)
  let a1 = createVector(ran_anker_lenA, -r / 2 + random_a8_1);
  let a2 = createVector(r / 2 + random_a2_3, -ran_anker_lenB);
  let a3 = createVector(r / 2 - random_a2_3, ran_anker_lenA);
  let a4 = createVector(ran_anker_lenB, r / 2 + random_a4_5);
  let a5 = createVector(-ran_anker_lenA, r / 2 - random_a4_5);
  let a6 = createVector(-r / 2 + random_a6_7, ran_anker_lenB);
  let a7 = createVector(-r / 2 - random_a6_7, -ran_anker_lenA);
  let a8 = createVector(-ran_anker_lenB, -r / 2 - random_a8_1);
  beginShape();
  vertex(p1.x, p1.y);
  bezierVertex(a1.x, a1.y, a2.x, a2.y, p2.x, p2.y)
  bezierVertex(a3.x, a3.y, a4.x, a4.y, p3.x, p3.y)
  bezierVertex(a5.x, a5.y, a6.x, a6.y, p4.x, p4.y)
  bezierVertex(a7.x, a7.y, a8.x, a8.y, p1.x, p1.y)
  endShape();
  pop();
}