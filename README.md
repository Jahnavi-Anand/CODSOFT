# Quizzler

Quizzler is a web application that allows users to create, explore, and take quizzes on various topics. It features a single-page application (SPA) interface where quizzes are dynamically displayed and quiz questions are presented one by one. Users can create their own quizzes, view quiz statistics, and have a personalized dashboard.

## Features

- **Create Quizzes**: Users can create their own quizzes with custom questions and options.
- **Explore Quizzes**: Browse through available quizzes dynamically displayed on the homepage.
- **Take Quizzes**: Take quizzes where questions are presented one by one with options to select answers.
- **Quiz Results**: View results showing total questions, correct answers, and incorrect answers.
- **Personalized Dashboard**: Each user has a personal profile with a dashboard displaying their created quizzes and quiz statistics.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (using Mongoose ODM) and Atlas

## Getting Started

To run the application locally:

1. Clone this repository:
   ```bash
   git clone https://github.com/Jahnavi-Anand/CODSOFT.git
   ```

2. Navigate into the cloned directory:
   ```bash
   cd CODSOFT
   ```

3. Edit MongoDB credentials in `server.js`:
   ```javascript
   // Edit MongoDB connection string in server.js
   const mongoose = require('mongoose');
   mongoose.connect('mongodb://localhost:27017/quizzler', {
       useNewUrlParser: true,
       useUnifiedTopology: true
   });
   ```

4. Start the Node.js server:
   ```bash
   node server.js
   ```

5. Open your web browser and go to:
   ```
   http://localhost:3000
   ```

Now you can create quizzes, explore available quizzes, and enjoy using Quizzler!


## Screenshots

<img width="959" alt="image" src="https://github.com/Jahnavi-Anand/CODSOFT/assets/122967740/5aa27a50-1a11-4126-8b4f-6b06b722726b">

<img width="959" alt="image" src="https://github.com/Jahnavi-Anand/CODSOFT/assets/122967740/eeccd255-20d6-4ee0-95bd-ed0dfbf4fff6">

<img width="959" alt="image" src="https://github.com/Jahnavi-Anand/CODSOFT/assets/122967740/1fe2dee0-213e-4726-8f65-e1e80c6defd2">

<img width="959" alt="image" src="https://github.com/Jahnavi-Anand/CODSOFT/assets/122967740/4f918020-d6da-4d4f-ad94-7086d49666c3">

<img width="959" alt="image" src="https://github.com/Jahnavi-Anand/CODSOFT/assets/122967740/2e3faea9-e7ee-42f8-a97a-138f267619ae">


## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your suggested improvements.

## Author

Jahnavi Anand

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- This project was developed as part of a web development internship with CodSoft.
- Inspiration and initial guidance from online tutorials and resources.
