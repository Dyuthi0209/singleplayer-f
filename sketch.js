var bg;
var turtle, turtleImg;
var score=0;
var plastic, plasticGroup;
var bag,bottle,fertilizer,oil,rings,straw;
var gameState=0;
var play=0;
var end=1;
var gameOver, gameOverImg;
var invisiblePlat, invisiblePlat2;
var restart, restartImg;
var up, upImg;
var down, dowmImg;

localStorage["HighestScore"] = 0;

function preload(){
bg=loadImage("images/background.jpg")
turtleImg=loadImage("images/turtle.png")

bag=loadImage("images/bag.png")
bottle=loadImage("images/bottle.png")
fertilizer=loadImage("images/fertilizer.png")
oil=loadImage("images/oil.png")
rings=loadImage("images/rings.png")
straw=loadImage("images/straw.png")

gameOverImg=loadImage("images/gameOver.jpg")
restartImg=loadImage("images/reset.png")

upImg=loadImage("images/uparrow.png")
downImg=loadImage("images/downarrow.png")
}

function setup() {
  createCanvas(900,400);

turtle=createSprite(200,200,50,50);
turtle.addImage("turtle", turtleImg);
turtle.scale=0.6;
turtle.setCollider("rectangle",0,0,250,150);
turtle.debug = false;

gameOver=createSprite(450,100,50,50);
gameOver.addImage("gameOver", gameOverImg);
gameOver.scale=0.6;
gameOver.visible=false;

restart=createSprite(450,300,50,50);
restart.addImage("reset", restartImg);
restart.scale=0.6;
restart.visible=false;

invisiblePlat = createSprite(0,40,400,10);
invisiblePlat.visible = false;

invisiblePlat2 = createSprite(0,410,400,10);
invisiblePlat2.visible = false;

up=createSprite(70,300,3,3);
up.addImage("up", upImg);
up.scale=0.15;

down=createSprite(70,370,3,3);
down.addImage("down", downImg);
down.scale=0.15;

plasticGroup= new Group;

score=0;
}

function draw() {
  background(bg);  

  fill("black");
  textSize(20)
  text("Score: "+ score, 10,20);
  text("Highest Score: "+ localStorage["HighestScore"],10,40)
  text("**use either the up and down arrows or the green buttons to move the turtle.", 210,20);

  turtle.collide(invisiblePlat);
  turtle.collide(invisiblePlat2);

  if (gameState===play){

    score = score + Math.round(getFrameRate()/60);

    if(keyIsDown(DOWN_ARROW)){
      turtle.y=turtle.y+7;
      }
      
      if(keyIsDown(UP_ARROW)){
        turtle.y=turtle.y-7;
        }

        if(mousePressedOver(up)){
          turtle.y=turtle.y-7;
        }

        if(mousePressedOver(down)){
          turtle.y=turtle.y+7;
        }
      
          if (frameCount % 50 === 0) {
          plastic = createSprite(910, random(45, 400), 100, 100);
          plastic.velocityX = -(6 + 3*score/100);
          var rand = Math.round(random(1,6));
          switch(rand){
              case 1: plastic.addImage("plastic",oil);
              break;
              case 2: plastic.addImage("plastic", fertilizer);
              break;
              case 3: plastic.addImage("plastic", rings);
              break;
              case 4: plastic.addImage("plastic", bag);
              break;
              case 5: plastic.addImage("plastic",bottle);
              break;
              case 6: plastic.addImage("plastic", straw);
              break;
          }
          plastic.scale=0.2;
          plasticGroup.add(plastic);
        }
      
if(plasticGroup.isTouching(turtle)){
  gameState=end;
}

  }




if(gameState===end){
    gameOver.visible=true;
    restart.visible = true;
    
    turtle.velocityY = 0;
    plasticGroup.setVelocityXEach(0)
    plasticGroup.setLifetimeEach(-1);
    plasticGroup.removeSprites();
    turtle.visible=false;

    up.visible=false;
    down.visible=false;
    
    if(mousePressedOver(restart)) {
      reset();
    }

    
    textSize(30)
    fill("white")
    text("Click on the home icon on the top left of the page to go back to the home page.", 200,400)

    background("black")
  }


  drawSprites();
}


function reset(){

  gameState = play;
  gameOver.visible = false;
  restart.visible = false;
  
  plasticGroup.destroyEach();
  //plasticGroup.removeSprites();
  turtle.visible=true;
  background(bg);

up.visible=true;
down.visible=true;

  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  

}



// story: saving turtle from plastics and other pollution in the sea(infinite runner)
// parts: multiplayer game, single player game, and facts about turtles.