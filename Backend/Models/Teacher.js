const mongoose= require('mongoose');

const TeacherSchema = mongoose.Schema({
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

const TeacherModel = mongoose.model("teacher",TeacherSchema);

module.exports = TeacherModel;