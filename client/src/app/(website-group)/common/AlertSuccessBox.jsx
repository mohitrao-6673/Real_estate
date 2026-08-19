import Link from 'next/link';
import React from 'react'
import { FaCheck } from "react-icons/fa6";
import { MdErrorOutline } from "react-icons/md";


export default function AlertSuccessBox({ success, status, button }) {
    return (

        <div className={`transform transition-all duration-500 ease-out translate-y-0 opacity-100 bg-transparent h-fit w-full border  rounded-2xl px-6 py-18 shadow-2xl  flex flex-col items-center text-center relative overflow-hidden
         border-emerald-500/30 backdrop-blur-[5px]
        `}>


            <div className="relative top-2   ">
                <div className="absolute left-[50%] translate-x-[-50%]   w-15 h-15 bg-green-900 rounded-full animate-ping inset-0"></div>
                <div className="relative flex items-center justify-center w-15 h-15 bg-green-600 text-white rounded-full shadow-lg
                 text-3xl left-[50%] translate-x-[-50%]">

                    <FaCheck className=" w-10 h-10 " />
                </div>
            </div>

            <div className="text-center flex flex-col gap-2">

                <h1 className="text-2xl font-bold text-white mt-4">
                    Success

                </h1>

                <p className="text-xs font-semibold tracking-widest text-green-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/25">
                    {success}
                </p>


            </div>

            {
                status && <Link href={'/pages/auth'} className='className="text-xs font-semibold tracking-widest text-blue-400 uppercase hover:bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/25 mt-5 '>
                    {button}
                </Link>
            }
        </div>
    )
}

