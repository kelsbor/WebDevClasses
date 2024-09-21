let questions = []

let currentQuestionIndex = 0;
let timer;
const timeLimit = 60; // seconds
let userAnswers = Array(questions.length).fill(null); // Track user answers

function loadQuestions() {
    const selQuestion = document.getElementById('selQuestion').value;
    console.log(selQuestion);
    
    loadQuestionsFromFile(selQuestion).then(() => {
        const questionContainer = document.getElementById('question-container');
        questionContainer.innerHTML = '';
        currentQuestionIndex = 0;
        loadQuestion(currentQuestionIndex);
    });
}

function loadQuestion(index) {
    clearTimeout(timer);
    const questionContainer = document.getElementById('question-container');

    // Hide previous timer
    const existingTimer = document.getElementById('timer');
    if (existingTimer) {
        existingTimer.remove();
    }

    if (index < questions.length) {
        const q = questions[index];
        const div = document.createElement('div');
        div.id = `div-${index}`;
        div.classList.add('fade')
        div.innerHTML = `<h3>${q.question}</h3>`;

        q.answers.forEach((answer, i) => {
            div.innerHTML += `
                <label>
                    <input id='answer-${index}-${i}' type="radio" name="question${index}" value="${i}" 
                    ${userAnswers[index] === i ? 'checked' : ''} 
                    onchange='checkAnswered(${index})'> ${answer}
                </label><br>`;
        });

        questionContainer.appendChild(div);

        setTimeout(() => {
            div.classList.add('fade-in'); // Apply fade-in class after a short delay
        }, 10)

        startTimer(index);
    } else {
        displayResults();
    }
}

function startTimer(index) {
    let timeRemaining = timeLimit;
    const timerDisplay = document.createElement('p');
    timerDisplay.id = 'timer';
    timerDisplay.innerHTML = `<p class='timer'><span class='bold'>Time remaining</span>: ${timeRemaining} seconds`;
    document.getElementById('question-container').appendChild(timerDisplay);

    timer = setInterval(() => {
        timeRemaining--;
        timerDisplay.innerHTML = `<p class='timer'><span class='bold'>Time remaining</span>: ${timeRemaining} seconds`

        if (timeRemaining <= 0) {
            clearInterval(timer);
            markAsWrong(index);
            userAnswers[index] = null; // Mark as unanswered
            loadQuestion(++currentQuestionIndex);
        }
    }, 1000);
}

function markAsWrong(index) {
    const ans_div = document.getElementById(`div-${index}`);
    const correctAnswer = questions[index].correctAnswer;
    const pErrado = document.createElement('p');
    pErrado.style.cssText = 'color: yellow; font-weight: 800; width: auto;';
    pErrado.innerHTML = `<p>Time's up! Correct answer: ${questions[index].answers[correctAnswer]}</p>`;
    ans_div.appendChild(pErrado);
    ans_div.style.color = 'red'; // Change color of the question
}

function checkAnswered(index) {
    clearTimeout(timer); // Stop the timer when answered
    const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
    userAnswers[index] = selectedAnswer ? parseInt(selectedAnswer.value) : null;

    // Disable all options after an answer is selected
    const options = document.querySelectorAll(`input[name="question${index}"]`);
    options.forEach(option => {
        option.disabled = true;
    });

    loadQuestion(++currentQuestionIndex);
}

function displayResults() {
    const result = document.createElement('div')
    let score = 0;

    questions.forEach((q, index) => {
        const ans_div = document.getElementById(`div-${index}`);
        if (userAnswers[index] === q.correctAnswer) {
            score++;
            ans_div.style.color = 'green'; // Change color for correct answers
            const pCerto = document.createElement('p');
            pCerto.style.cssText = 'color: green; font-weight: 800; width: auto;';
            pCerto.innerHTML = `<p>Correct answer!</p>`;
            ans_div.appendChild(pCerto);
        } else {
            const correctAnswer = questions[index].correctAnswer;
            ans_div.style.color = 'red'; // Change color for wrong answers
            const pErrado = document.createElement('p');
            pErrado.style.cssText = 'color: yellow; font-weight: 800; width: auto;';
            pErrado.innerHTML = `<p>Correct answer: ${q.answers[correctAnswer]}</p>`;
            ans_div.appendChild(pErrado);
        }
    });

    result.innerHTML = `You scored ${score} out of ${questions.length}.<p></p><button onclick='start()'>Reset</button>`;
    const questionContainer = document.getElementById('question-container');
    result.style.cssText = 'text-align: center; background-color: white; color: black; width: 300px; border-radius: 20px; padding: 20px; font-weight: 800; margin: auto'
    questionContainer.appendChild(result)
}   

function loadQuestionsFromFile(selQuestion) {
    return fetch(selQuestion)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            questions = data; // Store the questions
            console.log(questions);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function start() {
    userAnswers = Array(questions.length).fill(null);
    const container = document.getElementById('question-container')
    container.innerHTML = ``

    const div = document.createElement('div')
    div.innerHTML = `
        <select id='selQuestion'>
            <option value='questions/comp.json'>Comp. Eng. Quiz</option>
            <option value='questions/plants.json'>Plants Quiz</option>
            <option value='questions/animals.json'>Animals Quiz</option>
        </select>
        <button id="start" onclick="loadQuestions()">Start Quiz</button>
    `
    container.appendChild(div)
    div.style.cssText = `background-color: pink; border-radius: 5px; color: black; width: 300px; text-align: center; padding: 10px;`
}

window.onload = start;