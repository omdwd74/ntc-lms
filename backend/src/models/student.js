const {model,Schema} = require('mongoose');
const StudentModel = model(
    "student",
    new Schema({
      student_name: { type: String, required: true  },
      roll_number: { type: Number, required: true ,unique: true },
      branch_name:{type:String,required:true},
      semester:{type:Number,required:true},
      contact_number:{type:Number,required :true},
    //   role: { type: String, required: true },
      book_bank:{type:Boolean,required:true}
    })
  )
  
  module.exports = { StudentModel }
  