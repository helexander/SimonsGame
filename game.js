var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$(document).keydown(function(){
  if (gameStarted === false){
    gameStarted = true;
    $("#level-title").text("Level " + level);
    nextSequence();

  }
})

$(".btn").on("click", function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
  //Checking to see if the index of the game pattern is same as the user's clicked pattern
  //This is achieved by passing in the last index of the user's clicked pattern by detecting the user's button click
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");

    //Checking to see if the user has finished their sequence
    //Once the user has finished the sequence, it will call the nextSequence function after a delay of one second
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

function nextSequence(){
  //Resets the userClickedPattern to be ready to log the user's clicked pattern
  userClickedPattern = [];

  $("#level-title").text("Level " + level++);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
