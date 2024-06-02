var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = []
var userClickedPattern = []
var level = 0;

$(document).keypress(function(){
    if(level===0)
        {   
            $("h1").text("Level "+level);
            nextSequence();
        }
})

function nextSequence(){
    userClickedPattern = []
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    level++;
    $("h1").text("Level "+level);
}

$(".btn").click(function(event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
})



function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("succes");
        if(userClickedPattern.length === gamePattern.length)
            {
                setTimeout(function () {
                    nextSequence();
                }, 1000);
            }
    }
    else{
        console.log("wrong");
        level = 0;
        gamePattern = []
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart!");
    }
}


function animatePress(currentColour){
    $("#"+currentColour).fadeOut(100).fadeIn();
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function playSound(colourName){
    var audio = new Audio("./sounds/"+colourName+".mp3");
    audio.play();
}