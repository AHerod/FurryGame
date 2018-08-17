console.log("Hello, Furry!");
//Furry constructor
var Furry = function(x, y, direction){
  this.x = 0;
  this.y = 0;
  this.direction = "right";  //left, right, up, down
};
//Coin constructor
var Coin = function(x, y) {
  this.x = Math.floor(Math.random() * 10);
  this.y = Math.floor(Math.random() * 10);
};
//Game constructor
var Game = function() {

  this.board = document.querySelectorAll("#board div");
  this.furry = new Furry();
  this.coin = new Coin();
  this.score = 0;
  var self = this;
  this.startGame = function () {
    this.idSetInterval = setInterval(function () {
      game.moveFurry();
    }, 250);
  };

  this.index = function(x,y) {
   return x + (y * 10);
  };

  //method to display furry on the board
  this.showFurry = function() {
    this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('furry');
  };
  // display coin on the board (randomly)
  this.showCoin = function() {

    this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
  };


  this.moveFurry = function () {
    this.hideVisibleFurry();
    if(this.furry.direction === "right"){
      this.furry.x  += 1;
      document.getElementById("rightArrow").style.backgroundColor = "pink";
    }else if(this.furry.direction === "left"){
      this.furry.x -= 1;
      document.getElementById("leftArrow").style.backgroundColor = "pink";
    }else if(this.furry.direction === "up"){
      this.furry.y -= 1;
      document.getElementById("upArrow").style.backgroundColor = "pink";
    }else if(this.furry.direction === "down"){
      this.furry.y  += 1;
      document.getElementById("downArrow").style.backgroundColor = "pink";
    }
    this.gameOver();
    this.showFurry();
    this.checkCoinCollision();
  };

  this.hideVisibleFurry = function (event) {
    document.querySelector(".furry").classList.remove("furry");
  };
  this.directFurry = function(event){

    switch (event.which) {

      case 37:
        this.furry.direction = 'left';
        document.getElementById("leftArrow").style.backgroundColor = "red";
        break;
      case 38:
        this.furry.direction = "up";
        document.getElementById("upArrow").style.backgroundColor = "red";
        break;
      case 39:
        this.furry.direction = "right";
        document.getElementById("rightArrow").style.backgroundColor = "red";
        break;
      case 40:
        this.furry.direction = "down";
        document.getElementById("downArrow").style.backgroundColor = "red";
        break;

    }
  };
  document.addEventListener('keydown', function(event){
    self.directFurry(event);
  });
  this.checkCoinCollision = function () {
    if(this.furry.x === this.coin.x && this.furry.y === this.coin.y){
      document.querySelector(".coin").classList.remove("coin");
      var score = document.querySelector("strong");
      score.innerText = parseInt(score.innerText) + 1;
      this.coin = new Coin();
      this.showCoin();
    }
  }
  this.gameOver = function () {
    if (this.furry.x < 0|| this.furry.y < 0 || this.furry.x > 9|| this.furry.y > 9) {
      clearInterval(this.idSetInterval);
      document.getElementById("over").classList.remove("invisible");
      var finalScore = document.getElementById("finalScore");
      var score = document.querySelector("strong");
      finalScore.innerText = score.innerText;
      this.hideVisibleFurry();

    }
  }
};

var game = new Game();
game.startGame();
game.showFurry();
game.showCoin();
