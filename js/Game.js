class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
      car1 = createSprite(100,200)
      car2 = createSprite(300,200)
      car3 = createSprite(500,200)
      car4 = createSprite(700,200)

      car1.addImage("car10",carImage1);
      car2.addImage("car20",carImage2);
      car3.addImage("car30",carImage3);
      car4.addImage("car40",carImage4);

      cars = [car1,car2,car3,car4]
    }
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();
    player.getRank();
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5)
      carSound.play();
      //index of the array
      var index = 0;
      var carindex=0;
      //x and y position of the cars
      var x = 250;
      var y;
      for(var i in allPlayers){
            carindex=index;
            index = index + 1 ;
            x = x + 300;
            //use data form the database to display the cars in y direction
            y = displayHeight - allPlayers[i].distance-100;
            cars[carindex].x = x;
            cars[carindex].y = y;
            if (index === player.index){
                  console.log(i + player.index)
                  stroke(5)
                  fill("blue")
                ellipse(x,y,100,100)  
                camera.position.x = displayWidth/2
                camera.position.y = cars[carindex].y
            }
            /* fill("red")
            else
              fill("black");

            display_position+=20;
            textSize(15);
            text(allPlayers[i].name + ": " + allPlayers[i].distance, 120,display_position)*/
            
          }
      
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    //the guy has finshed the race, then update the gameState to 2
    if(player.distance>=5100){
      player.rank = player.rank + 1 
      player.updateRank(player.rank);
      gameState=2
    }

    drawSprites();
    
  }
  //print the rank of the player 
  end(){
    console.log("you won,congrats, your rank is "+ player.rank)
    alert("You are hacker, your rank is ");
    
  }

  
}