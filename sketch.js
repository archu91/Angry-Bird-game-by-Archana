const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var backgroundImg,platform;
var bird, slingshot;
var pig1,pig2;

var gameState = "onSling";
var score = 0;
var birds = []; 

function preload() {
    getBackgroundImg();
    bgImg = loadImage("sprites/bg.png");
    bird1Img = loadImage("sprites/bird.png");
    bird2Img = loadImage("sprites/bird2.png");
    bird3Img = loadImage("sprites/bird3.png");
    restart = createImg("sprites/restart.png");

    birdFly = loadSound("sounds/bird_flying.mp3");
    birdSelect = loadSound("sounds/bird_select.mp3");
    pigSound = loadSound("sounds/pig_snort.mp3");
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig2 = new Pig(810, 220);
    log2 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log3 = new Log(760,120,150, PI/7);
    log4 = new Log(870,120,150, -PI/7);

    bird1 = new Bird(200,50, bird1Img);
    bird2 = new Bird(130,170, bird2Img);
    bird3 = new Bird(60,170, bird3Img);

    birds = [bird1,bird2,bird3];

    slingshot = new SlingShot(birds[0].body,{x:200, y:50});
  
    restart.position(15, 10);
}

function draw(){
    if(backgroundImg) {
        background(backgroundImg);
    }
    else {
            background(bgImg);
    }
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);

    ground.display();

    box1.display();
    box2.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig2.display();
    pig2.score();
    log2.display();

    box5.display();
    log3.display();
    log4.display();

    bird1.display();
    bird2.display();
    bird3.display();

    platform.display();
  
    slingshot.display();

    restart.mousePressed(reload);

    if(gameState==="launched")  {

        fill("brown");
        textStyle(BOLD);
        textSize(20);

        if(birds.length>1 && score !== 200){
            text("Press 'Space' for Next Bird", 450, 50);        
        }

        if(birds.length ===1 && score !== 200){
            text("GAME OVER!",500, 50);
            text("Click on Restart Icon to play again!",420, 75);
    }

    }
    if(score === 200){
        fill("brown");
        textStyle(BOLD);
        textSize(20);
        text("YOU WIN!",510, 50);
        text("Click on Restart Icon to play again!",420, 75);
    }
}


function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(birds[0].body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    birdFly.play();
    gameState = "launched"; 
}

function keyPressed(){
    if(keyCode === 32){
        birdSelect.play();
        gameState = "onSling"
        birds[0].trajectory = [];
        birds.shift();
       //World.remove(world, birds[0]);
       Matter.Body.setPosition(birds[0].body,{x:200, y:20});
       slingshot.attach(birds[0].body);
    }
}

function reload() {
    location.reload()
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    //console.log(hour);
    if(hour>=06 && hour<=19){
        bg = "sprites/bg.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    //Sconsole.log(backgroundImg);
}