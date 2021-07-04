var ghostRunner,ghostRunnerImg;
var bgImg,bg;
var climber,climberImg,invisbleObstacle,door,doorImg;
var climberGroup,doorGroup,invisibleObstacleGroup;
var gameState ="play";



function preload(){
 
  ghostRunnerImg = loadImage("ghost-standing.png");
  bgImg = loadImage("tower.png");
  climberImg = loadImage("climber.png");
  doorImg = loadImage("door.png");
  
}

function setup(){
  createCanvas (600,600);
 
   bg = createSprite(300,300);
  bg.addImage(bgImg);
  
  ghostRunner =createSprite(300,150,50,50);
  ghostRunner.addImage(ghostRunnerImg);
  ghostRunner.scale = 0.3
  
  
  doorGroup =new Group();
  climberGroup =new Group();
  invisibleObstacleGroup =new Group();
}
function draw(){
  background(0);
  
  if (gameState==="play"){
  bg.velocityY = 6;
  
  if (bg.y>450){
 bg.y = 300;
 
  }
  
  if (keyDown("left_Arrow")){
    ghostRunner.x = ghostRunner.x -2;
    
  }
  
   if (keyDown("right_Arrow")){
    ghostRunner.x = ghostRunner.x +2;
    
  }
  
  if (keyDown("space")){
    ghostRunner.velocityY = -4;
  }
  
  ghostRunner.velocityY =  ghostRunner.velocityY+0.3;
  
  
  if (ghostRunner.isTouching(climberGroup)){
    
    ghostRunner.velocityY = 0;
    
  }
    spawnObstacles(); 
    
    if (ghostRunner.y >600||ghostRunner.isTouching(invisibleObstacleGroup)){
      gameState = "end";
    }
  }
  
  if (gameState==="end"){
    doorGroup.destroyEach();
     climberGroup.destroyEach();
    invisibleObstacleGroup.destroyEach();
    ghostRunner.destroy();
    bg.destroy();
    
    fill("yellow");
    textSize (30);
    text("GAME OVER",200,350);
  }
  
  
   
  drawSprites();
}

function spawnObstacles(){
  
  if (camera.position.y%200===0){
  var door=createSprite(Math.round(random (100,500)),-50);
  door.addImage(doorImg);
    door.velocityY = 1;
    door.lifeTime = 600;
    doorGroup.add (door);
    
    var climber = createSprite(door.x,0);
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.lifeTime = 600;
    climberGroup.add ( climber);
    
    var invisibleObstacle = createSprite(door.x,10,climber.width,2);
    invisibleObstacle.debug = true;
    invisibleObstacle.velocityY = 1;
    invisibleObstacle.lifeTime = 600;
    invisibleObstacleGroup.add  (invisibleObstacle);
    
    
    door.depth=ghostRunner.depth;
    climber.depth = door.depth;
    invisibleObstacle.depth = door.depth;
    ghostRunner.depth = ghostRunner.depth+1;
}}