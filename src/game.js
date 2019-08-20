const Asteroid = require("./asteroid.js");
const Ship = require("./ship.js");


const Game = function(dimX, dimY) {
  this.DIM_X = dimX;
  this.DIM_Y = dimY;
  this.NUM_ASTEROIDS = 10;
  this.asteroids = [];
  this.addAsteroids();
  this.ship = new Ship( { game: this, pos: this.randomPosition() } );
};

Game.prototype.addAsteroids = function() {
  while (this.asteroids.length < this.NUM_ASTEROIDS) {
    this.asteroids.push(new Asteroid(
        { pos: this.randomPosition() , game: this }
      )
    );
  }
};

Game.prototype.randomPosition = function() {
  let pos = [];
  pos.push(Math.random() * this.DIM_X);
  pos.push(Math.random() * this.DIM_Y);
  return pos;
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.allObjects().forEach( function(object) {
    object.draw(ctx);
  });
};

Game.prototype.moveObjects = function() {

  this.allObjects().forEach( function(asteroid) {

    asteroid.move();
  });
};

Game.prototype.wrap = function(pos) {
  if (pos[0] > this.DIM_X)  pos[0] = 0;
  if (pos[0] < 0) pos[0] = this.DIM_X;
  if (pos[1] > this.DIM_Y) pos[1] = 0;
  if (pos[1] < 0) pos[1] = this.DIM_Y;

  return pos;
};

Game.prototype.checkCollisions = function() {
  for (let i = 0; i < this.allObjects().length - 1; i++) {
    for (let j = i + 1; j < this.allObjects().length; j++) {
      if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
        this.allObjects()[i].collideWith(this.allObjects()[j]);
      }
    }
  }
};

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function(asteroid) {
  let index = this.asteroids.indexOf(asteroid);
  this.asteroids.splice(index, 1);
};

Game.prototype.allObjects = function () {
  return this.asteroids.concat(this.ship);
};

module.exports = Game;