document.addEventListener('DOMContentLoaded', () => {
    const questionsContainer = document.getElementById('questions-container');
    const addQuestionBtn = document.getElementById('add-question-btn');
    const submitQuizBtn = document.getElementById('submit-quiz-btn');
    const finalSubmitBtn = document.getElementById('final-submit-btn');
    const quizForm = document.getElementById('quiz-form');
    const summaryContainer = document.getElementById('summary-container');
    const totalQuestionsElement = document.getElementById('total-questions');
    const quiz = document.getElementById('quiz');

    addQuestionBtn.addEventListener('click', addQuestion);

    function addQuestion() {
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';

        questionItem.innerHTML = `
            <label>
                Question:
                <input type="text" name="question" required>
            </label>
            <label>
                Option 1:
                <input type="text" name="option1" required>
            </label>
            <label>
                Option 2:
                <input type="text" name="option2" required>
            </label>
            <label>
                Option 3:
                <input type="text" name="option3" required>
            </label>
            <label>
                Option 4:
                <input type="text" name="option4" required>
            </label>
            <label>
                Correct Option:
                <input type="number" name="correctOption" min="1" max="4" required>
            </label>
            <button type="button" class="delete-question-btn">Delete Question</button>
        `;

        questionsContainer.appendChild(questionItem);

        const deleteQuestionBtn = questionItem.querySelector('.delete-question-btn');
        deleteQuestionBtn.addEventListener('click', () => {
            questionsContainer.removeChild(questionItem);
        });
    }

    submitQuizBtn.addEventListener('click', () => {
        const questions = document.querySelectorAll('.question-item');
        if (questions.length === 0) {
            alert('Please add at least one question.');
            return;
        }

        quiz.style.display = 'none';
        quizForm.style.display = 'none';
        summaryContainer.style.display = 'block';
        totalQuestionsElement.textContent = `Total Quiz Questions: ${questions.length}`;
    });

    finalSubmitBtn.addEventListener('click', async () => {
        const quizName = document.getElementById('quiz-name').value;
        const quizSubject = document.getElementById('quiz-subject').value;
        const totalMarks = document.getElementById('total-marks').value;
        const quizTimer = document.getElementById('quiz-timer').value;

        if (!quizName || !quizSubject || !totalMarks) {
            alert('Please fill in all required fields.');
            return;
        }

        const questions = [];
        document.querySelectorAll('.question-item').forEach(item => {
            const question = item.querySelector('input[name="question"]').value;
            const options = [
                item.querySelector('input[name="option1"]').value,
                item.querySelector('input[name="option2"]').value,
                item.querySelector('input[name="option3"]').value,
                item.querySelector('input[name="option4"]').value
            ];
            const correctOption = item.querySelector('input[name="correctOption"]').value;

            questions.push({ question, options, correctOption });
        });

        const quizDetails = {
            name: quizName,
            subject: quizSubject,
            questions: questions,
            totalMarks: totalMarks,
            timer: quizTimer ? quizTimer : null
        };

        try {
            const response = await fetch('/create-quiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(quizDetails)
            });

            if (response.ok) {
                const result = await response.json();
                alert('Quiz created successfully!');
                // Reset the forms and show a success message or redirect
                quizForm.reset();
                document.getElementById('summary-form').reset();
                quizForm.style.display = 'block';
                summaryContainer.style.display = 'none';
            } else {
                alert('Failed to create quiz');
            }
        } catch (error) {
            console.error('Error creating quiz:', error);
            alert('Failed to create quiz');
        }
    });
});
