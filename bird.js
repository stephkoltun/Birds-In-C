function addBird(phraseSet) {

  if (birdIndex < masterBirdSounds.length) {
    var newBird = new Bird(phraseSet, colorSet[birdIndex]);
    newBird.trackTime = millis();

    newBird.advancer = new Advancer(colorSet[birdIndex],nameSet[birdIndex]);
    newBird.advancer.index = birdIndex;
    newBird.advancer.addPhrase();
    newBird.advancer.phraseIndex++;
    newBird.advancer.addPhrase();

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
  this.y = 55+55*(birdIndex); //space between birds
  this.triY = this.y+20; // space between shapes and bird title
  this.width = 12;
  this.height = 12;

  this.multiplier = 4;
  this.phraseIndex = 0;
  this.nextPhrase = 1;

  this.nextOffset = 10;

  this.c = "rgb(" + color + ")";

  this.shapes = [
  ];

  this.display = function() {
    
    //triangle(this.x,this.triY,this.x,this.triY+this.height,this.x+this.width,this.triY+this.height/2);
    //stroke(0);
    //line(-width/2,this.y,width/2,this.y);

    fill(this.c);
    noStroke();
    textAlign(LEFT,BOTTOM);
    text(name,this.x, this.y);

    // display shapes as well
    for (var i = 0; i < this.shapes.length; i++) {

      if (i == this.phraseIndex-1) {
        fill(this.c);
      } else {
        noFill();
      }

      stroke(this.c);
      strokeWeight(1);
      beginShape();


        for (var j = 0; j < this.shapes[i].noteDuration.length; j++) {

          if (i !=0 ) {
            // length of prev shape is the offset
            var xOffset = this.shapes[i-1].shapeLength;
            var x = (this.shapes[i].noteDuration[j]+xOffset)*this.multiplier; 

          } else {
            var x = this.shapes[i].noteDuration[j]*this.multiplier;
          }
          var y = this.shapes[i].frequency[j]*this.multiplier;

          vertex(x,-y+this.triY);
        }
      endShape(CLOSE);
    }
  }


  this.addPhrase = function() {
    var shapeObject = {};
    shapeObject.noteDuration = masterShapes[this.phraseIndex].noteDuration.slice();
    shapeObject.frequency = masterShapes[this.phraseIndex].frequency.slice();
    shapeObject.shapeLength = masterShapes[this.phraseIndex].shapeLength;

    this.shapes.push(shapeObject);
  }



  this.clicked = function() {

    var d = dist(mousePosX, mousePosY, this.x, this.y);
    if (d <= this.width) {

      if (players[this.index].phraseIndex < masterShapes.length-1) {
        players[this.index].stopSound();
        players[this.index].phraseIndex++;
        players[this.index].playSound();

        // move previous phrases
        for (var i = 0; i < this.shapes.length; i++) {

          // everything is moving the length of the second from last shape
          var shiftLength = this.shapes[this.shapes.length-2].shapeLength;

          for (var j = 0; j < this.shapes[i].noteDuration.length; j++) {
            this.shapes[i].noteDuration[j] = this.shapes[i].noteDuration[j] - shiftLength;
          }
        }
        // add new phrase
        this.phraseIndex++;
        this.addPhrase();


      } else {
        console.log("end bird");
        players[this.index].stopSound();
      }
    } 
  }
}