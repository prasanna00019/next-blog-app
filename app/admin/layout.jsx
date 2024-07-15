import { assets } from "@/assets/assets";
import Sidebar from "@/components/AdminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from "next/link";
export default function Layout({children}){
    return(
        <>
        <div className="flex">
            <ToastContainer/>
            <Sidebar/>
           <div className="flex flex-col w-full">
            <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b  border border-black">
                <h3 className="font-medium text-3xl">ADMIN PANEL</h3>
                <Link href='/'>
                <h1>GO TO MAIN PAGE</h1>
                </Link>
                 <Image src={assets.profile_icon} width={40} alt=""/>

            </div>
           
        {children}
           </div>
        </div>
        </>
    )
}