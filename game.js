const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));


let currQuestion = {};
let acceptAns = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What...is your name?", 
        choice1: "Alfred",
        choice2: "Bruce Wayne",
        choice3: "Candice",
        choice4: "Devan",
        answer:  4
    },
    {
        question: "What...is your quest?", 
        choice1: "Seek treasure",
        choice2: "Slay the King",
        choice3: "Find the Holy Grail",
        choice4: "Finding a dealer",
        answer:  3
    },
    {
        question: "What...is the airspeed velocity of a sparrow?", 
        choice1: "5",
        choice2: "12 knots",
        choice3: "African of European?",
        choice4: "52.33 mph",
        answer:  3
    },
    {
        question: "What...is color is this question?", 
        choice1: "Black",
        choice2: "Green",
        choice3: "White",
        choice4: "Yellow",
        answer:  2
    }
]

//Constants
const correctBonus = 10;
const maxQuestions = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    nextQuestion();
};

nextQuestion = () => {
    if (availableQuestions.length == 0 || questionCounter >= maxQuestions){
        //Go to end page
        return window.location.assign('/end.html');
    }

    questionCounter++;
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
        console.log(answer);
        nextQuestion();
    });
});

startGame();