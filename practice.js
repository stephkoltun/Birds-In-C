let practice = false;
let drawn = false;

const scale = 5;
const padding = 15;
const strokeWeight = 1.5;

let curPlaying = false;
let playingIndex = null;

const allShapes = []; // store all the instantiated Shape objects

$("#practice").click(function() {
    practice = true;
    $('#practiceWrapper').toggleClass('hide');
    $('#aboutWrapper').toggleClass('hide');

    if (!drawn) {
      drawShapes();
    }
})

$("#about").click(function() {
    practice = false;
    $('#practiceWrapper').toggleClass('hide');
    $('#aboutWrapper').toggleClass('hide');
})


function drawShapes() {
  for (let i = 0; i < shapeData.length; i++) {
    let shape = new Shape(i, scale, padding);
    allShapes.push(shape);
    shape.addCanvas();
    shape.draw(shape.canvas);
  }
  drawn = true;
}


class Shape {

  constructor(index, scale, padding) {
    this.index = index;
    this.scale = scale;
    this.notes = shapeData[index].frequency; // y axis
    this.duration = shapeData[index].noteDuration; // x axis
    this.length = shapeData[index].shapeLength;
    this.loadedSound = false;
    this.padding = padding;
  }

  clicked() {
    // if sound is playing, end it;
    if (curPlaying) {
      allShapes[playingIndex].stopSound();
    }
    this.playSound();
  }

  hover() {
    // load sound if not loaded
    if (!this.loadedSound) this.loadSound();
    // change style
    this.svgRef.stroke({ width: strokeWeight*2.5 })
  }

  hoverOff() {
    this.svgRef.stroke({ width: strokeWeight })
  }

  addCanvas() {
    let height = Math.max(...this.notes) * this.scale + this.padding*2;
    let width = this.length * this.scale + this.padding*2;
    this.canvas = SVG().addTo('#practiceShapes').size(width, height);
  }

  draw(canvas) {
    let ptArray = convertToShape(this.duration, this.notes, this.scale);
    this.svgRef = drawShape(canvas, ptArray, 'black', 'white', strokeWeight, this.padding)

    this.svgRef.mouseover(() => {
      this.hover();
    });
    this.svgRef.mouseout(() => {
      this.hoverOff();
    });

    this.svgRef.click(() => {
      this.clicked();
    })
  }

  loadSound() {
    if (!this.soundRef) {
      let filename = 'modified-phrases/GrOwl_Phrase' + (this.index+1) + '.wav';
      this.soundRef = $("<audio>", {src: filename, preload: "auto"}).appendTo("body");
    }
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
