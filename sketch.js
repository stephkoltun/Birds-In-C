var fr = 30;

var introState = true;
var practiceState = false;
var gameState = false;

var mousePosX;
var mousePosY;

var opacity = "0.5";

var originYAdjust = 4;
var originOffset = 2.5;

var time;

var masterBirdSounds = [];

// variables called for initializing
var players = []; // all the bird objects
var birdIndex = 0;
var addButton;
var centerLine;

$("#start").click(function() {
  console.log("game started!");
  introState = false;
  gameState = true;
})


function preload() {

  var tempPhrases = [["modified-phrases/GrOwl_Phrase1.wav","modified-phrases/GrOwl_Phrase2.wav","modified-phrases/GrOwl_Phrase3.wav","modified-phrases/GrOwl_Phrase4.wav","modified-phrases/GrOwl_Phrase5.wav","modified-phrases/GrOwl_Phrase6.wav"],["modified-phrases/FoxSparrow_Phrase1.wav","modified-phrases/FoxSparrow_Phrase2.wav","modified-phrases/FoxSparrow_Phrase3.wav","modified-phrases/FoxSparrow_Phrase4.wav","modified-phrases/FoxSparrow_Phrase5.wav","modified-phrases/FoxSparrow_Phrase6.wav"],["modified-phrases/BlueJay_Phrase1.wav","modified-phrases/BlueJay_Phrase2.wav","modified-phrases/BlueJay_Phrase3.wav","modified-phrases/BlueJay_Phrase4.wav","modified-phrases/BlueJay_Phrase5.wav","modified-phrases/BlueJay_Phrase6.wav"],["modified-phrases/KingParrot_Phrase1.wav","modified-phrases/KingParrot_Phrase2.wav","modified-phrases/KingParrot_Phrase3.wav","modified-phrases/KingParrot_Phrase4.wav","modified-phrases/KingParrot_Phrase5.wav","modified-phrases/KingParrot_Phrase6.wav"]];

  for (var i = 0; i < tempPhrases.length; i++) {
    var tempArray = [];
    for (var j = 0; j < tempPhrases[i].length; j++) {
      tempArray.push(loadSound(tempPhrases[i][j]));
    }
    masterBirdSounds.push(tempArray);
  }
  console.log("loaded sounds");
}


function setup() {
  var cnv = createCanvas(windowWidth,windowHeight);
  cnv.parent("thisCanvas");
  frameRate(fr);
  addButton = new Initializer(0,0,0);
  centerLine = new Grid();
  time = millis();
}

function draw() {

  translate(width/2, (height/originYAdjust)*originOffset);
  background(240);

  mousePosX = mouseX-width/2;
  mousePosY = mouseY-((height/originYAdjust)*originOffset);

  ellipseMode(CENTER);
  fill(0);
  ellipse(mouseX-width/2,mouseY-((height/originYAdjust)*originOffset),5,5);


  if (introState == true) {

    var title = select("#introText");
    title.show();

    var practice = select("#practiceText");
    practice.hide();

    var playInstruc = select("#playingText");
    playInstruc.hide();
  
    /*for (i = 0; i < allIntroShapes.length; i++) {
      //check mouse position
      allIntroShapes[i].mouseHover();
    }*/

  }

  if (practiceState == true) {

    var title = select("#introText");
    title.hide();

    var practice = select("#practiceText");
    practice.show();

    var playInstruc = select("#playingText");
    playInstruc.hide();

    if (allIntroShapes.length == 0) {
      addAllShapes();
    } else {
      displayAllShapes();
    }
  }



  if (gameState == true) {

    var title = select("#introText");
    title.hide();

    var practice = select("#practiceText");
    practice.hide();

    if (players.length != 4) {
      addButton.display();
    }

    if (players.length != 0) {
       // reset button
      var playInstruc = select("#playingText");
      playInstruc.show();
      playInstruc.position(width-100,height/2+40);

      //show shapes
      for (i = 0; i < players.length; i++) {
        // show and move composite sound shapes
        players[i].displayShapes();
        players[i].moveShapes();
        players[i].checkCurrent();
        // show interaction visuals
        players[i].advancer.display();
      } 
      //show line
      centerLine.display();
    }
  }
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function mousePressed() {

  if (gameState == true) {
    addButton.clicked();
    for (i = 0; i < players.length; i++) {
      players[i].advancer.clicked();
    }
  }
}

function mouseMoved() {
  if (gameState == true) {
    addButton.mouseover();
    for (i = 0; i < players.length; i++) {
      players[i].advancer.mouseover();
    }
  }
}


$("#startButton").click(function() {
  introState = false;
  practiceState = true;
  gameState = false;
});

$("#reset").click(function() {
  // empty array

  for (var i = 0; i < players.length; i++) {
    players[i].stopSound();
  }
  players.splice(0,players.length);
  birdIndex = 0;
  addButton.buttonOffset = 0;
})

function keyPressed() {
  if (key == " ") {
    if (compositeStateOpen == false) {
      expandBirds();
    } else {
      contractBirds();
    }
  }

  if (key == 'A' || key == 'a') {
    introState = true;
    practiceState = false;
    gameState = false;
  }

  if (key == 'S' || key == 's') {
    introState = false;
    practiceState = true;
    gameState = false;
  }

  if (key == 'D' || key == 'd') {
    introState = false;
    practiceState = false;
    gameState = true;
  }
}
