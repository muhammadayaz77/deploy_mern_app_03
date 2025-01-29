import classroomModel from "../models/classroomModel.mjs";
import questionModel from '../models/questionModel.mjs'

export const createQuestion = async (req,res) => {
  try {
    const {text,optionA,optionB,optionC,optionD,correctAnswer} = req.body;
    const userId = req.userId;
    
    if(!text || !optionA || !optionB || !optionC || !optionD || !correctAnswer){
      return res.status(400).json({
        message : "Fill all the text!!!",
        success : false,
      })
    }

    let classroom  = await classroomModel.findOne({teacherId : userId});


    let question = await questionModel.create({
      text,
      options : [optionA,optionB,optionC,optionD],
      correctAnswer,
      classroomId : classroom._id,
    })
    await classroomModel.findOneAndUpdate({_id : classroom._id},{
      $push : {questions : question._id}
    },{new : true})
    return res.status(404).json({
      question,
      message : "Question Created Successfully", 
      success : true,
    })
  } catch (error) {
    return res.status(404).json({
      message : error.message,
      success : false,
    })
  }
}


