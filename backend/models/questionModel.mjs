import mongoose from "mongoose";



const questionSchema = new mongoose.Schema({
  classroomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: true },
  text: { type: String, required: true }, // Question text
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true }
});

// Ensure there are exactly 4 options
questionSchema.pre('save', function (next) {
  if (this.options.length !== 4) {
    return next(new Error('A question must have exactly 4 options.'));
  }
  next();
});

let questionModel = mongoose.model('Question', questionSchema);
export default questionModel