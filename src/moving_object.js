const MovingObject = function(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
};

MovingObject.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

MovingObject.prototype.move = function () {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.pos = this.game.wrap(this.pos);
};

MovingObject.prototype.isCollidedWith = function(otherObject) {
  const xPos = Math.sqrt(Math.pow((this.pos[0] - otherObject.pos[0]), 2));
  const yPos = Math.sqrt(Math.pow((this.pos[1] - otherObject.pos[1]), 2));
  const radSum = this.radius + otherObject.radius;

  if (xPos < radSum && yPos < radSum ) return true;
  return false;
};

MovingObject.prototype.collideWith = function(otherObject) {
  
  // if (this === this.game.ship || otherObject === this.game.ship ){
  //   this.game.remove(this);
  //   this.game.remove(otherObject);
  // }
};

module.exports = MovingObject;