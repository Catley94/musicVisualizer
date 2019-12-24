//Variable for song object
var song;
// var sliderVolume;
//Variable for rate of playing speed
var sliderRate;
//Variable for panning sound from left speaker to right
var sliderPan;

var button;

var jumpButton;


//setup canvas and load song
function setup() {
    createCanvas(200, 200);
    //load song and once loaded, run "loaded" function, loadSound oart of P5
    song = loadSound("audio/rainbow.mp3", loaded);
    //set volume
    song.setVolume(0.1)
    button = createButton("Play");
    button.mousePressed(togglePlaying);

    jumpButton = createButton("jump")
    jumpButton.mousePressed(jumpSong);

    //configuring variables for creating sliders (createSlider part of P5)
    sliderRate = createSlider(0, 3, 1, 0.01);
    sliderPan = createSlider(-1, 1, 0, 0.01);

    // song.addCue(5, changeBackground);
    song.addCue(2, changeBackground, color(0,0,255));
    song.addCue(4, changeBackground, color(0,255,255));
    song.addCue(6, changeBackground, color(255,255,255));
    
    
}

function changeBackground(col) {
    background(col)
    // background(random(255),random(255),random(255))
}
function jumpSong() {
    var len = song.duration();
    var time = random(len);
    song.jump(time)
    //other extensions
    //song.currentTime();
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
    //if song's time is greater than 5, change background colour
    // if(song.currentTime() > 5) {
    //     background(song.currentTime()*10, 0, 255)
    // }
    // song.pan(sliderPan.value());
    song.rate(sliderRate.value());
}

