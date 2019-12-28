var song;
var fft;
var button;

var numOfBands;
var ampVolume;
var circles = [];

var audioFile = document.querySelector('.audioFile');


function preload() {
    song = loadSound('audio/museUprising.mp3')
    
}

function setup() {
    
    //create canvas
    createCanvas(600, 600)
    colorMode(RGB, 150);
    //anglemode is degrees as opposed to radians as default in canvas
    angleMode(DEGREES);
    //create button to play/pause
    // button = createButton('Play/Pause')
    //event handler, when button is pressed, fun playPause function
    // button.mousePressed(playPause)
    //set volume of music to 0.1
    song.setVolume(0.1);
    //fft object, 0 smoothing, 256 freq bands 
    numOfBands = 256;
    fft = new p5.FFT(0.7, numOfBands);
    ampVolume = new p5.Amplitude(0.9);
    // w = width / numOfBands;
    song.play();

}
//function to play/pause
function play() {
    if (!song.isPlaying()) {
        song.play();
    }
}

function pause() {
    if (song.isPlaying()) {
        song.pause();
    }
}

function stop() {
    if (song.isPlaying()) {
        song.stop();
    }
}


function draw() {
    //background black
    background(0);
    //spectrum variable to contain the fft analyze results
    var spectrum = fft.analyze();
    //stroke white
    // stroke(255)
    noStroke();
    translate(width/2, height/2);
    
    let level = ampVolume.getLevel();
    let size = map(level, 0, 0.1, 0, 150);
    // console.log(size > 90)
    if(size > 95) {
        console.log(size)
        circles.push(new Circle(0, 0, 2));
    }
    for(var i= 0; i<circles.length; i++){
        circles[i].update();
        circles[i].ellipse();
        
        //is circle has reached it's lifespan, then delete it
        if(circles[i].lifespan <= 0){
          circles.splice(i, 1);
        }
      }
    // beginShape();
    //for every... less than spectrum length
    // colorMode(HSB)
    for(var i = 0; i < spectrum.length; i++) {
        //amp/vol variable for each individual band/freq
        var amp = spectrum[i];
        //Angle - changed from 200 to 100 for interesting effect
        var angle = map(i, 0, spectrum.length, 0, 360);
        // var angle = map(i, 0, 100, 0, 360);
        var r = map(amp, 0, spectrum.length, 10, width/2);
        var x = r * sin(angle);
        var y = r * cos(angle);
        var x2 = r * cos(angle);
        var y2 = r * sin(angle);
        //Star----------------------
        //comment out fill for dancing white star
        //colour in star depending on levels
        // rotate(i)
        //     if(fft.getEnergy('highMid') > 130 && fft.getEnergy('bass') > 150) {
        //         fill(i, 0, i, 70)
        //     } else {
        //         // fill(i, 255, 255, 0.1)
        //         fill(i, i, i, 20)
        //     }
        //     // fill(255, 255, 255, 0.3)
        //     // rotate(50)

        //     ellipse(0, 0, x, y)
        //     ellipse(0, 0, y, x)


        //Lines-----------------------
        stroke(i, 255, i)
        line(0, 0, x, y)
        stroke(255, i, i)
        line(0, 0, -x, -y)

    }
    fill(255, 255, 255, 120);
    ellipse(0, 0, size);

    noFill();
    
   
    
}

function Circle(x, y, s){
    //set any properties
    this.x = x; 	//x position
    this.y = y;		//y position
    this.s = s;		//circle size
    
    //give each circle a lifespan
    this.lifespan = 300;
    
    //define methods 
    
    //this draws the ellipse
    this.ellipse = function(){
      //define visual propoerties of the ellipse
      
      stroke(255, 255, 255);
      noFill();
      
      //draw the ellipse
      ellipse(this.x, this.y, this.s);
    }
    
    //this makes it grow
    this.update = function(){
      this.s = this.s + 15;
      this.lifespan--;
    }
    
    
  }