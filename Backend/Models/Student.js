const mongoose= require('mongoose');

const StudentSchema = mongoose.Schema({
    name:{
        type:String,
        required :true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    },
    resetPasswordToken: {
        type: String
    }
});

const StudentModel = mongoose.model("student",StudentSchema);

module.exports = StudentModel;