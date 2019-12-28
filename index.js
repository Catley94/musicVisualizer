var song;
var fft;
var button;

var numOfBands;


function preload() {
    song = loadSound('audio/bensound-dubstep.mp3')
    
}

function setup() {
    //create canvas
    createCanvas(600, 600)
    colorMode(HSB)
    //anglemode is degrees as opposed to radians as default in canvas
    angleMode(DEGREES);
    //create button to play/pause
    button = createButton('Play/Pause')
    //event handler, when button is pressed, fun playPause function
    button.mousePressed(playPause)
    //set volume of music to 0.1
    song.setVolume(0.1);
    //fft object, 0 smoothing, 256 freq bands 
    numOfBands = 128;
    fft = new p5.FFT(0.6, numOfBands);
    // w = width / numOfBands;
    

}
//function to play/pause
function playPause() {
    if (!song.isPlaying()) {
        song.play();
    } else {
        song.pause();
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
    

    // beginShape();
    //for every... less than spectrum length
    fft.getEnergy('bass')
    for(var i = 0; i < spectrum.length; i++) {
        //amp/vol variable for each individual band/freq
        // console.log(fft.getEnergy('bass'))
        var amp = spectrum[i];
        
        //Angle - changed from 200 to 100 for interesting effect
        var angle = map(i, 0, spectrum.length, 0, 360);
        // var angle = map(i, 0, 100, 0, 360);
        // console.log(amp)
        // var r = map(amp, 0, spectrum.length, 1, 200);
        var r = map(amp, 0, spectrum.length, 10, 600);
        var x = r * cos(angle) /2;
        var y = r * sin(angle) /2;
        
        // var x = r * sin(angle);
        // var y = r * cos(angle);
    
        //Star----------------------
        //comment out fill for dancing white star
        //colour in star depending on levels
        rotate(i)
            if(fft.getEnergy('mid') > 140 && fft.getEnergy('bass') > 180) {
                fill(255, i, 255, 0.25)
            } else {
                // fill(i, 255, 255, 0.1)
                fill(255, 255, i, 0.2)
            }
            // fill(255, 255, 255, 0.3)
            // rotate(50)

            ellipse(0, 0, x, y)
            ellipse(0, 0, y, x)

        //Vertical Eye------------------
        // fill(255, 255, 255, i*0.9)
        // var reverseNumbers = map(i, 0, 255, 0, 150)
        // fill(reverseNumbers, 255, 255, 0.3)
        // ellipse(0, 0, y, x)
        
        // ellipse(0, 0, x, y)
        

        //Lines-----------------------
        // stroke(i, 255, 255)
        // line(0, 0, x, y)


        //y to equal height of volume/amp of band/freq, from 0 - 256, to height of canvas and 0
        // var y = map(amp, 0, 256, height-10, 0);
        // 
        // //line from [i], height of canvas (to start at bottom), draw to [i], variable Y
        // rect(i * w, y, w, height - y);
    }
    // endShape();
   
    
}