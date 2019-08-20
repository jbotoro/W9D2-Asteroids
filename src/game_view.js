const Game = require("./game.js");

const GameView = function(ctx) {
  this.game = new Game(800, 800);
  this.ctx = ctx;
};

GameView.prototype.start = function() {
  const that = this;
  function cb() {
    that.game.step();
    that.game.draw(that.ctx);
  }
  setInterval(cb.bind(this), 20);
};

module.exports = GameView;