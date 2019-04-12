var gamePiece1;
var gamePiece2;
var gamePiece3;
var gamePiece4;
var gamePiece5;
var activePiece = 2;
var livePieces = [];
var myObstacles = [];
var myScore;

function startGame() {
  let width = 480; let height = 270;
  gameArea.start(width, height);
  gamePiece1 = new component(30,30,"brown",0,240, width, height);
  gamePiece2 = new component(30,30,"brown",0,180, width, height);
  gamePiece3 = new component(30,30,"red",0,120, width, height);
  gamePiece4 = new component(30,30,"brown",0,60, width, height);
  gamePiece5 = new component(30,30,"brown",0,0, width, height);
  livePieces = [
    gamePiece1, gamePiece2, gamePiece3, gamePiece4, gamePiece5
  ];
}

var gameArea = {
  canvas: document.createElement("canvas"),
  start: function(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function() {
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
  }
}

function component(width, height, color, x, y, boardx, boardy) {
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.color = color;
  this.update = function() {
    ctx = gameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.width,this.height);
  }
  this.newPos = function() {
    // console.log(this.canvas.height);
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0) { this.x = this.speedX = 0;}
    else if (this.x > boardx-width) { this.x = boardx-width; this.speedX = 0;}
    else if (this.x%30==0) { this.speedX=0;}
    if (this.y < 0) { this.y = this.speedY = 0;}
    else if (this.y > boardy-height) { this.y = boardy-height; this.speedY = 0;}
    else if (this.y%30==0) { this.speedY=0;}
  }
  this.setColor = function(newColor) {
    this.color = newColor;
  }
}

function updateGameArea() {
  gameArea.clear();
  gamePiece1.newPos();
  gamePiece1.update();
  gamePiece2.newPos();
  gamePiece2.update();
  gamePiece3.newPos();
  gamePiece3.update();
  gamePiece4.newPos();
  gamePiece4.update();
  gamePiece5.newPos();
  gamePiece5.update();
}

function moveup() {
  livePieces[activePiece].speedY = -1;
}

function moveleft() {
  livePieces[activePiece].speedX = -1;
}

function movedown() {
  livePieces[activePiece].speedY = 1;
}

function moveright() {
  livePieces[activePiece].speedX = 1;
}

function nextPiece() {
  livePieces[activePiece].setColor('brown');
  activePiece++;
  if (activePiece == livePieces.length) {
    activePiece = 0;
  }
  livePieces[activePiece].setColor('red');
}

window.onkeyup = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;
  if (key == 38) {
    moveup();
  } else if (key == 40) {
    movedown();
  } else if (key == 39) {
    moveright();
  } else if (key == 37) {
    moveleft();
  } else if (key == 13) {
    console.log(activePiece);
  }
  nextPiece();
}