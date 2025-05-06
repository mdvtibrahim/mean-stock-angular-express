const studentModels = require('../models/studentmodel')
//instert
const create_student = async (req,res)=>{
    const {name,age,total} = req.body;
    try{
   const newStudent = new studentModels({name,age,total})
   await newStudent.save();
   res.status(201).json({
    message:'created successfully',
    data:newStudent
   })
    }catch(err){
  res.status(500).json({
    msg:'error',
    err:error.message
  })
    }
}

// find
const get_student =  async (req,res)=>{
    try{
        const studentList = await studentModels.find();
        res.status(200).json({
            message:'fetched successfully',
            data:studentList
        })
    }catch(err){
        res.status(500).json({
            msg:'not listed',
            err:err.message
        })
    }
}
//update
const update_student = async (req,res)=>{
    const {id} =  req.params;
    const {name,age,total} = req.body
  try{
 const updateStudentById = await studentModels.findByIdAndUpdate(
    id,
    {$set:{name,age,total}},
    {new:true}
 );
 if (!updateStudentById) {
    return res.status(404).json({ msg: 'Student not found' });
  }
 res.status(200).json({
    message:'updateed sucessfully',
    data: updateStudentById
 });
  }  catch(err){
    res.status(500).json({
        message:'not updated',
        err:err.message
    })
  }
}
//delete
const delete_student = async (req,res)=>{
const {id} = req.params;
try{
const deleteStudentById = await studentModels.findByIdAndDelete(id);
if(!deleteStudentById){
    res.status(404).json({message:'student not found'})
}
res.status(200).json({
    message:'deleted successfully',
    data:deleteStudentById
})
}catch(err){
res.status(500).json({
    message:'err deleting',
    data:err.message
})
}
}
module.exports = {
    create_student,
    get_student,
    update_student,
    delete_student
}