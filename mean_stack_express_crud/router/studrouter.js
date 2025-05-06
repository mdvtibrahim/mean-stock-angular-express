const express = require('express')
const router = express.Router();
const {create_student,get_student,update_student,delete_student} = require('../controller/studentcontroller')

router.post('/createstudent',create_student)
router.get('/getstudent',get_student)
router.put('/updatestudent/:id', update_student);
router.delete('/deletestudent/:id',delete_student)


module.exports = router