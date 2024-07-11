const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    questions: [
        {
            question: { type: String, required: true },
            options: [String],
            correctOption: { type: Number, required: true, min: 1, max: 4 }
        }
    ],
    totalMarks: { type: Number, required: true },
    timer: { type: Number },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
