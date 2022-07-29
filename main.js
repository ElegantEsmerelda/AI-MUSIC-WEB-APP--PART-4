song = "";
song1 = "";

song_status = "";
song1_status = "";

scoreRightWrist = 0;
scoreLeftWrist = 0;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload()
{
song = loadSound("sucker.mp3");
song1 = loadSound("white whisper.mp3");
}

function setup() {
    canvas = createCanvas(400, 400);
    canvas.position(570, 180)

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);

    song_status = song.isPlaying();
    song1_status = song1.isPlaying();
    
    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.2)
    {
    circle(rightWristX, rightWristY, 20);
    

    song1.stop();

    if(song_status == false)
    {
        
        song.play();
        document.getElementById("song").innerHTML = "Playing- Sucker by The Jonas Brothers";

    }
    
    } 
   
   
    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX, leftWristY, 20);
    

    song.stop();
    if(song1_status == false)
    {
        
        song1.play();
        document.getElementById("song1").innerHTML = "Playing- White Whisper by Deep Forest";

    }
    
    }
}
function play()
{
    song.play();
}
function modelLoaded() {
    console.log('PoseNet Is Intialized');
}
function gotPoses(results) {
    if(results.length > 0);
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY); 

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}
