document.addEventListener('DOMContentLoaded', () => {
    const takeQuizBtn = document.getElementById('take-quiz-btn');
    const quizQuestionsContainer = document.getElementById('quiz-questions');
    const quizSummaryContainer = document.getElementById('quiz-summary');
    const quizSummaryTable = document.getElementById('quiz-summary-table');
    const quizTile = document.getElementById('quiz-tile');
    let currentQuestionIndex = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let quizQuestions = [];

    takeQuizBtn.addEventListener('click', () => {
        quizTile.style.display = 'none';
        loadQuizQuestions();
    });

    async function loadQuizQuestions() {
        try {
            // Simulate fetching quiz questions (since backend is not connected)
            quizQuestions = [
                {
                    question: "Who sang the title song for the latest Bond film, No Time to Die?",
                    options: ["Adele", "Sam Smith", "Billie Eilish"],
                    correctOption: "Billie Eilish"
                },
                {
                    question: "Which flies a green, white, and orange (in that order) tricolor flag?",
                    options: ["Ivory Coast", "Italy", "Ireland"],
                    correctOption: "Ireland"
                },
                {
                    question: "What company makes the Xperia model of smartphone?",
                    options: ["Samsung", "Nokia", "Sony"],
                    correctOption: "Sony"
                },
                {
                    question: "Which city is home to the Brandenburg Gate?",
                    options: ["Vienna", "Zurich", "Berlin"],
                    correctOption: "Berlin"
                },
                {
                    question: "Which of the following is NOT a fruit?",
                    options: ["Tomatoes", "Avocados", "Rhubarb"],
                    correctOption: "Rhubarb"
                }
            ];

            displayQuizQuestion();
        } catch (error) {
            console.error('Error loading quiz questions:', error);
        }
    }

    function displayQuizQuestion() {
        const currentQuestion = quizQuestions[currentQuestionIndex];

        const questionElement = document.createElement('div');
        questionElement.classList.add('question-item');
        questionElement.innerHTML = `
            <h3>Question ${currentQuestionIndex + 1}/${quizQuestions.length}</h3>
            <p>${currentQuestion.question}</p>
            <ul>
                ${currentQuestion.options.map((option, index) => `
                    <li>
                        <input type="radio" id="option${index}" name="options" value="${option}">
                        <label for="option${index}">${option}</label>
                    </li>
                `).join('')}
            </ul>
            <button id="next-btn">Next</button>
        `;

        quizQuestionsContainer.innerHTML = '';
        quizQuestionsContainer.appendChild(questionElement);

        const nextBtn = document.getElementById('next-btn');
        nextBtn.addEventListener('click', () => {
            const selectedOption = document.querySelector('input[name="options"]:checked');
            if (selectedOption) {
                const selectedValue = selectedOption.value;
                if (selectedValue === currentQuestion.correctOption) {
                    correctAnswers++;
                } else {
                    incorrectAnswers++;
                }

                currentQuestionIndex++;
                if (currentQuestionIndex < quizQuestions.length) {
                    displayQuizQuestion();
                } else {
                    showQuizSummary();
                }
            } else {
                alert('Please select an option.');
            }
        });
    }

    function showQuizSummary() {
        quizQuestionsContainer.style.display = 'none';
        quizSummaryContainer.style.display = 'block';

        quizSummaryContainer.innerHTML = `
            <div class="summary-container">
                <h2>Quiz Summary</h2>
                <div class="summary-content">
                    <p>Total Questions: ${quizQuestions.length}</p>
                    <p>Correct Answers: ${correctAnswers}</p>
                    <p>Incorrect Answers: ${incorrectAnswers}</p>
                </div>
            </div>
        `;
    }
});
