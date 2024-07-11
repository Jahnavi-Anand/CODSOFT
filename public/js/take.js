document.addEventListener('DOMContentLoaded', () => {
    const quizTile = document.getElementById('quiz-tile');
    const takeQuizBtn = document.getElementById('take-quiz-btn');
    const quizQuestionsContainer = document.getElementById('quiz-questions');
    const quizSummaryContainer = document.getElementById('quiz-summary');
    const quizSummaryTable = document.getElementById('quiz-summary-table');

    takeQuizBtn.addEventListener('click', () => {
        quizTile.style.display = 'none';
        loadQuizQuestions();
    });

    async function loadQuizQuestions() {
        try {
            // Simulate fetching quiz questions (since backend is not connected)
            const quizQuestions = [
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

            // Display questions one by one
            quizQuestions.forEach((quizQuestion, index) => {
                setTimeout(() => {
                    displayQuizQuestion(quizQuestion, index + 1, quizQuestions.length);
                }, index * 2000); // Adjust timing as needed
            });

            // Show quiz summary after all questions are answered
            setTimeout(() => {
                showQuizSummary(quizQuestions);
            }, quizQuestions.length * 2000 + 2000); // Wait for all questions to be answered + additional time
        } catch (error) {
            console.error('Error loading quiz questions:', error);
        }
    }

    function displayQuizQuestion(questionData, currentQuestionNumber, totalQuestions) {
        const { question, options } = questionData;

        const questionElement = document.createElement('div');
        questionElement.classList.add('question-item');
        questionElement.innerHTML = `
            <h3>Question ${currentQuestionNumber}/${totalQuestions}</h3>
            <p>${question}</p>
            <ul>
                ${options.map(option => `<li>${option}</li>`).join('')}
            </ul>
        `;

        quizQuestionsContainer.appendChild(questionElement);
    }

    function showQuizSummary(quizQuestions) {
        quizQuestionsContainer.style.display = 'none';
        quizSummaryContainer.style.display = 'block';

        // Calculate quiz results (since backend is not connected, simulate)
        const quizSummary = calculateQuizSummary(quizQuestions);

        // Display quiz summary in a table
        const tableRows = quizSummary.map(summary => {
            return `<tr>
                        <td>${summary.question}</td>
                        <td>${summary.answered}</td>
                        <td>${summary.correct ? 'Correct' : 'Wrong'}</td>
                    </tr>`;
        }).join('');

        quizSummaryTable.innerHTML = `
            <thead>
                <tr>
                    <th>Question</th>
                    <th>Answered</th>
                    <th>Result</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        `;
    }

    function calculateQuizSummary(quizQuestions) {
        return quizQuestions.map(question => {
            return {
                question: question.question,
                answered: question.selectedOption ? question.selectedOption : 'Not answered',
                correct: question.selectedOption === question.correctOption
            };
        });
    }
});
