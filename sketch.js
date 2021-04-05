var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud , cloudImage
var ob1,ob2,ob3,ob4,ob5,ob6
var ob
var trex_collided
var score
var gamestate = "play"
var cloudgroup 
var obgroup
var restartimage,gameOverimage
var gameOver , restart
var checkPoint,die,jump


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage ("cloud.png")
  ob1= loadImage ("obstacle1.png")
  ob2= loadImage ("obstacle2.png")
  ob3= loadImage ("obstacle3.png")
  ob4= loadImage ("obstacle4.png")
  ob5= loadImage ("obstacle5.png")
  ob6= loadImage ("obstacle6.png")
  trex_collided = loadAnimation ("trex_collided.png")
  restartimage = loadImage ("restart.png")
  gameOverimage = loadImage ("gameOver.png")
  checkPoint = loadSound ("checkPoint.mp3")
die = loadSound ("die.mp3")
 jump = loadSound ("jump.mp3") 
 backgroundImg = loadImage("bg.jpg");
                              
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex . addAnimation ("colision",trex_collided)
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
 obgroup = createGroup()
cloudgroup = createGroup()
trex.setCollider("circle",0,0,40);  
  trex . debug = false
 score = 0 
gameOver = createSprite(300,75)
gameOver.addImage ("game over", gameOverimage)
restart =  createSprite (300,100)
restart . addImage  ("restart", restartimage) 
restart.scale = 0.5
gameOver.scale = 0.5

}

function draw() {
  //set background color
  background(backgroundImg);
  text("Mohitha game ", 20,20)
  text ("score=" +score, 500,20)
 
  if (gamestate == "play"){
    trex. changeAnimation ("running",trex_running)
    gameOver.visible = false;
    restart.visible = false;
    score = score+2
    if(score>200)
      {
        increasespeed()
      }
   if(keyDown("space")&& trex.y>= 120) {
    trex.velocityY = -10;
  jump. play()
   }
   if (score%100 == 0)
     (checkPoint.play)
     trex.velocityY = trex.velocityY + 0.8
    if (ground.x < 0 )
   {
     ground.x = 300
   }   
    spawnClouds()
 spawnobstacle ()
 if (trex.isTouching (obgroup) )  
{
gamestate = "end"
die.play ()
}   
  }
 if (gamestate == "end")
   {gameOver.visible = true;
    restart.visible = true;
     trex.velocityY = trex.velocityY + 0.8
     trex. changeAnimation ("colision",trex_collided)
 obgroup.setVelocityXEach(0)
 cloudgroup.setVelocityXEach(0)   
ground. velocityX = 0
cloudgroup.setLifetimeEach(-5)
  obgroup.setLifetimeEach(-5)
  if(mousePressedOver(restart))  
   {
     rebegin ()
   } 
   }
  
  
  trex.collide(invisibleGround);
  
  
  
  drawSprites();   
}
function rebegin()
{
gamestate = "play"
obgroup.destroyEach()
  cloudgroup.destroyEach()
  score=0
}
function spawnClouds(){
  if(frameCount%60==0)
    {
      
    
cloud = createSprite (550,50,10,10) 
cloud.addImage ("clouds",cloudImage)  
cloud. velocityX = -3 
cloud.y = random (10,70)
cloud. lifetime = 150  
cloudgroup . add (cloud)      
  
}}
function spawnobstacle ()
{
 if (frameCount%60==0) 
 {
   
 
ob= createSprite (550,170,10,10)  
  ob. velocityX= -3
var a = Math.round ( random (1,6))  
console.log(a) 
switch(a)  
  {
    case 1: ob. addImage ("obstacles",ob1)    
      break 
      case 2 :  ob. addImage ("obstacles",ob2) 
      break 
      case 3 :  ob. addImage ("obstacles",ob3) 
      break 
      case 4:  ob. addImage ("obstacles",ob4) 
      break  
      case 5:  ob. addImage ("obstacles",ob5) 
      break 
      case 6:  ob. addImage ("obstacles",ob6) 
  }      
   ob. scale =   0.5
   ob.lifetime = 175
   obgroup .add (ob)
  }
}
function increasespeed ()
{
 obgroup.setVelocityXEach (-7) 
  cloudgroup.setVelocityXEach (-7) 
  ground.velocityX = (-7) 
}

