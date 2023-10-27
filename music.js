let song;
let fft;
let playButton;
function preload() {
  song = loadSound('audio/sample-visualisation.mp3');
}

function setup() {
  createCanvas(800, 600);

  // Use HSL color model
  colorMode(HSL, 255);
  song.loop();

  fft = new p5.FFT();

  playButton = createButton('Play');
  playButton.position(10, 5);
  playButton.mousePressed(togglePlay);
}

function draw() {
  background(0);
  let spectrum = fft.analyze();
  let radius = width / 4;
  let bins = spectrum.length;
  let angleStep = TWO_PI / bins;

  for (let i = 0; i < bins; i++) {
    let binAmp = spectrum[i];
    let x = width / 2 + radius * cos(i * angleStep);
    let y = height / 2 + radius * sin(i * angleStep);
    let lx = width / 2 + (radius + binAmp) * cos(i * angleStep);
    let ly = height / 2 + (radius + binAmp) * sin(i * angleStep);

    let hueValue = map(i, 0, bins, 0, 255);

    strokeWeight(2);
    stroke(hueValue, 255, 128);
    line(x, y, lx, ly);
  }
  //Calculate the spectral centroid and display it in real-time
  let centroid = fft.getCentroid();
  fill(255);
  noStroke();
  text("Spectral Centroid: " + centroid.toFixed(0) + " Hz", 10, 40);
}

// Drag the mouse up and down to adjust the volume
function mouseDragged() {
  let volume = map(mouseY, 0, height, 1, 0);
  volume = constrain(volume, 0, 1);
  song.setVolume(volume);
}
// Create a button function control music's play/pause
function togglePlay() {
  if (song.isPlaying()) {
    song.pause();
    playButton.html('Play');
  } else {
    song.play();
    playButton.html('Pause');
  }
}


