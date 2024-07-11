import mongoose from "mongoose";
export const connectdb=async()=>{
    await mongoose.connect('mongodb+srv://PRASANNA:prasanna19@cluster0.tkahehm.mongodb.net/blog-app')
    console.log("db connected")
}
connectdb();