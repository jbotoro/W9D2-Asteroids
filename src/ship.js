const MovingObject = require("./moving_object.js");
const Util = require("./util.js");

const Ship = function (options) {
  this.COLOR = "red";
  this.RADIUS = 10;
  this.pos = options.pos;
  this.vel = [0,0];
  this.game = options.game;
  return new MovingObject({pos: this.pos, vel: this.vel, color: this.COLOR, radius: this.RADIUS, game: this.game});
};

Util.inherits(Ship, MovingObject);

module.exports = Ship;