// Classifier Variable
let focusedClassifier, suspiciousClassifier, identityClassifier;
// Model URL
let focusedModelUrl =
  "https://teachablemachine.withgoogle.com/models/rpglqcptK/";
let suspiciousModelUrl =
  "https://teachablemachine.withgoogle.com/models/2R4sgrR0w/";
let identityModelUrl =
  "https://teachablemachine.withgoogle.com/models/I7IVFVhGV/";

let video;
let flippedVideo;

// * Load all the models
function preload() {
  focusedClassifier = ml5.imageClassifier(focusedModelUrl + "model.json");
  suspiciousClassifier = ml5.imageClassifier(suspiciousModelUrl + "model.json");
  identityClassifier = ml5.imageClassifier(identityModelUrl + "model.json");
}

function setup() {
  createCanvas(320, 260);
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyFocused();
  classifySuspicious();
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  // text(label, width / 2, height - 4);
}

// * For focused
setInterval(() => {
  classifyFocused();
}, 100);

function classifyFocused() {
  flippedVideo = ml5.flipImage(video);
  focusedClassifier.classify(flippedVideo, focusedResult);
  // flippedVideo.remove();
}

function focusedResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  console.log(results[0].label);
  // Classifiy again!
}

// * For suspicious mode
setInterval(() => {
  classifySuspicious();
}, 100);

function classifySuspicious() {
  flippedVideo = ml5.flipImage(video);
  suspiciousClassifier.classify(flippedVideo, suspiciousResult);
  // flippedVideo.remove();
}

function suspiciousResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  console.log(results[0].label);
  // Classifiy again!
}

// * For identity mode
setInterval(() => {
  identitySuspicious();
}, 100);

function identitySuspicious() {
  flippedVideo = ml5.flipImage(video);
  identityClassifier.classify(flippedVideo, identityResult);
  // flippedVideo.remove();
}

function identityResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  console.log(results[0].label);
  // Classifiy again!
}
