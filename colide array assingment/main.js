let cnv = document.getElementById("my-canvas")
let ctx = cnv.getContext("2d")
document.addEventListener("mousedown", () => mouseIsPressed = true);
document.addEventListener("mouseup", () => mouseIsPressed = false);
//document.addEventListener("mousemove", mousemoveHandlerLib);
document.addEventListener("keydown", (e) => keyPressed[e.code] = true);
document.addEventListener("keyup", (e) => keyPressed[e.code] = false);
cnv.width = 800
cnv.height = 600


//variables
 let mouseX;
 let mouseY;
 let mouseIsPressed = false;
 let keyPressed = {};
//different rectangles
let rectangles = [];
 for (let i=1; i<=6;i++) {
    rectangles.push(newRandomRectangle());
 }

requestAnimationFrame(draw);
//draw rectangles
function draw() {
    // clear canvas
    ctx.clearRect(0,0, cnv.width, cnv.height)

    ctx.strokeRect(player.x,player.y,player.w,player.h)
    move();
    collide();
      
//when mouse is pressed on a rectangle then it goes back to the top
   for (let i = 0; i < rectangles.length; i++ ) {
        moveRectangle(rectangles[i]);
        drawRectangle(rectangles[i]);
     
      
   }
   
   requestAnimationFrame(draw);
}

function newRectangle(initX,initY,initW,initH,initColor,initSpeed) {
    return {
    
        x: initX,
        y: initY,
        w: initW,
        h: initH,
        color: initColor,
        speed : initSpeed,
        
        
    }
}
//draw rectangles
function drawRectangle(aRectangle) {
    fill(aRectangle.color)
    rect(aRectangle.x,aRectangle.y ,aRectangle.w,aRectangle.h,"fill")

}
//moving the rectangles

function moveRectangle(aRectangle) {

    if (aRectangle.y < cnv.height ){
        aRectangle.y += aRectangle.speed;
    } else {
        aRectangle.x = randomInt(aRectangle.w,cnv.width -aRectangle.w)
        aRectangle.y = - aRectangle.h - 10
    }
}


//creating a random different sized rectanlges
function newRandomRectangle() {
    
        let temp = {
        
        y: randomInt(0 ,0),
        w : randomInt(5,100),
        h : randomInt(5,60),
        color: randomRGB(),
        speed: randomInt(2,5),
        }
    temp.x =  randomInt(temp.x,cnv.width-temp.w)
    return temp
}



//player dimensions
let player = {
    x:400,
    y:300,
    w:25,
    h:25,
    speed:5


}

//move the character
function move(){
    if (keyPressed["ArrowUp"]) {
        player.y += -player.speed;
    } else if (keyPressed["ArrowDown"]){
        player.y += player.speed;
    }
    if (keyPressed["ArrowLeft"]) {
        player.x += -player.speed;
    } else if (keyPressed["ArrowRight"]){
        player.x += player.speed;
    }
    //player movement restrictions
    if (player.x + player.w >= cnv.width) {
        player.x = cnv.width - player.w
    } else if (player.x <0) {
        player.x = 0
    }
    if (player.y + player.h >=cnv.height) {
        player.y = cnv.height - player.h
    } else if (player.y <0) {
        player.y =  0
    }
}
function collide(){
    for(let i=0; i <rectangles.length; i++) {
        if (rectCollide(player, rectangles[i])){
            player.y = rectangles[i].y + rectangles[i].h 
        }
    }
}


//random integer/decima/color functions
function randomDec(low,high) {
    return Math.random() *(high-low) +low;
 
 
 }
 //return a random integer between low and high
 function randomInt(low,high) {
    return Math.floor(Math.random() *(high-low)+low);
 
 }
 // return a random rgb string
 function randomRGB() {
    let r=randomInt(0,256);
    let g=randomInt(0,256);
    let b=randomInt(0,256);
 
    return "rgb("+ r +", "+g+", " +b+")";
 } 

 
