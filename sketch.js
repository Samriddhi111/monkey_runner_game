//creating the variables
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var fruitGroup, obstacleGroup;
var score
var backgroundImage,background1;


function preload(){
  //loading the objects
  backgroundImage=loadImage("jungle2.jpg");
 monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}

function setup() {
  //size of the screen
  createCanvas(600,400);
  
  //creating background
   background1=createSprite(0,0,800,400);
  background1.addImage(backgroundImage);
  background1.scale=1.5;
  background1.x=background1.width/2;
  background1.velocityX=-4;
  
  var survivaltime=0;
  //creating the monkey
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running); 
  monkey.scale = 0.1;
 
  //creating ground
  ground = createSprite(400,350,900,10);
  ground.x = ground.width /2;  
  ground.velocityX = -4;
  ground.visible=false;
  
  //creating Obstacle and fruit Groups
  obstacleGroup = new Group();
  fruitGroup = new Group();
 //display the score
  score = 0;

  
}
function draw() {
  //colour of the background
  background(180);

  if(background1.x<100){
    background1.x=background1.width/2;
  }
  if (ground.x < 0){
      ground.x = ground.width/2;
        if(fruitGroup.isTouching(monkey)){
      fruitGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 1: monkey.scale=0.1;
                break;
        case 2: monkey.scale=0.2;
                break;
        case 3: monkey.scale=0.3;
                break;
        case 4:monkey.scale=0.4;
                break;
        default: break;
    }
  
  }
    if(keyDown("space")) {
        monkey.velocityY = -10;
    }
      monkey.velocityY = monkey.velocityY + 0.8
    
    monkey.collide(ground);  
  
    spawnfruit(); 
    spawnObstacle();
    
    drawSprites();

    stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);        

     stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime, 100,50);

     if(obstacleGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        fruitGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        fruitGroup.setLifetimeEach(-1);

  
}
}

function spawnObstacle(){
 if (frameCount % 80 === 0) {
   obstacle = createSprite(500,347,10,10);
   obstacle.y = random(315,347);
   obstacle.velocityX = -5;
    
     //assign lifetime to the variable
   obstacle.lifetime = 300;
    monkey.depth = obstacle.depth + 1;
    
    //add image of banana
     obstacle.addImage(obstacleImage);
     obstacle.scale=0.1;
    
    //add each banana to the group
   obstacleGroup.add(obstacle);
 }
}

function spawnfruit() {
  if (frameCount % 60 === 0) {
    var fruit = createSprite(600,120,40,10);
    fruit.y = Math.round(random(80,120));
    fruit.addImage(bananaImage);
     fruit.scale = 0.1;
     fruit.velocityX = -3;
    fruit.lifetime = 200;
  
    fruit.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
 
    fruitGroup.add(fruit);
  }


}
