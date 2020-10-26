var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var survivalTime = 0;
var ground;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}


function setup() {
 createCanvas(600,200);
  
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400,200,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  bananaGroup = createGroup();
  obstaclesGroup = createGroup();
}


function draw() {
background(300);
  
  if (gameState === PLAY){  
  survivalTime = Math.ceil(frameCount/frameRate());
    
    if(keyDown("space")&& monkey.y>=161){
    monkey.velocityY = -12;
  }

  spawnBanana();
  spawnObstacles();
    
  monkey.velocityY = monkey.velocityY + 0.8; 
  
  monkey.collide(ground);
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(obstaclesGroup.isTouching(monkey)){
      gameState = END;
    }
  }
  
  else if(gameState === END){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  
   stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+ score, 500, 50);
  
  stroke("black");
  textSize(15);
  fill("black");
  text("Survival Time:"+survivalTime, 100, 50);
  
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 300 === 0){
   var obstacle = createSprite(600,180,10,40);
    obstacle.addImage(obstacleImage);
   obstacle.velocityX = -4;
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}

function spawnBanana(){
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,150));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
}