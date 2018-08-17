//Coin constructor
var Coin = function(x, y) {
  this.x = Math.floor(Math.random() * 10);
  this.y = Math.floor(Math.random() * 10);
};

module.exports = Coin;
