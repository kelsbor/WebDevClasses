const questions = [
    {
        question: "What is the default port for FTP servers?",
        answers: ["21",'32','124','8080'],
        correctAnswer: 0
    },
    {
        question: "Which of the following is a JavaScript framework?",
        answers: ["Django", "React", "Flask", "Ruby on Rails"],
        correctAnswer: 1
    },
    {
        question: "What is the purpose of the <div> tag in HTML?",
        answers: [
            "To create a hyperlink",
            "To embed multimedia content",
            "To display a list of items",
            "To define a division or section in a document"
        ],
        correctAnswer: 3
    },
    {
        question: "Which of the following is used to style a webpage?",
        answers: [ "HTML", "SQL", 'CSS', 'XML'],
        correctAnswer: 2
    },
    {
        question: "If you want to scan for services and ports, what tool you would use?",
        answers: ["Metasploit", "Wireshark", "Nmap", "Burp Suite"],
        correctAnswer: 2
    },
    {
        question: "What the 'mov' instruction do in Assembly?",
        answers: ["Add a value to a register", "Subtract a value from a register", "Print a caracter on the terminal", "Move a value to a register"],
        correctAnswer: 3
    },
];

// Carrega perguntas na página
function loadQuestions() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = ``
    document.getElementById('result').innerHTML = ``

    questions.forEach((q, index) => {
        const div = document.createElement('div')
        div.id = `div-${index}`
        div.innerHTML = `<h3 id='question-header-${index}'>${q.question}</h3>`;
        q.answers.forEach((answer, i) => {
            div.innerHTML += 
            `<label>
                <input id='answer-${index}-${i}' type="radio" name="question${index}" value="${i}" onchange='checkAllAnswered()'> ${answer}
            </label><br>`;
        });
        questionContainer.appendChild(div);
    });
}

function checkAllAnswered() {
    const allAnswered = questions.every((_, index) => {
        return document.querySelector(`input[name="question${index}"]:checked`);
    });

    document.getElementById('submit-button').style.display = allAnswered ? 'block' : 'none';
}

checkAllAnswered()

// Avalia as respostas fornecidas pelo usuário
function submitAnswers() {
    let score = 0;

    questions.forEach((q, index) => {
        const ans_div = document.getElementById(`div-${index}`)
        const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
        const rightAnswer = document.getElementById(`answer-${index}-${questions[index].correctAnswer}`)
        const label = selectedAnswer.parentElement;
        console.log(rightAnswer)

        if (selectedAnswer && parseInt(selectedAnswer.value) === q.correctAnswer) {
            score++
            label.style.cssText = 'color: green;'
            const pCerto = document.createElement('p')
            pCerto.style.cssText = 'color: rgb(0, 182, 55); font-weight: 800; width: auto;'
            pCerto.innerHTML = `<p>A resposta está correta!</p>`
            ans_div.appendChild(pCerto)
        }
        else {
            const pErrado = document.createElement('p')
            pErrado.style.cssText = 'color: yellow; font-weight: 800; width: auto;'
            pErrado.innerHTML = `<p>Resposta correta: ${q.answers[q.correctAnswer]}</p>`
            ans_div.appendChild(pErrado)
            label.style.cssText = 'color: red;'
        }
        
    });
    const result = document.getElementById('result')
    result.innerHTML = `You scored ${score} out of ${questions.length} <p></p><button onclick='loadQuestions()'>Reset</button>`;
    result.style.cssText = "background-color: white; color: black; margin: auto; margin-top: 20px; margin-bottom: 20px; width: 400px; border-radius: 20px; text-align: center; font-weight: 800; padding: 10px;"
    document.getElementById('submit-button').style.display = 'none'
}

window.onload = loadQuestions;