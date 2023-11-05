const question = document.querySelector('#question');
const choices = document.querySelectorAll('.choice-text');
const progressText = document.querySelector('#progressText');
const progressBarFull = document.querySelector('#progressBarFull');
const scoresText = document.querySelector('#score');
const btnPlay = document.querySelector('#btn-play');
const container = document.querySelector('.container');


 let availableQuestions = [];
 let currentQuestion = {};
 let acceptingAnswers = true;
 let score = 0;
 let questionCounter = 0;


 let questions = [
    {
        question: 'what is the full meaning of CK?',
        choice1: 'Cort Klerk',
        choice2: 'Career Kings',
        choice3: 'Clark Kent',
        choice4: 'Career Kingdom',
        answer: 2,

    },
    {
        question: 'what is 2 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 2,

    },
    {
        question: 'The tallest building in the world is located in which city?',
        choice1: 'Dubai',
        choice2: 'New York',
        choice3: 'Shanghai',
        choice4: 'None of the above',
        answer: 1,

    },
    {
        question: 'what percent of American adults believe that chocolate comes from brown cows?',
        choice1: '20%',
        choice2: '18%',
        choice3: '7%',
        choice4: '33%',
        answer: 3,

    },
    {
        question: 'approximately what percent of U.S power outages are caused by squirrels?',
        choice1: '10-20%',
        choice2: '5-10%',
        choice3: '15-20%',
        choice4: '30-40%',
        answer: 1,

    },
 ];
  
const score_points = 100;
const max_questions = 5;

const startGame = () => {
 questionCounter = 0;
 score = 0;
 availableQuestions = [...questions]
 getNewQuestion()

};

const getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > max_questions ) {
         localStorage.setItem('mostRecentScore', score)

         return window.location.assign('/index.html')
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${max_questions}`;
    progressBarFull.style.width = `${(questionCounter/max_questions) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionsIndex, 1);
    acceptingAnswers = true;

    
}


choices.forEach( choice => {
    choice.addEventListener('click', (e) => {
       if (!acceptingAnswers) 
       return acceptingAnswers = false;
       const selectedChoice = e.target;
       const selectedAnswer = selectedChoice.dataset['number'];

       let classToApply  = (selectedAnswer == currentQuestion.answer) ? 'correct' : 'incorrect';

       if (classToApply === 'correct'){
            incrementScore(score_points);
       };
       selectedChoice.parentElement.classList.add(classToApply);

       
       setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion()
       }, 1000);
    });
});
 
const incrementScore = (num) => {
    score +=num;
    scoresText.innerText = score;
}

startGame();