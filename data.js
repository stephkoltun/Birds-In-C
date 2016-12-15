// THE X/Y VALUES FOR THIS ARE NOT RIGHT!!!!
// REWRITE SHAPES!!!!!
var masterShapes = [{
    "noteDuration": [0,1,3,4,6,7,9], // x axis values [0,1,2,1,2,1,2] 
    "frequency": [0,2,0,2,0,2,0], // y axis values
    "shapeLength": 9,
    "increment": 0, // speed/increment value is diff for each shape
  },
  {
    "noteDuration": [0,1,2,3,5],// x axis values [0,1,1,1,2]
    "frequency": [0,2,3,2,0],// y axis values
    "shapeLength": 5,
    "increment": 0,
  },
  {
    "noteDuration": [0,1,1,2,3,4,4],// x axis values [0,1,1,1,1]
    "frequency":    [0,0,3,4,3,3,0],// y axis values
    "shapeLength": 4,
    "increment": 0,
  },
  {
    "noteDuration": [0,1,1,2,3,4,4],
    "frequency":    [0,0,3,4,5,5,0],
    "shapeLength": 4,
    "increment": 0
  },
  {
    "noteDuration": [0,0,1,2,3,3,4],
    "frequency":    [0,3,4,5,5,0,0],
    "shapeLength": 4,
    "increment": 0
  },
  {
    "noteDuration": [0,0,16,16],
    "frequency": [0,8,8,0],
    "shapeLength": 16,
    "increment": 0
  }
];

var colorSet = ["100,150,200", "50,180,170", "90,50,120", "20,40,200", "190,210,40", "250,175,110", "130,250,70"];

var nameSet = ["Great Horned Owl","Fox Sparrow","Blue Jay","King Parrot"];