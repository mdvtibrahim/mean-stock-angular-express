const mongoose = require('mongoose')

const studentShema = new mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    total:{type:Number,required:true}

},
{timestamps:true}
)


const student = mongoose.model('student',studentShema,'student_table')
module.exports = student