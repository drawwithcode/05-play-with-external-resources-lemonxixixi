var sound,cover, fft, amplitude, r = 200, dr = 100;
function preload(){
	sound = loadSound("./assets/IFYOU.mp3");
  cover = loadImage("./assets/cover.jpg")
}
function setup(){
  createCanvas(windowWidth,windowHeight);
  image(cover, 0, 0, windowWidth, windowHeight);
  fft = new p5.FFT();
	fft.setInput(sound);
	sound.play();
  amplitude = new p5.Amplitude();
	amplitude.setInput(sound);
}

function draw(){

  translate(width/2,height/2);
	let waveform = fft.waveform();
	fill(color("#F4D6BB"));
	ellipse(0,0,400*amplitude.getLevel(),400*amplitude.getLevel());
  noFill();
  beginShape();
  stroke(255,100); // waveform is red
  strokeWeight(1);
  for (let i = 0; i< waveform.length; i+=30){
		let ang = i*360/waveform.length;
		let x = (r)*cos(radians(waveform.length/ang));
    let y = (r)*sin(radians(ang*get.waveform*fft.waveform));
    let a = map( waveform[i], -1, 1, r-dr, r+dr)*cos(radians(ang));// ;
    let b = map( waveform[i], -1, 1, r-dr, r+dr)*sin(radians(ang));// ;
    vertex(a,b);
		push();
		strokeWeight(1);
		stroke(255,100);
		line(x, y, a, b);
		pop();
		push();
		stroke(255);
    strokeWeight(2);
    point(a, b);
		pop();
  }
  endShape();
}

function mousePressed(){
	if(!sound.isPlaying())sound.play();
}
