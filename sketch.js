var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var car1,car2,car3,car4;

var cars;

var carImage1,carImage2,carImage3,carImage4;

var track;

var carSound

function preload(){
carImage1 = loadImage("images/car1.png");
carImage2 = loadImage("images/car2.png");
carImage3 = loadImage("images/car3.png");
carImage4 = loadImage("images/car4.png");
track = loadImage("images/track.jpg");
carSound = loadSound("carHacks.mp3")
}


function setup(){
  canvas = createCanvas(displayWidth-30,displayHeight-50);
  database = firebase.database();
  game = new Game();
  //get the gamestate from the database
  game.getState();
  //game is starting....user is shown the form
  game.start();

}


function draw(){
  //update the gameState to 1 if 4 players have joined
  if(playerCount === 4 && gameState===0){
    game.update(1);
  }
  //if gameState is 1,play the game
  if(gameState === 1){
    //clear();
    game.play();
  }
  //if gameState is 2 then end the game 
  if(gameState===2){
    game.end()
  }
  
}

