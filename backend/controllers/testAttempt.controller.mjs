import testAttemptModel from '../models/testAttempModel.mjs';
import classroomModel from '../models/classroomModel.mjs'
import questionModel from '../models/questionModel.mjs'

export const submitTest = async (req, res) => {
  try {
    const {answers} = req.body;
    const studentId = req.userId;
    const classroomId = req.params.id;
    // Validate required fields
    if (!studentId || !classroomId || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if the classroom exists
    const classroom = await classroomModel.findById(classroomId);
    if (!classroom) return res.status(404).json({ error: 'Classroom not found' });

    let score = 0;
    const processedAnswers = [];

    // Loop through student's answers and validate them
    for (const answer of answers) {
      const question = await questionModel.findById(answer.questionId);

      if (!question) {
        return res.status(404).json({ error: `Question ${answer.questionId} not found` });
      }

      // Check if selected option (string) matches the correct answer (string)
      const isCorrect = question.correctAnswer === answer.selectedOption;

      if (isCorrect) score += 1; // Increase score if correct

      processedAnswers.push({
        question: question._id,
        selectedOption: answer.selectedOption,
        isCorrect
      });
    }

    // Save test attempt in the database
    const testAttempt = await testAttemptModel({
      student: studentId,
      classroom: classroomId,
      answers: processedAnswers,
      score
    });

    await testAttempt.save();

    res.status(201).json({
      message: 'Test submitted successfully',
      testAttempt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// 📌 Example Request to Submit a Test
// POST /api/test/submit
// JSON Body Example:

// json
// Copy
// Edit
// {
//   "studentId": "65c1a3b5e4a1a2d3b4c5d6e7",
//   "classroomId": "65c1b4f7e8c9a1d2b3e4f5g6",
//   "answers": [
//     { "questionId": "65c1d2e4f5a6b7c8d9e0f1a2", "selectedOption": "Paris" },
//     { "questionId": "65c1d2e4f5a6b7c8d9e0f1a3", "selectedOption": "New York" }
//   ]
// }