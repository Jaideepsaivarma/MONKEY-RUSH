var back,jungle,ground;
var monkey,monkeyanimation,monkey_collide;
var banana,bananaimg,stone,stoneimg;
var foodgroup,rockgroup;
var gameover,game,rest,restart;
var time = 0;
var PLAY = 0;
var END  = 1;
var gamestate = PLAY;

function preload()
{ 
  bananaimg = loadImage("banana.png");
  jungle = loadImage("jungle.jpg");
  monkeyanimation=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  stoneimg = loadImage("stone.png");
  monkey_collide = loadAnimation("Monkey_09.png");
  game = loadImage("game over.jpg");
  rest = loadImage("restart.png");
  
  
  
  
}function setup() {
  
  createCanvas(600, 400);
  //creating backgroud....
  back = createSprite(300,200,600,400);
  back.addImage(jungle);
  back.velocityX =-6+(time/2); 
  //creating monkey....
  monkey = createSprite(80,350);
  monkey.addAnimation("monk",monkeyanimation);
  monkey.addAnimation("collided",monkey_collide)
  monkey.scale=0.120;
  //creating invisible monkey....
  ground = createSprite(80,390,500,10);
  ground.visible=false;
  foodgroup = new Group();
  rockgroup = new Group();
  
  gameover = createSprite(300,160);
  gameover.addImage(game);
  gameover.scale = 0.7;
  gameover.visible = false;
  
  restart = createSprite(300,300);
  restart.addImage(rest);
  restart.scale = 0.6;
  restart.visible = false;
}

function draw() {
  background(220);
  
    if (back.x < 130){
      back.x = 450;
    }
    monkey.velocityY = monkey.velocityY+0.7;
    monkey.collide(ground);
  
  if(gamestate===PLAY){
   
  if(foodgroup.isTouching(monkey)){
      foodgroup.destroyEach();
      time = time+2;
    }
    
    if(keyDown("space") && monkey.y > 340){
    monkey.velocityY=-18  ;   
  }

   if (World.frameCount%130==0){
   spawnfood();
 }
  if(World.frameCount%100==0){
   spawnrocks(); 
  }
    
  }else if(gamestate===END){
   back.velocityX = 0;
  rockgroup.setVelocityXEach(0);    
  foodgroup.setVelocityXEach(0);
   monkey.changeAnimation("collided");
    restart.visible = true;
    gameover.visible = true;
    foodgroup.destroyEach();
  }
     
  if(rockgroup.isTouching(monkey)){
      gamestate = END;
    }
  if(mousePressedOver(restart)){
    gamestate = PLAY;
    reset();
  }

  
  
   //var rand = Math.round(randmon(1,6));
  switch(time){
    case 0 :  monkey.scake = 11;
    break;
    case 10 : monkey.scale = 0.12;
    break;
    case 20 : monkey.scale = 0.14;
    break;
    case 30 : monkey.scale = 0.16;
    break;
    case 40 : monkey.scale = 0.18;
    break;
    default : break;
          //Console.log("monkey.scale");
  }
  drawSprites();
  textSize(35);
  fill("blue");
  text("score : " +time,450,40);
  if(gamestate===END){
    textSize(20);
    fill("white")
    text("DESIGNED",200,230);
    text("BY",265,250);
    text("JAIDEEP",285,265)
  }
}
function spawnfood(){
  banana = createSprite(600,random(350,250),10,10);
banana.addImage(bananaimg);
 banana.scale=0.06;
 banana.velocityX=back.velocityX;
  foodgroup.add(banana);
}
function spawnrocks(){
  stone=createSprite(600,380,10,10);
  stone.addImage(stoneimg);
  stone.velocityX = back.velocityX;
  stone.scale=0.3 
  rockgroup.add(stone);
  //stone.debug = true;
  stone.setCollider("rectangle",0,0,200,300);
}
function reset(){
  rockgroup.destroyEach();
  foodgroup.destroyEach();
  time = 0;
  back.velocityX = -4;
  monkey.changeAnimation("monk");
  gameover.visible = false;
  restart.visible = false;
  
}
