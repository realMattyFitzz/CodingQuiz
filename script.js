const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')


let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
})

function startGame() {
  startButton.classList.add('hide')
  setInterval(function () { alert("K.O."); }, 12000);
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()

}


function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])

}
function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    let button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}
function resetState() {
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  let selectedButton = e.target
  let correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else{
    startButton.innerText = 'RESTART'
    startButton.classList.remove('hide')
  }
}



function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct');
    nextButton.classList.remove('hide');
  } else {
    element.classList.add('wrong');
    nextButton.classList.remove('hide');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

var questions = [
  {
    question: "What is 4 + 4?",
    answers: [
      { text: '6', correct: false },
      { text: '9865', correct: false },
      { text: '8', correct: true },
      { text: 'banana', correct: false }
    ]
  },

  {
    question: "What is this?",
    answers: [
      { text: 'A quiz?', correct: true },
      { text: 'A computer?', correct: true },
      { text: 'JavaScript?', correct: true },

    ]
  },

  {
    question: "What is the meaning of life?",
    answers: [
      { text: '23', correct: false },
      { text: '99', correct: false },
      { text: '42', correct: true },
      { text: 'Whatever', correct: false },
    ]
  },
]


