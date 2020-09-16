const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const progressBarFull = document.getElementById('progressBarFull');
const scoreText = document.getElementById('score');
const game = document.getElementById('game');
const loader = document.getElementById('loader');

let currQuestion = {};
let acceptAns = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

//Get data from API
fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple").then( res => {
    return res.json();
})
.then(loadedQuestions => {
    questions = loadedQuestions.results.map( singleQ => {
        const questionSet = {
            question: singleQ.question
        };
        const availableChoices = [...singleQ.incorrect_answers];
        questionSet.answer = Math.floor(Math.random() * 4) + 1;
        availableChoices.splice(questionSet.answer-1,0, singleQ.correct_answer);
        availableChoices.forEach((choice, index) => {
            questionSet["choice" + (index +1)] = choice;
        });
        return questionSet;
    })
    startGame();
})
.catch(err => {
    console.log(err);
});

//Constants
const correctBonus = 10;
const maxQuestions = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    loader.classList.add('hidden');
    game.classList.remove('hidden');
    nextQuestion();
};

nextQuestion = () => {
    if (/*availableQuestions.length == 0 ||*/ questionCounter >= maxQuestions){
        localStorage.setItem('recentScore', score);
        //Go to end page
        return window.location.assign('/end.html');
    }

    questionCounter++;
    progressText.innerText = 'Question ' + questionCounter + '/' + maxQuestions;
    //Update progress Bar
    progressBarFull.style.width = (questionCounter/maxQuestions)*100 + '%';
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currQuestion = availableQuestions[questionIndex];
    question.innerText = currQuestion.question;
    
    choices.forEach( choice => {
        const number = choice.dataset['number']
        choice.innerText = currQuestion['choice' + number];
    });
    
    console.log(availableQuestions);
    availableQuestions.splice(questionIndex, 1);
    acceptAns = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptAns) return;
        acceptAns = false
        const selectedChoice = e.target;
        const answer = selectedChoice.dataset['number'];
        const classToApply = answer == currQuestion.answer ? 'correct':'incorrect';
        if (classToApply == 'correct') {
            incrementScore(correctBonus);
        }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            nextQuestion();
        }, 800);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};