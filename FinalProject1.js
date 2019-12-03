var x;
var y;
var noiseScale1=0.025;
var noiseScale2=0.02;
var noiseScale3=0.015;
var noiseScale4= 0.01;
var range1 = 120;
var range2 = 100;
var range3 = 80;
var range4 = 50;
let s = 'Click to jump over obstacles and dodge lifts! Current High Score:120'
let ss = 'Score'
let finalScore = 'Final Score:'
var score = 0;
var snowboarder;
let tree;
let pebblex;
let playerx;
let birdx;
let lift1; 
var rocksX = [];
var rocksdX = [];
var highscore = 0; 
var mouse = 0;
var counter = 0
var neckR = 0;
var neckDown = true;
var wingDown = false;
var wingR = 0

function setup() 
{

  createCanvas(1100, 600);
  var snowboarderAlive = true;
  rocksX.push(1000);
  rocksdX.push(-1);
  tree = new Boulder();
  pebblex = new Pebble();
  birdx = new bird();
  playerx = new Player();
  lift1 = new Chairlift();
  createObstacles()
  snow = new PSys(1000);
}

function draw() 
{
  

  var color1 = color(225, 233, 245);
  var color2 = color(125, 148, 181);
  setGradient(0, 0, width, 100+height, color1, color2, "Y");

  drawMounts(280, range2,155, noiseScale2);
  drawMounts(190, range3, 220, noiseScale3);


  drawMounts(100, range4, 220, noiseScale4);

  push()
  fill(255)
  rect(0, 580, 1000, 50)
  pop()
  snow.run();
  

    createObstacles();
  
  for (var i = 0; i < 1; i++){
    rocks(rocksX, 0)
    rocksX[i] += (rocksdX[i] -3)

  scoreboard(100, 100,0)  


}
}
//this code was found on p5.js
function drawMounts(peak,range,scale,noiseScale) {
  for (var x=0; x < width; x++) {
    var noiseVal = noise((200+x)*noiseScale, 200*noiseScale);
    stroke(100,range);
    line(x, (peak)+noiseVal*scale, x, height);
  }
}

function Particle(x , y)
{
   this.accelY = random(.1,.15); //gravity
   this.velX = random(-1, 1);
   this.velY = random(0,1);
   this.pcolorB = 150+random(0,255);
   this.locX = x;
   this.locY = y;
   this.r = random(5,12);
   this.life = 999;
   this.updateP = function()
   {
      this.velY += this.accelY;
      this.locX += this.velX;
      this.locY += this.velY;
      this.life -= 1.0;
   };
  
   this.renderP = function() 
   {
      noStroke();
      push();
         fill(this.pcolorB);
         translate(this.locX, this.locY);
         ellipse(x, y,   this.r, this.r);
      pop();
   };
} 

function PSys(num)
{
   this.particles = [];
   for (var i=0; i < num; i++) 
   {
      this.particles.push(new Particle(random(width), random(-height, 0)));
   }
    this.run = function() 
   {
      for (var i=this.particles.length-1; i >=0 ; i--) 
      {
         this.particles[i].updateP();
         this.particles[i].renderP();
         // add remove particle code
         if (this.particles[i].locY > height)
         {   
             this.particles.splice(i,1);
             this.particles.push(new Particle(random(width), random(-60, -50)));
         }

      }
   }
}


function freezeCanvas() {
    draw = function(){
        background(100)
        textSize(72)
        

        if (counter < 5){
          background('#cd7f32')
          textFont('Quicksand')
          text(finalScore, 20, 20, 500,500)
          text(counter, 450, 20, 500,500)
          text('Hawkward', 220, 220, 800,400)

        }
          if ((counter < 8) && (counter >4)){
          background('#D3D3D3')
          textFont('Quicksand')
          text(finalScore, 20, 20, 500,500)
          text(counter, 450, 20, 500,500)
          text('Toucan Do It!', 220, 220, 800,400)
        }
          if ((counter < 12) && (counter >7)){
          background('#DAA520')
          textFont('Quicksand')
          text(finalScore, 20, 20, 500,500)
          text(counter, 450, 20, 500,500)
          text('Eggcellent', 220, 220, 800,400)
          }

          if ((counter <16) && (counter > 11)){
            background('#50c878')
            textFont('Quicksand')
            text(finalScore, 20, 20, 500,500)
            text(counter, 450, 20, 500,500)
            text('Fearless Flyer', 220, 220, 800,400)
          }

        if (counter > 15){
          background('#B9F2FF')
          textFont('Quicksand')
          text(finalScore, 20, 20, 500,500)
          text(counter, 450, 20, 500,500)
          text('IM-PECK-ABLE', 220, 220, 800,400)

        }
            
        }
      
    
}

function mousePressed(){
  mouse = -25
}


function mouseClicked(){
  mouse = 15
}

class Player{
  constructor(){
    this.x = 100;
    this.y = 300;
}
  move(){
    this.x += 0;

    if(this.y < 600){
    this.y += mouse;

  }else{
    this.y = 599

  }
  }

  display(){
    push();
    
    translate(this.x, this.y)
    drawOwl(0, 0, 1.25)

    pop();

  }
}
function SnowboardDeath(){
  endGameB();
  endGameP();
  endGameG();
  
}

function endGameG(){
  if (lift1.x == playerx.x) {
    counter++
    if (playerx.y < 301){
      freezeCanvas()
    }
  }
}

function endGameP(){
  if(pebblex.x == playerx.x) {
    counter++
    if (playerx.y > 400){
      freezeCanvas()
    }
  }
}

function endGameB(){
  if(tree.x == playerx.x){
    counter++
    if (playerx.y > 400){
      freezeCanvas()
    }
  }
}

function createObstacles(){
  tree.move();
  tree.display();
  pebblex.move();
  pebblex.display();
  birdx.move();
  birdx.display();
  playerx.move();
  playerx.display();
  lift1.display();
  lift1.move();
  SnowboardDeath();

}


function rocks(x, y){
  push();
    translate(x,y)
    fill(0)
    rect(0,0, 680, 100)
    fill(255)
    textSize(32);
    textFont('Quicksand')
    text(s, 20, 10, 700, 80)
  pop();
}

function scoreboard(x,y){
  push();
  translate(x,y);
  fill('#A5F2F3')
  ellipse(0, 0, 100);
  fill(0)
  textSize(20)
  textFont('Quicksand')
  text(ss, -20, -30, 100, 100)
  textSize(40)
  textFont('Quicksand')
  text(counter, -10, -8, 100, 100)
  pop();
}

class Boulder{
  constructor(){
    this.x = 900;
    this.y = 500;
    this.l = 50;
    this.h = 100;
    this.speed = 1;
    this.colorR = 60;
    this.colorG = 120;
    this.colorB = 50;
  }

  move(){
    this.x -=5;
    this.y += 0;
  }

  display(){
    if (this.x < 0){
      this.x = 1000
      
    }
    fill(102, 51, 0)
    rect(this.x, this.y, this.l, this.h)
    push()
      translate(this.x, this.y)
      fill(this.colorR, this.colorG, this.colorB)
      triangle(-25, 50, 25, -100, 75, 50)
    pop()
    
  }
}

class Chairlift{
  constructor(){
    this.x = 1100;
    this.y = 0;
    this.l = 238;
    this.h = 280;
    this.speed = 500; 
    this.color = 0;
  }

  move(){
    this.x -= 10;
    this.y += 0;
  }

  display(){
    if (this.x < -50){
      this.x = 1100
    }
    rect(this.x, this.y, this.l, this.h)
      fill(0)
            push()
      
        fill(34, 34, 34)
        translate(this.x, this.y)
        noStroke()
        ellipse(125,100 , 320)
        rect(0, 0, 240, 270)
        fill(255)
        rect(125, 0, 75, 200)
        rect(25, 0, 75, 200)
        
        
      pop()
    
  }

}
class Pebble{
  constructor(){
    this.x = 2000;
    this.y = 500;
    this.l = 50;
    this.h = 100;
    this.speed = 1;
    this.colorR = 60;
    this.colorG = 120;
    this.colorB = 50;
  }

  move(){
    this.x -=5;
    this.y += 0;
  }

  display(){
    if (this.x < 0){
      this.x = 1300
      
    }
    fill(102, 51, 0)
    rect(this.x, this.y, this.l, this.h)
    push()
      translate(this.x, this.y)
      fill(this.colorR, this.colorG, this.colorB)
      triangle(-25, 50, 25, -100, 75, 50)
      fill(120)
      ellipse(25, 100, 75)
      ellipse(-25,100, 50)

    pop()
    
  }
}

class bird{
  constructor(){
    this.x = 2500;
    this.y = 4750;
    this.l = 50;
    this.h = 100;
    this.speed = 1;
    this.colorR = 60;
    this.colorG = 120;
    this.colorB = 50;
  }

  move(){
    this.x -=5;
    this.y += 0;
  }

  display(){
    if (this.x < 0){
      this.x = 1500
      
    }
    
    push()
      translate(this.x, this.y)
      scale(.3)
      fill(255,250,250)
      translate(0, -300)
      ellipse(0, 0, 75, 12.5)
      ellipse(0, 0, 12.5, 75)
      push()
      translate(0)
      ellipse(0,0,30)
      stroke(255)
      strokeWeight(5)
      line(0, 0, 30, 30)
      line(0, 0, -30, -30)
      line(0, 0, -30, 30)
      line(0,0, 30, -30)
      pop()
      line()
      
    pop()
    
  }

}
function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis == "Y") {  // Top to bottom gradient
    for (let i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
  else if (axis == "X") {  // Left to right gradient
    for (let j = x; j <= x+w; j++) {
      var inter2 = map(j, x, x+w, 0, 1);
      var d = lerpColor(c1, c2, inter2);
      stroke(d);
      line(j, y, j, y+h);
    }
  }
}

function impl_line(x, y, x0, y0, x1, y1)
{
  return ((y0-y1)*x + (x1-x0)*y + x0*y1 - x1*y0);
}
function drawOwl(x, y, scl){
  push();
  scale(scl)
// body
fill(102, 51, 0)
  ellipse(0,0, 50, 29)
  fill(205, 204, 153)
  ellipse(0, 5, 39, 14)
  
// head
push()
rotate(neckR)
fill(102, 51, 0)
ellipse(17, -18, 3, 12)
ellipse(27, -18, 3, 12)
fill(205, 204, 153)
ellipse(17, -18, 1.5, 10)
ellipse(27, -18, 1.5, 10)
fill(102, 51, 0)
ellipse(22, -12, 20)
fill(205, 204, 153)
ellipse(24, -10, 14)

fill(0)
ellipse(20, -13, 5)
ellipse(28, -13, 5)

ellipse(24, -10, 2)

//legs
stroke(0)
strokeWeight(1)
line(-23, 4, -23, 9)
line(-23, 4, -26, 7)
line(-23, 4, -20, 11)
noFill();
arc(23.5, -8, 6, 4, PI/10, 3*PI/4)

noStroke();
fill(255, 255, 0)
ellipse(20, -13, 3.5)
ellipse(28, -13, 3.5)

fill(0)
ellipse(20, -13, 1.5)
ellipse(28, -13, 1.5)
pop(); 

// wing
push()
rotate(wingR)
fill(85, 42, 0)
ellipse(-7, -7, 38, 22)
pop();


// feet

   if (neckR < -PI/20) 
   {
      neckDown = false;
   } 
   if (neckR > PI/80) 
   {
      neckDown = true;
   }

   if (neckDown == true) 
   {
      neckR -= PI/300;
   } 
   else 
   {
      neckR += PI/300;
   }
 if (wingR < -2*PI/8) 
   {
      wingDown = true;
   } 
   if (wingR > PI/10) 
   {
      wingDown = false;
   }

   if (wingDown == false) 
   {
      wingR -= PI/20;
   } 
   else 
   {
      wingR += PI/90;
   }
   pop();
}
