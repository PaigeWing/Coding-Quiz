//Document Variables
var startBtn = document.getElementById('start-btn')
var highScoresBtn = document.getElementById('scores-btn')
var questionText = document.getElementById('question')
var questionContainer = document.getElementById('question-container')
var answerButtons = document.getElementById('answer-buttons')
var nextButton = document.getElementById('next-btn')
var finished = document.getElementById('finished-container')
var correctStatus = document.getElementById('status-correct')
var wrongStatus = document.getElementById('status-wrong')
var timerEl = document.getElementById('timer');

var currentQuestion

//Event Listeners
startBtn.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestion++
    nextQuestion()
})

//Creating Timer
var secondsLeft = 60;

function updateTimer() {
    var timerInterval = setInterval(function() {
        timerEl.innerText = secondsLeft;
        secondsLeft -- ;        
     if(secondsLeft === 0) {
        clearInterval(timerInterval);
        }
    }, 1000);
    }

//Starting Quiz On Click
function startQuiz() {   
    startBtn.classList.add('hide')
    highScoresBtn.classList.add('hide')
    questionText.classList.remove('hide')
    answerButtons.classList.remove('hide')
    currentQuestion = 0
    questionText.classList.remove('hide')
    nextQuestion() 
    updateTimer()   
} 

//Showing First Question
function showQuestion(question) {
    questionText.textContent = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        button.addEventListener('click', selectAnswer)
        answerButtons.appendChild(button)
    })
}

//Providing Next Question
function nextQuestion() {
    reset()
    showQuestion(questions[currentQuestion])
    correctStatus.classList.add('hide')
    wrongStatus.classList.add('hide')
}

function reset() {
    nextButton.classList.add('hide')
    while (answerButtons.firstChild) {
        answerButtons.removeChild
        (answerButtons.firstChild)
    }
}

//Choosing Answer
function selectAnswer(e) {     
    const selected = e.target 
    console.log(selected.textContent); 
    var answers = questions[currentQuestion].answers
    var correctAnswer = answers.filter((e)=> {
        return e.correct === true
    }) 
    if (correctAnswer[0].text === selected.textContent) {
  console.log("correct");
        correctStatus.classList.remove('hide')
        secondsLeft = secondsLeft + 5;
    } else {
        wrongStatus.classList.remove('hide')
        secondsLeft = secondsLeft - 5;
    }
    
    if (questions.length > currentQuestion + 1)  { 
        nextButton.classList.remove('hide')
    } else {        
        startBtn.innerText = 'Restart'
        startBtn.classList.remove('hide')
        highScoresBtn.classList.remove('hide')
        finished.classList.remove('hide')
        questionText.classList.add('hide')
        answerButtons.classList.add('hide')        
    }      
}

//List of Questions
const questions = [
    {
    question: 'Which of the following is true about a function in JavaScript?',
    answers: [
        { text: 'It allows the code to be called upon one time', correct: false},
        { text: "It's better to exclude a variable", correct: false},
        { text: 'Can put another function inside of a function', correct: true},
        { text: 'When the variable in it is not defined in the function it looks downward to its children'}
       ]
    },    
    {
        question: 'Which term is used to add an item to the end of an array?',
        answers: [
            { text: 'Push', correct: true},
            { text: 'Pop', correct: false},
            { text: 'Add', correct: false},
            { text: 'Incorporate', correct: false}
        ]
    },
    {
        question: 'What kind of event is the click action in Java Script?',
        answers: [
            { text: 'Keyboard', correct: false},
            { text: 'Mouse', correct: true},
            { text: 'User Interface', correct: false},
            { text: 'Focus', correct: false} 
        ]
    },
    {
        question: 'Which of the following is NOT a CSS selector?',
        answers: [
            { text: 'Universal', correct: false},
            { text: 'Element', correct: false},
            { text: 'Class', correct: false},
            { text: 'Div', correct: true}  
        ]
    }
]

// Sending High Scores to Second HTML and Local Storage
//  var userInitials = document.getElementById('ordered-initials')
//  var submitButton = document.getElementById('submit')

 var scoreInitials = []

 function grabScores() {
    scoreInitials = []
    var scores = localStorage.getItem("scores")
    var parsedScores = JSON.parse(scores);
    scoreInitials.push(parsedScores);
 }

 function insertScore(initials, score) {
    scoreInitials.push({[initials]:score});
    var stringScores = JSON.stringify(scoreInitials);
    localStorage.setItem("scores", stringScores)
    grabScores();
 }
//  scoreInitials.sort(function (a, b) {
//     return b.score - a.score;
//  })

//  const topScores= scoreInitials.slice(0,5);

//  var stringScores = JSON.stringify(topScores);

//  var parsedScores = JSON.parse(stringScores);
 
//  for (let i = 0; i <parsedScore.length; i++) {
//     const scoresFinal = parsedScores[i];
//  }





