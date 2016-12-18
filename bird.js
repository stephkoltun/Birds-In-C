function addBird(phraseSet) {

  if (birdIndex < masterBirdSounds.length) {
    var newBird = new Bird(phraseSet, colorSet[birdIndex]);
    newBird.trackTime = millis();

    newBird.advancer = new Advancer(colorSet[birdIndex],nameSet[birdIndex]);
    newBird.advancer.index = birdIndex;
    newBird.advancer.addAllPhrases();

    players.push(newBird);
  }
}


function Bird(soundPhrases,color) {
  this.phraseIndex = 0;
  this.sounds = soundPhrases;
  this.shapes = [];

  this.op = opacity;

  this.c = "rgba(" + color + "," + this.op + ")";

  this.trackTime;

  this.verticalOffset = 0;
  this.multiplier = 15;

  this.advancer;

  this.addShape = function() {
    var shapeObject = {};
    shapeObject.noteDuration = masterShapes[this.phraseIndex].noteDuration.slice();
    shapeObject.frequency = masterShapes[this.phraseIndex].frequency.slice();
    shapeObject.shapeLength = masterShapes[this.phraseIndex].shapeLength;

    // distance to travel / frame rate * length of sound file
    shapeObject.increment = (shapeObject.shapeLength)/(fr*this.sounds[this.phraseIndex].duration());

    this.shapes.push(shapeObject);
  }

  this.displayShapes = function() {
    noStroke();
    fill(this.c);

    for (var i = 0; i < this.shapes.length; i++) {
      beginShape();
        for (var j = 0; j < this.shapes[i].noteDuration.length; j++) {
          vertex(this.shapes[i].noteDuration[j]*this.multiplier,-(this.shapes[i].frequency[j]*this.multiplier+this.verticalOffset));
        }
      endShape(CLOSE);
    }
  }

  this.moveShapes = function() {
    for (var i = 0; i < this.shapes.length; i++) {
      for (var j = 0; j < this.shapes[i].noteDuration.length; j++) {
        this.shapes[i].noteDuration[j] = this.shapes[i].noteDuration[j] - this.shapes[i].increment;
      }
    }
  }

  this.checkCurrent = function() {
    var duration = this.sounds[this.phraseIndex].duration()*1000;
    var difference = millis() - this.trackTime;

// SHOULD ONLY ADD SHAPE IF NOT AT END OF MASTER SHAPES!!!!

    if (difference > duration) {
      this.trackTime = millis();
      this.addShape();
    }
  }

  this.playSound = function() {
    this.sounds[this.phraseIndex].setVolume(1);
    this.sounds[this.phraseIndex].play();
    this.sounds[this.phraseIndex].loop();
  }

  this.stopSound = function() {
    this.sounds[this.phraseIndex].stop();
    this.sounds[this.phraseIndex].setVolume(0);
  }
}






function Advancer(color,name) {
  this.index;
  this.x = 0;
  this.y = 35+60*(birdIndex); //space between birds
  this.triY = this.y+20; // space between shapes and bird title
  this.width = 12;
  this.height = 12;

  this.textX = this.x-10;
  this.textY = this.triY+3;

  this.multiplier = 4;
  this.phraseIndex = 0;
  this.nextPhrase = this.phraseIndex+1;

  this.nextOffset = 5;

  this.c = "rgb(" + color + ")";

  this.shapes = [
  ];

  this.fillNext = 240;

  this.display = function() {
    var xOffset = 0;

    // display shapes as well
    for (var i = 0; i < this.shapes.length; i++) {

      if (i == this.phraseIndex) {
        fill(this.c); 
      } else if (i == this.phraseIndex + 1) {
        fill(this.fillNext); 
      } else {
        noFill();
      }

      stroke(this.c);
      strokeWeight(1);

      var x;
      var y;

      beginShape();
        for (var j = 0; j < this.shapes[i].noteDuration.length; j++) {

          x = this.shapes[i].noteDuration[j]*this.multiplier+xOffset;
          y = this.shapes[i].frequency[j]*this.multiplier;

          vertex(x,-y+this.triY);
        }
      endShape(CLOSE);

      // length of prev shape is the offset
      xOffset = xOffset + this.shapes[i].shapeLength*this.multiplier + this.nextOffset;

      // bird label
      fill(this.c);
      noStroke();
      textFont('Unica One',14);
      textAlign(RIGHT,BOTTOM);
      text(name,this.textX, this.textY);
    }
  }


  this.addAllPhrases = function() {

    for (var i = 0; i < masterShapes.length; i++) {

      var curPhrase = i;
      var shapeObject = {};

        shapeObject.noteDuration = masterShapes[i].noteDuration.slice();
        shapeObject.frequency = masterShapes[i].frequency.slice();
        shapeObject.shapeLength = masterShapes[i].shapeLength;

        this.shapes.push(shapeObject);
    }
  }

  this.mouseover = function() {

    var shape = this.shapes[this.phraseIndex+1];
    var curShape = this.shapes[this.phraseIndex];

    var xOffset = curShape.shapeLength*this.multiplier+this.nextOffset;

    var leftEdge = shape.noteDuration[0]*this.multiplier+xOffset;
    var rightEdge = leftEdge+shape.shapeLength*this.multiplier;
    var bottomEdge = this.triY;
    var topEdge = bottomEdge-(Math.max(...shape.frequency)*this.multiplier);
    

    if (mousePosX > leftEdge && mousePosX < rightEdge && mousePosY > topEdge && mousePosY < bottomEdge) {
      this.fillNext = this.c;
    } else {
      this.fillNext = 240;
    }
  }


  this.clicked = function() {
    var shape = this.shapes[this.phraseIndex+1];
    var curShape = this.shapes[this.phraseIndex];

    var xOffset = curShape.shapeLength*this.multiplier+this.nextOffset;

    var leftEdge = shape.noteDuration[0]*this.multiplier+xOffset;
    var rightEdge = leftEdge+shape.shapeLength*this.multiplier;
    var bottomEdge = this.triY;
    var topEdge = bottomEdge-(Math.max(...shape.frequency)*this.multiplier);
    

    if (mousePosX > leftEdge && mousePosX < rightEdge && mousePosY > topEdge && mousePosY < bottomEdge) {

      // if not the last shape
      if (players[this.index].phraseIndex < masterShapes.length-1) {
        players[this.index].stopSound();
        players[this.index].phraseIndex++;
        players[this.index].playSound();

        this.shapes.splice(0,1);


        // move previous phrases
        for (var i = 0; i < this.shapes.length; i++) {
          console.log(i);
          var shiftLength = 0;

          // everything is moving the length of the second from last shape
          shiftLength = this.shapes[i-1].shapeLength;

          for (var j = 0; j < this.shapes[i].noteDuration.length; j++) {
            this.shapes[i].noteDuration[j] = this.shapes[i].noteDuration[j] - shiftLength;
          }
        }


        // add new phrase
        this.phraseIndex++;

      } else {
        console.log("end bird");
        players[this.index].stopSound();
      }
    } 
  }
}