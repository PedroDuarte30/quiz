const startScreen = document.getElementById('start-screen');
const quizArea = document.getElementById('quiz-area'); // CORRIGIDO: era start-area
const resultScreen = document.getElementById('result-screen');
const questionEl = document.getElementById('question');
const optionBtns = document.querySelectorAll('.option-btn');

// Control Variables
let currentIdx = 0;
let score = 0;
let timeleft = 60;
let timer;

// Questions
const questions = [
    { q: "O que significa HTML?", options: ["Home Tool Markup Language", "Hyper Text Markup Language", "Hyperlinks and Text Markup Language"], correct: "b" },
    { q: "Quem criou e mantém os padrões web?", options: ["Google", "The World Wide Web Consortium ", "Mozilla ", "Microsoft"], correct: "b" },
    { q: "O que significa CSS?", options: ["Computer Style Sheets", "Colorful Style Sheets", "Creative Style Sheets", "Cascanding Style Sheets"], correct: "d" },
    { q: "Em que parte de um documento HTML é o local correto para referir uma folha de estilo externa?", options: ["Na secção <head>", "No final do documento", "Na secção <body>"], correct: "a" }
];

// Start Quiz
document.getElementById('start-btn').addEventListener('click', () => {
    startScreen.classList.add('hide');
    quizArea.classList.remove('hide');
    startTimer();
    showQuestion();
});

function showQuestion() {
    const item = questions[currentIdx]; // CORRIGIDO: era question
    questionEl.innerText = item.q;
    
    optionBtns.forEach((btn, index) => {
        btn.style.display = item.options[index] ? "block" : "none";
        btn.innerText = item.options[index] || "";
        
        btn.onclick = () => checkAnswer(index);
    });
}

function checkAnswer(selectedIdx){
    const correctMap = {0: "a", 1: "b", 2: "c", 3: "d"}; 
    const answerLetter = correctMap[selectedIdx];

    if(answerLetter === questions[currentIdx].correct) {
        score++;
        document.getElementById('score').innerText = score;
    }

    currentIdx++;
    if(currentIdx < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function startTimer() {
    timer = setInterval(() => {
       timeleft--;
       document.getElementById('time').innerText = timeleft;
       if(timeleft <= 0) endQuiz(); 
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    quizArea.classList.add('hide');
    resultScreen.classList.remove('hide');
    document.getElementById('final-score').innerText = score;
}