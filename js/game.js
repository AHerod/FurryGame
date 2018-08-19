var Coin = require('./coin.js');
var Furry = require('./furry.js');
//Game constructor
var Game = function() {

  this.board = document.querySelectorAll("#board div");
  this.furry = new Furry();
  this.coin = new Coin();
  this.score = 0;
  var self = this;

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
      document.getElementById("rightArrow").style.backgroundColor = "#FF822E";
    }else if(this.furry.direction === "left"){
      this.furry.x -= 1;
      document.getElementById("leftArrow").style.backgroundColor = "#FF822E";
    }else if(this.furry.direction === "up"){
      this.furry.y -= 1;
      document.getElementById("upArrow").style.backgroundColor = "#FF822E";
    }else if(this.furry.direction === "down"){
      this.furry.y  += 1;
      document.getElementById("downArrow").style.backgroundColor = "#FF822E";
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
        document.getElementById("leftArrow").style.backgroundColor = "#FF6517";
        break;
      case 38:
        this.furry.direction = "up";
        document.getElementById("upArrow").style.backgroundColor = "#FF6517";
        break;
      case 39:
        this.furry.direction = "right";
        document.getElementById("rightArrow").style.backgroundColor = "#FF6517";
        break;
      case 40:
        this.furry.direction = "down";
        document.getElementById("downArrow").style.backgroundColor = "#FF6517";
        break;

    }
  };
  this.checkCoinCollision = function () {
    if(this.furry.x === this.coin.x && this.furry.y === this.coin.y){
      document.querySelector(".coin").classList.remove("coin");
      var score = document.querySelector("strong");
      score.innerText = parseInt(score.innerText) + 1;
      this.coin = new Coin();
      this.showCoin();
    }
  };
  this.gameOver = function () {
    if (this.furry.x < 0|| this.furry.y < 0 || this.furry.x > 9|| this.furry.y > 9) {
      clearInterval(this.idSetInterval);
      document.getElementById("over").classList.remove("invisible");
      var finalScore = document.getElementById("finalScore");
      var score = document.querySelector("strong");
      finalScore.innerText = "GAME OVER" + "\n\n" +"Your score: " + score.innerText;
      this.hideVisibleFurry();

    }
  };
  this.startGame = function () {
    this.idSetInterval = setInterval(function () {
      self.moveFurry();
    }, 250);
  };
};
module.exports = Game;