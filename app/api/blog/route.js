import { connectdb } from "@/lib/config/db";
import BlogModel from "@/lib/models/blogModel";
const { NextResponse } = require("next/server");
import {writeFile} from "fs/promises"
const fs=require('fs')
const loadDB=async()=>{
    await connectdb();
}
loadDB();
//API ENDPOINT TO GET ALL BLOGS
export async function GET(request){ 
    const blogId=request.nextUrl.searchParams.get("id");
    if(blogId){
        const blog=await BlogModel.findById(blogId);
        return NextResponse.json(blog)
    }
    else{
    const blogs=await BlogModel.find({});
    return NextResponse.json({blogs});}
};

//API ENDPOINT FOR UPLOADING BLOGS
export async function POST(request){
   const formData=await request.formData();
   const timestamp=Date.now();
   const image=formData.get('image');
   const image_byte_data=await image.arrayBuffer();
   const buffer=Buffer.from(image_byte_data);
   const path=`./public/${timestamp}_${image.name}`;
   await  writeFile(path,buffer);
   const imgUrl=`/${timestamp}_${image.name}`
  
   const authImg=formData.get('authorImg');
   const auth_image_byte_data=await authImg.arrayBuffer();
   const buffer1=Buffer.from(auth_image_byte_data);
   const path2=`./public/${timestamp}_${authImg.name}`;
   await  writeFile(path2,buffer1);
   const authimgUrl=`/${timestamp}_${authImg.name}`
   console.log(authimgUrl);
   const blogData={
    title:`${formData.get('title')}`,
    description:`${formData.get('description')}`,
    category:`${formData.get('category')}`,
    author:`${formData.get('author')}`,
    image:`${imgUrl}`,
    authorImg:`${authimgUrl}`,

   }
   await BlogModel.create(blogData);
//    console.log("blog saved")
   return NextResponse.json({success:true,message:"Blog Added"})
}
//ENDPOINT TO DELETE BLOG
export async function DELETE(request){
    const id=await request.nextUrl.searchParams.get('id');
    const blog=await BlogModel.findById(id);
    fs.unlink(`./public/${blog.image}`,()=>{});
    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({message:"blog deleted"});
}