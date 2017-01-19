var recorder, soundFile;
var recState = 0;

function initRecord() {
	// create sound recorder
	recorder = new p5.SoundRecorder();
	// leave blank so all audible p5.sound are recorded
	recorder.setInput();

	// soundfile for saving
	soundFile = new p5.SoundFile();
}