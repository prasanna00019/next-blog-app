import mongoose from "mongoose";
const Schema1=new mongoose.Schema({
    title:{
        type:String,required:true
    }
    ,
    description:{
        type:String,required:true
    }
    ,
    category:{
        type:String,required:true
    }
    ,
    author:{
        type:String,required:true
    },
    image:{
        type:String,required:true
    }
    ,
    authorImg:{
        type:String,required:true
    },
    // authorName:{
    //  type:String,required:true
    // },
    date:{
        type:Date,default:Date.now()
    }
})
const BlogModel=mongoose.models.blogs || mongoose.model('blogs',Schema1);
// const BlogModel= mongoose.model('blog',Schema1) || mongoose.models.blogs;
export default BlogModel;