import mongoose from "mongoose"

let classroomSchema = mongoose.Schema({
  name : {
    type : String,
    require : true
  },
  teacherId : mongoose.Schema.Types.ObjectId,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
})

let classroomModel = mongoose.model('Classroom',classroomSchema)

export default classroomModel