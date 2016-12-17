var allIntroShapes = [];



function Shape(phraseIndex) {
	this.c = 0;
	this.filled = false;

	this.scale = 4.5;

	this.phraseIndex = phraseIndex;

	this.shapePoints = {};
	this.soundRefs = [];

	this.mouseHover = function() {

		var midX = this.shapePoints.shapeLength/2*this.scale;
		var midY = Math.max(...this.shapePoints.frequency)/2*this.scale;

		var xOffset = -width/2+40;
		var buffer = phraseIndex*20;
		var prevShapeLengths = 0;

		for (i = 0; i < phraseIndex; i++) {
			if (i != phraseIndex) {
				prevShapeLengths = prevShapeLengths + allIntroShapes[i].shapePoints.shapeLength*this.scale;
			}
		}

		var xTotalOffset = xOffset+buffer+prevShapeLengths;

		// circle at center to see where the shape is
		// FOR DEBUGGING
		//fill(0);
		//ellipse(midX+xTotalOffset,-midY-height/originYAdjust*2,5,5);


		var d = dist(mousePosX, mousePosY, midX+xTotalOffset, -midY-height/originYAdjust*2);
		if (d <= Math.max(midX,midY)) {
			this.filled = true;

			if (this.soundRefs[0].isPlaying() == false) {
				this.soundRefs[0].play();
				this.soundRefs[0].loop();
			}			

		} else {
			this.filled = false;
			this.soundRefs[0].stop();
			this.soundRefs[0].setVolume(0);
		}
	}
}


function addAllShapes() {

	for (var i = 0; i < masterShapes.length; i++) {

		var curPhrase = i;
		var shape = new Shape(curPhrase);

	    shape.shapePoints.noteDuration = masterShapes[i].noteDuration.slice();
	    shape.shapePoints.frequency = masterShapes[i].frequency.slice();
	    shape.shapePoints.shapeLength = masterShapes[i].shapeLength;

	    var theseSounds = shape.soundRefs;

	    // add sound file from each bird for this specific phrase
	    for (var bird = 0; bird < masterBirdSounds.length; bird++) {
	    	var thisBird = masterBirdSounds[bird];
	    	theseSounds.push(thisBird[curPhrase]);
	    }

	    allIntroShapes.push(shape);
	}
}

function displayAllShapes() {

	var xOffset = -width/2+60+270;
	var padding = 20;
	var textOffset = yOffset;
	var yOffset = height/originYAdjust*2-10;

	var counterOffset = 1;

	var instructions = select("#practiceText");
	instructions.position(60,30);

	for (var i = 0; i < allIntroShapes.length; i++) {

		var thisShape = allIntroShapes[i].shapePoints;
		
		var scale = allIntroShapes[i].scale;

		stroke(0);
		strokeWeight(1.5);
		strokeCap(ROUND);

		if (allIntroShapes[i].filled) {
			fill(0);
		} else {
			noFill();
		}

		beginShape();
		for (var j = 0; j < thisShape.noteDuration.length; j++) {

		    var x = thisShape.noteDuration[j]*scale+xOffset;
		    var y = thisShape.frequency[j]*scale+yOffset;

		    vertex(x,-y);  
	    }
	    endShape(CLOSE);

	    // not last shape
	    if (i < allIntroShapes.length-1) {
	    	var nextShape = allIntroShapes[i+1].shapePoints;
	    	if (xOffset+nextShape.shapeLength*scale < (width/2-nextShape.shapeLength*scale-60)) {
		    	xOffset = xOffset + thisShape.shapeLength*scale + padding;
			} else {
				xOffset = -width/2+60+270;
				yOffset = height/originYAdjust*2-10 - 120*counterOffset;
				counterOffset++;
			}
		// last shape
	    } else {
	    	xOffset = xOffset + thisShape.shapeLength*scale + padding;
	    }
	    
	}
}




	

	





