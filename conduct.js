const scale = 10;
const strokeWeight = 1.5;

let birdIndex = 0;
let birds = [];

let scoreSettings = {
  width: $(window).width(),
  height: 400
}


const playingCanvas = SVG().addTo('#currentScore').size(scoreSettings.width, scoreSettings.height);
// move 0,0 to center of SVG
playingCanvas.viewbox(-scoreSettings.width/2, -scoreSettings.height/2, scoreSettings.width, scoreSettings.height);

const shapesGroup = playingCanvas.group();
const gridGroup = playingCanvas.group();

gridGroup.rect(scoreSettings.width/2,scoreSettings.height).move(-scoreSettings.width/2, -scoreSettings.height/2).fill('white').opacity(0.5)
gridGroup.line(0, -scoreSettings.height/2, 0, scoreSettings.height/2).stroke({ color: 'black', width: strokeWeight*2, linecap: 'round', linejoin: 'round' })



$("#addBird").click(function() {
    if (birdIndex < nameSet.length) {
      addBird();
    }
})

$('#nextPhrase').click(function() {
    birds[0].nextPhrase();
})

function addBird() {
  const newBird = new Bird(birdIndex)
  birds.push(newBird);
  birdIndex++;
}

class Bird {
  constructor(index) {
    this.index = index;
    this.color = colorSet[birdIndex];
    this.name = nameSet[birdIndex];
    this.filePrefix = fileSet[birdIndex];
    this.curPhrase = 0;
    this.shapes = []; // shapes that have been played, including repeats
    this.soundFiles = {}; // loaded sound files

    this.preloadFiles();
    this.addShape(this.curPhrase);
    //this.playSound(this.curPhrase);

    this.repeat = window.setInterval(() => {
      this.moveShapes()
    }, 4)
  }

  addShape(phraseIndex) {
    const shape = new Shape(phraseIndex, scale, this.color);
    shape.draw(playingCanvas)
    this.shapes.push(shape);
  }

  nextPhrase() {
    this.curPhrase++;
    this.addShape(this.curPhrase);
    this.endSound(this.curPhrase-1);
  }

  moveShapes() {
    this.shapes.forEach(s => {
      let addShape = s.move();
      if (addShape && this.curPhrase === s.index) {
        s.extend();
      }
    })
  }

  preloadFiles() {
    for (let i = 0; i < 5; i++) {
      let filename = 'modified-phrases/' + this.filePrefix + '_Phrase' + (i+1) + '.wav';
      let soundRef = $("<audio>", {src: filename, preload: "auto"}).appendTo("body");
      // save the sound object
      this.soundFiles[i.toString()] = soundRef;
    }
  }

  playSound(index) {
    if (this.soundFiles[index]) {
      this.soundFiles[index][0].play();
      this.soundFiles[index][0].loop();
    }
  }

  endSound(index) {
    if (this.soundFiles[index]) {
      this.soundFiles[index][0].pause();
      this.soundFiles[index][0].src = '';
    }
  }
}



class Shape {

  constructor(index, scale, color) {
    this.index = index;
    this.scale = scale;
    this.notes = shapeData[index].frequency; // y axis
    this.duration = shapeData[index].noteDuration; // x axis
    this.length = shapeData[index].shapeLength;
    this.color = color;
    this.passedCenter = false;
    this.ptArray = [];
    this.repeats = 1;
  }


  draw(canvas) {
    this.duration.forEach((dur, i) => {
      this.ptArray.push(dur*this.scale);
      this.ptArray.push(this.notes[i]*this.scale*-1);
    })
    this.svgRef = shapesGroup.polyline(this.ptArray)
    this.svgRef.fill({ color: 'white', opacity: 0.5 })
    this.svgRef.stroke({ color: this.color, width: strokeWeight, linecap: 'round', linejoin: 'round' })
  }

  move() {
    this.svgRef.animate({duration: 4}).dx(-0.15);
    // return current position so we know whether to instantiate a new one;
    if (this.svgRef.x()*-1 >= this.length*scale*this.repeats && !this.passedCenter) {
      this.passedCenter = true;
      return true;
    }
    return false;
  }

  extend() {
    let array = [].concat(...this.svgRef.array());
    let extended = array.concat(this.ptArray);
    this.svgRef.plot(extended)
    this.repeats++;
    this.passedCenter = false;
  }


  playSound() {
    if (this.soundRef) {
      this.soundRef[0].play();
      curPlaying = true;
      playingIndex = this.index;
    }
  }

  stopSound() {
    if (this.soundRef) {
      this.soundRef[0].pause();
      curPlaying = false;
    }
  }
}
