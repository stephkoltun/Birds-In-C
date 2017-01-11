var fr = 30;

var introState = true;
var practiceState = false;
var gameState = false;

var mousePosX;
var mousePosY;

var opacity = "0.5";

var originYAdjust = 3;
var originOffset = 1;

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

  var tempPhrases = [["modified-phrases/GrOwl_Phrase1.wav","modified-phrases/GrOwl_Phrase2.wav","modified-phrases/GrOwl_Phrase3.wav","modified-phrases/GrOwl_Phrase4.wav","modified-phrases/GrOwl_Phrase5.wav","modified-phrases/GrOwl_Phrase6.wav","modified-phrases/GrOwl_Phrase7.wav","modified-phrases/GrOwl_Phrase8.wav","modified-phrases/GrOwl_Phrase9.wav","modified-phrases/GrOwl_Phrase10.wav","modified-phrases/GrOwl_Phrase11.wav","modified-phrases/GrOwl_Phrase12.wav","modified-phrases/GrOwl_Phrase13.wav","modified-phrases/GrOwl_Phrase14.wav","modified-phrases/GrOwl_Phrase15.wav","modified-phrases/GrOwl_Phrase16.wav","modified-phrases/GrOwl_Phrase17.wav","modified-phrases/GrOwl_Phrase18.wav","modified-phrases/GrOwl_Phrase19.wav","modified-phrases/GrOwl_Phrase20.wav","modified-phrases/GrOwl_Phrase21.wav","modified-phrases/GrOwl_Phrase22.wav","modified-phrases/GrOwl_Phrase23.wav","modified-phrases/GrOwl_Phrase24.wav","modified-phrases/GrOwl_Phrase25.wav","modified-phrases/GrOwl_Phrase26.wav","modified-phrases/GrOwl_Phrase27.wav","modified-phrases/GrOwl_Phrase28.wav","modified-phrases/GrOwl_Phrase29.wav","modified-phrases/GrOwl_Phrase30.wav","modified-phrases/GrOwl_Phrase31.wav","modified-phrases/GrOwl_Phrase32.wav","modified-phrases/GrOwl_Phrase33.wav","modified-phrases/GrOwl_Phrase34.wav","modified-phrases/GrOwl_Phrase35.wav","modified-phrases/GrOwl_Phrase36.wav","modified-phrases/GrOwl_Phrase37.wav","modified-phrases/GrOwl_Phrase38.wav","modified-phrases/GrOwl_Phrase39.wav","modified-phrases/GrOwl_Phrase40.wav","modified-phrases/GrOwl_Phrase41.wav","modified-phrases/GrOwl_Phrase42.wav","modified-phrases/GrOwl_Phrase43.wav","modified-phrases/GrOwl_Phrase44.wav","modified-phrases/GrOwl_Phrase45.wav","modified-phrases/GrOwl_Phrase46.wav","modified-phrases/GrOwl_Phrase47.wav","modified-phrases/GrOwl_Phrase48.wav","modified-phrases/GrOwl_Phrase49.wav","modified-phrases/GrOwl_Phrase50.wav","modified-phrases/GrOwl_Phrase51.wav","modified-phrases/GrOwl_Phrase52.wav","modified-phrases/GrOwl_Phrase53.wav"],["modified-phrases/FoxSparrow_Phrase1.wav","modified-phrases/FoxSparrow_Phrase2.wav","modified-phrases/FoxSparrow_Phrase3.wav","modified-phrases/FoxSparrow_Phrase4.wav","modified-phrases/FoxSparrow_Phrase5.wav","modified-phrases/FoxSparrow_Phrase6.wav","modified-phrases/FoxSparrow_Phrase7.wav","modified-phrases/FoxSparrow_Phrase8.wav","modified-phrases/FoxSparrow_Phrase9.wav","modified-phrases/FoxSparrow_Phrase10.wav","modified-phrases/FoxSparrow_Phrase11.wav","modified-phrases/FoxSparrow_Phrase12.wav","modified-phrases/FoxSparrow_Phrase13.wav","modified-phrases/FoxSparrow_Phrase14.wav","modified-phrases/FoxSparrow_Phrase15.wav","modified-phrases/FoxSparrow_Phrase16.wav","modified-phrases/FoxSparrow_Phrase17.wav","modified-phrases/FoxSparrow_Phrase18.wav","modified-phrases/FoxSparrow_Phrase19.wav","modified-phrases/FoxSparrow_Phrase20.wav","modified-phrases/FoxSparrow_Phrase21.wav","modified-phrases/FoxSparrow_Phrase22.wav","modified-phrases/FoxSparrow_Phrase23.wav","modified-phrases/FoxSparrow_Phrase24.wav","modified-phrases/FoxSparrow_Phrase25.wav","modified-phrases/FoxSparrow_Phrase26.wav","modified-phrases/FoxSparrow_Phrase27.wav","modified-phrases/FoxSparrow_Phrase28.wav","modified-phrases/FoxSparrow_Phrase29.wav","modified-phrases/FoxSparrow_Phrase30.wav","modified-phrases/FoxSparrow_Phrase31.wav","modified-phrases/FoxSparrow_Phrase32.wav","modified-phrases/FoxSparrow_Phrase33.wav","modified-phrases/FoxSparrow_Phrase34.wav","modified-phrases/FoxSparrow_Phrase35.wav","modified-phrases/FoxSparrow_Phrase36.wav","modified-phrases/FoxSparrow_Phrase37.wav","modified-phrases/FoxSparrow_Phrase38.wav","modified-phrases/FoxSparrow_Phrase39.wav","modified-phrases/FoxSparrow_Phrase40.wav","modified-phrases/FoxSparrow_Phrase41.wav","modified-phrases/FoxSparrow_Phrase42.wav","modified-phrases/FoxSparrow_Phrase43.wav","modified-phrases/FoxSparrow_Phrase44.wav","modified-phrases/FoxSparrow_Phrase45.wav","modified-phrases/FoxSparrow_Phrase46.wav","modified-phrases/FoxSparrow_Phrase47.wav","modified-phrases/FoxSparrow_Phrase48.wav","modified-phrases/FoxSparrow_Phrase49.wav","modified-phrases/FoxSparrow_Phrase50.wav","modified-phrases/FoxSparrow_Phrase51.wav","modified-phrases/FoxSparrow_Phrase52.wav","modified-phrases/FoxSparrow_Phrase53.wav"],["modified-phrases/BlueJay_Phrase1.wav","modified-phrases/BlueJay_Phrase2.wav","modified-phrases/BlueJay_Phrase3.wav","modified-phrases/BlueJay_Phrase4.wav","modified-phrases/BlueJay_Phrase5.wav","modified-phrases/BlueJay_Phrase6.wav","modified-phrases/BlueJay_Phrase7.wav","modified-phrases/BlueJay_Phrase8.wav","modified-phrases/BlueJay_Phrase9.wav","modified-phrases/BlueJay_Phrase10.wav","modified-phrases/BlueJay_Phrase11.wav","modified-phrases/BlueJay_Phrase12.wav","modified-phrases/BlueJay_Phrase13.wav","modified-phrases/BlueJay_Phrase14.wav","modified-phrases/BlueJay_Phrase15.wav","modified-phrases/BlueJay_Phrase16.wav","modified-phrases/BlueJay_Phrase17.wav","modified-phrases/BlueJay_Phrase18.wav","modified-phrases/BlueJay_Phrase19.wav","modified-phrases/BlueJay_Phrase20.wav","modified-phrases/BlueJay_Phrase21.wav","modified-phrases/BlueJay_Phrase22.wav","modified-phrases/BlueJay_Phrase23.wav","modified-phrases/BlueJay_Phrase24.wav","modified-phrases/BlueJay_Phrase25.wav","modified-phrases/BlueJay_Phrase26.wav","modified-phrases/BlueJay_Phrase27.wav","modified-phrases/BlueJay_Phrase28.wav","modified-phrases/BlueJay_Phrase29.wav","modified-phrases/BlueJay_Phrase30.wav","modified-phrases/BlueJay_Phrase31.wav","modified-phrases/BlueJay_Phrase32.wav","modified-phrases/BlueJay_Phrase33.wav","modified-phrases/BlueJay_Phrase34.wav","modified-phrases/BlueJay_Phrase35.wav","modified-phrases/BlueJay_Phrase36.wav","modified-phrases/BlueJay_Phrase37.wav","modified-phrases/BlueJay_Phrase38.wav","modified-phrases/BlueJay_Phrase39.wav","modified-phrases/BlueJay_Phrase40.wav","modified-phrases/BlueJay_Phrase41.wav","modified-phrases/BlueJay_Phrase42.wav","modified-phrases/BlueJay_Phrase43.wav","modified-phrases/BlueJay_Phrase44.wav","modified-phrases/BlueJay_Phrase45.wav","modified-phrases/BlueJay_Phrase46.wav","modified-phrases/BlueJay_Phrase47.wav","modified-phrases/BlueJay_Phrase48.wav","modified-phrases/BlueJay_Phrase49.wav","modified-phrases/BlueJay_Phrase50.wav","modified-phrases/BlueJay_Phrase51.wav","modified-phrases/BlueJay_Phrase52.wav","modified-phrases/BlueJay_Phrase53.wav"],["modified-phrases/KingParrot_Phrase1.wav","modified-phrases/KingParrot_Phrase2.wav","modified-phrases/KingParrot_Phrase3.wav","modified-phrases/KingParrot_Phrase4.wav","modified-phrases/KingParrot_Phrase5.wav","modified-phrases/KingParrot_Phrase6.wav","modified-phrases/KingParrot_Phrase7.wav","modified-phrases/KingParrot_Phrase8.wav","modified-phrases/KingParrot_Phrase9.wav","modified-phrases/KingParrot_Phrase10.wav","modified-phrases/KingParrot_Phrase11.wav","modified-phrases/KingParrot_Phrase12.wav","modified-phrases/KingParrot_Phrase13.wav","modified-phrases/KingParrot_Phrase14.wav","modified-phrases/KingParrot_Phrase15.wav","modified-phrases/KingParrot_Phrase16.wav","modified-phrases/KingParrot_Phrase17.wav","modified-phrases/KingParrot_Phrase18.wav","modified-phrases/KingParrot_Phrase19.wav","modified-phrases/KingParrot_Phrase20.wav","modified-phrases/KingParrot_Phrase21.wav","modified-phrases/KingParrot_Phrase22.wav","modified-phrases/KingParrot_Phrase23.wav","modified-phrases/KingParrot_Phrase24.wav","modified-phrases/KingParrot_Phrase25.wav","modified-phrases/KingParrot_Phrase26.wav","modified-phrases/KingParrot_Phrase27.wav","modified-phrases/KingParrot_Phrase28.wav","modified-phrases/KingParrot_Phrase29.wav","modified-phrases/KingParrot_Phrase30.wav","modified-phrases/KingParrot_Phrase31.wav","modified-phrases/KingParrot_Phrase32.wav","modified-phrases/KingParrot_Phrase33.wav","modified-phrases/KingParrot_Phrase34.wav","modified-phrases/KingParrot_Phrase35.wav","modified-phrases/KingParrot_Phrase36.wav","modified-phrases/KingParrot_Phrase37.wav","modified-phrases/KingParrot_Phrase38.wav","modified-phrases/KingParrot_Phrase39.wav","modified-phrases/KingParrot_Phrase40.wav","modified-phrases/KingParrot_Phrase41.wav","modified-phrases/KingParrot_Phrase42.wav","modified-phrases/KingParrot_Phrase43.wav","modified-phrases/KingParrot_Phrase44.wav","modified-phrases/KingParrot_Phrase45.wav","modified-phrases/KingParrot_Phrase46.wav","modified-phrases/KingParrot_Phrase47.wav","modified-phrases/KingParrot_Phrase48.wav","modified-phrases/KingParrot_Phrase49.wav","modified-phrases/KingParrot_Phrase50.wav","modified-phrases/KingParrot_Phrase51.wav","modified-phrases/KingParrot_Phrase52.wav","modified-phrases/KingParrot_Phrase53.wav"]];

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


  // ELLIPSE FOR DEBUGGING, SHOWS MOUSE POSITION
  ellipseMode(CENTER);
  fill(255,30,80);
  ellipse(mouseX-width/2,mouseY-((height/originYAdjust)*originOffset),5,5);


  if (introState == true) {

    var title = select("#introText");
    title.show();

    var practice = select("#practiceText");
    practice.hide();

    var playInstruc = select("#playingText");
    playInstruc.hide();


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

/*    for (i = 0; i < allIntroShapes.length; i++) {
      //check mouse position
      allIntroShapes[i].mouseHover();
    }*/
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


/*function mousePressed() {

  if (gameState == true) {
    addButton.clicked();
    for (i = 0; i < players.length; i++) {
      players[i].advancer.clicked();
    }
  }

  if (practiceState == true) {
    for (i = 0; i < allIntroShapes.length; i++) {
      //check mouse position
      allIntroShapes[i].clicked();
    }
  }
}*/

function mouseMoved() {

  if (gameState == true) {
    addButton.mouseover();
    for (i = 0; i < players.length; i++) {
      players[i].advancer.mouseover();
    }
  }

  if (practiceState == true) {
    for (i = 0; i < allIntroShapes.length; i++) {
      //check mouse position
      allIntroShapes[i].mouseHover();
    }
  }
}


$("#startButton").click(function() {
  introState = false;
  practiceState = true;
  gameState = false;
});

$("#playButton").click(function() {
  introState = false;
  practiceState = false;
  gameState = true;

  for (i = 0; i < allIntroShapes.length; i++) {
      //make all stop playing
      allIntroShapes[i].soundRefs.jump();
      allIntroShapes[i].soundRefs.stop();

    }

});

$("#reset").click(function() {

  location.reload();
  // empty array

/*  for (var i = 0; i < players.length; i++) {
    players[i].stopSound();
  }
  players.splice(0,players.length);
  birdIndex = 0;
  addButton.buttonOffset = 0;*/
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
