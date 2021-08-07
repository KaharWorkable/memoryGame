var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;
var started = false;

$(document).click(function(){
    if(!started){
        $("level-titled").text("Level "+level);
        nextsequence();
        started=true;
    }
    });

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePressed(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
   });

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length==gamePattern.length){
            setTimeout(function(){
                nextsequence();    
            }, 1000);
            
        }
    }else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over Press Any Key To Restart");
        startOver();
    }

    

}

function startOver(){
    level = [];
    gamePattern=[];
    started=false;
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function nextsequence(){
    userClickedPattern=[];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

function animatePressed(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
    }


