var fr = 30;

var introState = true;
var gameState = false;

var mousePosX;
var mousePosY;

var opacity = "0.5";

var originYAdjust = 4;
var originOffset = 2.5;


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

    var playInstruc = select("#playingText");
    playInstruc.hide();

    if (allIntroShapes.length == 0) {
      addAllShapes();
    } else {
      displayAllShapes();
    }

  
    for (i = 0; i < allIntroShapes.length; i++) {
      //check mouse position
      allIntroShapes[i].mouseHover();
    }

  }



  if (gameState == true) {

    var title = select("#introText");
    title.hide();

    var playInstruc = select("#playingText");

    addButton.display();

    if (players.length != 0) {
      playInstruc.hide();
      //show line
      centerLine.display();
      //show shapes
      for (i = 0; i < players.length; i++) {
        // show and move composite sound shapes
        players[i].displayShapes();
        players[i].moveShapes();
        players[i].checkCurrent();
        // show interaction visuals
        players[i].advancer.display();
      } 
    } else {
      
      playInstruc.show();
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

function keyPressed() {
  if (key == " ") {
    if (compositeStateOpen == false) {
      expandBirds();
    } else {
      contractBirds();
    }
  }
}
