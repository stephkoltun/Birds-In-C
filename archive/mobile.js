function touchMoved() {
    // otherwise the display will move around
    // with your touch :(
    return false;
}

var myElement = document.getElementById('thisCanvas');

var hammertime = new Hammer(myElement);
hammertime.on('tap', function(ev) {

    if (gameState == true) {
        addButton.clicked();
        for (i = 0; i < players.length; i++) {
            players[i].advancer.clicked();
        }
    }

    if (practiceState == true) {
        for (i = 0; i < allIntroShapes.length; i++) {
            //check mouse position
            allIntroShapes[i].clicked();
        }
    }
});
