const mongoose= require('mongoose');

const AdminSchema = mongoose.Schema({
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

const AdminModel = mongoose.model("admin",AdminSchema);

module.exports = AdminModel;