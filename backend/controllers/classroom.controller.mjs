import classroomModel from "../models/classroomModel.mjs";



export const createClassroom = async(req,res) => {
  try {
    const {name} = req.body;
    const userId = req.userId;
    const role = req.role;
    if(role !== 'teacher'){
      return res.status(400).json({
        message : "Role Not Matched!!!",
        success : false,
      })
    }
    let classroom = await classroomModel.create({
      name,
      teacherId : userId,
    })
    return res.status(404).json({
      classroom,
      message : "Classroom Created Successfully", 
      success : true,
    })
  } catch (error) {
    return res.status(404).json({
      message : error.message,
      success : false,
    })
  }
}

export const getClassrooms = async(req,res) => {
  try {
    const userId = req.userId;
    console.log('classrooms');
    const role = req.role;
  
    let classrooms = await classroomModel.find({_id : req.params.id}).populate('questions');    

    if(!classrooms){
      return res.status(400).json({
        message : "No Classroom Found",
        success : false,
      })
    }

    return res.status(400).json({
      classrooms,
      success : true,
    })
  } catch (error) {
    return res.status(404).json({
      message : error.message,
      success : false,
    })
  }
}

export const getAllClassrooms = async(req,res) => {

  try {
    let classrooms = await classroomModel.find().populate('questions');    
    if(!classrooms){
      return res.status(404).json({
        message : "No Classroom Found",
        success : false,
      })
    }
    return res.status(200).json({
      classrooms,
      success : true,
    })
  } catch (error) {
    return res.status(404).json({
      message : error.message,
      success : false,
    })
  }
}