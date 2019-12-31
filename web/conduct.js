const scale = 10;
const strokeWeight = 1.5;

let birdIndex = 0;
let birds = [];

// save these outside the birds so we can preload them
const allSoundFiles = {};
const preloadCount = 4;

const scoreSettings = {
  width: $(window).width(),
  height: 200
}
const playingCanvas = initCanvas();
const shapesGroup = playingCanvas.group();
shapesGroup.transform({translateY: -20})

const gridGroup = playingCanvas.group();
gridGroup.rect(scoreSettings.width/2,scoreSettings.height).move(-scoreSettings.width/2, -scoreSettings.height).fill('white').opacity(0.5)
gridGroup.line(0, -scoreSettings.height, 0, 0).stroke({ color: 'black', width: strokeWeight*2, linecap: 'round', linejoin: 'round' })



function initCanvas() {
  let canvas = SVG().addTo('#currentScore').size(scoreSettings.width, scoreSettings.height);
  // move 0,0 to center of SVG
  canvas.viewbox(-scoreSettings.width/2, -scoreSettings.height, scoreSettings.width, scoreSettings.height);
  return canvas
}

function addBird() {

  const newBird = new Bird(birdIndex);

  let el = "<div class='bird' id='wrapper" + birdIndex + "'>"
  let birdRef = $(el).appendTo("#birds");

  let addTo = "#wrapper" + birdIndex;

  let nameEl = "<h2>" + newBird.name + "</h2>";
  $(nameEl).appendTo(addTo);

  let butEl = "<button id='button" + birdIndex + "'>Next Phrase</button>"
  $(butEl).appendTo(addTo);

  let idRef = '#button' + birdIndex;
  $(idRef).click(() => {
    newBird.nextPhrase();
  })

  birds.push(newBird);
  birdIndex++;
}

// event listeners
$("#addBird").click(() => {
    if (birdIndex < nameSet.length) {
      addBird();
    }
})

class Bird {
  constructor(index) {
    this.index = index;
    this.color = colorSet[birdIndex];
    this.name = nameSet[birdIndex];
    this.filePrefix = fileSet[birdIndex];
    this.curPhrase = 0;
    this.shapes = []; // shapes that have been played, including repeats

    this.group = shapesGroup.group();

    this.playSound(this.curPhrase);
    this.addShape(this.curPhrase);
  }

  addShape(phraseIndex) {
    const shape = new Shape(phraseIndex, scale, this.color);
    this.shapes.push(shape);

    this.curInterval = shape.duration;
    shape.draw(this.group);

    // move it right away
    this.moveShapes(-shape.length*scale);

    // set the interval to keep moving
    if (this.repeat) clearInterval(this.repeat);
    this.repeat = window.setInterval(() => {
      this.moveShapes(-shape.length*scale);
      if (this.curPhrase === shape.index) shape.extend();
    }, this.curInterval)
  }

  nextPhrase() {
    this.curPhrase++;
    this.playSound(this.curPhrase);
    this.addShape(this.curPhrase);
    this.endSound(this.curPhrase-1);

    // preload subsequent sound
    if ((this.curPhrase + 1 < shapeData.length-1) && (this.curPhrase+1 > preloadCount-1)) {
      this.loadSound(this.curPhrase + 1)
    }

  }

  moveShapes(dist) {
    this.group.animate({
      duration: this.curInterval,
      swing: false,
      when: 'now'
    }).ease('-').dx(dist);
  }

  playSound(index) {
    if (allSoundFiles[this.name][index]) {
      allSoundFiles[this.name][index][0].play();
      allSoundFiles[this.name][index][0].loop = true;
    }
  }

  endSound(index) {
    if (allSoundFiles[this.name][index]) {
      allSoundFiles[this.name][index][0].pause();
      allSoundFiles[this.name][index][0].src = '';
    }
  }

  loadSound(i) {
    let filename = 'modified-phrases/' + fileSet[this.index] + '_Phrase' + (i+1) + '.wav';
    let soundRef = $("<audio>", {src: filename, preload: "auto"}).appendTo("body");
    // save the sound object
    allSoundFiles[this.name][i.toString()] = soundRef;
  }
}



class Shape {

  constructor(index, scale, color) {
    this.index = index;
    this.scale = scale;
    this.notes = shapeData[index].frequency; // y axis
    this.noteDuration = shapeData[index].noteDuration; // x axis
    this.length = shapeData[index].shapeLength;
    this.color = color;
    this.passedCenter = false;
    this.ptArray = [];
    this.repeats = 1;
  }

  // audio duration of associated phrase
  get duration() {
    for (let i = 0; i < Object.keys(allSoundFiles).length; i++) {
      const key = Object.keys(allSoundFiles)[i];
      if (allSoundFiles[key][this.index]
        && allSoundFiles[key][this.index].length
        && allSoundFiles[key][this.index][0].duration
      ) {
        return allSoundFiles[key][this.index][0].duration * 1000;
      }
    }
  }

  draw(canvas) {
    // draw to the group
    this.ptArray = convertToShape(this.noteDuration, this.notes, this.scale);
    this.svgRef = drawShape(canvas, this.ptArray, this.color, 'none', strokeWeight)
  }

  extend() {
    let array = [].concat(...this.svgRef.array());  // flatten polyline array
    let extended = array.concat(this.ptArray);
    this.svgRef.plot(extended)
    this.repeats++;
    this.passedCenter = false;
  }

}


function preloadFiles() {
  nameSet.forEach((name,index) => {
    allSoundFiles[name] = {};
    for (let i = 0; i < preloadCount; i++) {
      let filename = 'modified-phrases/' + fileSet[index] + '_Phrase' + (i+1) + '.wav';
      let soundRef = $("<audio>", {src: filename, preload: "auto"}).appendTo("body");
      // save the sound object
      allSoundFiles[name][i.toString()] = soundRef;
    }
  })
}


// START SCRIPT
preloadFiles();
