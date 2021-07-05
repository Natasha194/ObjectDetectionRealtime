status = "";
img = "";
objects = [];

function setup() {
    canvas = createCanvas(380 ,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status: Detecting Object";
}

function draw() {
    image(video, 0, 0, 380, 380);
    objectDetector.detect(video, gotResult);

    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        for (i = 0; i < objects.length; i++) {
            document.getElementById('status').innerHTML = 'Status: Object Detected';
            document.getElementById('OI').innerHTML = "Number of Objects: " + objects.length;

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent +"%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].width);
        }
    }
}

function modelLoaded() {
    console.log('model loaded');
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}