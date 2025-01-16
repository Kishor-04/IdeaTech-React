const mongoose = require("mongoose")

const TeacherIdSchema = mongoose.Schema({
    teacher_id:{
        type:String,
        required:true
    },
    id_verified:{
        type:Boolean,
        required:true,
        default:false
    }
});

const TeacherIdModel = mongoose.model("teacher_id",TeacherIdSchema);

module.exports = TeacherIdModel;
