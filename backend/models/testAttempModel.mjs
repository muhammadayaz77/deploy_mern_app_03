import mongoose from "mongoose";

const testAttemptSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Student ID
  classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' }, // Classroom ID
  answers: [
    {
      question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }, // Question ID
      selectedOption: String,
      isCorrect:String
    }
  ],
  score: Number // Total score of the test
});

let testAttempModel = mongoose.model('TestAttempt', testAttemptSchema);
export default testAttempModel