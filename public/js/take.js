document.addEventListener('DOMContentLoaded', () => {
    fetchQuizzes();

    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('input', filterQuizzes);

    async function fetchQuizzes() {
        try {
            const response = await fetch('/quizzes');
            if (!response.ok) {
                throw new Error('Failed to fetch quizzes');
            }
            const quizzes = await response.json();
            displayQuizzes(quizzes);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    }

    function displayQuizzes(quizzes) {
        const quizListContainer = document.getElementById('quiz-list');
        quizListContainer.innerHTML = '';

        quizzes.forEach(quiz => {
            const quizItem = document.createElement('div');
            quizItem.classList.add('quiz-item');
            quizItem.innerHTML = `
                <h2>${quiz.name}</h2>
                <p>Subject: ${quiz.subject}</p>
                <p>Total Marks: ${quiz.totalMarks}</p>
                <button class="take-quiz-btn" data-quiz-id="${quiz._id}">Take Quiz</button>
            `;
            quizListContainer.appendChild(quizItem);

            const takeQuizBtn = quizItem.querySelector('.take-quiz-btn');
            takeQuizBtn.addEventListener('click', () => {
                const quizId = takeQuizBtn.getAttribute('data-quiz-id');
                window.location.href = `/quiz/${quizId}`;
            });
        });
    }

    function filterQuizzes(event) {
        const searchTerm = event.target.value.toLowerCase();
        const quizItems = document.querySelectorAll('.quiz-item');

        quizItems.forEach(item => {
            const quizName = item.querySelector('h2').textContent.toLowerCase();
            if (quizName.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
});
