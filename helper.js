function drawShape(canvas, array, color,  fill, stroke, padding = false) {
  let el = canvas.polyline(array)
  el.fill(fill)
  el.stroke({ color: color, width: stroke, linecap: 'round', linejoin: 'round' })
  if (padding) el.move(padding, padding)
  return el
}

function convertToShape(noteLengths, notes, scale) {
  const points = [];
  noteLengths.forEach((dur, i) => {
    points.push(dur*scale);
    points.push(notes[i]*scale*-1);
  })
  return points
}
