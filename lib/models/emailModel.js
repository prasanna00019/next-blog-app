import mongoose from "mongoose";
const Schema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})
const EmailModel= mongoose.models.email || mongoose.model('email',Schema);
// const EmailModel=mongoose.model('email',Schema)|| mongoose.model.email ; 
export default EmailModel;
