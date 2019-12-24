//Variable for song object
var song;
// var sliderVolume;
//Variable for rate of playing speed
var sliderRate;
//Variable for panning sound from left speaker to right
var sliderPan;

var button;


//setup canvas and load song
function setup() {
    createCanvas(200, 200);
    //load song and once loaded, run "loaded" function, loadSound oart of P5
    song = loadSound("audio/rainbow.mp3", loaded);
    //set volume
    song.setVolume(0.1)
    button = createButton("Play");
    button.mousePressed(togglePlaying);
    //configuring variables for creating sliders (createSlider part of P5)
    sliderRate = createSlider(0, 3, 1, 0.01);
    sliderPan = createSlider(-1, 1, 0, 0.01);
    
}

function togglePlaying() {
    if(!song.isPlaying()) {
        song.play();
        song.setVolume(0.3);
        //change name of button to pause
        button.html("Pause")
        //change name of button to stop
        // button.html("Stop")
    } else {
        //song pauses
        song.pause();
        //song stops
        //song.stop();
        button.html("play")
    }
    
    
}

// function of playing song
function loaded() {
    // song.play();
    console.log('loaded')
}

//draw function, canvas and slider settings
function draw() {
    background(0);
    // song.pan(sliderPan.value());
    song.rate(sliderRate.value());
}