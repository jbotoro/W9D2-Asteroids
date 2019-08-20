const MovingObject = require("./moving_object.js");
const Asteroid = require("./asteroid.js");
const GameView = require("./game_view.js");

window.addEventListener('DOMContentLoaded', (event) => {
  const gameCanvas = document.getElementById("game-canvas");
  const ctx = gameCanvas.getContext('2d');
  const gameView = new GameView(ctx);
  gameView.start();
  window.gameView = gameView;
  console.log('DOM fully loaded and parsed');
});

console.log("Our webpack is working!!");