console.log("Hello, Furry!");

var Game = require("./game.js");

var game = new Game();
game.showFurry();
game.showCoin();
game.startGame();

document.addEventListener('keydown', function(event){
  game.directFurry(event);
});