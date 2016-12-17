var compositeStateOpen = false;

function expandBirds() {
  console.log("Expand!");
  var lastPlayer = players.length-1;
  for (i = 0; i < players.length; i++) {
    players[lastPlayer-i].verticalOffset = i*(height/15*2);
  }
  compositeStateOpen = true;
}

function contractBirds() {
  for (i = 0; i < players.length; i++) {
    players[i].verticalOffset = 0;
  }
  compositeStateOpen = false;
}


function Initializer(r,g,b) {
  this.x = 0;
  this.y = 40;
  this.width = 2;
  this.height = 10;

  this.r = r;
  this.b = g;
  this.g = b;

  this.fillBack = 240;
  this.fillPlus = 0;

  var rectHeight = 24;
  var rectWidth = 65;
  var leftEdge = this.x-this.width/2-15;
  var rightEdge = leftEdge + rectWidth;
  var topEdge = this.y-7;
  var bottomEdge = topEdge + rectHeight;

  this.buttonOffset = 0;

  this.display = function() {
    // button
    stroke(0);
    strokeWeight(2);
    fill(this.fillBack);
    rect(leftEdge, topEdge+this.buttonOffset, rectWidth, rectHeight, rectHeight/2);

    // plus sign
    noStroke();
    fill(this.fillPlus);
    rect(this.x-this.width/2,this.y+this.buttonOffset,this.width,this.height);
    rect(this.x-this.height/2, this.y+this.height/2-this.width/2+this.buttonOffset, this.height, this.width);

    // text
    noStroke();
    fill(this.fillPlus);
    textFont("Raleway", 12);
    textAlign(LEFT,CENTER);
    text("bird", 15, this.y+5+this.buttonOffset);
  }

  this.clicked = function() {
    if (mousePosX < rightEdge && mousePosX > leftEdge && mousePosY < (bottomEdge+this.buttonOffset) && mousePosY > (topEdge+this.buttonOffset)) {
      addBird(masterBirdSounds[birdIndex]);
      players[birdIndex].addShape();
      players[birdIndex].playSound();
      birdIndex++;

      // move button down
      this.buttonOffset = this.buttonOffset + 55;
      console.log("added bird!");
    }
  }

  this.mouseover = function() {

    if (mousePosX < rightEdge && mousePosX > leftEdge && mousePosY < (bottomEdge+this.buttonOffset) && mousePosY > (topEdge+this.buttonOffset)) {
      this.fillBack = 0;
      this.fillPlus = 240;
    } else {
      this.fillBack = 240;
      this.fillPlus = 0;
    }
  }
}

function Grid() {

  this.x = 0;
  this.y = 0;

  this.width = width/2;
  this.height = (height/originYAdjust)*originOffset;

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
