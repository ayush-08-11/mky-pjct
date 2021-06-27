var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running;
var ground, invisibleGround, groundImage;

var bananaGroup, bananaImage;
var obstaclesGroup, obstacle1;

var score;
var gameOverImg;
var bananaCount = 0;

function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  
  obstacle1 = loadImage("obstacle.png");
  
  gameOverImg = loadImage("gmovr.jpg")
  
}

function setup() {
  createCanvas(550, 260);
  
  var message = "This is a message";
 
  
  monkey = createSprite(50,250,20,50);
  
  monkey.addAnimation("running", monkey_running);

  monkey.scale = 0.104;
  
  ground = createSprite(200,250,1000,20);
  ground.shapeColor = "rgb(49, 0, 0)"
  ground.x = ground.width /2;
  
  gameOver = createSprite(280,150);
  gameOver.addImage(gameOverImg);
  
  if(mousePressedOver(gameOver)){
    reset();
  }
  
  gameOver.scale = 0.7;
  
  invisibleGround = createSprite(200,250,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and banana Groups
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();

  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
 
  
  score = 0;
  
}

function draw() {
  
  background("white");
  //displaying score
  text("Travel: "+ score, 480,20);
   text("Banana Eaten: "+ bananaCount, 200,20);
  
  
  if(gameState === PLAY){
    //move the 
    gameOver.visible = false;
    
    if(bananaGroup.isTouching(monkey)){
      bananaCount +=1
       bananaGroup[0].destroy();
    }
    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 170) {
        monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the banana
    spawnbanana();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(monkey)){
        //monkey.velocityY = -12;
        gameState = END;
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
     
     obstaclesGroup.setLifetimeEach(0);
    bananaGroup.setLifetimeEach(0);
     
       
   }
  
 
  //stop monkey from falling down
  monkey.collide(invisibleGround);
  

  drawSprites();
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  
  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
  
  monkey.changeAnimation("running", monkey_running);
    
}

function spawnObstacles(){
 if (frameCount % 120 === 0){
   var obstacle = createSprite(500,220,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
   
      obstacle.addImage(obstacle1);
    
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.12;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnbanana() {
  //write code here to spawn the banana
  if (frameCount % 120 === 20) {
    var banana = createSprite(600,170,40,10);
    banana.addImage(bananaImage)
    banana.y = Math.round(random(120,150))
    banana.scale = 0.13;
    banana.velocityX = -3;
    
    //assign lifetime to the variable
    banana.lifetime = 300;
    
    //adjust the depth
    banana.depth = monkey.depth
    monkey.depth = monkey.depth + 1;
    
    //add each banana to the group
    bananaGroup.add(banana);
    }
}

