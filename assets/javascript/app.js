// questions object
var questions = [
    {
        question: 'What object does Frank lose in the Ocean when the gang goes to the Jersey Shore?',
        answers: ["His gun", "The Rum Ham", "His Glasses", "Leather Jacket"],
        answer: "The Rum Ham",
        gifs: '<iframe src="https://giphy.com/embed/V5aB8bPkmK796" width="480" height="320" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/ham-V5aB8bPkmK796">via GIPHY</a></p>'
    },
    {
        question: 'Dennis is asshole, why charlie hate?',
        answers: ["Because Dennis is rude to everyone", "Because Dennis got Charlie beat up by the Philly Fanatic", "Because Dennis slept with the waitress", "Because Dennis is a bastard man"],
        answer: "Because Dennis is a bastard man",
        gifs: '<iframe width="560" height="315" src="https://www.youtube.com/embed/2utk-uiaZlc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    },
    {
        question: "According to Dennis, what does the D in The D.E.N.N.I.S System stand for?",
        answers: ["Determine your worth", "Date one woman at a time", "Deomonstrate your value", "Dominate"],
        answer: "Deomonstrate your value",
        gifs: '<iframe src="https://giphy.com/embed/6MhFm3LXoVQn6" width="480" height="451" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/its-always-sunny-in-philadelphia-6MhFm3LXoVQn6">via GIPHY</a></p>'
    },
    {
        question: "What is the alias that Dennis comes up with for Charlie, when he and Mac are entering him into the underground fight tournament?",
        answers: ["Funny Baby", "Clown Baby", "Baby Boomer", "Hundred Dollar Baby"],
        answer: "Clown Baby",
        gifs: '<iframe src="https://giphy.com/embed/nXUCkgH6BmigU" width="480" height="359" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/bars-bf-mentions-nXUCkgH6BmigU">via GIPHY</a></p>'
    },
    {
        question: "What character decides to run for office, only to drop out of the race?",
        answers: ["Dennis", "Mac", "Dee", "Charlie"],
        answer: "Dennis",
        gifs: '<iframe src="https://giphy.com/embed/42GaO7wEBtsl39Lisq" width="480" height="240" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/sunnyfxx-sunny-iasip-fxx-42GaO7wEBtsl39Lisq">via GIPHY</a></p>'
    },
    {
        question: "What was the nic name Sweet Dee had in high school?",
        answers: ["Rickety Cricket", "Pussy Hands", "Fatty MacGoo", "The Aluminum Monster"],
        answer: "The Aluminum Monster",
        gifs: '<iframe src="https://giphy.com/embed/i1jk0UP7QMGfm" width="480" height="361" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/its-always-sunny-in-philadelphia-mac-charlie-day-i1jk0UP7QMGfm">via GIPHY</a></p>'
    },
];

//variables
var timeLeft;
var rightAnswer = 0;
var wrongAnswer = 0;
var timerId;
var i = 0;

//functions
$(document).ready(function () {

    function startGame() { //to start game
        i = 0;
        rightAnswer = 0;
        wrongAnswer = 0;
        $("#playAgain").empty();
        $("#wins").empty();
        $("#loses").empty();
        $("#answerDisplay").empty();
        $("#startButton").html('<button class="btn btn-outline-secondary btn-lg">Start Game</button>');
        $("#startButton").click(function () {
            $("#startButton").empty();
            timeStart();
            nextQuestion();
        });
    }

    function timeStart() {  //to start timer
        timeLeft = 14;
        clearInterval(timerId);
        $("#timeRemaining").html("Time Remaining: 15 seconds");
        timerId = setInterval(function () {
            if (timeLeft == -1) {
                viewResults(false);
                wrongAnswer++;
                i++;
            } else {
                $("#timeRemaining").html("Time Remaining: " + timeLeft + " seconds");
                timeLeft--;
            }
        }, 1000);
    }

    function nextQuestion() {  //to continue to next question
        $("#gifsId").empty();
        $("#answerDisplay").empty();
        $("#questions").html(questions[i].question);
        $("#answerChoice1").html('<button class="btn btn-outline-secondary w3-animate-left">' + questions[i].answers[0] + '</button>');
        $("#answerChoice2").html('<button class="btn btn-outline-secondary w3-animate-right">' + questions[i].answers[1] + '</button>');
        $("#answerChoice3").html('<button class="btn btn-outline-secondary w3-animate-left">' + questions[i].answers[2] + '</button>');
        $("#answerChoice4").html('<button class="btn btn-outline-secondary w3-animate-right">' + questions[i].answers[3] + '</button>');
        $("button").click(function () {
            if (this.innerHTML === questions[i].answer) {
                viewResults(true);
                rightAnswer++;
                i++;
            } else {
                viewResults(false);
                wrongAnswer++;
                i++;
            }
        });
    }

    function viewResults(answerGuessed) { // to show answer after each question

        $("#answerChoice1").empty();
        $("#answerChoice2").empty();
        $("#answerChoice3").empty();
        $("#answerChoice4").empty();
        $("#answerDisplay").html("Answer: " + questions[i].answer);
        $("#gifsId").html(questions[i].gifs);

        clearInterval(timerId);
        if (answerGuessed === true) {
            $("#questions").html("Correct!");
        }
        if (answerGuessed === false) {
            $("#questions").html("Incorrect!");
        }
        resultTimer = setTimeout(function () {
            if (i == questions.length) {
                gameOver();
            } else {
                timeStart();
                nextQuestion();
            }
        }, 5000);
    }

    function gameOver() {  //shows final score and allows player to play again
        $("#questions").empty();
        $("#timeRemaining").empty();
        $("#gifsId").empty();
        $("#answerDisplay").html("Game Over");
        $("#wins").html("Answers Correct : " + rightAnswer);
        $("#loses").html("Answers Wrong : " + wrongAnswer);
        $("#playAgain").html('<button class="btn btn-outline-secondary btn-lg">Play Again</button>');
        $("#playAgain").click(function () {
            startGame();
        });
    }
    startGame(); // to display first start button 
});