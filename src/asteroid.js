const MovingObject = require("./moving_object.js");
const Util = require("./util.js");

const Asteroid = function(options) {
  this.COLOR = "gray";
  this.RADIUS = 20;
  this.pos = options.pos;
  this.vel = Util.randomVec(Math.random() * 10);
  this.game = options.game;
  return new MovingObject({pos: this.pos, vel: this.vel, radius: this.RADIUS, color: this.COLOR, game: this.game});
};

Asteroid.prototype.collideWith = function (otherObject) {
  if ( otherObject === this.game.ship ){
    otherObject.relocate();
  }
};

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;