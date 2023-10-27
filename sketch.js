let position;
let velocity;
let acceleration;
let mouse;

function setup() {
createCanvas(400, 400);
noCursor();

position = createVector(width/2, height/2);
velocity = createVector();
acceleration = createVector();

//We want to use some vector methods on the mouse coordinates
//so we'll create a mouse vector
mouse = createVector();
}

function draw() {
background(80); 

//set mouse vector to mouseX, mouseY
mouse.set(mouseX, mouseY);

//we want our ellipse to accelerate towards the mouse.
//In order to do this, we need to calculate the vector 
//pointing from 'position' to the mouse.
//Give it a reasonable magnitude, then accelerate in that direction.
//To get the vector pointing from 'position' to the mouse, 
//we simply subtract position from mouse. 
//Check p5.Vector in the reference for what methods you should use.
let direction = p5.Vector.sub(mouse, position);

//now set the magnitude to something smaller than '1'. 
//Feel free to play around with this value
direction.setMag(0.8);

//now set acceleration to our updated mouse vector
acceleration.set(direction);
velocity.add(acceleration);   
velocity.limit(5);
position.add(velocity);


//Draw a paddle (function below) at mouseX, mouseY
//Note what happens when using 
//mouseX, mouseY versus mouse.x, mouse.y. 
//The vector we made has been changed by 
//the vector math we've done above.
//Always be mindful of what order you're 
//doing things in/if you should copy a vector before using it for math.
paddle(mouse.x, mouse.y, 50);

//Draw a line from mouseX,mouseY to the position vector
stroke(0);
line(mouseX, mouseY, position.x, position.y);

noStroke();
ellipse(position.x, position.y, 30);

}

//Here's the function to draw a paddle
function paddle(x, y, size){
push();
rectMode(CENTER);
noStroke();
fill(220, 200, 180);
rect(x, y+size/2, size/3.5, size/1.5, size/10);
stroke(220, 200, 180);
strokeWeight(size/20);
fill(200, 100, 100);
rect(x, y, size, size, size/2, size/2, size/4, size/4);
pop();
}