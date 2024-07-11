"use client"
// import RootLayout from '@/app/layout';
import { assets } from '@/assets/assets';
import Footer from '@/components/Footer';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast , ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import RootLayout from './layout';

const ShareButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [link, setLink] = useState('');

  const handleShareClick = () => {
    const currentUrl = window.location.href;
    setLink(currentUrl);
    setIsOpen(true);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(link);
    // alert('Link copied to clipboard!');
    <ToastContainer/>
    toast.success("COPIED TO CLIPBOARD !!!");
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
    <ToastContainer/>
    <div>
      <button 
        onClick={handleShareClick} 
        className='flex items-center gap-2 font-medium mt-[-80px]  px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>
        CREATE SHAREABLE LINK
      </button>
      {isOpen && (
        <div className='bg-slate-400'
        style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '1em', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', zIndex: 1000 }}>
          <h2>Share this page</h2>
          <input type="text" value={link} readOnly style={{ width: '100%', marginBottom: '1em' }} />
          <button onClick={handleCopyClick} style={{ marginRight: '0.5em' }} className='border border-gray-700 p-1'>Copy Link</button>
          <button onClick={handleClose} className='border border-gray-700 p-1'>Close</button>
        </div>
      )}
    </div>
      </>
  );
};

const Page = ({ params }) => {
  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    const response = await axios.get('/api/blog', {
      params: {
        id: params.id
      }
    });
    setData(response.data);
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return ( 
    data ? (
      <>
        <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28 w-full'> 
          <div className='flex justify-between items-center'>
            <Link href='/'>
              <Image src={assets.logo} alt='' width={180} className='w-[130px] sm:w-auto'/>
            </Link>
            <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>Get Started
              <Image src={assets.arrow} alt='arrow'/>
            </button>
          </div>
          <div className='text-center my-24 '>
            <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
            <Image className='mx-auto mt-6 border border-white rounded-full' src={data.authorImg} width={40} height={30} alt='' />
            <p className='mt-1.5 pb-2 text-lg  max-w-[740px] mx-auto'>{data.author}</p>
          </div>
        </div>
        <div className='mx-5   md:mx-auto mt-[-100px] mb-10 '>
          <Image src={data.image} width={380} height={80} alt='' className='border-4 mx-auto border-gray-400 max-w-[500px]'/>
          {/* <h1 className='my-8 text-[26px] font-semibold'>Introduction</h1> */}
          <div className='blog-content max-w-[1200px] mx-auto' dangerouslySetInnerHTML={{__html:data.description}}></div>
          <div className='my-24 ml-[20%] sm:ml-[40%]'>
            <p className='text-black font-semibold my-4'>Share this article on social media</p>
            <div className='flex '>
              <Image src={assets.facebook_icon} width={50} alt=''/>
              <Image src={assets.twitter_icon} width={50} alt=''/>
              <Image src={assets.googleplus_icon} width={50} alt=''/>
            </div>
          </div>
          <div className='ml-[20%] sm:ml-[40%] '>
          <ShareButton />
          </div>
            
        </div>
        <Footer/>
      </>
    ) : <></>
  );
}

export default Page;
