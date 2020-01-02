// file format:
// 2D array - outer array is frequency, inner is frame count
// for all files, the outer array will be 1025 long
width = 800
height = 600


// hzScale = d3.scaleLog().domain([0, 8800]).range([0,height])
hzScale = d3.scaleLinear().domain([8800,1]).range([0,height])
timeScale = d3.scaleLinear().domain([0,pitches[0].length]).range([0,width])

magnitudeScale = d3.scaleLog().domain([63,69]).range([1,10])



console.log('pitches', pitches.length)
console.log('magnitude', magnitude.length)
console.log('spectro', spectro.length)


function checkNote(hz) {
  // notes we care about in this phrase
  if (hz >= 505 && hz <= 535) return 1 // C5
  if (hz >= 640 && hz <= 680) return 1 // E5
  // if (hz >= 505 && hz <= 535) return 1
  // if (hz >= 640 && hz <= 680) return 1
  return 0.15
}

// canvas = SVG().addTo('#spectro').size(width, height)
// maxPitch = 0;
// minPitch = 1000000;
// minMag = 1000000;
// maxMag = 0;
// pitches.forEach((p,index) => {
//   // these are some pitches in here with
//   if (Math.max(...p) > 0) {
//     // these are some pitches in here with
//     if (Math.max(...magnitude[index]) > 0) {
//       magnitude[index].forEach((m,time) => {
//         if (m > 63 && p[time] > 0) {
//           if (p[time]>maxPitch) maxPitch = p[time]
//           if (p[time] < minPitch) minPitch = p[time]
//           if (m > maxMag) maxMag = m;
//           if (m < minMag) minMag = m;
//           // let's plot the point
//
//           canvas.line(timeScale(time), hzScale(p[time]), timeScale(time), hzScale(p[time])).stroke({ color: 'black', width: magnitudeScale(m), linecap: 'square', linejoin: 'round', opacity: checkNote(p[time]) })
//         }
//       })
//     }
//   }
// })
// console.log('max:', maxPitch, 'min:', minPitch);
// console.log('loud', maxMag, minMag)




// can we make it like lines?
let fuzz = 25;

lineSVG = SVG().addTo('#spectro').size(width+50, height)

let timeLength = pitches[0].length;
prevPlot = [];
for (let t = 0; t < timeLength; t++) {
  plottedNow = {};
  pitchesNow = pitches.map(p => p[t]);
  magnitudeNow = magnitude.map(m => m[t]);

  for (let p = 0; p < pitchesNow.length; p++) {
    let pitch = pitchesNow[p];
    let mag = magnitudeNow[p];

    if (mag > 63 && pitch > 0) {

      let extended = false;
      if (t != 0) {
        let prevAdded = prevPlot[t-1]; // object with the lines { pitch : line, pitch : line }
        let prevPitches = Object.keys(prevAdded)
        for (let i = 0; i < prevPitches.length; i++) {
          let prevP = prevPitches[i];
          let range = [pitch-fuzz, pitch+fuzz];

          if (parseInt(prevP) >= range[0] &&  parseInt(prevP) <= range[1]) {
            console.log('found in range', prevP, pitch)

            let addLine = [ timeScale(t), hzScale(pitch), timeScale(t), hzScale(pitch) ];
            let extended = extend(prevAdded[prevP], addLine)
            const key = Math.round(pitch).toString()
            plottedNow[key] = prevAdded[prevP].plot(extended)
            extended = true;
            break;
          }
        }
      }
      if (!extended) {

        // try for one more frame before
        let extendedAgain = false;
        if (t > 1) {
          let prevAdded = prevPlot[t-2]; // object with the lines { pitch : line, pitch : line }
          let prevPitches = Object.keys(prevAdded)
          for (let i = 0; i < prevPitches.length; i++) {
            let prevP = prevPitches[i];
            let range = [pitch-fuzz, pitch+fuzz];

            if (parseInt(prevP) >= range[0] &&  parseInt(prevP) <= range[1]) {

              let addLine = [ timeScale(t), hzScale(pitch) ];
              let extended = extend(prevAdded[prevP], addLine)
              const key = Math.round(pitch).toString()
              plottedNow[key] = prevAdded[prevP].plot(extended)
              extendedAgain = true;
              break;
            }
          }
        }

        if (!extendedAgain) {
          let line = lineSVG.polyline([ timeScale(t), hzScale(pitch)]).stroke({ color: 'black', width: magnitudeScale(mag), linecap: 'square', linejoin: 'round', opacity: checkNote(pitch) })

          const key = Math.round(pitch).toString();
          plottedNow[key] = line;
        }
      }

    }
  }

  prevPlot.push(plottedNow);

}
const svg = d3.select("body").select("svg")
svg.append("g")
    .attr("transform", `translate(${width},0)`).call(d3.axisRight(hzScale));




// pitches.forEach((p,index) => {
//   // these are some pitches in here with
//   if (Math.max(...p) > 0) {
//     // these are some pitches in here with
//     if (Math.max(...magnitude[index]) > 0) {
//       magnitude[index].forEach((m,time) => {
//         if (m > 63 && p[time] > 0) {
//
//           let prevAdded = Object.keys(prevPlot).map(prevP => parseInt(prevP));
//
//           let extended = false;
//           for (let i = 0; i < prevAdded.length; i++) {
//             let prevP = prevAdded[i];
//             let range = [p[time]-fuzz, p[time]+fuzz]
//             if (prevP >= range[0] &&  prevP <= range[1]) {
//               console.log('found in range', prevP, p[time])
//               let addLine = [ timeScale(time), hzScale(p[time]), timeScale(time), hzScale(p[time]) ];
//               let extended = extend(prevPlot[prevP.toString()], addLine)
//               const key = Math.round(hzScale(p[time])).toString()
//               prevPlot[key] = prevPlot[prevP.toString()].plot(extended)
//               // if extend, remove its previous self, and add with new value
//               delete prevPlot[prevP.toString()]
//               extended = true;
//               break;
//             }
//           }
//           if (!extended) {
//             console.log('freshi')
//             let line = lineSVG.polyline([ timeScale(time), hzScale(p[time]), timeScale(time), hzScale(p[time]) ]).stroke({ color: 'black', width: magnitudeScale(m), linecap: 'square', linejoin: 'round' })
//
//             const key = Math.round(hzScale(p[time])).toString();
//             prevPlot[key] = line;
//           }
//         }
//       })
//     }
//   }
// })

function extend(oldLine, addLine) {
  let array = [].concat(...oldLine.array());  // flatten polyline array
  let extended = array.concat(addLine);
  return extended
}

// sMax = 0;
// sMin = 10000000;
// sfzScale = d3.scaleLog().domain([2, 100]).range([0,height])
// spectro.forEach((s,index) => {
//   console.log(s)
//   // these are some pitches in here with
//   s.forEach((sfz, t) => {
//     if (sfz > 0) {
//       if (sfz > sMax) sMax = sfz;
//       if (sfz < sMin) sMin = sfz;
//
//       spectroSVG.line(timeScale(t), sfzScale(sfz), timeScale(t), sfzScale(sfz)).stroke({ color: 'black', width: 3, linecap: 'square', linejoin: 'round' })
//     }
//
//   })
//
// })
//
// console.log(sMax,sMin)
