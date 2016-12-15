var compositeStateOpen = false;

function expandBirds() {
  console.log("Expand!");
  var lastPlayer = players.length-1;
  for (i = 0; i < players.length; i++) {
    players[lastPlayer-i].verticalOffset = i*(height/15*2);
  }
  compositeStateOpen = true;
  centerLine.height = (height/originYAdjust)*originOffset;
}

function contractBirds() {
  for (i = 0; i < players.length; i++) {
    players[i].verticalOffset = 0;
  }
  compositeStateOpen = false;
  centerLine.height = height/15*2;
}


function Initializer(r,g,b) {
  this.x = 0;
  this.y = 20;
  this.width = 3;
  this.height = 12;

  this.r = r;
  this.b = g;
  this.g = b;

  this.display = function() {
    fill(this.r,this.b,this.g);
    noStroke();
    rect(this.x-this.width/2,this.y,this.width,this.height);
    rect(this.x-this.height/2, this.y+this.height/2-this.width/2, this.height, this.width);
  }

  this.clicked = function() {
    var d = dist(mousePosX, mousePosY, this.x, this.y+this.height/2);
    if (d <= this.height) {
      addBird(masterBirdSounds[birdIndex]);
      players[birdIndex].addShape();
      players[birdIndex].playSound();
      birdIndex++;
      console.log("added bird!");
    }
  }
}

function Grid() {

  this.x = 0;
  this.y = 0;

  this.width = width/2;
  this.height = height/15*3;

  this.display = function() {
    fill(240,160);
    noStroke();
    rect(-this.width,-this.height,this.width,this.height);
    stroke(0);
    strokeWeight(1);
    strokeCap(SQUARE);
    line(this.x,this.y,this.x,-this.height);
  }
}
