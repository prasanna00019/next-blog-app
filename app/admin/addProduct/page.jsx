"use client"
import { assets } from '@/assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const page = () => {
    const [image, setimage] = useState(false)
    const[authImg,setauthImg]=useState(false);
    const [data, setdata] = useState({
        title:"",
        description:"",
        category:"Startup",
        author:"",
        authorImg:"/album_img.png",
    })
    
const onChangeHandler=(e)=>{
    console.log(e);
  const name=e.target.name;
  const value=e.target.value;
  setdata(data=>({...data,[name]:value}));
}
const onSubmitHandler=async(e)=>{
  e.preventDefault();
  console.log(data.author)
  const formData=new FormData();
  formData.append('title',data.title);
  formData.append('description',data.description);
  formData.append('category',data.category);
  formData.append('author',data.author);
  formData.append('authorImg',authImg);
  formData.append('image',image);
  // formData.append('authorName',author)
  const response =await axios.post('/api/blog',formData);
  if(response.data.success){
    toast.success("DATA ADDED !!! ")
    setimage(false);
    setauthImg(false);
    setdata({
        title:"",
        description:"",
        category:"Startup",
        author:""
    })
  }
  else{
    toast.error("ERROR !!! ")
  }
}
  return (
    <>
     <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16 '>
    <div className='flex gap-10 '>
      <div className='flex flex-col'>      
     <p className='text-xl'>Upload Thumbnail</p>
     <label htmlFor="image">
        <Image src={!image?assets.upload_area:URL.createObjectURL(image)}  alt='' width={140} height={70} className='cursor-pointer mt-4'/>
     </label>
     <input onChange={(e)=>setimage(e.target.files[0])} type="file"  id="image" hidden required />
     </div>
     <div className='flex flex-col'>      
     <p className='text-xl'>Upload Author Image</p>
     <label htmlFor="authImg">
        <Image src={!authImg?assets.upload_area:URL.createObjectURL(authImg)} alt='' width={140} height={70} className='cursor-pointer mt-4'/>
     </label>
     <input onChange={(e)=>setauthImg(e.target.files[0])} type="file" id="authImg" hidden required />
     </div>
     <div>
     <p className='text-xl mt-1'>Author Name</p>
     <input name='author' onChange={onChangeHandler} value={data.author} type="text" placeholder='Enter Name' required className='w-full sm:w-[250px] mt-4 px-4 py-3 border' />
   
     </div>
     </div>
     <p className='text-xl mt-4'>Blog Title</p>
     <input name='title' onChange={onChangeHandler} value={data.title} type="text" placeholder='Type Here...' required className='w-full sm:w-[500px] mt-4 px-4 py-3 border' />
     <p className='text-xl mt-4'>Blog Description</p>
     <textarea name='description' onChange={onChangeHandler} value={data.description} type="text" placeholder='Write Content Here...'  rows={5} required className='w-full sm:w-[800px] mt-4 px-4 py-3 border' />
   <div className='flex gap-8'>

   <div className='flex flex-col '>
    <p className='text-xl mt-4'>Blog Category</p>
    <select name="category" onChange={onChangeHandler} value={data.category} className='w-40 mt-4 px-4 py-3 border text-gray-500' >
        <option value="Startup">Startup</option>
        <option value="Technology">Technology</option>
        <option value="Lifestyle">Lifestyle</option>
    </select>
   </div>
    <br />
    <button type='submit' className='mt-8 w-40 h-12 bg-black text-white'>ADD</button>
   </div>
    </form> 
    </>
  )
}

export default page
