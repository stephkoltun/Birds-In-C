var allIntroShapes = [];



function Shape(phraseIndex) {
	this.c = 0;
	this.filled = false;

	this.scale = 6;

	this.phraseIndex = phraseIndex;

	this.shapePoints = {};
	this.soundRefs;

	this.leftEdge;
	this.rightEdge;
	this.topEdge;
	this.bottomEdge;



	this.mouseHover = function() {

		// circle at center to see where the shape is
		// FOR DEBUGGING
		//fill(0);
		//ellipse(midX+xTotalOffset,-midY-height/originYAdjust*2,5,5);


		if (mousePosX < this.rightEdge && mousePosX > this.leftEdge && mousePosY > this.topEdge && mousePosY < this.bottomEdge) {
			this.filled = true;
			
			if (this.soundRefs.isPlaying() == false) {
				this.soundRefs.setVolume(1);
				this.soundRefs.play();
				//this.soundRefs.loop();
			}
		} else {
			this.filled = false;
			this.soundRefs.setVolume(0);
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

	    // add sound file from each bird for this specific phrase
	    shape.soundRefs = masterBirdSounds[0][i];

	    


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

	   	allIntroShapes[i].leftEdge = thisShape.noteDuration[0]*scale+xOffset;
	    allIntroShapes[i].rightEdge = allIntroShapes[i].leftEdge+thisShape.shapeLength*scale;
	    allIntroShapes[i].topEdge = -(Math.max(...thisShape.frequency)*scale+yOffset);
	    allIntroShapes[i].bottomEdge = -(Math.min(...thisShape.frequency)*scale+yOffset);

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




	

	





