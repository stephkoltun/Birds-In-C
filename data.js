// THE X/Y VALUES FOR THIS ARE NOT RIGHT!!!!
// REWRITE SHAPES!!!!!
var masterShapes = [
  // 1
  {
    "noteDuration": [0,1,3,4,6,7,9], // x axis values [0,1,2,1,2,1,2] 
    "frequency": [0,4,0,4,0,4,0], // y axis values
    "shapeLength": 9,
    "increment": 0, // speed/increment value is diff for each shape
  },
  // 2
  {
    "noteDuration": [0,1,2,3,5],// x axis values [0,1,1,1,2]
    "frequency": [0,4,5,4,0],// y axis values
    "shapeLength": 5,
    "increment": 0,
  },
  // 3
  {
    "noteDuration": [0,1,1,2,3,4,4],// x axis values [0,1,1,1,1]
    "frequency":    [0,0,4,5,4,4,0],// y axis values
    "shapeLength": 4,
    "increment": 0,
  },
  // 4
  {
    "noteDuration": [0,1,1,2,3,4,4],
    "frequency":    [0,0,4,5,7,7,0],
    "shapeLength": 4,
    "increment": 0
  },
  // 5
  {
    "noteDuration": [0,0,1,2,3,3,4],
    "frequency":    [0,4,5,7,7,0,0],
    "shapeLength": 4,
    "increment": 0
  },
  // 6
  {
    "noteDuration": [0,0,16,16],
    "frequency": [0,12,12,0],
    "shapeLength": 16,
    "increment": 0
  },
  // 7
  {
    "noteDuration": [0,7,7,9,9,18],
    "frequency": [0,0,0.5,0.5,0,0],
    "shapeLength": 18,
    "increment": 0
  },
  // 8
  {
    "noteDuration": [0,0,12,28,28],
    "frequency": [0,7,5,7,0],
    "shapeLength": 28,
    "increment": 0
  },
  // 9
  {
    "noteDuration": [0,0,0.5,1,1,8],
    "frequency": [0,11,7,7,0,0],
    "shapeLength": 8,
    "increment": 0
  },
  // 10
  {
    "noteDuration": [0,0,0.5,1,1],
    "frequency": [0,11,7,11,0],
    "shapeLength": 1,
    "increment": 0
  },
  // 11
  {
    "noteDuration": [0,0,0.5,1,1.5,2,2.5,3,3],
    "frequency": [0,5,7,11,7,11,7,5,0],
    "shapeLength": 3,
    "increment": 0
  },
  // 12
  {
    "noteDuration": [0,0,1,2,10,12,12],
    "frequency": [0,5,7,11,12,5,0],
    "shapeLength": 12,
    "increment": 0
  },
  // 13
  {
    "noteDuration": [0,0,0.5,2.5,3,3.5,4.5,4.5,6,6,12.5,12.5],
    "frequency": [0,11,7,7,5,7,7,0,0,7,7,0],
    "shapeLength": 12.5,
    "increment": 0
  },
  // 14
  {
    "noteDuration": [0,0,8,16,24,32,32],
    "frequency": [0,12,11,7,6,12,0],
    "shapeLength": 32,
    "increment": 0
  },
  // 15
  {
    "noteDuration": [0,0,0.5,0.5,8],
    "frequency": [0,7,7,0,0],
    "shapeLength": 8,
    "increment": 0
  },
  // 16 
  {
    "noteDuration": [0,0,0.5,1,1.5,2,2],
    "frequency": [0,7,11,12,11,7,0],
    "shapeLength": 2,
    "increment": 0
  },
  // 17
  {
    "noteDuration": [0,0,0.5,1,1.5,2,2.5,2.5,3],
    "frequency": [0,11,12,11,12,11,11,0,0],
    "shapeLength": 3,
    "increment": 0
  },
  // 18
  {
    "noteDuration": [0,0,0.5,1,1.5,2,4,4],
    "frequency": [0,4,6,4,6,4,4,0],
    "shapeLength": 4,
    "increment": 0
  },
  // 19
  {
    "noteDuration": [0,3,3,6,6],
    "frequency": [0,0,19,19,0],
    "shapeLength": 6,
    "increment": 0
  },
  // 20
  {
    "noteDuration": [0,0,0.5,1,1.5,2,3.5,4,4.5,5,5.5,6,6],
    "frequency": [0,4,6,4,6,-5,4,6,4,6,4,4,0],
    "shapeLength": 6,
    "increment": 0
  },
  // 21 
  {
    "noteDuration": [0,0,6,6],
    "frequency": [0,6,6,0],
    "shapeLength": 6,
    "increment": 0
  },
  // 22
  {
    "noteDuration": [0,0,12,15,18,21,24,25,25],
    "frequency": [0,4,4,6,7,9,11,4,0],
    "shapeLength": 25,
    "increment": 0
  },
  // 23
  {
    "noteDuration": [0,0,1,13,16,19,22,24,24],
    "frequency": [0,4,6,6,7,9,11,4,0],
    "shapeLength": 24,
    "increment": 0
  },
  // 24
  {
    "noteDuration": [0,0,1,2,14,17,20,21,21],
    "frequency": [0,4,6,7,7,9,11,4,0],
    "shapeLength": 21,
    "increment": 0
  },
  // 25
  {
    "noteDuration": [0,0,1,2,3,15,18,21,21],
    "frequency": [0,4,6,7,9,9,11,4,0],
    "shapeLength": 21,
    "increment": 0
  },
  // 26
  {
    "noteDuration": [0,0,1,2,3,4,16,19,19],
    "frequency": [0,4,6,7,9,11,11,4,0],
    "shapeLength": 19,
    "increment": 0
  },
  // 27
  {
    "noteDuration": [0,0,0.5,1,1.5,2,3,3.5,4,4.5,5,5.5,6,6],
    "frequency": [0,4,6,4,6,7,4,7,6,4,6,4,4,0],
    "shapeLength": 6,
    "increment": 0
  },
  // 28
  {
    "noteDuration": [0,0,0.5,1,1.5,2,4,4],
    "frequency": [0,4,6,4,6,4,4,0],
    "shapeLength": 4,
    "increment": 0
  },
  // 29
  {
    "noteDuration": [0,0,6,12,18,18],
    "frequency": [0,4,7,12,14,0],
    "shapeLength": 18,
    "increment": 0
  },
  // 30
  {
    "noteDuration": [0,0,12,12],
    "frequency": [0,12,12,0],
    "shapeLength": 12,
    "increment": 0
  },
  // 31
  {
    "noteDuration": [0,0,0.5,1,1.5,2,2.5,3,3],
    "frequency": [0,7,5,7,11,7,11,7,0],
    "shapeLength": 3,
    "increment": 0
  },
  // 32
  {
    "noteDuration": [0,0,0.5,1,1.5,2,2.5,9,12,12],
    "frequency": [0,5,7,5,7,11,5,7,5,0],
    "shapeLength": 12,
    "increment": 0
  },
  // 33
  {
    "noteDuration": [0,0,0.5,1,1,2],
    "frequency": [0,7,5,5,0,0],
    "shapeLength": 2,
    "increment": 0
  },
  // 34
  {
    "noteDuration": [0,0,0.5,1,1],
    "frequency": [0,7,5,5,0],
    "shapeLength": 1,
    "increment": 0
  },
  // 35
  {
    "noteDuration": [0,0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5,12,12,14,20,21,23,24,27,28,34,35,42,42,47,47,52,64,64],
    "frequency": [0,5,7,11,7,11,7,11,7,11,7,7,0,0,10,19,21,19,23,21,19,16,19,18,18,0,0,16,17,5,0],
    "shapeLength": 64,
    "increment": 0
  },
  // 36
  {
    "noteDuration": [0,0,0.5,1,1.5,2,2.5,3,3],
    "frequency": [0,5,7,11,7,11,7,7,0],
    "shapeLength": 3,
    "increment": 0
  },
  // 37
  {
    "noteDuration": [0,0,0.5,1,1],
    "frequency": [0,5,7,5,0],
    "shapeLength": 1,
    "increment": 0
  },
  // 38
  {
    "noteDuration": [0,0,0.5,1,1.5,1.5],
    "frequency": [0,5,7,11,5,0],
    "shapeLength": 1.5,
    "increment": 0
  },
  // 39
  {
    "noteDuration": [0,0,0.5,1,1.5,2,2.5,3,3],
    "frequency": [0,11,7,5,7,11,12,11,0],
    "shapeLength": 3,
    "increment": 0
  },
  // 40
  {
    "noteDuration": [0,0,0.5,1,1],
    "frequency": [0,11,5,11,0],
    "shapeLength": 1,
    "increment": 0
  },
  // 41
  {
    "noteDuration": [0,0,0.5,1,1],
    "frequency": [0,11,7,11,0],
    "shapeLength": 1,
    "increment": 0
  },
  // 42
  {
    "noteDuration": [0,0,8,16,24,32,32],
    "frequency": [0,12,11,9,12,12,0],
    "shapeLength": 32,
    "increment": 0
  },
  // 43 
  {
    "noteDuration": [0,0,0.5,1,1.5,4,5,5.5,6,6],
    "frequency": [0,17,16,17,16,16,17,16,17,0],
    "shapeLength": 6,
    "increment": 0
  },
  // 44 
  {
    "noteDuration": [0,0,1,3,4,6,6],
    "frequency": [0,17,16,16,12,17,0],
    "shapeLength": 6,
    "increment": 0
  },
  // 45
  {
    "noteDuration": [0,0,2,4,6,6],
    "frequency": [0,14,14,7,14,0],
    "shapeLength": 6,
    "increment": 0
  },
  // 46
  {
    "noteDuration": [0,0,0.5,1,1.5,2,2,3,3,4,4,5,5,6,6,7,7,8,8.5,9,9.5,10,10],
    "frequency": [0,7,14,16,14,14,0,0,7,7,0,0,7,7,0,0,7,7,14,16,14,7,0],
    "shapeLength": 10,
    "increment": 0
  },
  // 47
  {
    "noteDuration": [0,0,0.5,1,2,2],
    "frequency": [0,14,16,14,14,0],
    "shapeLength": 2,
    "increment": 0
  },
  // 48
  {
    "noteDuration": [0,0,12,20,25,25],
    "frequency": [0,7,7,5,7,0],
    "shapeLength": 25,
    "increment": 0
  },
  // 49
  {
    "noteDuration": [0,0,0.5,1,1.5,2,2.5,3,3],
    "frequency": [0,5,7,10,7,10,7,5,0],
    "shapeLength": 3,
    "increment": 0
  },
  // 50
  {
    "noteDuration": [0,0,0.5,1,1],
    "frequency": [0,5,7,5,0],
    "shapeLength": 1,
    "increment": 0
  },
  // 51
  {
    "noteDuration": [0,0,0.5,1,1.5,1.5],
    "frequency": [0,5,7,10,5,0],
    "shapeLength": 1.5,
    "increment": 0
  },
  // 52
  {
    "noteDuration": [0,0,0.5,1,1],
    "frequency": [0,7,10,7,0],
    "shapeLength": 1,
    "increment": 0
  },
  // 53
  {
    "noteDuration": [0,0,0.5,1,1],
    "frequency": [0,10,7,10,0],
    "shapeLength": 1,
    "increment": 0
  },

];

var colorSet = ["100,150,200", "50,180,170", "90,50,120", "20,40,200", "190,210,40", "250,175,110", "130,250,70"];

var nameSet = ["Great Horned Owl","Fox Sparrow","Blue Jay","King Parrot"];